'use client';

import { useState } from 'react';
import { SITE_HOURS, SITE_ADDRESS, SITE_SOCIAL } from '@/lib/siteConfig';
import { DayOfWeek, HoursEntry } from '@/types/database';
import { DAY_LABELS } from '@/lib/utils';

const dayOrder: DayOfWeek[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

export default function AdminSettings() {
  const [saved, setSaved] = useState(false);

  const [hours, setHours] = useState<Record<DayOfWeek, HoursEntry>>(SITE_HOURS);

  const [address, setAddress] = useState(SITE_ADDRESS);

  const [social, setSocial] = useState(SITE_SOCIAL);
  const [giftCardUrl, setGiftCardUrl] = useState('');
  const [announcement, setAnnouncement] = useState({ text: '', is_active: false });
  const [phone, setPhone] = useState('');

  const updateHours = (day: DayOfWeek, field: keyof HoursEntry, value: string | boolean) => {
    setHours((prev) => ({ ...prev, [day]: { ...prev[day], [field]: value } }));
  };

  const handleSave = () => {
    // In production: update Supabase site_settings
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-4 lg:p-8 max-w-3xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Settings</h1>
          <p className="text-sm text-[#888] mt-1">Global site configuration.</p>
        </div>
        <button
          onClick={handleSave}
          className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
            saved ? 'bg-[#4ADE80] text-[#0A0A0A]' : 'bg-[#C8A050] text-[#0A0A0A] hover:bg-[#D4B068]'
          }`}
        >
          {saved ? '✓ Saved' : 'Save Changes'}
        </button>
      </div>

      {/* Announcement Banner */}
      <section className="bg-[#1A1A1A] border border-[#222] rounded-xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-white uppercase tracking-wider">Announcement Banner</h2>
          <button
            onClick={() => setAnnouncement({ ...announcement, is_active: !announcement.is_active })}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${announcement.is_active ? 'bg-[#C8A050]' : 'bg-[#333]'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${announcement.is_active ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
        <input
          type="text"
          value={announcement.text}
          onChange={(e) => setAnnouncement({ ...announcement, text: e.target.value })}
          className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#C8A050]"
          placeholder="e.g., Closed for maintenance Jan 15-16. See you on the 17th!"
        />
        <p className="text-xs text-[#555]">Appears at the top of the homepage when active.</p>
      </section>

      {/* Hours */}
      <section className="bg-[#1A1A1A] border border-[#222] rounded-xl p-5 space-y-4">
        <h2 className="text-sm font-medium text-white uppercase tracking-wider">Hours of Operation</h2>
        <div className="space-y-2">
          {dayOrder.map((day) => (
            <div key={day} className="flex items-center gap-3">
              <span className="w-20 text-sm text-[#888] shrink-0">{DAY_LABELS[day].slice(0, 3)}</span>
              <button
                onClick={() => updateHours(day, 'is_closed', !hours[day].is_closed)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors shrink-0 ${!hours[day].is_closed ? 'bg-[#4ADE80]' : 'bg-[#333]'}`}
              >
                <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${!hours[day].is_closed ? 'translate-x-5' : 'translate-x-1'}`} />
              </button>
              {hours[day].is_closed ? (
                <span className="text-sm text-[#555]">Closed</span>
              ) : (
                <div className="flex items-center gap-2 flex-1">
                  <input
                    type="time"
                    value={hours[day].open ?? ''}
                    onChange={(e) => updateHours(day, 'open', e.target.value)}
                    className="bg-[#111] border border-[#333] rounded-lg px-2 py-1.5 text-white text-sm focus:outline-none focus:border-[#C8A050] [color-scheme:dark] w-28"
                  />
                  <span className="text-[#555] text-sm">to</span>
                  <input
                    type="time"
                    value={hours[day].close ?? ''}
                    onChange={(e) => updateHours(day, 'close', e.target.value)}
                    className="bg-[#111] border border-[#333] rounded-lg px-2 py-1.5 text-white text-sm focus:outline-none focus:border-[#C8A050] [color-scheme:dark] w-28"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Address & Contact */}
      <section className="bg-[#1A1A1A] border border-[#222] rounded-xl p-5 space-y-4">
        <h2 className="text-sm font-medium text-white uppercase tracking-wider">Address & Contact</h2>
        <div>
          <label className="block text-xs text-[#888] mb-1.5">Street</label>
          <input type="text" value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })}
            className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#C8A050]" />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs text-[#888] mb-1.5">City</label>
            <input type="text" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })}
              className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#C8A050]" />
          </div>
          <div>
            <label className="block text-xs text-[#888] mb-1.5">State</label>
            <input type="text" value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })}
              className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#C8A050]" />
          </div>
          <div>
            <label className="block text-xs text-[#888] mb-1.5">ZIP</label>
            <input type="text" value={address.zip} onChange={(e) => setAddress({ ...address, zip: e.target.value })}
              className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#C8A050]" />
          </div>
        </div>
        <div>
          <label className="block text-xs text-[#888] mb-1.5">Phone</label>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#C8A050]" placeholder="(863) 555-0000" />
        </div>
        <div>
          <label className="block text-xs text-[#888] mb-1.5">Google Maps URL</label>
          <input type="url" value={address.google_maps_url} onChange={(e) => setAddress({ ...address, google_maps_url: e.target.value })}
            className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#C8A050]" />
        </div>
      </section>

      {/* Social & Links */}
      <section className="bg-[#1A1A1A] border border-[#222] rounded-xl p-5 space-y-4">
        <h2 className="text-sm font-medium text-white uppercase tracking-wider">Social & Links</h2>
        <div>
          <label className="block text-xs text-[#888] mb-1.5">Instagram URL</label>
          <input type="url" value={social.instagram} onChange={(e) => setSocial({ ...social, instagram: e.target.value })}
            className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#C8A050]" />
        </div>
        <div>
          <label className="block text-xs text-[#888] mb-1.5">Gift Card URL (Toast)</label>
          <input type="url" value={giftCardUrl} onChange={(e) => setGiftCardUrl(e.target.value)}
            className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#C8A050]" placeholder="https://www.toasttab.com/revival/giftcards" />
        </div>
      </section>

      {/* Bottom save */}
      <div className="pb-8">
        <button
          onClick={handleSave}
          className={`w-full px-5 py-3 rounded-xl text-sm font-medium transition-all ${
            saved ? 'bg-[#4ADE80] text-[#0A0A0A]' : 'bg-[#C8A050] text-[#0A0A0A] hover:bg-[#D4B068]'
          }`}
        >
          {saved ? '✓ Changes Saved' : 'Save All Changes'}
        </button>
      </div>
    </div>
  );
}
