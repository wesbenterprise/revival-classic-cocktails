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

export function getTodayDow(): DayOfWeek {
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }));
  return DAYS_ORDER[now.getDay()];
}

export function formatTime12(time24: string): string {
  const [h, m] = time24.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  return m === 0 ? `${hour} ${ampm}` : `${hour}:${m.toString().padStart(2, '0')} ${ampm}`;
}

export function isCurrentlyOpen(hours: HoursConfig): boolean {
  const today = getTodayDow();
  const todayHours = hours[today];

  if (todayHours.is_closed || !todayHours.open || !todayHours.close) return false;

  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }));
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const [openH, openM] = todayHours.open.split(':').map(Number);
  const [closeH, closeM] = todayHours.close.split(':').map(Number);

  const openMinutes = openH * 60 + openM;
  let closeMinutes = closeH * 60 + closeM;

  // Handle closing after midnight (e.g., close at 01:00 = 25:00 effective)
  if (closeMinutes <= openMinutes) {
    closeMinutes += 24 * 60;
    // If we're past midnight but before close, add 24h to current time too
    if (currentMinutes < openMinutes) {
      return currentMinutes + 24 * 60 < closeMinutes;
    }
  }

  return currentMinutes >= openMinutes && currentMinutes < closeMinutes;
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
