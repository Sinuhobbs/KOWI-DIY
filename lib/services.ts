export type ServiceArt =
  | "electrician"
  | "plumber"
  | "carpenter"
  | "ac"
  | "paint"
  | "ro"
  | "tile"
  | "waterproof";

export type ServicePackage = {
  id: string;
  name: string;
  price: number;
  mrp: number;
  duration: string;
};

export type Service = {
  id: string;
  name: string;
  art: ServiceArt;
  blurb: string;
  packages: ServicePackage[];
};

export const SERVICES: Service[] = [
  {
    id: "electrician",
    name: "Electrician",
    art: "electrician",
    blurb: "Wiring, fans, switches, and boards — available in your area.",
    packages: [
      { id: "el-fan", name: "Fan installation", price: 299, mrp: 399, duration: "45 mins" },
      { id: "el-switch", name: "Switchboard repair", price: 199, mrp: 249, duration: "30 mins" },
      { id: "el-wire", name: "New point wiring", price: 149, mrp: 199, duration: "40 mins" },
      { id: "el-mcb", name: "MCB / fuse replacement", price: 249, mrp: 349, duration: "35 mins" },
    ],
  },
  {
    id: "plumber",
    name: "Plumber",
    art: "plumber",
    blurb: "Taps, leaks, and fittings — booked for your area.",
    packages: [
      { id: "pl-tap", name: "Tap repair / replace", price: 149, mrp: 199, duration: "30 mins" },
      { id: "pl-leak", name: "Leakage fix", price: 249, mrp: 349, duration: "45 mins" },
      { id: "pl-bath", name: "Bathroom fitting", price: 499, mrp: 699, duration: "90 mins" },
      { id: "pl-block", name: "Drain unblock", price: 199, mrp: 299, duration: "40 mins" },
    ],
  },
  {
    id: "carpenter",
    name: "Carpenter",
    art: "carpenter",
    blurb: "Doors, furniture, and woodwork at the site.",
    packages: [
      { id: "ca-door", name: "Door hinge / lock fix", price: 249, mrp: 349, duration: "45 mins" },
      { id: "ca-shelf", name: "Shelf installation", price: 399, mrp: 549, duration: "60 mins" },
      { id: "ca-furniture", name: "Furniture assembly", price: 499, mrp: 699, duration: "90 mins" },
      { id: "ca-polish", name: "Wood polish (small)", price: 349, mrp: 449, duration: "60 mins" },
    ],
  },
  {
    id: "ac",
    name: "AC service",
    art: "ac",
    blurb: "Install, gas, and servicing for split and window ACs.",
    packages: [
      { id: "ac-clean", name: "AC deep clean", price: 499, mrp: 699, duration: "60 mins" },
      { id: "ac-gas", name: "Gas refill check", price: 1499, mrp: 1899, duration: "75 mins" },
      { id: "ac-install", name: "Split AC installation", price: 1899, mrp: 2499, duration: "2 hrs" },
      { id: "ac-repair", name: "AC not cooling visit", price: 299, mrp: 399, duration: "45 mins" },
    ],
  },
  {
    id: "paint",
    name: "Paint",
    art: "paint",
    blurb: "Interior and exterior painting for homes and sites.",
    packages: [
      { id: "pt-room", name: "1 room interior paint", price: 2499, mrp: 3200, duration: "1 day" },
      { id: "pt-touch", name: "Touch-up / putty", price: 399, mrp: 549, duration: "2 hrs" },
      { id: "pt-door", name: "Door / grille paint", price: 699, mrp: 899, duration: "3 hrs" },
      { id: "pt-consult", name: "Colour consult visit", price: 149, mrp: 249, duration: "30 mins" },
    ],
  },
  {
    id: "ro",
    name: "RO service",
    art: "ro",
    blurb: "Filter change, installation, and water-purifier repair.",
    packages: [
      { id: "ro-filter", name: "Filter replacement", price: 399, mrp: 549, duration: "40 mins" },
      { id: "ro-install", name: "New RO installation", price: 699, mrp: 999, duration: "90 mins" },
      { id: "ro-service", name: "Annual service", price: 499, mrp: 699, duration: "60 mins" },
      { id: "ro-repair", name: "RO not working visit", price: 199, mrp: 299, duration: "45 mins" },
    ],
  },
  {
    id: "tile-marble",
    name: "Tile and marbles",
    art: "tile",
    blurb: "Floor, wall, and marble fixing for bathrooms and rooms.",
    packages: [
      { id: "tm-floor", name: "Floor tiling (visit)", price: 399, mrp: 549, duration: "45 mins" },
      { id: "tm-bath", name: "Bathroom tile repair", price: 499, mrp: 699, duration: "90 mins" },
      { id: "tm-marble", name: "Marble polishing", price: 899, mrp: 1199, duration: "3 hrs" },
      { id: "tm-grout", name: "Grout filling", price: 299, mrp: 399, duration: "60 mins" },
    ],
  },
  {
    id: "waterproofing",
    name: "Waterproofing",
    art: "waterproof",
    blurb: "Terrace, bathroom, and seepage treatment — all areas open.",
    packages: [
      { id: "wp-bath", name: "Bathroom waterproofing", price: 1499, mrp: 1999, duration: "4 hrs" },
      { id: "wp-terrace", name: "Terrace coating visit", price: 799, mrp: 999, duration: "2 hrs" },
      { id: "wp-seep", name: "Seepage inspection", price: 249, mrp: 349, duration: "40 mins" },
      { id: "wp-tank", name: "Overhead tank coating", price: 999, mrp: 1299, duration: "3 hrs" },
    ],
  },
];

export function getService(id: string) {
  return SERVICES.find((item) => item.id === id);
}

export function searchServices(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return SERVICES;
  return SERVICES.filter((item) => {
    const haystack = `${item.name} ${item.blurb} ${item.packages.map((p) => p.name).join(" ")}`.toLowerCase();
    return haystack.includes(q);
  });
}
