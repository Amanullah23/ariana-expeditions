"use client";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function AdminTopbar({ onMenuClick }) {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const router = useRouter();

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
            <svg
              className="w-4 h-4 text-gold"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Kabul &middot; {today}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/notifications"
            aria-label="Notifications"
            className="relative w-11 h-11 rounded-full bg-dark/5 text-dark flex items-center justify-center hover:bg-dark/10 transition-colors duration-200"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
              />
            </svg>
            <span className="absolute -top-0.5 -right-0.5 bg-red-600 text-white text-[10px] font-semibold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
              3
            </span>
          </Link>

          <Link
            href="/admin/settings"
            className="flex items-center gap-2 pl-1 pr-1 md:pr-3 py-1 rounded-full hover:bg-dark/5 transition-colors duration-200"
          >
            <span className="w-9 h-9 rounded-full bg-gold flex items-center justify-center shrink-0">
              <svg
                className="w-4.5 h-4.5 text-dark"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-4.418 0-8 2.239-8 5v1a1 1 0 001 1h14a1 1 0 001-1v-1c0-2.761-3.582-5-8-5z" />
              </svg>
            </span>
            <span className="hidden md:inline text-dark text-sm font-medium">
              Admin
            </span>
          </Link>

          <button
            onClick={handleLogout}
            aria-label="Log out"
            className="w-11 h-11 rounded-full bg-dark/5 text-dark flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 9V5.25A2.25 2.25 0 0110.5 3h6a2.25 2.25 0 012.25 2.25v13.5A2.25 2.25 0 0116.5 21h-6a2.25 2.25 0 01-2.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
