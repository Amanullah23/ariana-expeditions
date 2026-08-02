"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  FaGauge,
  FaMapLocationDot,
  FaGlobe,
  FaComment,
  FaGear,
  FaBook,
} from "react-icons/fa6";

const navData = [
  {
    type: "link",
    label: "Dashboard",
    href: "/admin",
    icon: <FaGauge className="w-5 h-5" />,
  },
  {
    type: "group",
    key: "trips",
    label: "Trips",
    icon: <FaMapLocationDot className="w-5 h-5" />,
    links: [
      { label: "All Trips", href: "/admin/trips" },
      { label: "Add New Trip", href: "/admin/trips/new" },
    ],
  },
  {
    type: "group",
    key: "content",
    label: "Content",
    icon: <FaGlobe className="w-5 h-5" />,
    links: [
      { label: "Blog", href: "/admin/blog" },
      { label: "Destinations", href: "/admin/destinations" },
      { label: "Testimonials", href: "/admin/testimonials" },
      { label: "FAQ", href: "/admin/faq" },
    ],
  },
  {
    type: "group",
    key: "admin",
    label: "Administration",
    icon: <FaGear className="w-5 h-5" />,
    links: [{ label: "Settings", href: "/admin/settings" }],
  },
];

export default function AdminSidebar({
  mobileOpen,
  onMobileClose,
  collapsed,
  onToggleCollapse,
}) {
  const pathname = usePathname();
  const [openGroups, setOpenGroups] = useState({
    trips: true,
    content: false,
    admin: false,
  });

  function toggleGroup(key) {
    if (collapsed) return;
    setOpenGroups((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <>
      {mobileOpen && (
        <div
          onClick={onMobileClose}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      <aside
        className={`bg-dark text-white/80 h-screen fixed left-0 top-0 z-50 flex flex-col transition-all duration-300
          w-72 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 ${collapsed ? "md:w-20" : "md:w-72"}`}
      >
        <div
          className={`flex items-center justify-between border-b border-white/10 py-6 ${collapsed ? "px-3" : "px-6"}`}
        >
          <div className="flex items-center gap-3 overflow-hidden">
            <span className="shrink-0 font-heading text-base font-bold text-white">
              AE
            </span>
            {!collapsed && (
              <div className="whitespace-nowrap">
                <p className="text-white text-sm font-semibold leading-tight">
                  Ariana Expeditions
                </p>
                <p className="text-white/40 text-xs">Admin Panel</p>
              </div>
            )}
          </div>

          <button
            onClick={onMobileClose}
            aria-label="Close menu"
            className="md:hidden text-white/60 hover:text-white shrink-0"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <button
            onClick={onToggleCollapse}
            aria-label="Toggle sidebar"
            className="hidden md:flex text-white/50 hover:text-white shrink-0"
          >
            <svg
              className={`w-5 h-5 transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            </svg>
          </button>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto overflow-x-hidden">
          {navData.map((item) => {
            if (item.type === "link") {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onMobileClose}
                  title={collapsed ? item.label : undefined}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors duration-200 ${
                    collapsed ? "justify-center" : ""
                  } ${
                    active
                      ? "bg-gold text-dark font-semibold"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.icon}
                  {!collapsed && item.label}
                </Link>
              );
            }

            const groupActive = item.links.some((l) => pathname === l.href);
            const isOpen = collapsed ? false : openGroups[item.key];

            return (
              <div key={item.key}>
                <button
                  onClick={() => toggleGroup(item.key)}
                  title={collapsed ? item.label : undefined}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors duration-200 ${
                    collapsed ? "justify-center" : "justify-between"
                  } ${
                    groupActive
                      ? "text-gold"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    {item.icon}
                    {!collapsed && (
                      <span className="text-xs font-semibold tracking-wider uppercase">
                        {item.label}
                      </span>
                    )}
                  </span>
                  {!collapsed && (
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </button>

                {!collapsed && (
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? "max-h-40" : "max-h-0"
                    }`}
                  >
                    <div className="ml-5 pl-4 pr-2 py-1 space-y-1 border-l border-white/20">
                      {item.links.map((l) => {
                        const active = pathname === l.href;
                        return (
                          <Link
                            key={l.href}
                            href={l.href}
                            onClick={onMobileClose}
                            className={`block px-2 py-2 rounded-md text-sm transition-colors duration-200 ${
                              active
                                ? "text-gold font-medium"
                                : "text-white/60 hover:text-white"
                            }`}
                          >
                            {l.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div
          className={`border-t border-white/10 py-4 ${collapsed ? "px-3" : "px-3"}`}
        >
          <Link
            href="/admin/guide"
            title={collapsed ? "User Guide" : undefined}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/70 hover:bg-white/5 hover:text-white transition-colors duration-200 ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <svg
              className="w-5 h-5 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.6}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
              />
            </svg>
            {!collapsed && "User Guide"}
          </Link>
        </div>
      </aside>
    </>
  );
}
