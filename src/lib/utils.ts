import { DayOfWeek, HoursConfig } from '@/types/database';

const DAYS_ORDER: DayOfWeek[] = [
  'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'
];

const DAY_LABELS: Record<DayOfWeek, string> = {
  sunday: 'Sunday',
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
};

function toMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

function getNowEST(): Date {
  return new Date(new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }));
}

export function getTodayDow(): DayOfWeek {
  return DAYS_ORDER[getNowEST().getDay()];
}

function getYesterdayDow(): DayOfWeek {
  const now = getNowEST();
  const d = now.getDay();
  return DAYS_ORDER[d === 0 ? 6 : d - 1];
}

export function formatTime12(time24: string): string {
  const [h, m] = time24.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  return m === 0 ? `${hour} ${ampm}` : `${hour}:${m.toString().padStart(2, '0')} ${ampm}`;
}

/**
 * Checks if the bar is currently open.
 *
 * Two cases to check:
 * 1. Today's evening portion: currentTime >= today's open
 *    (for midnight-crossing hours, the evening portion is always after open)
 * 2. Yesterday's overnight tail: yesterday crossed midnight and currentTime < yesterday's close
 */
export function isCurrentlyOpen(hours: HoursConfig): boolean {
  const currentMinutes = (() => {
    const now = getNowEST();
    return now.getHours() * 60 + now.getMinutes();
  })();

  // Check today's hours (evening portion)
  const today = getTodayDow();
  const todayH = hours[today];
  if (!todayH.is_closed && todayH.open && todayH.close) {
    const openMin = toMinutes(todayH.open);
    const closeMin = toMinutes(todayH.close);

    if (closeMin > openMin) {
      // Same-day close (e.g. 9AM-5PM): simple range
      if (currentMinutes >= openMin && currentMinutes < closeMin) return true;
    } else {
      // Midnight-crossing (e.g. 5PM-2AM): evening portion is after open
      if (currentMinutes >= openMin) return true;
    }
  }

  // Check yesterday's hours (overnight tail past midnight)
  const yesterday = getYesterdayDow();
  const yH = hours[yesterday];
  if (!yH.is_closed && yH.open && yH.close) {
    const openMin = toMinutes(yH.open);
    const closeMin = toMinutes(yH.close);

    // Only applies if yesterday's hours cross midnight
    if (closeMin <= openMin && currentMinutes < closeMin) return true;
  }

  return false;
}

/**
 * Returns minutes until the bar closes, or null if not currently open.
 * Handles both same-day close and midnight-crossing close.
 */
export function minutesToClose(hours: HoursConfig): number | null {
  const currentMinutes = (() => {
    const now = getNowEST();
    return now.getHours() * 60 + now.getMinutes();
  })();

  // Check today's evening portion
  const today = getTodayDow();
  const todayH = hours[today];
  if (!todayH.is_closed && todayH.open && todayH.close) {
    const openMin = toMinutes(todayH.open);
    const closeMin = toMinutes(todayH.close);

    if (closeMin > openMin) {
      if (currentMinutes >= openMin && currentMinutes < closeMin) {
        return closeMin - currentMinutes;
      }
    } else {
      // Midnight-crossing: evening portion, close is tomorrow
      if (currentMinutes >= openMin) {
        return (closeMin + 24 * 60) - currentMinutes;
      }
    }
  }

  // Check yesterday's overnight tail
  const yesterday = getYesterdayDow();
  const yH = hours[yesterday];
  if (!yH.is_closed && yH.open && yH.close) {
    const openMin = toMinutes(yH.open);
    const closeMin = toMinutes(yH.close);

    if (closeMin <= openMin && currentMinutes < closeMin) {
      return closeMin - currentMinutes;
    }
  }

  return null;
}

/**
 * Returns minutes until today's opening, or null if already open / closed today.
 * Used for the "Opening Soon" indicator.
 */
export function minutesToOpen(hours: HoursConfig): number | null {
  // If already open, not applicable
  if (isCurrentlyOpen(hours)) return null;

  const today = getTodayDow();
  const todayH = hours[today];
  if (todayH.is_closed || !todayH.open) return null;

  const currentMinutes = (() => {
    const now = getNowEST();
    return now.getHours() * 60 + now.getMinutes();
  })();

  const openMin = toMinutes(todayH.open);

  if (currentMinutes < openMin) {
    return openMin - currentMinutes;
  }

  return null;
}

export function getTodayHoursString(hours: HoursConfig): string {
  const today = getTodayDow();
  const todayHours = hours[today];

  if (todayHours.is_closed) return 'Closed today';
  if (!todayHours.open || !todayHours.close) return 'Closed today';

  return `${formatTime12(todayHours.open)} – ${formatTime12(todayHours.close)}`;
}

export function getDayLabel(day: DayOfWeek): string {
  return DAY_LABELS[day];
}

export { DAYS_ORDER, DAY_LABELS };
