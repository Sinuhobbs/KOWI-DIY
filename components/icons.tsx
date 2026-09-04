export function HomeIcon({ active = false }: { active?: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 10.5L12 4L20 10.5V20H14.5V14.5H9.5V20H4V10.5Z"
        fill={active ? "#c6e400" : "none"}
        stroke={active ? "#1D1D1F" : "#6b7280"}
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BagIcon({ active = false }: { active?: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 8H18L19 20H5L6 8Z"
        fill={active ? "#c6e400" : "none"}
        stroke={active ? "#1D1D1F" : "#6b7280"}
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M9 8V7C9 5.3 10.3 4 12 4C13.7 4 15 5.3 15 7V8"
        stroke={active ? "#1D1D1F" : "#6b7280"}
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function GridIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="4" width="6.5" height="6.5" rx="1.2" stroke="#6b7280" strokeWidth="1.7" />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.2" stroke="#6b7280" strokeWidth="1.7" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.2" stroke="#6b7280" strokeWidth="1.7" />
      <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.2" stroke="#6b7280" strokeWidth="1.7" />
    </svg>
  );
}

export function SearchIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16 16L20 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function WalletIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="6" width="18" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3 10H21" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="16.5" cy="14.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function ProfileIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M5 19C5.8 15.8 8.5 14 12 14C15.5 14 18.2 15.8 19 19"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ChevronDown() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronRight({ className = "" }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CrosshairIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="7" stroke="#1aa34a" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="2.2" fill="#1aa34a" />
      <path d="M12 3V6M12 18V21M3 12H6M18 12H21" stroke="#1aa34a" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function PlusIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 5V19M5 12H19" stroke="#1aa34a" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export function TruckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 7H14V16H3V7Z"
        stroke="#1aa34a"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M14 10H19L21 13.5V16H14V10Z"
        stroke="#1aa34a"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="6.5" cy="16.5" r="1.6" fill="#1aa34a" />
      <circle cx="17.5" cy="16.5" r="1.6" fill="#1aa34a" />
    </svg>
  );
}

export function WalletHeroIcon() {
  return (
    <svg width="42" height="42" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3"
        y="7"
        width="18"
        height="12"
        rx="2.4"
        stroke="#1D1D1F"
        strokeWidth="1.7"
      />
      <path
        d="M3 11H21"
        stroke="#1D1D1F"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M16 7V5.8C16 4.8 15.2 4 14.2 4H6.8C5.8 4 5 4.8 5 5.8V7"
        stroke="#1D1D1F"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="16.5" cy="14.8" r="1.15" fill="#1D1D1F" />
    </svg>
  );
}

export function ReceiptIcon() {
  return (
    <svg width="52" height="52" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 4H17V20L15.5 18.8L14 20L12 18.8L10 20L8.5 18.8L7 20V4Z"
        stroke="#d1d5db"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 8.5H14.5M9.5 12H14.5M9.5 15.5H12.5"
        stroke="#d1d5db"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MenuReceiptIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 4H17V20L15.6 18.9L14 20L12 18.9L10 20L8.4 18.9L7 20V4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 8.5H14.5M9.5 12H14.5M9.5 15.2H12.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function HelpCircleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M9.8 9.4C10.1 8.4 11 7.8 12.1 7.8C13.4 7.8 14.3 8.6 14.3 9.8C14.3 11.2 12.9 11.7 12.3 12.3C12 12.6 12 13 12 13.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="12" cy="16.2" r="0.9" fill="currentColor" />
    </svg>
  );
}

export function GlobeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M4.5 12H19.5M12 4C9.8 6.6 9.8 17.4 12 20M12 4C14.2 6.6 14.2 17.4 12 20"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

export function DocIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 4H14L18 8V20H7V4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M14 4V8H18" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M10 12H15M10 15.5H13.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function TeamsIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="9" cy="8.5" r="2.3" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16" cy="9" r="2" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M4.5 18C5.2 14.9 7.2 13.4 9 13.4C10.8 13.4 12.8 14.9 13.5 18"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M14.2 14C15.4 13.6 16.8 13.6 18.2 14.6C19.4 15.5 20.1 16.8 20.4 18"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21S6 13.8 6 10C6 6.7 8.7 4 12 4C15.3 4 18 6.7 18 10C18 13.8 12 21 12 21Z"
        stroke="#1aa34a"
        strokeWidth="1.7"
      />
      <circle cx="12" cy="10" r="2" fill="#1aa34a" />
    </svg>
  );
}
