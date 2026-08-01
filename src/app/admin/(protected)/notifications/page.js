"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  dismissNotification,
} from "./actions";

const typeMeta = {
  inquiry: {
    label: "Booking Inquiry",
    badge: "bg-gold/20 text-dark",
    icon: (
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
          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
        />
      </svg>
    ),
  },
  newsletter: {
    label: "Newsletter",
    badge: "bg-[#2E5A4A]/15 text-dark",
    icon: (
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
          d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
        />
      </svg>
    ),
  },
};

const filters = ["All", "Booking Inquiry", "Newsletter"];

export default function AdminNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const [now] = useState(() => Date.now());

  async function loadNotifications() {
    setLoading(true);
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch (err) {
      console.error("Failed to load notifications:", err.message);
    }
    setLoading(false);
  }
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time load on mount, safe
    loadNotifications();
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const visible = notifications.filter((n) => {
    if (activeFilter === "All") return true;
    return typeMeta[n.type].label === activeFilter;
  });

  async function markAsRead(n) {
    setNotifications(
      notifications.map((x) => (x.id === n.id ? { ...x, read: true } : x)),
    );
    try {
      await markNotificationRead(n.table, n.rawId);
    } catch (err) {
      alert("Failed to update: " + err.message);
    }
  }

  async function markAllRead() {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
    try {
      await markAllNotificationsRead();
    } catch (err) {
      alert("Failed to update: " + err.message);
    }
  }

  async function remove(n) {
    setNotifications(notifications.filter((x) => x.id !== n.id));
    try {
      await dismissNotification(n.table, n.rawId);
    } catch (err) {
      alert("Failed to dismiss: " + err.message);
    }
  }

  function timeAgo(dateStr, nowTime) {
    const diff = nowTime - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  }

  return (
    <div className="max-w-3xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading text-3xl text-dark mb-1">
            Notifications
          </h1>
          <p className="text-charcoal text-sm">
            {unreadCount > 0
              ? `You have ${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}.`
              : "You're all caught up."}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="text-gold text-sm font-medium hover:underline self-start sm:self-auto"
          >
            Mark all as read
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`text-xs md:text-sm font-medium px-4 py-2 rounded-full transition-colors duration-200 ${
              activeFilter === f
                ? "bg-dark text-white"
                : "bg-white text-dark border border-dark/15 hover:border-gold hover:text-gold"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-charcoal text-sm text-center py-12">
          Loading notifications...
        </p>
      ) : (
        <div className="space-y-3">
          {visible.map((n) => {
            const meta = typeMeta[n.type];
            return (
              <div
                key={n.id}
                className={`bg-white rounded-2xl shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow duration-200 ${
                  !n.read ? "border-l-4 border-gold" : ""
                }`}
              >
                <span
                  className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${meta.badge}`}
                >
                  {meta.icon}
                </span>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-dark text-sm font-semibold">{n.title}</p>
                    {!n.read && (
                      <span className="w-2 h-2 rounded-full bg-gold" />
                    )}
                  </div>
                  <p className="text-charcoal text-sm mb-1">{n.detail}</p>
                  <p className="text-charcoal/50 text-xs">
                    {timeAgo(n.time, now)}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {!n.read && (
                    <button
                      onClick={() => markAsRead(n)}
                      className="w-8 h-8 rounded-full bg-dark/5 hover:bg-dark/10 flex items-center justify-center text-dark"
                      aria-label="Mark as read"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    </button>
                  )}
                  <button
                    onClick={() => remove(n)}
                    className="w-8 h-8 rounded-full bg-dark/5 hover:bg-red-50 hover:text-red-600 flex items-center justify-center text-dark"
                    aria-label="Dismiss"
                  >
                    <svg
                      className="w-4 h-4"
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
                </div>
              </div>
            );
          })}
        </div>
      )}

      {!loading && visible.length === 0 && (
        <p className="text-charcoal text-sm text-center py-12">
          No notifications in this category.
        </p>
      )}

      <div className="mt-8 bg-cream rounded-2xl p-5 text-center">
        <p className="text-charcoal text-sm">
          Manage which notifications you receive by email in{" "}
          <Link
            href="/admin/settings"
            className="text-gold font-medium hover:underline"
          >
            Settings
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
