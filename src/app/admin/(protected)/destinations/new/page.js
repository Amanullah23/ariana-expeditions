import DestinationForm from "../DestinationForm";

export const dynamic = "force-dynamic";

export default function NewDestinationPage() {
  return (
    <div>
      <h1 className="font-heading text-3xl text-dark mb-1">Add New Theme</h1>
      <p className="text-charcoal text-sm mb-8">
        Fill in the details below to create a new destination theme.
      </p>
      <DestinationForm />
    </div>
  );
}
