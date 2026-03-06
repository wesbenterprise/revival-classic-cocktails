/**
 * Single source of truth for site-wide settings.
 * TODO: Replace with Supabase site_settings query.
 */
import { HoursConfig } from '@/types/database';

export const SITE_HOURS: HoursConfig = {
  sunday:    { open: null,    close: null,    is_closed: true },
  monday:    { open: null,    close: null,    is_closed: true },
  tuesday:   { open: '17:00', close: '00:00', is_closed: false },
  wednesday: { open: '17:00', close: '00:00', is_closed: false },
  thursday:  { open: '17:00', close: '00:00', is_closed: false },
  friday:    { open: '17:00', close: '02:00', is_closed: false },
  saturday:  { open: '17:00', close: '02:00', is_closed: false },
};

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
