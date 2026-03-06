import { createServerClient } from './supabase';
import { HoursConfig, DayOfWeek } from '@/types/database';

// Server-side data fetching functions for Revival CMS tables.
// Used by Server Components and page-level data fetching.

export async function fetchTeamMembers() {
  const sb = createServerClient();
  const { data, error } = await sb
    .from('revival_team_members')
    .select('*')
    .order('sort_order');
  if (error) {
    console.error('Error fetching team members:', error);
    return [];
  }
  return data ?? [];
}

export async function fetchGalleryPhotos() {
  const sb = createServerClient();
  const { data, error } = await sb
    .from('revival_gallery_photos')
    .select('*')
    .order('sort_order');
  if (error) {
    console.error('Error fetching gallery photos:', error);
    return [];
  }
  return data ?? [];
}

export async function fetchMenuItems() {
  const sb = createServerClient();
  const { data, error } = await sb
    .from('revival_menu_items')
    .select('*')
    .eq('is_archived', false)
    .order('category')
    .order('sort_order');
  if (error) {
    console.error('Error fetching menu items:', error);
    return [];
  }
  return data ?? [];
}

export async function fetchSpecials() {
  const sb = createServerClient();
  const { data, error } = await sb
    .from('revival_specials')
    .select('*')
    .eq('is_active', true)
    .order('day');
  if (error) {
    console.error('Error fetching specials:', error);
    return [];
  }
  return data ?? [];
}

export async function fetchCopyBank() {
  const sb = createServerClient();
  const { data, error } = await sb
    .from('revival_copy_bank')
    .select('*')
    .order('category')
    .order('created_at');
  if (error) {
    console.error('Error fetching copy bank:', error);
    return [];
  }
  return data ?? [];
}

export async function fetchHours(): Promise<HoursConfig> {
  const sb = createServerClient();
  const { data, error } = await sb
    .from('revival_hours')
    .select('*');

  // Fallback to defaults if fetch fails
  const defaults: HoursConfig = {
    monday:    { open: '13:00', close: '00:00', is_closed: false },
    tuesday:   { open: '13:00', close: '02:00', is_closed: false },
    wednesday: { open: '13:00', close: '02:00', is_closed: false },
    thursday:  { open: '13:00', close: '02:00', is_closed: false },
    friday:    { open: '12:00', close: '02:00', is_closed: false },
    saturday:  { open: '12:00', close: '02:00', is_closed: false },
    sunday:    { open: '15:00', close: '00:00', is_closed: false },
  };

  if (error || !data || data.length === 0) {
    console.error('Error fetching hours, using defaults:', error);
    return defaults;
  }

  const config = { ...defaults };
  for (const row of data) {
    const day = row.day as DayOfWeek;
    config[day] = {
      open: row.open_time,
      close: row.close_time,
      is_closed: row.is_closed,
    };
  }
  return config;
}
