export const mockNotifications = [
  {
    id: "1",
    type: "inquiry",
    title: "New booking inquiry",
    detail: "Sarah M. — Grand Silk Road Expedition, Sept 2026",
    time: "4 hours ago",
    read: false,
  },
  {
    id: "2",
    type: "newsletter",
    title: "New newsletter signup",
    detail: "elena.v@example.com subscribed",
    time: "1 day ago",
    read: false,
  },
  {
    id: "3",
    type: "inquiry",
    title: "New booking inquiry",
    detail: "Heinrich M. — Wakhan & The Roof of Afghanistan, custom dates",
    time: "2 days ago",
    read: true,
  },
  {
    id: "4",
    type: "system",
    title: "Domain renewal reminder",
    detail: "arianaexpeditions.com renews in 30 days",
    time: "3 days ago",
    read: true,
  },
  {
    id: "5",
    type: "newsletter",
    title: "New newsletter signup",
    detail: "claire.d@example.com subscribed",
    time: "5 days ago",
    read: true,
  },
];

export const typeMeta = {
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
  system: {
    label: "System",
    badge: "bg-dark/10 text-dark",
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
          d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
        />
      </svg>
    ),
  },
};
