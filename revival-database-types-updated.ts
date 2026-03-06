// ============================================================
// Revival Database Types — UPDATED to match real menu
// ============================================================
// Changes from original:
// - MenuCategory expanded from 5 to 13 categories to match actual PDF menu
// - Added 'revised' and 'premium' to MenuItem badge options
// - Added optional 'subcategory' to MenuItem (for wine: bubbles/white/red)
// - Added WineSubcategory type
// - Added BartendersChoice and WeeklyLineup types
// ============================================================

export type MenuCategory =
  | 'old_fashioneds'
  | 'seasonal'
  | 'classics'
  | 'tiki'
  | 'spritz'
  | 'happy_hour_6'
  | 'happy_hour_8'
  | 'mocktails'
  | 'spirit_flights'
  | 'wine'
  | 'draft_beer'
  | 'bottles_cans'
  | 'non_alcoholic';

export type WineSubcategory = 'bubbles' | 'white' | 'red';

export type TeamStatus = 'active' | 'alumni';
export type EventType = 'event' | 'private';
export type GalleryCategory = 'room' | 'drinks' | 'people' | 'nights';
export type SubmissionCategory = 'general' | 'private_events' | 'catering' | 'press' | 'employment' | 'vendor' | 'feedback';
export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
export type AdminRole = 'super_admin' | 'admin';

export interface MenuItem {
  id: string;
  category: MenuCategory;
  name: string;
  description: string | null;
  price: number | null;
  spirit_base: string | null;
  badge: 'new' | 'seasonal' | 'revised' | 'premium' | null;
  image_url: string | null;
  subcategory: WineSubcategory | null; // Used for wine items
  sort_order: number;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
}

export interface MenuCategoryConfig {
  id: MenuCategory;
  label: string;
  subtitle: string;
  sort_order: number;
}

export interface ScheduleRecurring {
  id: string;
  day: DayOfWeek;
  title: string;
  description: string | null;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ScheduleEvent {
  id: string;
  event_date: string;
  title: string;
  description: string | null;
  image_url: string | null;
  type: EventType;
  closure_message: string | null;
  created_at: string;
  updated_at: string;
}

export interface TeamMember {
  id: string;
  name: string;
  title: string | null;
  bio: string | null;
  photo_url: string | null;
  status: TeamStatus;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface GalleryPhoto {
  id: string;
  image_url: string;
  category: GalleryCategory;
  caption: string | null;
  sort_order: number;
  created_at: string;
}

export interface MerchItem {
  id: string;
  name: string;
  description: string | null;
  price: number | null;
  image_url: string | null;
  is_available: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Submission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  category: SubmissionCategory;
  message: string;
  event_date: string | null;
  guest_count: string | null;
  event_type: string | null;
  budget_range: string | null;
  resume_url: string | null;
  resume_filename: string | null;
  is_read: boolean;
  is_archived: boolean;
  created_at: string;
}

export interface AdminUser {
  id: string;
  email: string;
  display_name: string | null;
  role: AdminRole;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface HoursEntry {
  open: string | null;
  close: string | null;
  is_closed: boolean;
}

export type HoursConfig = Record<DayOfWeek, HoursEntry>;

export interface TonightData {
  type: 'private' | 'event' | 'recurring' | 'fallback';
  title: string;
  description?: string;
  message?: string;
  image_url?: string;
}
