'use client';

import { useState } from 'react';

type MenuCategory = 'house' | 'classics' | 'spirit_free' | 'beer_wine' | 'rotating';

interface MenuItem {
  id: string;
  category: MenuCategory;
  name: string;
  description: string;
  price: number;
  spirit_base: string;
  badge: 'new' | 'seasonal' | null;
  image_url: string;
  sort_order: number;
  is_archived: boolean;
}

const categoryLabels: Record<MenuCategory, string> = {
  house: 'House Originals',
  classics: 'Classics',
  spirit_free: 'Spirit Free',
  beer_wine: 'Beer & Wine',
  rotating: 'Rotating',
};

// Demo data
const demoItems: MenuItem[] = [
  { id: '1', category: 'house', name: 'The Gatsby', description: 'Gin, lavender, elderflower, champagne float', price: 16, spirit_base: 'Gin', badge: null, image_url: '', sort_order: 0, is_archived: false },
  { id: '2', category: 'house', name: 'Smoke & Honey', description: 'Mezcal, honey, lemon, smoked rosemary', price: 17, spirit_base: 'Mezcal', badge: 'new', image_url: '', sort_order: 1, is_archived: false },
  { id: '3', category: 'house', name: 'The Hemingway', description: 'Rum, grapefruit, maraschino, lime', price: 15, spirit_base: 'Rum', badge: null, image_url: '', sort_order: 2, is_archived: false },
  { id: '4', category: 'house', name: 'Midnight Garden', description: 'Vodka, blackberry, basil, lemon, activated charcoal', price: 16, spirit_base: 'Vodka', badge: null, image_url: '', sort_order: 3, is_archived: false },
  { id: '5', category: 'house', name: 'The Prohibition', description: 'Bourbon, walnut bitters, demerara, orange', price: 17, spirit_base: 'Bourbon', badge: null, image_url: '', sort_order: 4, is_archived: false },
  { id: '6', category: 'classics', name: 'Old Fashioned', description: 'Bourbon, Angostura, demerara, orange peel', price: 14, spirit_base: 'Bourbon', badge: null, image_url: '', sort_order: 0, is_archived: false },
  { id: '7', category: 'classics', name: 'Manhattan', description: 'Rye, sweet vermouth, Angostura, Luxardo cherry', price: 15, spirit_base: 'Rye', badge: null, image_url: '', sort_order: 1, is_archived: false },
  { id: '8', category: 'classics', name: 'Negroni', description: 'Gin, Campari, sweet vermouth', price: 14, spirit_base: 'Gin', badge: null, image_url: '', sort_order: 2, is_archived: false },
  { id: '9', category: 'classics', name: 'Daiquiri', description: 'White rum, lime, simple syrup', price: 13, spirit_base: 'Rum', badge: null, image_url: '', sort_order: 3, is_archived: false },
  { id: '10', category: 'spirit_free', name: 'Garden Party', description: 'Cucumber, elderflower, tonic, lime', price: 10, spirit_base: '', badge: null, image_url: '', sort_order: 0, is_archived: false },
  { id: '11', category: 'spirit_free', name: 'Sunset Boulevard', description: 'Passionfruit, ginger, soda, citrus', price: 10, spirit_base: '', badge: 'new', image_url: '', sort_order: 1, is_archived: false },
  { id: '12', category: 'beer_wine', name: 'Cigar City Jai Alai', description: 'IPA · Tampa, FL', price: 8, spirit_base: '', badge: null, image_url: '', sort_order: 0, is_archived: false },
  { id: '13', category: 'rotating', name: 'Winter Solstice', description: 'Bourbon, cinnamon, apple cider, star anise', price: 16, spirit_base: 'Bourbon', badge: 'seasonal', image_url: '', sort_order: 0, is_archived: false },
];

const emptyItem: Omit<MenuItem, 'id'> = {
  category: 'house',
  name: '',
  description: '',
  price: 0,
  spirit_base: '',
  badge: null,
  image_url: '',
  sort_order: 0,
  is_archived: false,
};

export default function AdminMenu() {
  const [items, setItems] = useState<MenuItem[]>(demoItems);
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('house');
  const [showArchived, setShowArchived] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Omit<MenuItem, 'id'>>(emptyItem);

  const filteredItems = items.filter(
    (item) => item.category === activeCategory && item.is_archived === showArchived
  ).sort((a, b) => a.sort_order - b.sort_order);

  const categoryCount = (cat: MenuCategory) =>
    items.filter((i) => i.category === cat && !i.is_archived).length;

  const openCreate = () => {
    setFormData({ ...emptyItem, category: activeCategory });
    setEditingItem(null);
    setIsCreating(true);
  };

  const openEdit = (item: MenuItem) => {
    setFormData({ ...item });
    setEditingItem(item);
    setIsCreating(true);
  };

  const saveItem = () => {
    if (!formData.name.trim()) return;
    if (editingItem) {
      setItems((prev) => prev.map((i) => (i.id === editingItem.id ? { ...i, ...formData } : i)));
    } else {
      const newItem: MenuItem = {
        ...formData,
        id: Date.now().toString(),
        sort_order: filteredItems.length,
      };
      setItems((prev) => [...prev, newItem]);
    }
    setIsCreating(false);
    setEditingItem(null);
  };

  const toggleArchive = (id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, is_archived: !i.is_archived } : i)));
  };

  const deleteItem = (id: string) => {
    if (confirm('Delete this item permanently?')) {
      setItems((prev) => prev.filter((i) => i.id !== id));
    }
  };

  const moveItem = (id: string, direction: 'up' | 'down') => {
    const idx = filteredItems.findIndex((i) => i.id === id);
    if ((direction === 'up' && idx === 0) || (direction === 'down' && idx === filteredItems.length - 1)) return;
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    const a = filteredItems[idx];
    const b = filteredItems[swapIdx];
    setItems((prev) =>
      prev.map((i) => {
        if (i.id === a.id) return { ...i, sort_order: b.sort_order };
        if (i.id === b.id) return { ...i, sort_order: a.sort_order };
        return i;
      })
    );
  };

  return (
    <div className="p-4 lg:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Menu</h1>
          <p className="text-sm text-[#888] mt-1">
            {items.filter((i) => !i.is_archived).length} active items · {items.filter((i) => i.is_archived).length} archived
          </p>
        </div>
        <button
          onClick={openCreate}
          className="bg-[#C8A050] text-[#0A0A0A] px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#D4B068] transition-colors"
        >
          + Add Item
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-1 overflow-x-auto pb-2 mb-4 scrollbar-hide">
        {(Object.keys(categoryLabels) as MenuCategory[]).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`shrink-0 px-3 py-2 rounded-lg text-sm transition-colors ${
              activeCategory === cat
                ? 'bg-[#C8A050]/15 text-[#C8A050] font-medium'
                : 'text-[#888] hover:text-white hover:bg-[#1A1A1A]'
            }`}
          >
            {categoryLabels[cat]}
            <span className="ml-1.5 text-xs opacity-60">{categoryCount(cat)}</span>
          </button>
        ))}
      </div>

      {/* Active/Archived Toggle */}
      <div className="flex gap-4 mb-4 text-sm">
        <button
          onClick={() => setShowArchived(false)}
          className={showArchived ? 'text-[#666]' : 'text-white font-medium'}
        >
          Active
        </button>
        <button
          onClick={() => setShowArchived(true)}
          className={showArchived ? 'text-white font-medium' : 'text-[#666]'}
        >
          Archived
        </button>
      </div>

      {/* Items List */}
      <div className="space-y-2">
        {filteredItems.length === 0 && (
          <div className="text-center py-12 text-[#555]">
            <p className="text-sm">{showArchived ? 'No archived items' : 'No items in this category'}</p>
          </div>
        )}
        {filteredItems.map((item, idx) => (
          <div
            key={item.id}
            className="bg-[#1A1A1A] border border-[#222] rounded-xl p-4 flex items-start gap-3 group"
          >
            {/* Reorder buttons */}
            <div className="flex flex-col gap-0.5 pt-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => moveItem(item.id, 'up')}
                disabled={idx === 0}
                className="text-[#555] hover:text-white disabled:opacity-20 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                </svg>
              </button>
              <button
                onClick={() => moveItem(item.id, 'down')}
                disabled={idx === filteredItems.length - 1}
                className="text-[#555] hover:text-white disabled:opacity-20 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
            </div>

            {/* Item content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-white font-medium">{item.name}</span>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded uppercase tracking-wider font-bold ${
                    item.badge === 'new' ? 'bg-[#4ADE80]/15 text-[#4ADE80]' : 'bg-[#C8A050]/15 text-[#C8A050]'
                  }`}>
                    {item.badge}
                  </span>
                )}
                {item.is_archived && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#333] text-[#888] uppercase tracking-wider">
                    Archived
                  </span>
                )}
              </div>
              <p className="text-sm text-[#888] mt-0.5 truncate">{item.description}</p>
              <div className="flex items-center gap-3 mt-1.5 text-xs text-[#555]">
                <span className="text-[#C8A050] font-medium">${item.price}</span>
                {item.spirit_base && <span>{item.spirit_base}</span>}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => openEdit(item)}
                className="p-2 text-[#666] hover:text-white rounded-lg hover:bg-[#222] transition-colors"
                title="Edit"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
              </button>
              <button
                onClick={() => toggleArchive(item.id)}
                className="p-2 text-[#666] hover:text-[#C8A050] rounded-lg hover:bg-[#222] transition-colors"
                title={item.is_archived ? 'Restore' : 'Archive'}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>
              </button>
              {item.is_archived && (
                <button
                  onClick={() => deleteItem(item.id)}
                  className="p-2 text-[#666] hover:text-red-400 rounded-lg hover:bg-[#222] transition-colors"
                  title="Delete permanently"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {isCreating && (
        <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setIsCreating(false)} />
          <div className="relative w-full max-w-lg bg-[#1A1A1A] border border-[#333] rounded-t-2xl lg:rounded-2xl max-h-[85vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#1A1A1A] px-5 py-4 border-b border-[#222] flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">
                {editingItem ? 'Edit Item' : 'New Menu Item'}
              </h2>
              <button onClick={() => setIsCreating(false)} className="p-1 text-[#666] hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-5 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs text-[#888] uppercase tracking-wider mb-1.5">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#C8A050] transition-colors"
                  placeholder="The Gatsby"
                  autoFocus
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs text-[#888] uppercase tracking-wider mb-1.5">Description</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#C8A050] transition-colors"
                  placeholder="Gin, lavender, elderflower, champagne float"
                />
              </div>

              {/* Price + Category row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#888] uppercase tracking-wider mb-1.5">Price</label>
                  <input
                    type="number"
                    value={formData.price || ''}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#C8A050] transition-colors"
                    placeholder="16"
                    step="0.50"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#888] uppercase tracking-wider mb-1.5">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as MenuCategory })}
                    className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#C8A050] transition-colors appearance-none"
                  >
                    {(Object.keys(categoryLabels) as MenuCategory[]).map((cat) => (
                      <option key={cat} value={cat}>{categoryLabels[cat]}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Spirit Base + Badge row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#888] uppercase tracking-wider mb-1.5">Spirit Base</label>
                  <input
                    type="text"
                    value={formData.spirit_base}
                    onChange={(e) => setFormData({ ...formData, spirit_base: e.target.value })}
                    className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#C8A050] transition-colors"
                    placeholder="Gin, Bourbon, etc."
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#888] uppercase tracking-wider mb-1.5">Badge</label>
                  <select
                    value={formData.badge || ''}
                    onChange={(e) => setFormData({ ...formData, badge: (e.target.value || null) as MenuItem['badge'] })}
                    className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#C8A050] transition-colors appearance-none"
                  >
                    <option value="">None</option>
                    <option value="new">New</option>
                    <option value="seasonal">Seasonal</option>
                  </select>
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-xs text-[#888] uppercase tracking-wider mb-1.5">Image URL</label>
                <input
                  type="text"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#C8A050] transition-colors"
                  placeholder="/images/drinks/drink-name.jpg"
                />
              </div>
            </div>

            {/* Save bar */}
            <div className="sticky bottom-0 bg-[#1A1A1A] px-5 py-4 border-t border-[#222] flex gap-3">
              <button
                onClick={() => setIsCreating(false)}
                className="flex-1 px-4 py-2.5 rounded-lg text-sm text-[#888] border border-[#333] hover:border-[#555] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveItem}
                disabled={!formData.name.trim()}
                className="flex-1 bg-[#C8A050] text-[#0A0A0A] px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#D4B068] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                {editingItem ? 'Save Changes' : 'Add Item'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
