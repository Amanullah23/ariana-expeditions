import TestimonialForm from "../TestimonialForm";

export const dynamic = "force-dynamic";

export default function NewTestimonialPage() {
  return (
    <div>
      <h1 className="font-heading text-3xl text-dark mb-1">Add Testimonial</h1>
      <p className="text-charcoal text-sm mb-8">
        Add a new traveler quote to display on the homepage.
      </p>
      <TestimonialForm />
    </div>
  );
}
