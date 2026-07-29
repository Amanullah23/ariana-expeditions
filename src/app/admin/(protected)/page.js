import Link from "next/link";

const stats = [
  {
    label: "Active Trips",
    value: "4",
    badge: "bg-dark text-white",
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
          d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.83a1.125 1.125 0 00-1.006 0L3.622 6.267A1.125 1.125 0 003 7.273v13.427c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0z"
        />
      </svg>
    ),
  },
  {
    label: "Destinations",
    value: "3",
    badge: "bg-gold text-dark",
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
          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
        />
      </svg>
    ),
  },
  {
    label: "Testimonials",
    value: "5",
    badge: "bg-[#7A2E2E] text-white",
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
          d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
        />
      </svg>
    ),
  },
  {
    label: "FAQ Items",
    value: "14",
    badge: "bg-[#2E5A4A] text-white",
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
          d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 17.25h.007v.008H12v-.008z"
        />
      </svg>
    ),
  },
  {
    label: "New Inquiries",
    value: "6",
    badge: "bg-[#111827] text-white",
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
];

const recentActivity = [
  {
    action: "Updated itinerary",
    item: "The Grand Silk Road Expedition",
    time: "2 hours ago",
  },
  { action: "Added photo", item: "Bamyan & Band-e Amir", time: "1 day ago" },
  {
    action: "Edited FAQ",
    item: "Is it safe to travel to Afghanistan?",
    time: "3 days ago",
  },
  {
    action: "New inquiry received",
    item: "From: Sarah M.",
    time: "4 days ago",
  },
];

const upcoming = [
  { label: "Follow up: Sarah M. inquiry", date: "Today" },
  { label: "Wakhan trip departure prep", date: "Aug 15" },
  { label: "Domain renewal reminder", date: "Sept 12" },
];

export default function AdminDashboard() {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading text-3xl md:text-4xl text-dark mb-1">
            Dashboard
          </h1>
          <p className="text-charcoal text-sm">
            Overview of your website content at a glance.
          </p>
        </div>

        <Link
          href="/admin/guide"
          className="inline-flex items-center gap-2 bg-dark hover:bg-dark-2 transition-colors duration-200 text-white font-semibold rounded-full px-6 py-3 self-start sm:self-auto"
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
              d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
            />
          </svg>
          User Guide
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl shadow-sm p-5">
            <span
              className={`inline-flex items-center justify-center w-11 h-11 rounded-xl mb-4 ${s.badge}`}
            >
              {s.icon}
            </span>
            <p className="font-heading text-2xl md:text-3xl text-dark mb-1">
              {s.value}
            </p>
            <p className="text-charcoal text-xs md:text-sm">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
          <h2 className="font-heading text-lg text-dark mb-4">
            Recent Activity
          </h2>
          <ul className="divide-y divide-dark/5">
            {recentActivity.map((a, i) => (
              <li key={i} className="py-3 flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-dark/5 text-dark flex items-center justify-center shrink-0">
                  <svg
                    className="w-4.5 h-4.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                </span>
                <div className="flex-1">
                  <p className="text-sm text-dark font-medium">{a.action}</p>
                  <p className="text-charcoal text-xs">{a.item}</p>
                </div>
                <span className="text-charcoal text-xs whitespace-nowrap">
                  {a.time}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="font-heading text-lg text-dark mb-4">Upcoming</h2>
          <ul className="divide-y divide-dark/5">
            {upcoming.map((u, i) => (
              <li
                key={i}
                className="py-3 flex items-center justify-between gap-3"
              >
                <p className="text-sm text-dark">{u.label}</p>
                <span className="bg-gold/20 text-dark text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                  {u.date}
                </span>
              </li>
            ))}
          </ul>

          <h2 className="font-heading text-lg text-dark mb-4 mt-8">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <Link
              href="/admin/trips/new"
              className="block w-full text-left text-sm bg-cream hover:bg-gold/20 transition-colors duration-200 rounded-lg px-4 py-3 text-dark font-medium"
            >
              + Add New Trip
            </Link>
            <Link
              href="/admin/testimonials/new"
              className="block w-full text-left text-sm bg-cream hover:bg-gold/20 transition-colors duration-200 rounded-lg px-4 py-3 text-dark font-medium"
            >
              + Add Testimonial
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
