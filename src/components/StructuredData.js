export default function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Ariana Expeditions",
    description:
      "Afghanistan travel specialist offering guided cultural tours, group tours, and custom itineraries across Afghanistan and Central Asia.",
    url: "https://ariana-expeditions.com",
    telephone: "+31617285552",
    email: "info@ariana-expeditions.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kabul",
      addressCountry: "AF",
    },
    areaServed: ["Afghanistan", "Central Asia"],
    knowsAbout: [
      "Afghanistan tours",
      "Afghanistan cultural tours",
      "Silk Road Afghanistan",
      "Afghanistan archaeology tour",
      "Afghanistan photography tour",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
