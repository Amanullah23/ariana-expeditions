import ReviewForm from "../../ReviewForm";

export const dynamic = "force-dynamic";

export default function NewReviewPage() {
  return (
    <div>
      <h1 className="font-heading text-3xl text-dark mb-1">Add Review</h1>
      <ReviewForm />
    </div>
  );
}
