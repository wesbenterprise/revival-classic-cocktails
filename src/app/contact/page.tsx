'use client';

import { Suspense, useState, FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import { Send, CheckCircle, AlertCircle, Upload, X, Phone } from 'lucide-react';

// ============================================================
// Types
// ============================================================
type ContactCategory =
  | 'general'
  | 'private_events'
  | 'catering'
  | 'press'
  | 'employment'
  | 'vendor'
  | 'feedback';

interface FormData {
  name: string;
  email: string;
  phone: string;
  category: ContactCategory;
  message: string;
  // Private Events / Catering fields
  event_date: string;
  guest_count: string;
  event_type: string;
  budget_range: string;
  // Employment
  resume: File | null;
}

const CATEGORIES: { value: ContactCategory; label: string; description: string }[] = [
  { value: 'general', label: 'General Inquiry', description: 'Questions about Revival' },
  { value: 'private_events', label: 'Private Events', description: 'Book the bar for your event' },
  { value: 'catering', label: 'Catering', description: 'Bring the Revival experience to your location' },
  { value: 'press', label: 'Press & Media', description: 'Interview requests and features' },
  { value: 'employment', label: 'Employment', description: 'Join the Revival team' },
  { value: 'vendor', label: 'Vendor / Sales', description: 'Partnerships and reps' },
  { value: 'feedback', label: 'Feedback', description: 'Tell us about your experience' },
];

const EVENT_TYPES = [
  'Birthday',
  'Corporate Event',
  'Wedding / Rehearsal',
  'Anniversary',
  'Holiday Party',
  'Fundraiser',
  'Other',
];

const BUDGET_RANGES = [
  'Under $500',
  '$500 – $1,000',
  '$1,000 – $2,500',
  '$2,500 – $5,000',
  '$5,000+',
  'Not sure yet',
];

const GUEST_COUNTS = [
  '1 – 10',
  '11 – 20',
  '21 – 30',
  '31 – 40',
  '40+',
];

// ============================================================

const VALID_CATEGORIES: ContactCategory[] = ['general', 'private_events', 'catering', 'press', 'employment', 'vendor', 'feedback'];

export default function ContactPage() {
  return (
    <Suspense>
      <ContactForm />
    </Suspense>
  );
}

function ContactForm() {
  const searchParams = useSearchParams();
  const paramCategory = searchParams.get('category');
  const initialCategory: ContactCategory =
    paramCategory && VALID_CATEGORIES.includes(paramCategory as ContactCategory)
      ? (paramCategory as ContactCategory)
      : 'general';

  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    category: initialCategory,
    message: '',
    event_date: '',
    guest_count: '',
    event_type: '',
    budget_range: '',
    resume: null,
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [resumeName, setResumeName] = useState<string>('');

  const isEventCategory = form.category === 'private_events' || form.category === 'catering';
  const isEmployment = form.category === 'employment';

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm((prev) => ({ ...prev, resume: file }));
    setResumeName(file?.name || '');
  };

  const clearFile = () => {
    setForm((prev) => ({ ...prev, resume: null }));
    setResumeName('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    // TODO: Wire to /api/submissions endpoint
    // For now, simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setStatus('success');
  };

  // Success state
  if (status === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center animate-fade-in">
          <CheckCircle size={48} className="mx-auto text-revival-open mb-6" />
          <h1 className="font-display text-3xl text-revival-cream mb-3">
            Message Received
          </h1>
          <p className="text-revival-cream-muted max-w-md mx-auto">
            Thanks for reaching out to Revival. We'll get back to you soon.
          </p>
          <button
            onClick={() => {
              setStatus('idle');
              setForm({
                name: '', email: '', phone: '', category: 'general', message: '',
                event_date: '', guest_count: '', event_type: '', budget_range: '', resume: null,
              });
              setResumeName('');
            }}
            className="mt-8 text-revival-amber text-sm hover:text-revival-amber-light transition-colors"
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-20 pb-10 px-6 text-center">
        <h1 className="font-display text-4xl md:text-6xl text-revival-cream">Contact</h1>
        <p className="mt-3 text-revival-cream-dim text-sm tracking-wide">
          Get in touch — we'd love to hear from you.
        </p>
        <a
          href="tel:+18636066090"
          className="inline-flex items-center gap-2 mt-4 text-revival-cream-muted text-sm hover:text-revival-amber transition-colors"
        >
          <Phone size={14} />
          (863) 606-6090
        </a>
      </section>

      {/* Form */}
      <section className="max-w-xl mx-auto px-6 pb-24">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Category selector */}
          <div>
            <label className="block text-revival-amber text-xs tracking-[0.2em] uppercase mb-3">
              What can we help with?
            </label>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, category: cat.value }))}
                  className={`
                    text-left px-4 py-3 rounded-lg border transition-all text-sm
                    ${form.category === cat.value
                      ? 'border-revival-amber/50 bg-revival-amber/10 text-revival-cream'
                      : 'border-revival-border/50 bg-revival-dark text-revival-cream-muted hover:border-revival-border hover:text-revival-cream'
                    }
                  `}
                >
                  <span className="block font-medium">{cat.label}</span>
                  <span className="block text-xs text-revival-cream-dim mt-0.5">{cat.description}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Name + Email row */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-revival-cream-muted text-xs tracking-wide uppercase mb-2">
                Name <span className="text-revival-amber">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                className="
                  w-full px-4 py-3 rounded-lg bg-revival-dark border border-revival-border/50
                  text-revival-cream text-sm placeholder:text-revival-cream-dim
                  focus:border-revival-amber focus:outline-none transition-colors
                "
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-revival-cream-muted text-xs tracking-wide uppercase mb-2">
                Email <span className="text-revival-amber">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className="
                  w-full px-4 py-3 rounded-lg bg-revival-dark border border-revival-border/50
                  text-revival-cream text-sm placeholder:text-revival-cream-dim
                  focus:border-revival-amber focus:outline-none transition-colors
                "
                placeholder="you@email.com"
              />
            </div>
          </div>

          {/* Phone (optional) */}
          <div>
            <label htmlFor="phone" className="block text-revival-cream-muted text-xs tracking-wide uppercase mb-2">
              Phone <span className="text-revival-cream-dim">(optional)</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              className="
                w-full px-4 py-3 rounded-lg bg-revival-dark border border-revival-border/50
                text-revival-cream text-sm placeholder:text-revival-cream-dim
                focus:border-revival-amber focus:outline-none transition-colors
              "
              placeholder="(555) 123-4567"
            />
          </div>

          {/* ============================
              PRIVATE EVENTS / CATERING FIELDS
              ============================ */}
          {isEventCategory && (
            <div className="space-y-4 p-5 rounded-lg border border-revival-amber/20 bg-revival-amber/5 animate-fade-in">
              <p className="text-revival-amber text-xs tracking-[0.2em] uppercase">
                {form.category === 'private_events' ? 'Event Details' : 'Catering Details'}
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {/* Event type */}
                <div>
                  <label htmlFor="event_type" className="block text-revival-cream-muted text-xs tracking-wide uppercase mb-2">
                    Type of Event
                  </label>
                  <select
                    id="event_type"
                    name="event_type"
                    value={form.event_type}
                    onChange={handleChange}
                    className="
                      w-full px-4 py-3 rounded-lg bg-revival-dark border border-revival-border/50
                      text-revival-cream text-sm appearance-none cursor-pointer
                      focus:border-revival-amber focus:outline-none transition-colors
                    "
                  >
                    <option value="">Select...</option>
                    {EVENT_TYPES.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Preferred date */}
                <div>
                  <label htmlFor="event_date" className="block text-revival-cream-muted text-xs tracking-wide uppercase mb-2">
                    Preferred Date
                  </label>
                  <input
                    id="event_date"
                    name="event_date"
                    type="date"
                    value={form.event_date}
                    onChange={handleChange}
                    className="
                      w-full px-4 py-3 rounded-lg bg-revival-dark border border-revival-border/50
                      text-revival-cream text-sm
                      focus:border-revival-amber focus:outline-none transition-colors
                    "
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {/* Guest count */}
                <div>
                  <label htmlFor="guest_count" className="block text-revival-cream-muted text-xs tracking-wide uppercase mb-2">
                    Estimated Guests
                  </label>
                  <select
                    id="guest_count"
                    name="guest_count"
                    value={form.guest_count}
                    onChange={handleChange}
                    className="
                      w-full px-4 py-3 rounded-lg bg-revival-dark border border-revival-border/50
                      text-revival-cream text-sm appearance-none cursor-pointer
                      focus:border-revival-amber focus:outline-none transition-colors
                    "
                  >
                    <option value="">Select...</option>
                    {GUEST_COUNTS.map((count) => (
                      <option key={count} value={count}>{count}</option>
                    ))}
                  </select>
                </div>

                {/* Budget */}
                <div>
                  <label htmlFor="budget_range" className="block text-revival-cream-muted text-xs tracking-wide uppercase mb-2">
                    Budget Range
                  </label>
                  <select
                    id="budget_range"
                    name="budget_range"
                    value={form.budget_range}
                    onChange={handleChange}
                    className="
                      w-full px-4 py-3 rounded-lg bg-revival-dark border border-revival-border/50
                      text-revival-cream text-sm appearance-none cursor-pointer
                      focus:border-revival-amber focus:outline-none transition-colors
                    "
                  >
                    <option value="">Select...</option>
                    {BUDGET_RANGES.map((range) => (
                      <option key={range} value={range}>{range}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* ============================
              EMPLOYMENT — RESUME UPLOAD
              ============================ */}
          {isEmployment && (
            <div className="space-y-3 p-5 rounded-lg border border-revival-amber/20 bg-revival-amber/5 animate-fade-in">
              <p className="text-revival-amber text-xs tracking-[0.2em] uppercase">
                Resume
              </p>
              {resumeName ? (
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-revival-dark border border-revival-border/50">
                  <Upload size={16} className="text-revival-amber flex-none" />
                  <span className="text-revival-cream text-sm truncate flex-1">{resumeName}</span>
                  <button
                    type="button"
                    onClick={clearFile}
                    className="text-revival-cream-dim hover:text-revival-cream transition-colors flex-none"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <label className="
                  flex flex-col items-center gap-2 px-4 py-6 rounded-lg
                  border border-dashed border-revival-border/50 bg-revival-dark
                  cursor-pointer hover:border-revival-amber/50 transition-colors
                ">
                  <Upload size={20} className="text-revival-cream-dim" />
                  <span className="text-revival-cream-muted text-sm">
                    Upload your resume
                  </span>
                  <span className="text-revival-cream-dim text-xs">
                    PDF, DOC, or DOCX · Max 5 MB
                  </span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          )}

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-revival-cream-muted text-xs tracking-wide uppercase mb-2">
              Message <span className="text-revival-amber">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={form.message}
              onChange={handleChange}
              className="
                w-full px-4 py-3 rounded-lg bg-revival-dark border border-revival-border/50
                text-revival-cream text-sm placeholder:text-revival-cream-dim resize-none
                focus:border-revival-amber focus:outline-none transition-colors
              "
              placeholder={
                isEventCategory
                  ? 'Tell us more about what you have in mind...'
                  : isEmployment
                    ? 'Tell us about yourself and what position interests you...'
                    : 'Your message...'
              }
            />
          </div>

          {/* Error state */}
          {status === 'error' && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              <AlertCircle size={16} className="flex-none" />
              Something went wrong. Please try again or email us directly.
            </div>
          )}

          {/* Turnstile placeholder */}
          <div className="text-revival-cream-dim text-xs">
            {/* Cloudflare Turnstile widget will be rendered here */}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="
              w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg
              bg-revival-amber text-revival-black font-medium text-sm tracking-wide
              hover:bg-revival-amber-light transition-colors
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            {status === 'submitting' ? (
              <>
                <span className="w-4 h-4 border-2 border-revival-black/30 border-t-revival-black rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send size={16} />
                Send Message
              </>
            )}
          </button>

          {/* Privacy note */}
          <p className="text-center text-revival-cream-dim text-xs">
            Your information is only used to respond to your inquiry.
          </p>
        </form>
      </section>
    </div>
  );
}
