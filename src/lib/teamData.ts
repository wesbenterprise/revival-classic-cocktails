// ============================================================
// TEAM DATA — Single source of truth for team page + admin
// TODO: Move to Supabase when ready
// ============================================================

export interface TeamMemberData {
  id: string;
  name: string;
  title: string;
  bio: string;
  photo_url: string | null;
  status: 'active' | 'alumni';
  sort_order: number;
}

export const TEAM_DATA: TeamMemberData[] = [
  // === ACTIVE ROSTER ===
  {
    id: '1', name: 'Alec', title: 'Bartender',
    bio: '',
    photo_url: '/images/team/alec.jpg', status: 'active', sort_order: 0,
  },
  {
    id: '2', name: 'Jordane', title: 'Bartender',
    bio: 'Brings innovative qualities to every cocktail. Specializes in spiced spirits and bold recipes. With her bubbly attitude, cocktails are only exceeded by conversation.',
    photo_url: '/images/team/jordane.jpg', status: 'active', sort_order: 1,
  },
  {
    id: '3', name: 'Katie', title: 'Bartender',
    bio: 'One of the longest-tenured members of the Revival family. Master of classics, lover of experimentation. Also skeet shoots.',
    photo_url: '/images/team/katie.jpg', status: 'active', sort_order: 2,
  },
  {
    id: '4', name: 'Bobby', title: 'Bartender',
    bio: '',
    photo_url: null, status: 'active', sort_order: 3,
  },
  {
    id: '5', name: 'Sass', title: 'Bartender',
    bio: '',
    photo_url: null, status: 'active', sort_order: 4,
  },
  {
    id: '6', name: 'Wilges', title: 'Operations',
    bio: '',
    photo_url: '/images/team/wilges.jpg', status: 'active', sort_order: 5,
  },
  {
    id: '7', name: 'Jules', title: 'Bar Back',
    bio: '',
    photo_url: null, status: 'active', sort_order: 6,
  },
  {
    id: '8', name: 'Job', title: 'Bar Back',
    bio: '',
    photo_url: null, status: 'active', sort_order: 7,
  },
  {
    id: '9', name: 'Ryan', title: 'Maintenance',
    bio: '',
    photo_url: '/images/team/ryan.jpg', status: 'active', sort_order: 8,
  },

  // === ALUMNI ===
  {
    id: '20', name: 'Jeannie', title: 'Founder & Master Mixologist',
    bio: '',
    photo_url: '/images/team/jeannie.jpg', status: 'alumni', sort_order: 0,
  },
  {
    id: '21', name: 'Tiffany', title: 'Bartender',
    bio: '',
    photo_url: null, status: 'alumni', sort_order: 1,
  },
  {
    id: '22', name: 'Blake', title: 'Bartender',
    bio: '',
    photo_url: null, status: 'alumni', sort_order: 2,
  },
];
