import { notFound } from "next/navigation";
import { getTripBySlug } from "../../actions";
import TripForm from "../../TripForm";

export default async function EditTripPage({ params }) {
  const { slug } = await params;

  let trip;
  try {
    trip = await getTripBySlug(slug);
  } catch {
    return notFound();
  }

  const formData = {
    ...trip,
    desc: trip.description,
    itinerary: trip.trip_itinerary_items
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((i) => ({ day: i.day_label, title: i.title, desc: i.description })),
  };

  return (
    <div>
      <h1 className="font-heading text-3xl text-dark mb-1">Edit Trip</h1>
      <p className="text-charcoal text-sm mb-8">
        Editing &quot;{trip.title}&quot;
      </p>
      <TripForm initialData={formData} />
    </div>
  );
}
