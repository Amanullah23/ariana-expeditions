"use client";
import { useState } from "react";
import Link from "next/link";
import { mockNotifications, typeMeta } from "./mockData";

const filters = ["All", "Booking Inquiry", "Newsletter", "System"];

export default function AdminNotifications() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [activeFilter, setActiveFilter] = useState("All");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const visible = notifications.filter((n) => {
    if (activeFilter === "All") return true;
    return typeMeta[n.type].label === activeFilter;
  });

  function markAsRead(id) {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  }

  function markAllRead() {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  }

  function remove(id) {
    setNotifications(notifications.filter((n) => n.id !== id));
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

      <div className="space-y-3">
        {visible.map((n) => {
          const meta = typeMeta[n.type];
          return (
            <div
              key={n.id}
              className={`bg-white rounded-2xl shadow-sm p-5 flex items-start gap-4 ${
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
                  {!n.read && <span className="w-2 h-2 rounded-full bg-gold" />}
                </div>
                <p className="text-charcoal text-sm mb-1">{n.detail}</p>
                <p className="text-charcoal/50 text-xs">{n.time}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {!n.read && (
                  <button
                    onClick={() => markAsRead(n.id)}
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
                  onClick={() => remove(n.id)}
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

      {visible.length === 0 && (
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
