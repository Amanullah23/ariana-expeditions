const sections = [
  {
    title: "Dashboard",
    desc: "Your home screen when you log in. Shows quick stats (trips, destinations, testimonials, FAQ items, inquiries) and recent activity at a glance.",
  },
  {
    title: "Trips",
    desc: 'Manage every itinerary shown on the public Trips page. Click "Add New Trip" to create one, or the pencil icon on any trip card to edit it. Each trip has basic info (title, duration, region, difficulty), a list of highlights, what\'s included/excluded, and a day-by-day itinerary you can add or remove days from freely.',
  },
  {
    title: "Destinations",
    desc: 'Manage the three themed destination groups (e.g. "Ancient Cities"). Each theme has its own intro text, a small photo gallery, and a list of specific places within it — add or remove places as needed.',
  },
  {
    title: "Testimonials",
    desc: "Add, edit, or remove traveler quotes shown on the homepage. Each one needs a name, location, and quote — a photo is optional.",
  },
  {
    title: "FAQ",
    desc: "Manage the questions shown on the public FAQ page, grouped by category (Safety & Ethics, Visa & Entry, etc.). Pick a category when adding a question so it appears in the right section.",
  },
  {
    title: "Settings",
    desc: "Update your admin display name and email, change your password, and control which email notifications you receive (new inquiries, newsletter signups).",
  },
];

const tips = [
  "Changes you make here update the live website — always double check details before saving.",
  "Deleting an item cannot be undone, so use the delete (🗑) button carefully.",
  "Photos should be clear, well-lit, and landscape-oriented where possible for the best fit on the site.",
  "If something looks wrong on the public site after an edit, try refreshing the page — changes may take a moment to appear.",
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
