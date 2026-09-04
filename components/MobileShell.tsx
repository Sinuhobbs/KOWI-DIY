"use client";

export function MobileShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="min-h-dvh bg-[#e8e8e8]">
      <div
        className={`relative mx-auto flex min-h-dvh w-full max-w-[430px] flex-col bg-white ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
