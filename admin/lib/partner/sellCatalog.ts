export type SellVariant = {
  id: string;
  label: string;
  sku: string;
  price: number;
  stock: number;
  image?: string;
};

export type SellProduct = {
  id: string;
  brand: string;
  name: string;
  sku: string;
  price: number;
  unit: string;
  stock: number;
  image: string;
  variants?: SellVariant[];
};

export const SELL_CATALOG: SellProduct[] = [
  {
    id: "pt-tractor",
    brand: "Asian Paints",
    name: "Tractor Emulsion",
    sku: "TE",
    price: 320,
    unit: "litre",
    stock: 18,
    image: "/partner/paints.png",
    variants: [
      { id: "pt-tractor-1", label: "1 L", sku: "TE1L", price: 320, stock: 4 },
      { id: "pt-tractor-4", label: "4 L", sku: "TE4L", price: 1180, stock: 6 },
      { id: "pt-tractor-10", label: "10 L", sku: "TE10L", price: 2780, stock: 5 },
      { id: "pt-tractor-20", label: "20 L", sku: "TE20L", price: 5240, stock: 3 },
    ],
  },
  {
    id: "pi-elbow",
    brand: "Astral",
    name: "PVC Elbow",
    sku: "PVC20E",
    price: 28,
    unit: "piece",
    stock: 0,
    image: "/partner/pipes.png",
  },
  {
    id: "el-2527",
    brand: "Anchor",
    name: "Penta 6A Switch",
    sku: "2527",
    price: 45,
    unit: "piece",
    stock: 18,
    image: "/partner/electricals.png",
  },
  {
    id: "el-wire",
    brand: "Polycab",
    name: "House Wire",
    sku: "PC",
    price: 186,
    unit: "coil",
    stock: 14,
    image: "/partner/led.png",
    variants: [
      { id: "el-wire-15", label: "1.5 sq.mm", sku: "PC15", price: 142, stock: 6 },
      { id: "el-wire-25", label: "2.5 sq.mm", sku: "PC25", price: 186, stock: 4 },
      { id: "el-wire-40", label: "4 sq.mm", sku: "PC40", price: 274, stock: 4 },
    ],
  },
  {
    id: "el-led",
    brand: "EcoLink",
    name: "Surface LED",
    sku: "SFG",
    price: 430,
    unit: "piece",
    stock: 22,
    image: "/partner/led.png",
    variants: [
      { id: "el-led-9", label: "9W", sku: "SFG9", price: 290, stock: 7 },
      { id: "el-led-15", label: "15W", sku: "SFG15", price: 430, stock: 11 },
      { id: "el-led-20", label: "20W", sku: "SFG20", price: 560, stock: 4 },
    ],
  },
  {
    id: "pi-pvc",
    brand: "Astral",
    name: "PVC Pipe 3 m",
    sku: "AS",
    price: 185,
    unit: "length",
    stock: 40,
    image: "/partner/pipes.png",
    variants: [
      { id: "pi-pvc-20", label: "20 mm", sku: "AS20", price: 145, stock: 14 },
      { id: "pi-pvc-25", label: "25 mm", sku: "AS25", price: 185, stock: 16 },
      { id: "pi-pvc-32", label: "32 mm", sku: "AS32", price: 240, stock: 10 },
    ],
  },
  {
    id: "to-drill",
    brand: "Bosch",
    name: "10mm Impact Drill",
    sku: "GSB10",
    price: 2490,
    unit: "piece",
    stock: 3,
    image: "/partner/tools.png",
  },
  {
    id: "ad-sh",
    brand: "Fevicol",
    name: "SH Adhesive",
    sku: "FV",
    price: 185,
    unit: "tub",
    stock: 16,
    image: "/partner/tools.png",
    variants: [
      { id: "ad-sh-250", label: "250 g", sku: "FV250", price: 98, stock: 8 },
      { id: "ad-sh-500", label: "500 g", sku: "FV500", price: 185, stock: 6 },
      { id: "ad-sh-1k", label: "1 kg", sku: "FV1K", price: 340, stock: 2 },
    ],
  },
  {
    id: "el-3155",
    brand: "Anchor",
    name: "6A Multi Plug",
    sku: "3155",
    price: 80,
    unit: "piece",
    stock: 30,
    image: "/partner/electricals.png",
    variants: [
      { id: "el-3155-w", label: "White", sku: "3155W", price: 80, stock: 18 },
      { id: "el-3155-b", label: "Black", sku: "3155B", price: 80, stock: 12 },
    ],
  },
  {
    id: "to-kit",
    brand: "Stanley",
    name: "32pc Tool Kit",
    sku: "ST32",
    price: 1299,
    unit: "set",
    stock: 6,
    image: "/partner/tools.png",
  },
];

export function hasVariants(product: SellProduct) {
  return Boolean(product.variants && product.variants.length > 1);
}

export function productInStock(product: SellProduct) {
  if (product.variants?.length) {
    return product.variants.some((item) => item.stock > 0);
  }
  return product.stock > 0;
}

export function searchSellCatalog(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return SELL_CATALOG;
  return SELL_CATALOG.filter((item) => {
    if (
      item.name.toLowerCase().includes(q) ||
      item.brand.toLowerCase().includes(q) ||
      item.sku.toLowerCase().includes(q)
    ) {
      return true;
    }
    return item.variants?.some(
      (variant) =>
        variant.label.toLowerCase().includes(q) ||
        variant.sku.toLowerCase().includes(q),
    );
  });
}

export function getSellProduct(id: string) {
  return SELL_CATALOG.find((item) => item.id === id);
}

export function getSellVariant(product: SellProduct, variantId?: string) {
  if (!variantId || !product.variants) return undefined;
  return product.variants.find((item) => item.id === variantId);
}

export function findBySku(sku: string) {
  const q = sku.trim().toLowerCase();
  for (const product of SELL_CATALOG) {
    const variant = product.variants?.find((item) => item.sku.toLowerCase() === q);
    if (variant) return { product, variant };
    if (product.sku.toLowerCase() === q) return { product };
  }
  return undefined;
}
