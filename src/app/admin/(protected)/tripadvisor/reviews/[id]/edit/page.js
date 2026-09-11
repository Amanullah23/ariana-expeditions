import { notFound } from "next/navigation";
import { getReviewById } from "../../../actions";
import ReviewForm from "../../../ReviewForm";

export const dynamic = "force-dynamic";

export default async function EditReviewPage({ params }) {
  const { id } = await params;
  let review;
  try {
    review = await getReviewById(id);
  } catch {
    return notFound();
  }
  return (
    <div>
      <h1 className="font-heading text-3xl text-dark mb-1">Edit Review</h1>
      <ReviewForm initialData={review} />
    </div>
  );
}
