import { notFound } from "next/navigation";
import { getDestinationBySlug } from "../../actions";
import DestinationForm from "../../DestinationForm";

export const dynamic = "force-dynamic";

export default async function EditDestinationPage({ params }) {
  const { slug } = await params;

  let destination;
  try {
    destination = await getDestinationBySlug(slug);
  } catch {
    return notFound();
  }

  const formData = {
    ...destination,
    places: destination.destination_places
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((p) => ({ name: p.name, desc: p.description })),
  };

  return (
    <div>
      <h1 className="font-heading text-3xl text-dark mb-1">Edit Theme</h1>
      <p className="text-charcoal text-sm mb-8">
        Editing &quot;{destination.title}&quot;
      </p>
      <DestinationForm initialData={formData} />
    </div>
  );
}
