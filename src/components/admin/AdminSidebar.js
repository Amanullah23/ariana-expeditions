"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navData = [
  {
    type: "link",
    label: "Dashboard",
    href: "/admin",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.6}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
        />
      </svg>
    ),
  },
  {
    type: "group",
    key: "trips",
    label: "Trips",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.6}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.83a1.125 1.125 0 00-1.006 0L3.622 6.267A1.125 1.125 0 003 7.273v13.427c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0z"
        />
      </svg>
    ),
    links: [
      { label: "All Trips", href: "/admin/trips" },
      { label: "Add New Trip", href: "/admin/trips/new" },
    ],
  },
  {
    type: "group",
    key: "content",
    label: "Content",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.6}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 4.5h18M3.75 3.75h16.5a.75.75 0 01.75.75v15a.75.75 0 01-.75.75H3.75a.75.75 0 01-.75-.75V4.5a.75.75 0 01.75-.75z"
        />
      </svg>
    ),
    links: [
      { label: "Destinations", href: "/admin/destinations" },
      { label: "Testimonials", href: "/admin/testimonials" },
      { label: "FAQ", href: "/admin/faq" },
    ],
  },
  {
    type: "group",
    key: "admin",
    label: "Administration",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.6}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.28z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
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
                    <div className="pl-11 pr-2 py-1 space-y-1">
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
