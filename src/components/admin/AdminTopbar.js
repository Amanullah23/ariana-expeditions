"use client";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import NotificationBadge from "./NotificationBadge";
import { useEffect, useState } from "react";
import {
  FaBell,
  FaUser,
  FaLocationDot,
  FaRightFromBracket,
} from "react-icons/fa6";

export default function AdminTopbar({ onMenuClick, notificationBadge }) {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const router = useRouter();
  const [displayName, setDisplayName] = useState("Admin");

  useEffect(() => {
    async function loadUser() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user?.user_metadata?.display_name) {
        setDisplayName(user.user_metadata.display_name);
      }
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time load on mount, safe
    loadUser();
  }, []);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-30 bg-cream border-b border-dark/10">
      <div className="flex items-center justify-between px-4 md:px-8 py-4">
        {/* Mobile: hamburger. Desktop: welcome message */}
        <button
          onClick={onMenuClick}
          aria-label="Open menu"
          className="md:hidden w-11 h-11 rounded-full bg-dark text-white flex items-center justify-center hover:bg-dark-2 transition-colors duration-200 shrink-0"
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
              d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
            />
          </svg>
        </button>

        <div className="hidden md:flex items-center gap-3">
          <h2 className="font-heading text-xl text-dark">Welcome back</h2>
          <span className="text-dark/20">|</span>
          <div className="flex items-center gap-1.5 text-charcoal text-sm">
            <FaLocationDot className="w-4 h-4 text-gold" />
            Kabul &middot; {today}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/notifications"
            aria-label="Notifications"
            className="relative w-11 h-11 rounded-full bg-dark/5 text-dark flex items-center justify-center hover:bg-dark/10 transition-colors duration-200"
          >
            <FaBell className="w-5 h-5" />
            {notificationBadge}
          </Link>

          <Link
            href="/admin/settings"
            className="flex items-center gap-2 pl-1 pr-1 md:pr-3 py-1 rounded-full hover:bg-dark/5 transition-colors duration-200"
          >
            <span className="w-9 h-9 rounded-full bg-gold flex items-center justify-center shrink-0">
              <FaUser className="w-4.5 h-4.5 text-dark" />
            </span>
            <span className="hidden md:inline text-navy text-sm font-medium">
              {displayName}
            </span>
          </Link>

          <button
            onClick={handleLogout}
            aria-label="Log out"
            className="w-11 h-11 cursor-pointer rounded-full bg-dark/5 text-dark flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
          >
            <FaRightFromBracket className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
