export const FREE_DELIVERY_MIN = 2000;

export type Category = {
  id: string;
  name: string;
  shortLabel?: string;
  isNew?: boolean;
  art: "cement" | "tile" | "paint" | "wood" | "glue" | "electrical" | "bath" | "hinge" | "lock" | "tool" | "pipe" | "waterproof" | "steel" | "brick" | "door" | "safety";
};

export type ProductArt =
  | "switch"
  | "adapter"
  | "mcb"
  | "holder"
  | "bulb"
  | "heater"
  | "strip"
  | "doorbell"
  | "fan"
  | "paint"
  | "cement"
  | "plaster"
  | "whiteCement"
  | "grout"
  | "wood"
  | "glue"
  | "bath"
  | "hinge"
  | "lock"
  | "tool"
  | "pipe"
  | "waterproof"
  | "steel"
  | "brick"
  | "door"
  | "helmet"
  | "generic";

export type Subcategory = {
  id: string;
  name: string;
  art: ProductArt;
};

export type Product = {
  id: string;
  categoryId: string;
  subcategoryId: string;
  brand: string;
  name: string;
  sku: string;
  price: number;
  mrp: number;
  bulkPrice?: number;
  unit: string;
  pack?: string;
  options?: number;
  art: ProductArt;
  image?: string;
};

export const CATEGORIES: Category[] = [
  { id: "cement", name: "Cement & Plaster", art: "cement" },
  { id: "tiling", name: "Tiling & Grouts", art: "tile" },
  { id: "paints", name: "Paints & Putty", art: "paint", isNew: true },
  { id: "plywood", name: "Plywood & MDF", art: "wood" },
  { id: "adhesives", name: "Fevicol & Adhesives", shortLabel: "Adhesives", art: "glue" },
  { id: "electricals", name: "Electricals & Lights", shortLabel: "Electricals", art: "electrical" },
  { id: "bath", name: "Bath Fittings and Sanitaryware", shortLabel: "Bath Fittings", art: "bath" },
  { id: "furniture", name: "Furniture Fittings & Accessories", shortLabel: "Furniture Fittings", art: "hinge" },
  { id: "locks", name: "Locks & Handles", art: "lock" },
  { id: "tools", name: "Hardware & Tools", shortLabel: "Hardware", art: "tool" },
  { id: "pipes", name: "Plumbing Pipes & Fittings", shortLabel: "Pipes", art: "pipe" },
  { id: "waterproof", name: "Waterproofing & Repairing", shortLabel: "Waterproofing", art: "waterproof" },
  { id: "safety", name: "Safety & Workwear", shortLabel: "Safety", art: "safety" },
  { id: "steel", name: "Steel & TMT", art: "steel" },
  { id: "bricks", name: "Bricks & Blocks", art: "brick" },
  { id: "doors", name: "Doors & Windows", art: "door" },
];

export const HOME_CATEGORY_IDS = [
  "cement",
  "tiling",
  "paints",
  "plywood",
  "adhesives",
  "electricals",
  "bath",
  "furniture",
  "locks",
  "tools",
  "pipes",
  "waterproof",
  "safety",
] as const;

export const HOME_NEW_PRODUCT_IDS = ["el-ecolink-fan", "el-ecolink-led"] as const;

const PHOTO_CATEGORY_IDS = new Set<string>(HOME_CATEGORY_IDS);

export function categoryImage(category: Category) {
  if (!PHOTO_CATEGORY_IDS.has(category.id)) return undefined;
  return `/catalog/categories/${category.id}.png`;
}

export const CATEGORY_GROUPS: {
  title: string;
  columns: 3 | 4;
  ids: string[];
}[] = [
  {
    title: "Core materials",
    columns: 4,
    ids: [
      "cement",
      "steel",
      "bricks",
      "waterproof",
      "tiling",
      "paints",
      "plywood",
      "adhesives",
    ],
  },
  {
    title: "Home & hardware",
    columns: 3,
    ids: [
      "electricals",
      "bath",
      "furniture",
      "locks",
      "pipes",
      "doors",
      "tools",
      "safety",
    ],
  },
];

export const SUBCATEGORIES: Record<string, Subcategory[]> = {
  cement: [
    { id: "all", name: "All", art: "cement" },
    { id: "cement", name: "Cement", art: "cement" },
    { id: "ppc", name: "Ppc", art: "cement" },
    { id: "white", name: "White Cement", art: "whiteCement" },
    { id: "plaster", name: "Punning Plaster", art: "plaster" },
    { id: "screws", name: "Gypsum Screws", art: "generic" },
  ],
  tiling: [
    { id: "all", name: "All", art: "grout" },
    { id: "adhesive", name: "Adhesive", art: "grout" },
    { id: "grout", name: "Grouts", art: "grout" },
    { id: "tiles", name: "Tiles", art: "grout" },
  ],
  paints: [
    { id: "all", name: "All", art: "paint" },
    { id: "interior", name: "Interior", art: "paint" },
    { id: "exterior", name: "Exterior", art: "paint" },
    { id: "putty", name: "Putty", art: "paint" },
  ],
  plywood: [
    { id: "all", name: "All", art: "wood" },
    { id: "ply", name: "Plywood", art: "wood" },
    { id: "mdf", name: "MDF", art: "wood" },
  ],
  adhesives: [
    { id: "all", name: "All", art: "glue" },
    { id: "fevicol", name: "Fevicol", art: "glue" },
    { id: "sealant", name: "Sealants", art: "glue" },
  ],
  electricals: [
    { id: "all", name: "All", art: "switch" },
    { id: "led", name: "Led Lights", art: "bulb" },
    { id: "heater", name: "Water Heater & Geysers", art: "heater" },
    { id: "extension", name: "Extension Board", art: "strip" },
    { id: "adapter", name: "Adapter", art: "adapter" },
    { id: "alarm", name: "Alarm & Door Bell", art: "doorbell" },
    { id: "switches", name: "Switches & Sockets", art: "switch" },
    { id: "fans", name: "Fans", art: "fan" },
  ],
  bath: [
    { id: "all", name: "All", art: "bath" },
    { id: "taps", name: "Taps", art: "bath" },
    { id: "sanitary", name: "Sanitaryware", art: "bath" },
  ],
  furniture: [
    { id: "all", name: "All", art: "hinge" },
    { id: "hinges", name: "Hinges", art: "hinge" },
    { id: "channels", name: "Channels", art: "hinge" },
  ],
  locks: [
    { id: "all", name: "All", art: "lock" },
    { id: "padlock", name: "Padlocks", art: "lock" },
    { id: "door", name: "Door Locks", art: "lock" },
    { id: "handles", name: "Handles", art: "lock" },
  ],
  tools: [
    { id: "all", name: "All", art: "tool" },
    { id: "power", name: "Power Tools", art: "tool" },
    { id: "hand", name: "Hand Tools", art: "tool" },
  ],
  pipes: [
    { id: "all", name: "All", art: "pipe" },
    { id: "pvc", name: "PVC", art: "pipe" },
    { id: "cpvc", name: "CPVC", art: "pipe" },
  ],
  waterproof: [
    { id: "all", name: "All", art: "waterproof" },
    { id: "coat", name: "Coatings", art: "waterproof" },
    { id: "chem", name: "Chemicals", art: "waterproof" },
  ],
  steel: [
    { id: "all", name: "All", art: "steel" },
    { id: "tmt", name: "TMT Bars", art: "steel" },
    { id: "binding", name: "Binding Wire", art: "steel" },
  ],
  bricks: [
    { id: "all", name: "All", art: "brick" },
    { id: "aac", name: "AAC Blocks", art: "brick" },
    { id: "red", name: "Red Bricks", art: "brick" },
  ],
  doors: [
    { id: "all", name: "All", art: "door" },
    { id: "flush", name: "Flush Doors", art: "door" },
    { id: "windows", name: "Windows", art: "door" },
  ],
  safety: [
    { id: "all", name: "All", art: "helmet" },
    { id: "head", name: "Helmets", art: "helmet" },
    { id: "ppe", name: "PPE", art: "helmet" },
  ],
};

export const PRODUCTS: Product[] = [
  { id: "cm-sakarni", categoryId: "cement", subcategoryId: "plaster", brand: "Sakarni", name: "Gypsum Plaster", sku: "SK25", price: 255, mrp: 400, bulkPrice: 240, unit: "bag", pack: "25 kg", options: 2, art: "plaster" },
  { id: "cm-ut-ppc", categoryId: "cement", subcategoryId: "ppc", brand: "UltraTech", name: "PPC Cement", sku: "UTPPC50", price: 370, mrp: 500, bulkPrice: 345, unit: "bag", pack: "50 kg", art: "cement" },
  { id: "cm-jk-ppc", categoryId: "cement", subcategoryId: "ppc", brand: "JK Lakshmi", name: "PPC Cement", sku: "JKPPC50", price: 345, mrp: 440, bulkPrice: 330, unit: "bag", pack: "50 kg", art: "cement" },
  { id: "cm-birla-w", categoryId: "cement", subcategoryId: "white", brand: "Birla", name: "White Cement", sku: "BW50", price: 1150, mrp: 1285, bulkPrice: 1135, unit: "bag", pack: "50 kg", options: 4, art: "whiteCement" },
  { id: "cm-ut-opc", categoryId: "cement", subcategoryId: "cement", brand: "UltraTech", name: "OPC 53 Grade Cement", sku: "UT53", price: 390, mrp: 450, bulkPrice: 375, unit: "bag", pack: "50 kg", art: "cement" },
  { id: "cm-acc", categoryId: "cement", subcategoryId: "cement", brand: "ACC", name: "Concrete+ Cement", sku: "ACC50", price: 360, mrp: 430, unit: "bag", pack: "50 kg", art: "cement" },
  { id: "cm-screw", categoryId: "cement", subcategoryId: "screws", brand: "Hilti", name: "Gypsum Board Screws", sku: "GS1000", price: 189, mrp: 249, unit: "box", pack: "1000 pcs", art: "generic" },

  { id: "tl-roff", categoryId: "tiling", subcategoryId: "adhesive", brand: "Roff", name: "Tile Adhesive", sku: "RA20", price: 420, mrp: 560, bulkPrice: 399, unit: "bag", pack: "20 kg", options: 2, art: "grout" },
  { id: "tl-grout", categoryId: "tiling", subcategoryId: "grout", brand: "Roff", name: "Epoxy Grout White", sku: "RG1", price: 310, mrp: 399, unit: "pack", pack: "1 kg", art: "grout" },
  { id: "tl-spacer", categoryId: "tiling", subcategoryId: "tiles", brand: "Cera", name: "Tile Spacers 2mm", sku: "TS2", price: 45, mrp: 70, unit: "pack", pack: "100 pcs", art: "grout" },
  { id: "tl-vitrified", categoryId: "tiling", subcategoryId: "tiles", brand: "Kajaria", name: "Vitrified Floor Tile", sku: "KJ60", price: 89, mrp: 120, unit: "sqft", pack: "60x60 cm", options: 4, art: "grout" },

  { id: "pt-tractor", categoryId: "paints", subcategoryId: "interior", brand: "Asian Paints", name: "Tractor Emulsion Interior", sku: "TE1L", price: 320, mrp: 410, bulkPrice: 299, unit: "litre", pack: "1 L", options: 4, art: "paint" },
  { id: "pt-royale", categoryId: "paints", subcategoryId: "interior", brand: "Asian Paints", name: "Royale Luxury Emulsion", sku: "RL1L", price: 890, mrp: 1090, unit: "litre", pack: "1 L", options: 3, art: "paint" },
  { id: "pt-apex", categoryId: "paints", subcategoryId: "exterior", brand: "Asian Paints", name: "Apex Exterior Emulsion", sku: "AX1L", price: 540, mrp: 680, unit: "litre", pack: "1 L", art: "paint" },
  { id: "pt-putty", categoryId: "paints", subcategoryId: "putty", brand: "Birla", name: "White Wall Putty", sku: "BP40", price: 680, mrp: 790, bulkPrice: 650, unit: "bag", pack: "40 kg", art: "whiteCement" },

  { id: "pw-18", categoryId: "plywood", subcategoryId: "ply", brand: "Century", name: "BWP Plywood", sku: "CP18", price: 2100, mrp: 2650, unit: "sheet", pack: "18 mm", options: 2, art: "wood" },
  { id: "pw-12", categoryId: "plywood", subcategoryId: "ply", brand: "Greenply", name: "MR Plywood", sku: "GP12", price: 1450, mrp: 1780, unit: "sheet", pack: "12 mm", art: "wood" },
  { id: "pw-mdf", categoryId: "plywood", subcategoryId: "mdf", brand: "Action Tesa", name: "Interior MDF Board", sku: "AT18", price: 890, mrp: 1100, unit: "sheet", pack: "18 mm", art: "wood" },

  { id: "ad-marine", categoryId: "adhesives", subcategoryId: "fevicol", brand: "Fevicol", name: "Marine Adhesive", sku: "FM5", price: 620, mrp: 780, bulkPrice: 590, unit: "kg", pack: "5 kg", options: 2, art: "glue" },
  { id: "ad-sh", categoryId: "adhesives", subcategoryId: "fevicol", brand: "Fevicol", name: "SH Synthetic Resin", sku: "SH1", price: 185, mrp: 230, unit: "kg", pack: "1 kg", art: "glue" },
  { id: "ad-sil", categoryId: "adhesives", subcategoryId: "sealant", brand: "Pidilite", name: "Silicone Sealant", sku: "PS280", price: 210, mrp: 280, unit: "piece", pack: "280 ml", art: "glue" },

  { id: "el-2527", categoryId: "electricals", subcategoryId: "switches", brand: "Anchor", name: "Penta 6A Bed Switch (White, 1 Way)", sku: "2527", price: 45, mrp: 75, unit: "piece", art: "switch" },
  { id: "el-3155", categoryId: "electricals", subcategoryId: "adapter", brand: "Anchor", name: "Deluxe 6A Multi Plug Adapter (3 Pin)", sku: "3155", price: 80, mrp: 121, unit: "piece", options: 2, art: "adapter" },
  { id: "el-65994", categoryId: "electricals", subcategoryId: "switches", brand: "Anchor", name: "Penta 32A Modular DP C Mini MCB", sku: "65994", price: 410, mrp: 788, unit: "piece", art: "mcb" },
  { id: "el-38538", categoryId: "electricals", subcategoryId: "led", brand: "Anchor", name: "Penta PC Batten Holder with PVC Ring (White)", sku: "38538", price: 35, mrp: 50, unit: "piece", art: "holder" },
  { id: "el-led-12", categoryId: "electricals", subcategoryId: "led", brand: "Havells", name: "9W LED Bulb Cool Daylight B22", sku: "LED9W", price: 89, mrp: 149, unit: "piece", options: 3, art: "bulb" },
  { id: "el-strip-4", categoryId: "electricals", subcategoryId: "extension", brand: "Anchor", name: "4 Socket Extension Board with Surge Guard", sku: "EXT4", price: 399, mrp: 599, unit: "piece", art: "strip" },
  { id: "el-heat-15", categoryId: "electricals", subcategoryId: "heater", brand: "Havells", name: "15L Storage Water Heater", sku: "WH15", price: 6490, mrp: 8990, unit: "piece", art: "heater" },
  { id: "el-bell-1", categoryId: "electricals", subcategoryId: "alarm", brand: "Anchor", name: "Wireless Door Bell with 38 Tunes", sku: "DB38", price: 449, mrp: 699, unit: "piece", art: "doorbell" },
  { id: "el-fan-1", categoryId: "electricals", subcategoryId: "fans", brand: "Havells", name: "1200mm Ceiling Fan (White)", sku: "FAN1200", price: 1899, mrp: 2499, unit: "piece", options: 2, art: "fan" },
  { id: "el-ecolink-fan", categoryId: "electricals", subcategoryId: "fans", brand: "EcoLink", name: "AirTurbo BLDC Ceiling Fan with Remote (White, 1200 MM)", sku: "AT1200", price: 2845, mrp: 4500, unit: "piece", options: 2, art: "fan", image: "/catalog/products/ecolink-fan.png" },
  { id: "el-ecolink-led", categoryId: "electricals", subcategoryId: "led", brand: "EcoLink", name: "3in1 Surface LED Full Glow Ceiling Light (15W)", sku: "SFG15", price: 430, mrp: 555, unit: "piece", art: "bulb", image: "/catalog/products/ecolink-led.png" },

  { id: "ba-tap", categoryId: "bath", subcategoryId: "taps", brand: "Jaquar", name: "Pillar Cock Basin Tap", sku: "JQ101", price: 1290, mrp: 1890, unit: "piece", options: 2, art: "bath" },
  { id: "ba-mixer", categoryId: "bath", subcategoryId: "taps", brand: "Hindware", name: "Wall Mixer with Crutch", sku: "HW88", price: 2450, mrp: 3200, unit: "piece", art: "bath" },
  { id: "ba-wc", categoryId: "bath", subcategoryId: "sanitary", brand: "Cera", name: "Floor Mounted EWC", sku: "CR12", price: 4990, mrp: 6800, unit: "piece", art: "bath" },

  { id: "fu-hinge", categoryId: "furniture", subcategoryId: "hinges", brand: "Hettich", name: "Soft Close Hinge", sku: "HT35", price: 95, mrp: 140, unit: "piece", pack: "pair", options: 2, art: "hinge" },
  { id: "fu-ch", categoryId: "furniture", subcategoryId: "channels", brand: "Hettich", name: "Telescopic Drawer Channel", sku: "HT16", price: 280, mrp: 360, unit: "pair", pack: "16 inch", art: "hinge" },
  { id: "fu-knob", categoryId: "furniture", subcategoryId: "hinges", brand: "Hafele", name: "Cabinet Knob Steel", sku: "HF9", price: 49, mrp: 79, unit: "piece", art: "hinge" },

  { id: "lk-pad", categoryId: "locks", subcategoryId: "padlock", brand: "Godrej", name: "Navtal Padlock 7 Lever", sku: "GD7", price: 265, mrp: 340, unit: "piece", art: "lock" },
  { id: "lk-door", categoryId: "locks", subcategoryId: "door", brand: "Yale", name: "Mortise Door Lock", sku: "YL20", price: 1890, mrp: 2490, unit: "piece", options: 2, art: "lock" },
  { id: "lk-smart", categoryId: "locks", subcategoryId: "door", brand: "Yale", name: "Digital Rim Lock", sku: "YL90", price: 8990, mrp: 11990, unit: "piece", art: "lock" },

  { id: "to-drill", categoryId: "tools", subcategoryId: "power", brand: "Bosch", name: "10mm Impact Drill", sku: "GSB10", price: 2490, mrp: 3290, unit: "piece", art: "tool" },
  { id: "to-grinder", categoryId: "tools", subcategoryId: "power", brand: "Bosch", name: "4 inch Angle Grinder", sku: "GWS6", price: 1890, mrp: 2450, unit: "piece", art: "tool" },
  { id: "to-kit", categoryId: "tools", subcategoryId: "hand", brand: "Stanley", name: "32pc Tool Kit", sku: "ST32", price: 1299, mrp: 1799, unit: "set", art: "tool" },

  { id: "pi-pvc", categoryId: "pipes", subcategoryId: "pvc", brand: "Astral", name: "PVC Pipe", sku: "AS3", price: 185, mrp: 240, unit: "length", pack: "3 m", options: 3, art: "pipe" },
  { id: "pi-elbow", categoryId: "pipes", subcategoryId: "pvc", brand: "Astral", name: "PVC Elbow 90°", sku: "ASE90", price: 28, mrp: 40, unit: "piece", art: "pipe" },
  { id: "pi-cpvc", categoryId: "pipes", subcategoryId: "cpvc", brand: "Ashirvad", name: "CPVC Pipe SDR 11", sku: "AC20", price: 210, mrp: 270, unit: "length", pack: "3 m", art: "pipe" },

  { id: "wp-lw", categoryId: "waterproof", subcategoryId: "coat", brand: "Dr. Fixit", name: "LW+ Waterproofing Liquid", sku: "DF5", price: 890, mrp: 1120, bulkPrice: 850, unit: "can", pack: "5 L", art: "waterproof" },
  { id: "wp-pid", categoryId: "waterproof", subcategoryId: "coat", brand: "Pidilite", name: "Roof Waterproof Coating", sku: "PR20", price: 2450, mrp: 3100, unit: "bucket", pack: "20 L", art: "waterproof" },
  { id: "wp-sika", categoryId: "waterproof", subcategoryId: "chem", brand: "Sika", name: "Cemflex Integral Liquid", sku: "SK1", price: 340, mrp: 420, unit: "litre", pack: "1 L", art: "waterproof" },

  { id: "st-tata", categoryId: "steel", subcategoryId: "tmt", brand: "Tata Tiscon", name: "TMT Bar Fe 500D", sku: "TT12", price: 68, mrp: 78, bulkPrice: 64, unit: "kg", pack: "12 mm", options: 4, art: "steel" },
  { id: "st-jsw", categoryId: "steel", subcategoryId: "tmt", brand: "JSW Neosteel", name: "TMT Bar Fe 550D", sku: "JSW16", price: 71, mrp: 82, unit: "kg", pack: "16 mm", art: "steel" },
  { id: "st-bind", categoryId: "steel", subcategoryId: "binding", brand: "Tata", name: "Binding Wire", sku: "TBW1", price: 89, mrp: 110, unit: "kg", pack: "1 kg", art: "steel" },

  { id: "br-aac", categoryId: "bricks", subcategoryId: "aac", brand: "Birla Aerocon", name: "AAC Block", sku: "BA600", price: 48, mrp: 62, bulkPrice: 44, unit: "piece", pack: "600x200x100", options: 3, art: "brick" },
  { id: "br-red", categoryId: "bricks", subcategoryId: "red", brand: "Local Kiln", name: "Red Clay Brick", sku: "RB1", price: 9, mrp: 12, unit: "piece", art: "brick" },
  { id: "br-solid", categoryId: "bricks", subcategoryId: "aac", brand: "Magicrete", name: "Solid Concrete Block", sku: "MC400", price: 36, mrp: 48, unit: "piece", pack: "400x200x100", art: "brick" },

  { id: "dr-flush", categoryId: "doors", subcategoryId: "flush", brand: "Greenply", name: "BWP Flush Door", sku: "GF32", price: 2890, mrp: 3650, unit: "piece", pack: "32 mm", options: 2, art: "door" },
  { id: "dr-century", categoryId: "doors", subcategoryId: "flush", brand: "Century", name: "Waterproof Flush Door", sku: "CF30", price: 2650, mrp: 3290, unit: "piece", pack: "30 mm", art: "door" },
  { id: "dr-upvc", categoryId: "doors", subcategoryId: "windows", brand: "Fenesta", name: "UPVC Sliding Window", sku: "FN4", price: 8990, mrp: 11200, unit: "piece", pack: "4 ft", art: "door" },

  { id: "sf-helm", categoryId: "safety", subcategoryId: "head", brand: "Karam", name: "Safety Helmet", sku: "KH1", price: 249, mrp: 349, unit: "piece", options: 3, art: "helmet" },
  { id: "sf-mask", categoryId: "safety", subcategoryId: "ppe", brand: "3M", name: "N95 Dust Respirator", sku: "3M8210", price: 89, mrp: 129, unit: "piece", pack: "pack of 1", art: "helmet" },
  { id: "sf-glove", categoryId: "safety", subcategoryId: "ppe", brand: "Karam", name: "Cut Resistant Gloves", sku: "KG5", price: 199, mrp: 280, unit: "pair", art: "helmet" },
];

export function getCategory(id: string) {
  return CATEGORIES.find((item) => item.id === id);
}

export function categoryLabel(category: Category) {
  return category.shortLabel ?? category.name;
}

export function getProduct(id: string) {
  return PRODUCTS.find((item) => item.id === id);
}

export function getSubcategories(categoryId: string): Subcategory[] {
  return SUBCATEGORIES[categoryId] ?? [{ id: "all", name: "All", art: "generic" }];
}

export function getProducts(categoryId: string, subcategoryId = "all") {
  const inCategory = PRODUCTS.filter((item) => item.categoryId === categoryId);
  if (subcategoryId === "all") return inCategory;
  return inCategory.filter((item) => item.subcategoryId === subcategoryId);
}

export function searchCatalog(query: string, categoryId?: string) {
  const q = query.trim().toLowerCase();
  const list = categoryId
    ? PRODUCTS.filter((item) => item.categoryId === categoryId)
    : PRODUCTS;
  if (!q) return list;
  return list.filter((item) => {
    const category = getCategory(item.categoryId);
    const haystack =
      `${item.brand} ${item.name} ${item.sku} ${item.pack ?? ""} ${category?.name ?? ""}`.toLowerCase();
    return haystack.includes(q);
  });
}

export function groupProductsByCategory(products: Product[]) {
  const groups: { category: Category; products: Product[] }[] = [];
  for (const product of products) {
    let group = groups.find((item) => item.category.id === product.categoryId);
    if (!group) {
      const category = getCategory(product.categoryId);
      if (!category) continue;
      group = { category, products: [] };
      groups.push(group);
    }
    group.products.push(product);
  }
  return groups;
}

export function discountPercent(price: number, mrp: number) {
  if (!mrp || mrp <= price) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}

export function productTitle(product: Product) {
  const spec = product.pack ? ` (${product.pack})` : "";
  return `${product.brand} ${product.name}${spec} [${product.sku}]`;
}
