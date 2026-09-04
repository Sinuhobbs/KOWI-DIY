const PHONE_KEY = "kowi.phone";
const SESSION_KEY = "kowi.session";

export function savePhone(phone: string) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(PHONE_KEY, phone);
}

export function readPhone() {
  if (typeof window === "undefined") return "";
  return sessionStorage.getItem(PHONE_KEY) ?? "";
}

export function saveGuestSession() {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(SESSION_KEY, "guest");
}

export function saveVerifiedSession(phone: string) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(SESSION_KEY, `user:${phone}`);
}
