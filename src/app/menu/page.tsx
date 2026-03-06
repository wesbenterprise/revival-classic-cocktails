import { Metadata } from 'next';
import { MenuItem, MenuCategory, WineSubcategory } from '@/types/database';
import DrinkItem from '@/components/DrinkItem';

export const metadata: Metadata = {
  title: 'Cocktail Menu | Revival Craft Cocktails — Lakeland, FL',
  description:
    'House originals, classics, spirit-free cocktails, and craft beer. Made with in-house syrups and custom garnishes. New Weekly Revival every Tuesday, $12.',
};

// ============================================================
// REAL MENU DATA — from revival-menu-data.json
// ============================================================

const CATEGORY_CONFIG: Record<MenuCategory, { label: string; subtitle: string }> = {
  old_fashioneds: {
    label: 'Old Fashioneds',
    subtitle: 'Our signature program. 15 ways to start the night.',
  },
  seasonal: {
    label: 'Seasonal Offerings',
    subtitle: 'Limited runs. Crafted for the moment.',
  },
  classics: {
    label: 'Classics',
    subtitle: 'Timeless cocktails, Revival style.',
  },
  tiki: {
    label: 'Tiki',
    subtitle: 'All Tiki drinks can be served sharable for $40. Best for groups of 3.',
  },
  spritz: {
    label: 'Spritz',
    subtitle: 'Light, bright, and built for the Florida sun.',
  },
  happy_hour_6: {
    label: 'Happy Hour — $6 Favorites',
    subtitle: 'Monday–Friday, 1 PM – 7 PM.',
  },
  happy_hour_8: {
    label: 'Happy Hour — $8 Revival Favorites',
    subtitle: 'Monday–Friday, 1 PM – 7 PM.',
  },
  mocktails: {
    label: 'Mocktails',
    subtitle: 'All the craft, none of the proof.',
  },
  spirit_flights: {
    label: 'Spirit Flights',
    subtitle: 'Four \u00BE oz pours of your chosen spirit.',
  },
  wine: {
    label: 'Wine',
    subtitle: 'A curated selection by the glass.',
  },
  draft_beer: {
    label: 'Draft Beer',
    subtitle: 'On tap.',
  },
  bottles_cans: {
    label: 'Bottles & Cans',
    subtitle: 'From the cooler.',
  },
  non_alcoholic: {
    label: 'Non-Alcoholic',
    subtitle: 'For the designated drivers and the sober-curious.',
  },
};

const CATEGORY_ORDER: MenuCategory[] = [
  'old_fashioneds',
  'seasonal',
  'classics',
  'tiki',
  'spritz',
  'happy_hour_6',
  'happy_hour_8',
  'mocktails',
  'spirit_flights',
  'wine',
  'draft_beer',
  'bottles_cans',
  'non_alcoholic',
];

const WINE_SUBCATEGORY_LABELS: Record<WineSubcategory, string> = {
  bubbles: 'Bubbles',
  white: 'White',
  red: 'Red',
};

let itemId = 0;
function nextId(): string {
  return String(++itemId);
}

const MENU_ITEMS: MenuItem[] = [
  // Old Fashioneds
  { id: nextId(), category: 'old_fashioneds', name: 'Bourbon Old Fashioned', description: 'Elijah Craig Small Batch Bourbon, Revival Syrup, Angostura Bitters, Orange Bitters', price: 13, spirit_base: 'bourbon', badge: null, image_url: null, subcategory: null, sort_order: 0, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'old_fashioneds', name: 'Rye Old Fashioned', description: 'Basil Hayden Dark Rye, Revival Syrup, Angostura Bitters, Orange Bitters', price: 13, spirit_base: 'rye', badge: null, image_url: null, subcategory: null, sort_order: 1, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'old_fashioneds', name: 'Gin Old Fashioned', description: 'Waterloo Antique Gin, Cinnamon Syrup, Spiced Apple Bitters', price: 13, spirit_base: 'gin', badge: 'revised', image_url: null, subcategory: null, sort_order: 2, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'old_fashioneds', name: 'Rum Old Fashioned (Fat-Washed)', description: 'Diplomatico Mantuano Brown Butter Infused Rum, Giffard Banane du Bresil, Black Walnut Bitters', price: 13, spirit_base: 'rum', badge: null, image_url: null, subcategory: null, sort_order: 3, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'old_fashioneds', name: 'Tequila Old Fashioned', description: 'Milagro Select Barrel Reserve Reposado Tequila, Citrus Syrup, Grapefruit Bitters', price: 13, spirit_base: 'tequila', badge: null, image_url: null, subcategory: null, sort_order: 4, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'old_fashioneds', name: 'Mezcal Old Fashioned', description: 'Del Maguey Vida Mezcal, Espolon Reposado Tequila, Tangerine-Orange Syrup, Mole Bitters', price: 13, spirit_base: 'mezcal', badge: 'revised', image_url: null, subcategory: null, sort_order: 5, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'old_fashioneds', name: 'Duck Fat Old Fashioned (Fat-Washed)', description: 'Duck Fat Infused Elijah Craig Small Batch, Honey-Ginger Syrup, Plum Bitters', price: 14, spirit_base: 'bourbon', badge: 'revised', image_url: null, subcategory: null, sort_order: 6, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'old_fashioneds', name: 'Brandy Old Fashioned', description: 'Copper & Kings Brandy, Rich Cherry Syrup, Tobacco Bitters', price: 13, spirit_base: 'brandy', badge: 'revised', image_url: null, subcategory: null, sort_order: 7, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'old_fashioneds', name: 'Japanese Old Fashioned', description: 'Suntory Japanese Whisky, Yuzu Syrup, Ginger Bitters', price: 13, spirit_base: 'whisky', badge: null, image_url: null, subcategory: null, sort_order: 8, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'old_fashioneds', name: 'Amaro Old Fashioned', description: 'Averna Amaro, Sfumato Amaro, Apricot Liqueur, Lemon Bitters', price: 13, spirit_base: 'amaro', badge: 'revised', image_url: null, subcategory: null, sort_order: 9, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'old_fashioneds', name: 'Chai Re-Fashioned', description: 'Chai Infused Old Forester Bourbon, Vanilla Syrup, Chai Bitters', price: 13, spirit_base: 'bourbon', badge: null, image_url: null, subcategory: null, sort_order: 10, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'old_fashioneds', name: 'Sotol Old Fashioned', description: 'Por Siempre Sotol, Lavender-Thyme Syrup, Lemon Bitters', price: 13, spirit_base: 'sotol', badge: null, image_url: null, subcategory: null, sort_order: 11, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'old_fashioneds', name: 'High Roller Wagyu Old Fashioned (Fat-Washed)', description: 'Wagyu Fat Infused Buffalo Trace, Madeira-Okinawa Brown Sugar Reduction, Rosemary Bitters', price: 20, spirit_base: 'bourbon', badge: 'premium', image_url: null, subcategory: null, sort_order: 12, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'old_fashioneds', name: 'Miso-Maple Old Fashioned', description: 'Mellow Corn Bottled in Bond Whiskey, Miso-Maple Reduction, Toasted Almond Bitters, Vanilla Bitters', price: 13, spirit_base: 'whiskey', badge: null, image_url: null, subcategory: null, sort_order: 13, is_archived: false, created_at: '', updated_at: '' },

  // Seasonal
  { id: nextId(), category: 'seasonal', name: "Lover's Lane", description: "Ford's Gin, Hibiscus Syrup, Lemon Juice, Rose Water, Egg White", price: 12, spirit_base: 'gin', badge: null, image_url: null, subcategory: null, sort_order: 0, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'seasonal', name: 'Bis Carr\u00e9', description: 'Bache American Oak Cognac, Cocchi Di Torino, Faretti Chocolate Biscotti Liqueur, Scrappy\'s Chocolate Bitters', price: 13, spirit_base: 'cognac', badge: null, image_url: null, subcategory: null, sort_order: 1, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'seasonal', name: 'Bull in the Heather', description: 'Gabriel Boudier Saffron Gin, Casterade Armagnac, Heirloom Pineapple Amaro, Cinnamon Syrup, Lemon Juice', price: 12, spirit_base: 'gin', badge: null, image_url: null, subcategory: null, sort_order: 2, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'seasonal', name: 'Frank Bazanka', description: "Plantation Stiggins' Fancy Pineapple Rum, Montenegro Amaro, Simple Syrup, Lime Juice, El Guapo Cuban Bitters", price: 12, spirit_base: 'rum', badge: null, image_url: null, subcategory: null, sort_order: 3, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'seasonal', name: 'Captain Obvious', description: 'Glenlivet Caribbean Reserve Scotch, St. George Spiced Pear Liqueur, Dry Curacao, Lemon Juice, All Spice Syrup, Plantation Dark Rum Floater', price: 13, spirit_base: 'scotch', badge: null, image_url: null, subcategory: null, sort_order: 4, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'seasonal', name: 'Drowning Tiger', description: 'Del Maguey Vida Mezcal, Averna Amaro, Cocchi Di Torino, Chinese 5 Spice Syrup, El Guapo Spiced Cocoa Bitters', price: 13, spirit_base: 'mezcal', badge: null, image_url: null, subcategory: null, sort_order: 5, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'seasonal', name: 'Canadian Tuxedo', description: 'Elijah Craig Small Batch Bourbon, Luxardo Apricot Liqueur, Dark Door Spirits Tropical Amaro, Lemon Juice, Chinese 5 Spice Syrup, Angostura Bitters', price: 12, spirit_base: 'bourbon', badge: null, image_url: null, subcategory: null, sort_order: 6, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'seasonal', name: 'Matcha Cavaletta', description: "Wheatley Vodka, Fernet Brancamenta, Trader Vic's White Chocolate Liqueur, Matcha Orgeat, Heavy Cream", price: 12, spirit_base: 'vodka', badge: null, image_url: null, subcategory: null, sort_order: 7, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'seasonal', name: 'Funky Cold Martini', description: "Roots of Ruin Gin, Del Maguey Crema de Mezcal, St. Pete Ferments Dandelion & Onion Kraut Brine, El Guapo Crawfish Bitters", price: 13, spirit_base: 'gin', badge: null, image_url: null, subcategory: null, sort_order: 8, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'seasonal', name: 'Sasha Grey', description: "Vanilla Infused Wheatley Vodka, Giffard Cr\u00e8me De P\u00eache, Lime Juice, Pineapple Juice, Vanilla Syrup, Passionfruit Puree, Scrappy's Grapefruit Bitters", price: 12, spirit_base: 'vodka', badge: null, image_url: null, subcategory: null, sort_order: 9, is_archived: false, created_at: '', updated_at: '' },

  // Classics
  { id: nextId(), category: 'classics', name: 'Pi\u00f1a Colada Milk Punch (Clarified)', description: 'Plantation 3 Year, Coconut Water, Velvet Falernum, Revival Syrup, Pineapple Juice, Lime Juice, Milk', price: 12, spirit_base: 'rum', badge: null, image_url: null, subcategory: null, sort_order: 0, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'classics', name: 'Suffering Bastard', description: "Old Forester Bourbon, Ford's Gin, Simple Syrup, Lime Juice, Angostura Bitters, Ginger Beer", price: 13, spirit_base: 'bourbon', badge: null, image_url: null, subcategory: null, sort_order: 1, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'classics', name: 'Army Navy', description: "Ford's Gin, Lemon Juice, Orgeat, Angostura Bitters", price: 12, spirit_base: 'gin', badge: null, image_url: null, subcategory: null, sort_order: 2, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'classics', name: 'Faux-Spresso Martini', description: "Wheatley Vodka, Borghetti Espresso Liqueur, Revival's House Cold Brew, Rich Caf\u00e9 Bustelo-Vanilla Syrup, Scrappy's Chocolate Bitters", price: 13, spirit_base: 'vodka', badge: null, image_url: null, subcategory: null, sort_order: 3, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'classics', name: 'Jack Rose', description: "Laird's Straight Apple Brandy BIB, Rittenhouse Rye BIB, Lemon Juice, Grenadine", price: 13, spirit_base: 'brandy', badge: null, image_url: null, subcategory: null, sort_order: 4, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'classics', name: 'Ryloma', description: 'Corazon Blanco Tequila, Grapefruit Juice, Rich Blood Orange Syrup, Lime Juice', price: 13, spirit_base: 'tequila', badge: null, image_url: null, subcategory: null, sort_order: 5, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'classics', name: 'Blue Dog Sazerac (Fat-Washed)', description: "Blue Dog Brisket Fat Infused Rittenhouse BIB Rye, Apricot Reduction, Peychaud's & Lemon Bitters, Absinthe Rinse", price: 13, spirit_base: 'rye', badge: null, image_url: null, subcategory: null, sort_order: 6, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'classics', name: 'Rob Roy', description: "Pineapple Infused Glenlivet's Caribbean Reserve, Lofi Sweet Vermouth, El Guapo Vanilla Bitters, Fee Brother's Toasted Almond Bitters", price: 12, spirit_base: 'scotch', badge: null, image_url: null, subcategory: null, sort_order: 7, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'classics', name: 'Strawberry Tamarind Margarita', description: 'Strawberry Infused Corazon Blanco Tequila, Triple Sec, Lime Juice, Tamarind Syrup', price: 12, spirit_base: 'tequila', badge: null, image_url: null, subcategory: null, sort_order: 8, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'classics', name: 'Savoy Swizzle', description: 'Heirloom Genepy Liqueur, Velvet Falernum, Pineapple Juice, Lime Juice', price: 13, spirit_base: 'liqueur', badge: null, image_url: null, subcategory: null, sort_order: 9, is_archived: false, created_at: '', updated_at: '' },

  // Tiki
  { id: nextId(), category: 'tiki', name: 'Shark Attack', description: 'Wheatley Vodka, Pama Pomegranate Liqueur, Dark Door Spirits Tropical Amaro, Orange Juice, Hibiscus Syrup, Lime Juice, Orgeat', price: 13, spirit_base: 'vodka', badge: null, image_url: null, subcategory: null, sort_order: 0, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'tiki', name: 'Jamaican Miso Horny', description: 'Iichiko Shochu, Plantation Dark Rum, Giffard Abricot du Roussillon, Orgeat, Maple-Miso Syrup, Pineapple Juice, Lime Juice, Smoked Bitters', price: 13, spirit_base: 'rum', badge: null, image_url: null, subcategory: null, sort_order: 1, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'tiki', name: 'Junebug Jukebox', description: 'Del Maguey Vida Mezcal, Plantation 3 Stars, Passeo Passionfruit Liqueur, Giffard Banana du Bresil, Grapefruit Juice, Lemon Juice, Lavender Bitters', price: 13, spirit_base: 'mezcal', badge: null, image_url: null, subcategory: null, sort_order: 2, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'tiki', name: 'Strange Victory', description: 'Smith & Cross Jamaican Rum, Rhum JM Blanc, Pimento Dram, Velvet Falernum, Cinnamon Syrup, Orange Juice, Lime Juice, Molasses Bitters', price: 13, spirit_base: 'rum', badge: null, image_url: null, subcategory: null, sort_order: 3, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'tiki', name: 'Year of the Rabbit', description: "Suntory Toki Japanese Whisky, Ford's Gin, Midori Liqueur, Lemon Juice, Kiwi Puree, Egg White", price: 13, spirit_base: 'whisky', badge: null, image_url: null, subcategory: null, sort_order: 4, is_archived: false, created_at: '', updated_at: '' },

  // Spritz
  { id: nextId(), category: 'spritz', name: 'London Fog Spritz', description: "Italicus Rosolio di Bergamotto, Ford's Gin, Earl Grey, Lemon Juice, Grapefruit Juice, Soda Water", price: 12, spirit_base: 'gin', badge: null, image_url: null, subcategory: null, sort_order: 0, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'spritz', name: 'Blood Orange Spritz', description: 'Aperol Ap\u00e9rtif, Blood Orange Juice, Prosecco, Fevertree Soda Water', price: 12, spirit_base: 'aperol', badge: null, image_url: null, subcategory: null, sort_order: 1, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'spritz', name: 'White Lotus', description: 'Ocucaje Pisco, Winter Syrup, Lemon Juice, Simonet Brut', price: 12, spirit_base: 'pisco', badge: null, image_url: null, subcategory: null, sort_order: 2, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'spritz', name: 'Rose of St. Olaf', description: 'Ramazzotti Rosato Apertivo, Lemon Juice, Tangerine-Orange Syrup, Ros\u00e9', price: 12, spirit_base: 'amaro', badge: null, image_url: null, subcategory: null, sort_order: 3, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'spritz', name: 'Alpine Remedy', description: "Ford's Gin, Giffard Cr\u00e8me De Framboise, Vanilla, Lime Juice, Soda Water, Underberg", price: 12, spirit_base: 'gin', badge: null, image_url: null, subcategory: null, sort_order: 4, is_archived: false, created_at: '', updated_at: '' },

  // Happy Hour $6
  { id: nextId(), category: 'happy_hour_6', name: 'Paloma', description: 'Corazon Tequila, Lime Juice, Grapefruit Juice, Chili-Lime Salt Rim', price: 6, spirit_base: 'tequila', badge: null, image_url: null, subcategory: null, sort_order: 0, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'happy_hour_6', name: 'French 75', description: "Ford's Gin, Lemon Juice, Lavender-Thyme Syrup, Brut Champagne", price: 6, spirit_base: 'gin', badge: null, image_url: null, subcategory: null, sort_order: 1, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'happy_hour_6', name: "Bee's Knees", description: "Ford's Gin, Revival Syrup, Lemon Juice", price: 6, spirit_base: 'gin', badge: null, image_url: null, subcategory: null, sort_order: 2, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'happy_hour_6', name: 'Moscow Mule', description: 'Wheatley Vodka, Lime Juice, Ginger Beer', price: 6, spirit_base: 'vodka', badge: null, image_url: null, subcategory: null, sort_order: 3, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'happy_hour_6', name: 'Lavender Collins', description: "Ford's Gin, Lavender Syrup, Lemon Juice, Soda Water", price: 6, spirit_base: 'gin', badge: null, image_url: null, subcategory: null, sort_order: 4, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'happy_hour_6', name: 'Bramble', description: 'Old Forester Bourbon, Cr\u00e8me De Mure (Blackberry), Lemon Juice, Simple Syrup', price: 6, spirit_base: 'bourbon', badge: null, image_url: null, subcategory: null, sort_order: 5, is_archived: false, created_at: '', updated_at: '' },

  // Happy Hour $8
  { id: nextId(), category: 'happy_hour_8', name: 'Old Fashioned', description: 'Old Forester Bourbon, Revival Syrup, Angostura & Orange Bitters', price: 8, spirit_base: 'bourbon', badge: null, image_url: null, subcategory: null, sort_order: 0, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'happy_hour_8', name: 'Gimlet', description: "Ford's Gin or Wheatley Vodka, Simple Syrup, Lime Juice", price: 8, spirit_base: 'gin', badge: null, image_url: null, subcategory: null, sort_order: 1, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'happy_hour_8', name: 'Margarita', description: 'Corazon Tequila, Triple Sec, Lime Juice, Revival Syrup', price: 8, spirit_base: 'tequila', badge: null, image_url: null, subcategory: null, sort_order: 2, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'happy_hour_8', name: 'Cosmopolitan', description: 'Wheatley Vodka, Triple Sec, Cranberry Juice, Lime Juice', price: 8, spirit_base: 'vodka', badge: null, image_url: null, subcategory: null, sort_order: 3, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'happy_hour_8', name: 'Manhattan', description: 'Rittenhouse Rye, Antica Sweet Vermouth, Angostura Bitters', price: 8, spirit_base: 'rye', badge: null, image_url: null, subcategory: null, sort_order: 4, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'happy_hour_8', name: 'Daiquiri', description: 'Plantation 3 Stars Rum, Simple Syrup, Lime Juice', price: 8, spirit_base: 'rum', badge: null, image_url: null, subcategory: null, sort_order: 5, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'happy_hour_8', name: 'Sazerac', description: "Rittenhouse Rye, Peychaud's & Lemon Bitters, Revival Syrup, Absinthe Rinse", price: 8, spirit_base: 'rye', badge: null, image_url: null, subcategory: null, sort_order: 6, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'happy_hour_8', name: 'Negroni', description: "Ford's Gin, Campari, Antica Sweet Vermouth", price: 8, spirit_base: 'gin', badge: null, image_url: null, subcategory: null, sort_order: 7, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'happy_hour_8', name: 'Dirty Martini', description: "Ford's Gin or Wheatley Vodka, Olives (Regular or Bleu Cheese)", price: 8, spirit_base: 'gin', badge: null, image_url: null, subcategory: null, sort_order: 8, is_archived: false, created_at: '', updated_at: '' },

  // Mocktails
  { id: nextId(), category: 'mocktails', name: 'Lavender Spritz', description: 'Housemade Lavender Lemonade, Soda Water', price: 5, spirit_base: null, badge: null, image_url: null, subcategory: null, sort_order: 0, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'mocktails', name: 'Italian Spritz', description: "Lyre's Non-Alcoholic Italian Spritz, Tangerine-Orange Syrup, Soda Water", price: 7, spirit_base: null, badge: null, image_url: null, subcategory: null, sort_order: 1, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'mocktails', name: 'Coffee Martini', description: "Lyre's Non-Alcoholic Coffee Originale, Cold Brew Coffee, Rich Bustelo Syrup, Heavy Cream", price: 7, spirit_base: null, badge: null, image_url: null, subcategory: null, sort_order: 2, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'mocktails', name: 'Faux-Fashioned', description: "Lyre's Non-Alcoholic Dark Cane Spirit, Angostura & Orange Bitters, Revival Syrup", price: 7, spirit_base: null, badge: null, image_url: null, subcategory: null, sort_order: 3, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'mocktails', name: 'Mock-Mule', description: "Lyre's Non-Alcoholic White Cane Spirit, Lime Juice, Revival Syrup, Ginger Beer", price: 7, spirit_base: null, badge: null, image_url: null, subcategory: null, sort_order: 4, is_archived: false, created_at: '', updated_at: '' },

  // Spirit Flights
  { id: nextId(), category: 'spirit_flights', name: 'Kentucky Bourbon Trail', description: "Buffalo Trace Bourbon, Michter's Bourbon, Angels Envy, Elijah Craig", price: 25, spirit_base: 'bourbon', badge: null, image_url: null, subcategory: null, sort_order: 0, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'spirit_flights', name: 'Tennessee Whiskey Trail', description: "Uncle Nearest 1884, Jack Daniels Single Barrel, George Dickel Barrel Select, Nelson's Green Brier Sour Mash", price: 25, spirit_base: 'whiskey', badge: null, image_url: null, subcategory: null, sort_order: 1, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'spirit_flights', name: 'Woodford Reserve Flight', description: 'Woodford Bourbon, Woodford Rye, Woodford Wheat, Woodford Double Oak', price: 25, spirit_base: 'bourbon', badge: null, image_url: null, subcategory: null, sort_order: 2, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'spirit_flights', name: 'Old Forester Whiskey Row Flight', description: 'Old Forester 1870 Original Batch, 1897 Bottled in Bond, 1910 Old Fine Whisky, 1920 Prohibition Style', price: 30, spirit_base: 'bourbon', badge: 'premium', image_url: null, subcategory: null, sort_order: 3, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'spirit_flights', name: 'Wheated Bourbons', description: "Maker's Mark 46, Redemption Wheated Bourbon, Larceny Bourbon, Woodford Reserve Wheat", price: 20, spirit_base: 'bourbon', badge: null, image_url: null, subcategory: null, sort_order: 4, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'spirit_flights', name: 'Del Maguey Mezcal Flight', description: 'Del Maguey Vida, Crema de Mezcal, Single Village San Luis Rio, Single Village Milpas', price: 30, spirit_base: 'mezcal', badge: null, image_url: null, subcategory: null, sort_order: 5, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'spirit_flights', name: 'Casamigos Agave Flight', description: 'Casamigos Blanco, Reposado, Anejo, Mezcal', price: 30, spirit_base: 'tequila', badge: null, image_url: null, subcategory: null, sort_order: 6, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'spirit_flights', name: 'St. George Gin Flight', description: 'St. George Terroir Gin, Botanivore Gin, Dry Rye Gin, Dry Rye Reposado Gin', price: 25, spirit_base: 'gin', badge: null, image_url: null, subcategory: null, sort_order: 7, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'spirit_flights', name: 'Amaro Flight', description: 'Amaro Nonino, Averna, Cynar 70, Fernet Branca', price: 20, spirit_base: 'amaro', badge: null, image_url: null, subcategory: null, sort_order: 8, is_archived: false, created_at: '', updated_at: '' },

  // Wine — Bubbles
  { id: nextId(), category: 'wine', name: 'Zardetto Prosecco', description: 'Orange rind, brioche, honeyed grapefruit', price: 8, spirit_base: null, badge: null, image_url: null, subcategory: 'bubbles', sort_order: 0, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'wine', name: 'Zardetto Private Cuv\u00e9e Brut', description: 'Apple, pear, peach fruit', price: 8.75, spirit_base: null, badge: null, image_url: null, subcategory: 'bubbles', sort_order: 1, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'wine', name: 'Mas Fi Cava Brut', description: 'White flowers and citrus, stone fruits', price: 8.75, spirit_base: null, badge: null, image_url: null, subcategory: 'bubbles', sort_order: 2, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'wine', name: 'Mas Fi Cava Brut Ros\u00e9', description: 'Fresh strawberries & black currants', price: 8.75, spirit_base: null, badge: null, image_url: null, subcategory: 'bubbles', sort_order: 3, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'wine', name: 'Montand Brut Sparkling', description: 'Ripe apples, lovely pear, fresh baked bread', price: 9.50, spirit_base: null, badge: null, image_url: null, subcategory: 'bubbles', sort_order: 4, is_archived: false, created_at: '', updated_at: '' },
  // Wine — White
  { id: nextId(), category: 'wine', name: 'Ponga Sauvignon Blanc', description: 'Pear and apple, hint of vanilla', price: 9.25, spirit_base: null, badge: null, image_url: null, subcategory: 'white', sort_order: 5, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'wine', name: 'Lagedr Riff Pinot Grigio', description: 'Fresh, lively, precise, dry and crisp', price: 8, spirit_base: null, badge: null, image_url: null, subcategory: 'white', sort_order: 6, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'wine', name: 'Dr. Loosen Riesling', description: 'Refreshing and fruity, fine mineral edge', price: 8.75, spirit_base: null, badge: null, image_url: null, subcategory: 'white', sort_order: 7, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'wine', name: 'Oxford Landing Chardonnay', description: 'Peach, nectarine, spice', price: 8.50, spirit_base: null, badge: null, image_url: null, subcategory: 'white', sort_order: 8, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'wine', name: 'Stella Moscato', description: 'Satiny, crisp, effervescent, fruity', price: 8, spirit_base: null, badge: null, image_url: null, subcategory: 'white', sort_order: 9, is_archived: false, created_at: '', updated_at: '' },
  // Wine — Red
  { id: nextId(), category: 'wine', name: 'Grayson Cellars Merlot', description: 'Soft tannins, dark fruits, oak', price: 9.50, spirit_base: null, badge: null, image_url: null, subcategory: 'red', sort_order: 10, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'wine', name: 'Tilia Sauvignon', description: 'Black raspberries, cassis, sweet spice', price: 9.75, spirit_base: null, badge: null, image_url: null, subcategory: 'red', sort_order: 11, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'wine', name: 'Tortoise Creek Pinot Noir', description: 'Violets, ripe cherries, other red fruits', price: 9.50, spirit_base: null, badge: null, image_url: null, subcategory: 'red', sort_order: 12, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'wine', name: 'NV Marietta Old Vine Red', description: 'Charcuterie, baking spice, and dried herbs', price: 10.50, spirit_base: null, badge: null, image_url: null, subcategory: 'red', sort_order: 13, is_archived: false, created_at: '', updated_at: '' },

  // Draft Beer
  { id: nextId(), category: 'draft_beer', name: 'Bud Light', description: null, price: 3, spirit_base: null, badge: null, image_url: null, subcategory: null, sort_order: 0, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'draft_beer', name: 'Green Bench Sunshine City IPA', description: null, price: 6.25, spirit_base: null, badge: null, image_url: null, subcategory: null, sort_order: 1, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'draft_beer', name: 'Golden Road Mango Cart', description: 'Wheat Ale', price: 4, spirit_base: null, badge: null, image_url: null, subcategory: null, sort_order: 2, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'draft_beer', name: 'Grove Roots Sunset Catch', description: 'German Pilsner', price: 5, spirit_base: null, badge: null, image_url: null, subcategory: null, sort_order: 3, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'draft_beer', name: 'Grove Roots Toast', description: 'Brown Ale', price: 5, spirit_base: null, badge: null, image_url: null, subcategory: null, sort_order: 4, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'draft_beer', name: 'Michelob Ultra', description: null, price: 3, spirit_base: null, badge: null, image_url: null, subcategory: null, sort_order: 5, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'draft_beer', name: 'Rotating Sour', description: 'Ask your bartender', price: 5, spirit_base: null, badge: null, image_url: null, subcategory: null, sort_order: 6, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'draft_beer', name: 'Rotating Tap', description: 'Ask your bartender', price: 5, spirit_base: null, badge: null, image_url: null, subcategory: null, sort_order: 7, is_archived: false, created_at: '', updated_at: '' },

  // Non-Alcoholic
  { id: nextId(), category: 'non_alcoholic', name: 'Chameleon Cold Brew', description: null, price: 4, spirit_base: null, badge: null, image_url: null, subcategory: null, sort_order: 0, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'non_alcoholic', name: 'Barritts Ginger Beer', description: null, price: 2.50, spirit_base: null, badge: null, image_url: null, subcategory: null, sort_order: 1, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'non_alcoholic', name: 'Q Sodas', description: 'Grapefruit Soda, Soda Water, Tonic Water', price: 2.50, spirit_base: null, badge: null, image_url: null, subcategory: null, sort_order: 2, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'non_alcoholic', name: 'Topo Chico', description: 'Original & Twist of Grapefruit', price: 3.50, spirit_base: null, badge: null, image_url: null, subcategory: null, sort_order: 3, is_archived: false, created_at: '', updated_at: '' },
  { id: nextId(), category: 'non_alcoholic', name: 'Coke Products', description: 'Coke, Diet Coke, Ginger Ale, Sprite', price: 1.50, spirit_base: null, badge: null, image_url: null, subcategory: null, sort_order: 4, is_archived: false, created_at: '', updated_at: '' },
];

// ============================================================

function groupByCategory(items: MenuItem[]): Record<MenuCategory, MenuItem[]> {
  const grouped = {} as Record<MenuCategory, MenuItem[]>;
  for (const cat of CATEGORY_ORDER) {
    grouped[cat] = [];
  }
  items
    .filter((item) => !item.is_archived)
    .sort((a, b) => a.sort_order - b.sort_order)
    .forEach((item) => grouped[item.category]?.push(item));
  return grouped;
}

export default function MenuPage() {
  const grouped = groupByCategory(MENU_ITEMS);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-20 pb-10 px-6 text-center">
        <h1 className="font-display text-4xl md:text-6xl text-revival-cream">Menu</h1>
        <p className="mt-3 text-revival-cream-dim text-sm tracking-wide">
          Crafted with intention. Poured with care.
        </p>
      </section>

      {/* Weekly Revival banner */}
      <div className="max-w-2xl mx-auto px-6 mb-6">
        <div className="rounded-lg border border-revival-red/40 bg-revival-red/10 px-5 py-4 text-center">
          <p className="text-revival-amber text-xs tracking-[0.2em] uppercase mb-1">Weekly Revival</p>
          <p className="text-revival-cream text-sm">
            For one week only: a custom recipe or a riff on a classic. <span className="text-revival-amber font-medium">$12.</span>
          </p>
        </div>
      </div>

      {/* Bartender's Choice */}
      <div className="max-w-2xl mx-auto px-6 mb-8">
        <div className="rounded-lg border border-revival-amber/30 bg-revival-dark p-6 text-center">
          <p className="text-revival-amber text-xs tracking-[0.2em] uppercase mb-2">★ Bartender&apos;s Choice</p>
          <p className="text-revival-cream-muted text-sm">
            Let us take a stab at your new favorite drink. All we need is a little guidance.
          </p>
          <div className="mt-4 space-y-2 text-xs text-revival-cream-dim">
            <p>
              <span className="text-revival-cream-muted font-medium">Spirit:</span>{' '}
              Vodka · Gin · Rum · Tequila · Mezcal · Bourbon · Rye · Scotch
            </p>
            <p>
              <span className="text-revival-cream-muted font-medium">Profile:</span>{' '}
              Spirit Forward · Fruity · Refreshing · Citrusy · Savory · Sweet · Herbal · Spicy · Bitter · Floral · Smoky · Non-Alcoholic
            </p>
          </div>
        </div>
      </div>

      {/* Sticky category nav */}
      <nav className="sticky top-16 z-30 bg-revival-black/90 backdrop-blur-md border-b border-revival-border/30">
        <div className="max-w-4xl mx-auto flex overflow-x-auto gap-1 px-4 py-3 scrollbar-hide">
          {CATEGORY_ORDER.map((cat) => {
            if (grouped[cat].length === 0) return null;
            const shortLabel = CATEGORY_CONFIG[cat].label
              .replace('Happy Hour \u2014 ', '')
              .replace(' Favorites', '');
            return (
              <a
                key={cat}
                href={`#${cat}`}
                className="
                  flex-none px-4 py-2 rounded-full text-xs tracking-[0.15em] uppercase
                  text-revival-cream-muted hover:text-revival-cream
                  hover:bg-revival-dark transition-colors whitespace-nowrap
                "
              >
                {shortLabel}
              </a>
            );
          })}
        </div>
      </nav>

      {/* Menu sections */}
      <div className="max-w-2xl mx-auto px-6 pb-24">
        {CATEGORY_ORDER.map((cat) => {
          const items = grouped[cat];
          if (items.length === 0) return null;
          const config = CATEGORY_CONFIG[cat];
          const isHappyHour = cat === 'happy_hour_6' || cat === 'happy_hour_8';
          const isWine = cat === 'wine';
          const isTiki = cat === 'tiki';

          return (
            <section key={cat} id={cat} className="pt-16 first:pt-10">
              {/* Category header */}
              <div className="mb-8">
                <h2 className="font-display text-2xl md:text-3xl text-revival-cream">
                  {config.label}
                </h2>
                <p className="mt-1 text-revival-cream-dim text-sm italic">
                  {config.subtitle}
                </p>
                {isHappyHour && (
                  <p className="mt-2 text-revival-amber text-xs tracking-[0.15em] uppercase font-medium">
                    Monday–Friday, 1 PM – 7 PM
                  </p>
                )}
                {cat === 'happy_hour_6' && (
                  <p className="mt-2 text-revival-cream-dim text-xs leading-relaxed">
                    Well spirits $6: Wheatley Vodka, Ford Gin, Plantation 3 Stars Rum, Corazon Tequila, Old Forester Bourbon. House wines $6.
                  </p>
                )}
                {isTiki && (
                  <p className="mt-2 text-revival-cream-dim text-xs">
                    Single serve Tiki mugs available for purchase — $25.
                  </p>
                )}
                <div className={`mt-4 w-12 h-px ${cat === 'old_fashioneds' ? 'bg-revival-red/60' : 'bg-revival-amber/50'}`} />
              </div>

              {/* Items — wine gets subcategory sub-headers */}
              {isWine ? (
                <div className="space-y-6">
                  {(['bubbles', 'white', 'red'] as WineSubcategory[]).map((sub) => {
                    const subItems = items.filter((i) => i.subcategory === sub);
                    if (subItems.length === 0) return null;
                    return (
                      <div key={sub}>
                        <h3 className="text-revival-amber text-xs tracking-[0.2em] uppercase mb-4">
                          {WINE_SUBCATEGORY_LABELS[sub]}
                        </h3>
                        <div className="space-y-6">
                          {subItems.map((item) => (
                            <DrinkItem key={item.id} item={item} />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <DrinkItem key={item.id} item={item} />
                  ))}
                </div>
              )}
            </section>
          );
        })}

        {/* Bottom note */}
        <div className="mt-20 pt-10 border-t border-revival-border/30 text-center">
          <p className="text-revival-cream-dim text-xs tracking-wide">
            Menu changes seasonally. Prices do not include tax or gratuity.
          </p>
          <p className="mt-2 text-revival-cream-dim text-xs tracking-wide">
            Please inform your bartender of any allergies.
          </p>
        </div>
      </div>
    </div>
  );
}
