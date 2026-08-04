const sections = [
  {
    title: "Dashboard",
    desc: "Your home screen when you log in. Shows quick stats (trips, destinations, testimonials, FAQ items, new inquiries), Recent Activity, your latest Notifications, and Quick Action shortcuts.",
  },
  {
    title: "Trips",
    desc: 'Manage every itinerary shown on the public Trips page. Click "Add New Trip" to create one, or the pencil icon to edit. Each trip has basic info (title, duration, region, difficulty), a highlights list, includes/excludes, and a day-by-day itinerary you can add or remove days from freely. Cover photos upload directly from your computer.',
  },
  {
    title: "Destinations",
    desc: "Manage the three themed destination groups (Echoes of Ariana, Valleys of Time, Mountains & Nomads). Each theme has its own intro text and a list of specific places — add or remove places as needed. Note: the gallery field currently accepts a pasted image link rather than a direct upload.",
  },
  {
    title: "Testimonials",
    desc: "Add, edit, or remove traveler quotes shown on the homepage. Each one needs a name, location, and quote — a photo is optional.",
  },
  {
    title: "FAQ",
    desc: "Manage the questions shown on the public FAQ page, grouped by category (Safety & Ethics, Visa & Entry, Women Travelers, Logistics & Practicalities, Cultural & Legal Considerations, Health & Preparation). Pick a category when adding a question so it appears in the right section.",
  },
  {
    title: "Blog",
    desc: 'Write and publish travel guide articles ("The Ariana Journal") — safety, visas, culture, food, and more. Use the formatting toolbar above the content box to add headings, bold text, and bullet lists. Leave "Published" unchecked to save an article as a private draft you can finish later.',
  },
  {
    title: "Notifications",
    desc: "Every booking inquiry and newsletter signup from the public site appears here automatically, in real time. Mark items as read, dismiss them, or filter by type. The bell icon in the top bar always shows your current unread count.",
  },
  {
    title: "Settings — Profile & Password",
    desc: "Update your display name and login email (email changes require confirming via a link sent to the new address). Change your password anytime by entering your current one plus a new one, twice.",
  },
  {
    title: "Settings — Two-Factor Authentication",
    desc: "Each person sharing this login can add their own independent authenticator device — give it a name (e.g. \"Jalal's Phone\"), scan the QR code with an app like Google Authenticator, and confirm with the 6-digit code. Everyone uses the same email and password, but enters their own device's code at login. Remove a device anytime if a phone is lost or replaced.",
  },
  {
    title: "Settings — Notification Preferences",
    desc: "Two simple toggles let you choose whether you're notified about new booking inquiries and newsletter signups.",
  },
];

const security = [
  {
    title: "Forgot Password",
    desc: 'Click "Forgot password?" on the login page, enter your email, and check your inbox for a reset link. Setting a new password takes you straight back to login.',
  },
  {
    title: "Automatic Sign-Out",
    desc: "For security, you're automatically signed out after 30 minutes of inactivity. A warning appears one minute beforehand with a countdown — click \"Stay Signed In\" to continue working, or you'll be returned to the login page.",
  },
  {
    title: "Adding New Admin Users",
    desc: "New dashboard accounts cannot be created from inside the dashboard — there is no public sign-up page anywhere on the site. Contact your developer to set up a new authorized account securely.",
  },
];

const tips = [
  "Changes you make here update the live website immediately — always double check details before saving.",
  "Deleting an item cannot be undone, so use the delete (trash icon) button carefully.",
  "Photos should be clear, well-lit, and landscape-oriented where possible for the best fit on the site.",
  "Visitors can search and filter trips by keyword, region, and difficulty on the public Trips page — accurate region/difficulty fields help this work well.",
  "If something looks wrong on the public site after an edit, try refreshing the page — changes usually appear instantly, but your browser may occasionally show a cached version.",
  "Never share your password or 2FA codes with anyone.",
];

export default function AdminGuide() {
  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="font-heading text-3xl text-dark mb-1">User Guide</h1>
        <p className="text-charcoal text-sm">
          A quick reference for managing your Ariana Expeditions website.
        </p>
      </div>

      <div className="space-y-4 mb-10">
        {sections.map((s) => (
          <div key={s.title} className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="font-heading text-lg text-dark mb-2">{s.title}</h2>
            <p className="text-charcoal text-sm leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>

      <h2 className="font-heading text-xl text-dark mb-4">Account Security</h2>
      <div className="space-y-4 mb-10">
        {security.map((s) => (
          <div key={s.title} className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="font-heading text-base text-dark mb-2">{s.title}</h3>
            <p className="text-charcoal text-sm leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-dark rounded-2xl p-6">
        <h2 className="font-heading text-lg text-white mb-4">Helpful Tips</h2>
        <ul className="space-y-3">
          {tips.map((tip, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-white/80 text-sm"
            >
              <span className="text-gold shrink-0 mt-0.5">•</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 bg-white rounded-2xl shadow-sm p-6 text-center">
        <p className="text-charcoal text-sm mb-1">
          Need help with something not covered here?
        </p>
        <p className="text-charcoal/60 text-xs mb-3">
          Contact your developer, Amanullah Yawari
        </p>
        <a
          href="https://wa.me/93787484323"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#25D366] hover:opacity-90 transition-opacity duration-200 text-white font-medium text-sm px-5 py-2.5 rounded-full"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12.004 2C6.478 2 2 6.478 2 12.004c0 1.858.502 3.665 1.453 5.243L2 22l4.887-1.417a9.96 9.96 0 004.117.876h.005c5.526 0 10.004-4.478 10.004-10.004C21.013 6.478 16.53 2 12.004 2zm5.836 15.833a8.286 8.286 0 01-5.831 2.42h-.004a8.311 8.311 0 01-4.235-1.16l-.303-.18-3.15.913.842-3.07-.198-.315a8.28 8.28 0 01-1.27-4.437c0-4.583 3.73-8.312 8.317-8.312a8.26 8.26 0 015.878 2.437 8.259 8.259 0 012.436 5.878 8.29 8.29 0 01-2.482 5.826z" />
          </svg>
          Chat on WhatsApp
        </a>
      </div>
    </div>
  );
}
