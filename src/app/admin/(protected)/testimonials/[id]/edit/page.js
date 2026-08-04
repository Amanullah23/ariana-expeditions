import { notFound } from "next/navigation";
import { getTestimonialById } from "../../actions";
import TestimonialForm from "../../TestimonialForm";

export const dynamic = "force-dynamic";

export default async function EditTestimonialPage({ params }) {
  const { id } = await params;

  let testimonial;
  try {
    testimonial = await getTestimonialById(id);
  } catch {
    return notFound();
  }

  return (
    <div>
      <h1 className="font-heading text-3xl text-dark mb-1">Edit Testimonial</h1>
      <p className="text-charcoal text-sm mb-8">
        Editing testimonial from &quot;{testimonial.name}&quot;
      </p>
      <TestimonialForm initialData={testimonial} />
    </div>
  );
}
