/**
 * Single source of truth for static site-wide settings.
 * Hours are now fetched from Supabase (revival_hours table).
 * These defaults are used as fallbacks when the DB is unreachable.
 */
import { HoursConfig } from '@/types/database';

export const SITE_HOURS_FALLBACK: HoursConfig = {
  monday:    { open: '13:00', close: '00:00', is_closed: false },
  tuesday:   { open: '13:00', close: '02:00', is_closed: false },
  wednesday: { open: '13:00', close: '02:00', is_closed: false },
  thursday:  { open: '13:00', close: '02:00', is_closed: false },
  friday:    { open: '12:00', close: '02:00', is_closed: false },
  saturday:  { open: '12:00', close: '02:00', is_closed: false },
  sunday:    { open: '15:00', close: '00:00', is_closed: false },
};

// Keep SITE_HOURS as an alias for backward compatibility
export const SITE_HOURS = SITE_HOURS_FALLBACK;

export const SITE_ADDRESS = {
  street: '119 S Kentucky Ave',
  city: 'Lakeland',
  state: 'FL',
  zip: '33801',
  phone: '(863) 606-6090',
  google_maps_url: 'https://maps.google.com/?q=119+S+Kentucky+Ave+Lakeland+FL+33801',
};

export const SITE_SOCIAL = {
  instagram: 'https://instagram.com/revivallakeland',
};
