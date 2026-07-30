const sections = [
  {
    title: "1. Logging In",
    items: [
      {
        h: "Where to log in",
        p: "Go to arianaexpeditions.com/admin/login (or arianaexpeditions.com/admin/login once the real domain is connected). This page is private — it does not appear anywhere in the site's normal menus.",
      },
      {
        h: "Your login details",
        p: 'Use the email and password given to you separately. If you ever forget your password, see Section 7 (Changing Your Password) — for now, password resets are handled by contacting your developer directly, not through an automatic "Forgot Password" link.',
      },
      {
        h: "Two-Factor Authentication (2FA)",
        p: "After entering your email and password correctly, you'll be asked for a 6-digit code from an authenticator app on your phone. This is a required second step that keeps your account secure even if someone else ever learned your password.",
      },
    ],
  },
  {
    title: "2. Setting Up Two-Factor Authentication (First Time Only)",
    items: [
      {
        h: "Step 1 — Download an authenticator app",
        p: "On your phone, install one of these free apps from your app store (Google Play or Apple App Store): Google Authenticator, Microsoft Authenticator, or Authy. Any one of these works — Google Authenticator is the simplest choice if you're not sure.",
      },
      {
        h: "Step 2 — Turn on 2FA in the dashboard",
        p: 'Log in, go to Settings (left sidebar), scroll to "Two-Factor Authentication," and click "Set Up Two-Factor Authentication." A QR code (a small square barcode) will appear on screen.',
      },
      {
        h: "Step 3 — Scan the QR code",
        p: 'Open the authenticator app on your phone, tap the + or "Add Account" button, choose "Scan QR Code," and point your phone\'s camera at the QR code on your screen. The app will add an entry called "Ariana Admin 2FA" showing a 6-digit number that changes every 30 seconds.',
      },
      {
        h: "Step 4 — Confirm it",
        p: "Type the current 6-digit number shown in the app into the box on the dashboard and click Verify. You'll see a confirmation that 2FA is now active.",
      },
      {
        h: "Every time you log in from now on",
        p: "After your password, open the authenticator app on your phone, find the current 6-digit code, and type it into the dashboard. Each code is only valid for about 30 seconds, so type it in promptly.",
      },
      {
        h: "If you lose your phone",
        p: "Contact your developer immediately (see the bottom of this page) — 2FA will need to be reset from the Supabase database directly, since there's no self-service recovery option set up.",
      },
    ],
  },
  {
    title: "3. Dashboard Home",
    items: [
      {
        h: "What you see when you log in",
        p: "The main dashboard shows quick numbers (how many trips, destinations, testimonials, and FAQ items exist, plus new inquiries), a Recent Activity list, an Upcoming reminders list, and Quick Action buttons to jump straight to adding a new trip or testimonial.",
      },
    ],
  },
  {
    title: "4. Managing Trips",
    items: [
      {
        h: "Where to go",
        p: 'Click "Trips" in the left sidebar to see every trip currently on the website.',
      },
      {
        h: "Adding a new trip",
        p: 'Click "Add New Trip." Fill in the title, duration (e.g. "10 Days"), region, difficulty level, and a short description. Upload a cover photo from your computer using the photo picker — it uploads automatically, no extra steps needed.',
      },
      {
        h: "Highlights, Includes, Excludes",
        p: 'These are simple bullet-point lists. Click "+ Add item" to add another line, or the ✕ next to a line to remove it.',
      },
      {
        h: "Day-by-Day Itinerary",
        p: 'Click "+ Add day" to add a new day to the itinerary. Each day has a label (e.g. "Day 1–2"), a title (e.g. "Arrival in Kabul"), and a description. Add as many days as the trip needs, in any order — you control the order they appear in.',
      },
      {
        h: "Saving",
        p: 'Click "Create Trip" (or "Save Changes" when editing). The trip appears on the live website immediately — no waiting, no separate publish step.',
      },
      {
        h: "Editing or deleting a trip",
        p: "From the Trips list, click the pencil icon to edit, or the trash icon to delete. Deleting asks you to confirm first, since it cannot be undone.",
      },
    ],
  },
  {
    title: "5. Managing Destinations",
    items: [
      {
        h: "What this section is for",
        p: 'Destinations are the themed groups shown on the public Destinations page (for example "Echoes of Ariana" or "Valleys of Time"), each containing several specific places.',
      },
      {
        h: "Adding a theme",
        p: 'Click "Add New Theme," fill in the title, a short tag line, and an intro paragraph, then upload a cover photo the same way as with Trips.',
      },
      {
        h: "Adding places within a theme",
        p: 'Under "Places," click "+ Add place" for each specific location (e.g. Herat, Bamyan). Give each one a name and a short description.',
      },
      {
        h: "Gallery images",
        p: "This field currently accepts a typed image address (URL) rather than a direct photo upload — this is a known limitation your developer is aware of and can upgrade later. For now, leave this blank unless you have a direct image link to paste in, or ask your developer to add photos here for you.",
      },
    ],
  },
  {
    title: "6. Managing Testimonials",
    items: [
      {
        h: "Adding a traveler quote",
        p: 'Click "Add Testimonial," enter the traveler\'s name, their location (e.g. "Munich, Germany"), and their quote. A photo is optional. These appear in the "What Our Travelers Say" section on the homepage.',
      },
    ],
  },
  {
    title: "7. Managing FAQ",
    items: [
      {
        h: "Adding a question",
        p: 'Click "Add Question," choose a category from the dropdown (Safety & Ethics, Visa & Entry, Women Travelers, Logistics & Practicalities, Cultural & Legal Considerations, or Health & Preparation), then type the question and answer.',
      },
      {
        h: "How categories work",
        p: "Questions are automatically grouped by category on the public FAQ page — you don't need to worry about ordering them, just pick the right category for each one.",
      },
    ],
  },
  {
    title: "8. Settings — Your Profile",
    items: [
      {
        h: "Updating your name or email",
        p: "Go to Settings → Profile. Update your display name or email address and click Save Profile.",
      },
    ],
  },
  {
    title: "9. Changing Your Password",
    items: [
      {
        h: "How to change it",
        p: "Go to Settings → Change Password. Enter your current password, then your new password twice to confirm, and click Update Password. Choose a password that's long and not used anywhere else.",
      },
    ],
  },
  {
    title: "10. Notifications",
    items: [
      {
        h: "What shows up here",
        p: 'Every time someone submits the "Contact Us" inquiry form or signs up for the newsletter on the public website, it appears here automatically — in real time, no refreshing needed.',
      },
      {
        h: "Marking as read / dismissing",
        p: "Click the checkmark to mark a notification as read, or the ✕ to dismiss (permanently remove) it. Use the filter buttons at the top (All / Booking Inquiry / Newsletter) to narrow down what you're looking at.",
      },
      {
        h: "The bell icon",
        p: "The bell icon at the top of every admin page shows a small red number — this is your current count of unread notifications, so you always know at a glance if something new has come in.",
      },
    ],
  },
  {
    title: "11. Email & Newsletter",
    items: [
      {
        h: "How inquiries reach you",
        p: "When someone submits the Contact page form, it's emailed to you directly (through the site's form service) and also saved into Notifications (Section 10) so nothing gets lost.",
      },
      {
        h: "Newsletter signups",
        p: "When someone subscribes via the footer's \"Stay Inspired\" box, the same thing happens — you're notified and it's logged in Notifications.",
      },
      {
        h: "Your business email addresses",
        p: "info@, jalal@, and rik@arianaexpeditions.com are separate email inboxes set up through Google Workspace once the domain is live — these are for your own outgoing/incoming email, separate from the website's automatic notifications.",
      },
    ],
  },
  {
    title: "12. Social Media & Contact Info",
    items: [
      {
        h: "Where social links appear",
        p: "Your Instagram, Facebook, YouTube, Threads, TikTok, and WhatsApp links appear as icons in the website's footer, on every page. Updating these requires a small code change, so message your developer with the new link whenever one changes.",
      },
      {
        h: "Phone numbers and office info",
        p: "The Contact page shows your Kabul and Germany office details, along with general contact information. Like social links, updating these requires your developer's help — they are not editable from inside this dashboard yet.",
      },
    ],
  },
];

const tips = [
  "Changes you make here update the live website immediately — always double-check details before saving.",
  "Deleting an item cannot be undone, so use the delete (trash icon) button carefully.",
  "Photos should be clear, well-lit, and landscape-oriented where possible for the best fit on the site.",
  "If something looks wrong on the public site after an edit, try refreshing the page — changes usually appear instantly, but your browser may occasionally show a cached (older) version.",
  "Never share your password or 2FA codes with anyone, including in messages or email.",
];

export default function AdminGuide() {
  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="font-heading text-3xl text-dark mb-1">User Guide</h1>
        <p className="text-charcoal text-sm">
          A complete, step-by-step reference for managing your Ariana
          Expeditions website — from logging in to publishing new content.
        </p>
      </div>

      <div className="space-y-6 mb-10">
        {sections.map((section) => (
          <div
            key={section.title}
            className="bg-white rounded-2xl shadow-sm p-6"
          >
            <h2 className="font-heading text-xl text-dark mb-4">
              {section.title}
            </h2>
            <div className="space-y-4">
              {section.items.map((item) => (
                <div key={item.h}>
                  <h3 className="text-dark text-sm font-semibold mb-1">
                    {item.h}
                  </h3>
                  <p className="text-charcoal text-sm leading-relaxed">
                    {item.p}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-dark rounded-2xl p-6 mb-8">
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

      <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
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
