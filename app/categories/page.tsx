"use client";

import Link from "next/link";
import { CATEGORIES } from "@/lib/catalog";
import { CategoryArt } from "@/components/CategoryArt";
import { MobileShell } from "@/components/MobileShell";
import { BottomNav } from "@/components/BottomNav";

export default function CategoriesIndexPage() {
  return (
    <MobileShell>
      <div className="flex min-h-dvh flex-col bg-white">
        <h1 className="px-4 pt-5 text-[22px] font-bold text-kowi-ink">
          Categories
        </h1>
        <div className="grid grid-cols-4 gap-x-2 gap-y-4 px-4 pb-8 pt-4">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.id}`}
              className="text-center"
            >
              <CategoryArt art={category.art} />
              <span className="mt-1.5 block text-[11px] leading-4 text-kowi-ink">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-auto">
          <BottomNav />
        </div>
      </div>
    </MobileShell>
  );
}
