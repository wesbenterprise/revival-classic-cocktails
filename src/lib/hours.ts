import { DayOfWeek, HoursConfig } from '@/types/database';
import { formatTime12 } from '@/lib/utils';

// ============================================================
// Canonical hours of operation for Revival Classic Cocktails
// Single source of truth — imported by homepage, visit page, admin
// ============================================================

export const REVIVAL_HOURS: HoursConfig = {
  monday:    { open: '13:00', close: '00:00', is_closed: false },
  tuesday:   { open: '13:00', close: '02:00', is_closed: false },
  wednesday: { open: '13:00', close: '02:00', is_closed: false },
  thursday:  { open: '13:00', close: '02:00', is_closed: false },
  friday:    { open: '12:00', close: '02:00', is_closed: false },
  saturday:  { open: '12:00', close: '02:00', is_closed: false },
  sunday:    { open: '15:00', close: '00:00', is_closed: false },
};

const DAYS_JS_INDEX: DayOfWeek[] = [
  'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday',
];

/**
 * Get the current day of week in America/New_York timezone.
 */
function getNowET(): Date {
  return new Date(new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }));
}

function getDowFromDate(d: Date): DayOfWeek {
  return DAYS_JS_INDEX[d.getDay()];
}

/**
 * Determine whether Revival is currently open.
 *
 * Handles the "close after midnight" case: if a day closes at 02:00,
 * and the current time is e.g. 1:15 AM on Wednesday, we check
 * Tuesday's hours (the shift that started the previous calendar day).
 */
export function getRevivalStatus(hours: HoursConfig = REVIVAL_HOURS): {
  isOpen: boolean;
  todayHours: string;
} {
  const now = getNowET();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const calendarDay = getDowFromDate(now);

  // First, check if we're in an overnight window from the previous day's shift.
  // If it's before 6 AM, the previous day's close might still apply.
  if (currentMinutes < 6 * 60) {
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const prevDay = getDowFromDate(yesterday);
    const prevHours = hours[prevDay];

    if (!prevHours.is_closed && prevHours.open && prevHours.close) {
      const [closeH, closeM] = prevHours.close.split(':').map(Number);
      const closeMinutes = closeH * 60 + closeM;
      const [openH] = prevHours.open.split(':').map(Number);

      // Close time is after midnight (close < open means wraps past midnight)
      if (closeMinutes <= openH * 60 && closeMinutes > 0 && currentMinutes < closeMinutes) {
        // We're still in yesterday's shift
        const todayEntry = hours[calendarDay];
        const todayStr = todayEntry.is_closed || !todayEntry.open || !todayEntry.close
          ? 'Closed today'
          : `${formatTime12(todayEntry.open)} – ${formatTime12(todayEntry.close)}`;
        return { isOpen: true, todayHours: todayStr };
      }
    }
  }

  // Normal check for today's hours
  const todayEntry = hours[calendarDay];

  if (todayEntry.is_closed || !todayEntry.open || !todayEntry.close) {
    return { isOpen: false, todayHours: 'Closed today' };
  }

  const [openH, openM] = todayEntry.open.split(':').map(Number);
  const [closeH, closeM] = todayEntry.close.split(':').map(Number);
  const openMinutes = openH * 60 + openM;
  let closeMinutes = closeH * 60 + closeM;

  // If close is midnight exactly (00:00), treat as end of day (24:00)
  if (closeMinutes === 0) {
    closeMinutes = 24 * 60;
  }

  // If close < open (wraps past midnight), extend close into next day
  // For display purposes today, we show the literal times
  const isOpen =
    closeMinutes > openMinutes
      ? currentMinutes >= openMinutes && currentMinutes < closeMinutes
      : currentMinutes >= openMinutes; // Past open, goes past midnight — open until close tomorrow

  const todayStr = `${formatTime12(todayEntry.open)} – ${formatTime12(todayEntry.close)}`;

  return { isOpen, todayHours: todayStr };
}
