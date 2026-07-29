import TripForm from "../TripForm";

export default function NewTripPage() {
  return (
    <div>
      <h1 className="font-heading text-3xl text-dark mb-1">Add New Trip</h1>
      <p className="text-charcoal text-sm mb-8">
        Fill in the details below to create a new itinerary.
      </p>
      <TripForm />
    </div>
  );
}
