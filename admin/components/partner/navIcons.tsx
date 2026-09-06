function stroke(active: boolean) {
  return active ? "#1D1D1F" : "#6b7280";
}

export function DashboardNavIcon({ active = false }: { active?: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 10.5L12 4L20 10.5V20H14.5V14.5H9.5V20H4V10.5Z"
        fill={active ? "#c6e400" : "none"}
        stroke={stroke(active)}
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function OrdersNavIcon({ active = false }: { active?: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5.5 8H18.5L19.5 20H4.5L5.5 8Z"
        fill={active ? "#c6e400" : "none"}
        stroke={stroke(active)}
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M9 8V7C9 5.3 10.3 4 12 4C13.7 4 15 5.3 15 7V8"
        stroke={stroke(active)}
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function InventoryNavIcon({ active = false }: { active?: boolean }) {
  const color = stroke(active);
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="5"
        y="4"
        width="14"
        height="16"
        rx="2"
        fill={active ? "#c6e400" : "none"}
        stroke={color}
        strokeWidth="1.7"
      />
      <path d="M9 9H15M9 12.5H15M9 16H13" stroke={color} strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function PaymentsNavIcon({ active = false }: { active?: boolean }) {
  const color = stroke(active);
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3"
        y="6"
        width="18"
        height="13"
        rx="2.5"
        fill={active ? "#c6e400" : "none"}
        stroke={color}
        strokeWidth="1.7"
      />
      <path d="M3 10H21" stroke={color} strokeWidth="1.7" />
      <circle cx="16.5" cy="14.5" r="1.2" fill={color} />
    </svg>
  );
}

export function MoreNavIcon({ active = false }: { active?: boolean }) {
  const color = stroke(active);
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 7H19M5 12H19M5 17H19"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SellPlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 5V19M5 12H19"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function StoreNavIcon({ active = false }: { active?: boolean }) {
  const color = stroke(active);
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle
        cx="12"
        cy="12"
        r="3.2"
        fill={active ? "#c6e400" : "none"}
        stroke={color}
        strokeWidth="1.7"
      />
      <path
        d="M12 5V6.5M12 17.5V19M5 12H6.5M17.5 12H19M7.05 7.05L8.1 8.1M15.9 15.9L16.95 16.95M7.05 16.95L8.1 15.9M15.9 8.1L16.95 7.05"
        stroke={color}
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}
