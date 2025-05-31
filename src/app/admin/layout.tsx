"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutDashboard, Boxes, Tags, Settings } from "lucide-react";

const navLinks = [
  { href: "/admin/book", label: "Book", icon: LayoutDashboard },
  { href: "/admin/masters", label: "Masters", icon: Tags },
  { href: "/admin/services", label: "Services", icon: Boxes },
  { href: "/admin/settings", label: "Settings", icon: Settings },
  { href: "/", label: "Home", icon: Home },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex">
      <aside className="w-64 min-h-screen bg-white border-r border-gray-200 shadow-sm p-5 flex flex-col gap-1">
        <div className="text-xl font-bold mb-6 text-blue-600">Admin Panel</div>
        {navLinks.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === "/" ? pathname === href : pathname?.startsWith(href);

          return (
            <Link
              href={href}
              key={href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all text-decoration-none
                ${
                  isActive
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                }`}
            >
              <Icon size={20} />
              <span>{label}</span>
            </Link>
          );
        })}
      </aside>
      <div className="w-full bg-gray-100 text-center overflow-hidden whitespace-nowrap">
        <div className="bg-white h-[80px]">
          <div className="mt-4 inline-block animate-marquee text-gray-700">
            Hello! This barbershop website is currently in test mode. Please
            enter minimal information. Thank you for visiting!
          </div>
        </div>
        <main className="flex-1 p-8 pb-0">{children}</main>
      </div>
    </div>
  );
}
