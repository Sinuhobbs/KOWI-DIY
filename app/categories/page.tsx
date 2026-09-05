"use client";

import Link from "next/link";
import {
  CATEGORY_GROUPS,
  categoryImage,
  categoryLabel,
  getCategory,
} from "@/lib/catalog";
import { CategoryArt } from "@/components/CategoryArt";
import { MobileShell } from "@/components/MobileShell";
import { BottomNav } from "@/components/BottomNav";
import { StoreHeader } from "@/components/StoreHeader";
import { ListingDock } from "@/components/ListingDock";

export default function CategoriesIndexPage() {
  return (
    <MobileShell>
      <div className="flex h-full min-h-0 flex-col overflow-hidden bg-white">
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain">
          <StoreHeader
            collapsible
            searchPlaceholder={'Search "cement"'}
          />

          {CATEGORY_GROUPS.map((group) => (
            <section key={group.title} className="px-4 pt-5">
              <h2 className="mb-3 text-[18px] font-bold text-kowi-ink">
                {group.title}
              </h2>
              <div
                className={
                  group.columns === 4
                    ? "grid grid-cols-4 gap-x-2.5 gap-y-5"
                    : "grid grid-cols-3 gap-x-3 gap-y-5"
                }
              >
                {group.ids.map((id) => {
                  const category = getCategory(id);
                  if (!category) return null;
                  return (
                    <Link
                      key={category.id}
                      href={`/categories/${category.id}`}
                      className="text-center"
                    >
                      <div className="relative">
                        <CategoryArt
                          art={category.art}
                          image={categoryImage(category)}
                        />
                        {category.isNew ? (
                          <span className="absolute right-0 top-0 rounded-sm bg-[#e11d2a] px-1 py-px text-[8px] font-bold uppercase text-white">
                            New
                          </span>
                        ) : null}
                      </div>
                      <span className="mt-1.5 block text-[12px] leading-4 text-kowi-ink">
                        {categoryLabel(category)}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}

          <div className="h-4 shrink-0" />
        </div>
        <ListingDock offset="nav" />
        <BottomNav />
      </div>
    </MobileShell>
  );
}
