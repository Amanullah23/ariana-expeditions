import { notFound } from "next/navigation";
import { getPlaceById } from "../../actions";
import PlaceForm from "../../PlaceForm";

export const dynamic = "force-dynamic";

export default async function EditPlacePage({ params }) {
  const { id } = await params;

  let place;
  try {
    place = await getPlaceById(id);
  } catch {
    return notFound();
  }

  return (
    <div>
      <h1 className="font-heading text-3xl text-dark mb-1">Edit Site</h1>
      <p className="text-charcoal text-sm mb-8">
        Editing &quot;{place.name}&quot;
      </p>
      <PlaceForm initialData={place} />
    </div>
  );
}
