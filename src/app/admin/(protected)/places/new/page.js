import PlaceForm from "../PlaceForm";

export const dynamic = "force-dynamic";

export default function NewPlacePage() {
  return (
    <div>
      <h1 className="font-heading text-3xl text-dark mb-1">Add New Site</h1>
      <p className="text-charcoal text-sm mb-8">
        Add a new destination to the Historical & Cultural Sites collection.
      </p>
      <PlaceForm />
    </div>
  );
}
