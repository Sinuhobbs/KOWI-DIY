export type Brand = {
  id: string;
  name: string;
  query?: string;
};

export const BRANDS: Brand[] = [
  { id: "hettich", name: "Hettich" },
  { id: "action-tesa", name: "Action TESA", query: "Action Tesa" },
  { id: "araldite", name: "Araldite" },
  { id: "bosch", name: "Bosch" },
  { id: "centuryply", name: "CenturyPly", query: "Century" },
  { id: "fevicol", name: "Fevicol" },
  { id: "fevikwik", name: "Fevikwik" },
  { id: "freemans", name: "Freemans" },
  { id: "philips", name: "Philips" },
  { id: "polycab", name: "Polycab" },
  { id: "roff", name: "Roff" },
  { id: "schneider", name: "Schneider" },
  { id: "ultratech", name: "UltraTech" },
  { id: "dr-fixit", name: "Dr. Fixit" },
  { id: "myk-laticrete", name: "MYK Laticrete" },
  { id: "jaquar", name: "Jaquar" },
  { id: "berger", name: "Berger" },
  { id: "anchor", name: "Anchor By Panasonic", query: "Anchor" },
  { id: "sakarni", name: "Sakarni" },
  { id: "dorset", name: "Dorset" },
  { id: "crompton", name: "Crompton" },
  { id: "pidilite", name: "Pidilite" },
  { id: "birla-opus", name: "Birla Opus", query: "Birla" },
  { id: "ecolink", name: "EcoLink" },
];

export function brandLogo(id: string) {
  return `/catalog/brands/${id}.png`;
}

export function brandInitials(name: string) {
  const parts = name
    .replace(/\bBy\b/gi, "")
    .split(/[\s.]+/)
    .filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return parts
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}
