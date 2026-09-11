"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createReview, updateReview } from "./actions";

export default function ReviewForm({ initialData }) {
  const router = useRouter();
  const isEdit = Boolean(initialData);

  const [reviewerName, setReviewerName] = useState(
    initialData?.reviewer_name || "",
  );
  const [reviewerLocation, setReviewerLocation] = useState(
    initialData?.reviewer_location || "",
  );
  const [reviewDate, setReviewDate] = useState(initialData?.review_date || "");
  const [rating, setRating] = useState(initialData?.rating || 5);
  const [title, setTitle] = useState(initialData?.title || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [reviewUrl, setReviewUrl] = useState(initialData?.review_url || "");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        reviewerName,
        reviewerLocation,
        reviewDate,
        rating,
        title,
        excerpt,
        reviewUrl,
      };
      if (isEdit) {
        await updateReview(initialData.id, payload);
      } else {
        await createReview(payload);
      }
      router.push("/admin/tripadvisor/reviews");
      router.refresh();
    } catch (err) {
      alert("Failed to save: " + err.message);
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="bg-white rounded-2xl shadow-sm p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-dark mb-1">
              Reviewer Name
            </label>
            <input
              required
              value={reviewerName}
              onChange={(e) => setReviewerName(e.target.value)}
              placeholder="e.g. Pam M"
              className="w-full border border-dark/20 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1">
              Location
            </label>
            <input
              value={reviewerLocation}
              onChange={(e) => setReviewerLocation(e.target.value)}
              placeholder="e.g. Sofia, Bulgaria"
              className="w-full border border-dark/20 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-dark mb-1">
              Review Date
            </label>
            <input
              value={reviewDate}
              onChange={(e) => setReviewDate(e.target.value)}
              placeholder="e.g. September 2026"
              className="w-full border border-dark/20 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1">
              Rating (1–5)
            </label>
            <select
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value, 10))}
              className="w-full border border-dark/20 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
            >
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {n} stars
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-dark mb-1">
            Title (Optional)
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. A journey shaped by the people"
            className="w-full border border-dark/20 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark mb-1">
            Review Excerpt
          </label>
          <textarea
            required
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={4}
            placeholder="A short excerpt shown on the card"
            className="w-full border border-dark/20 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark mb-1">
            Link to Real Review on TripAdvisor
          </label>
          <input
            type="url"
            value={reviewUrl}
            onChange={(e) => setReviewUrl(e.target.value)}
            placeholder="https://www.tripadvisor.com/ShowUserReviews-..."
            className="w-full border border-dark/20 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={saving}
          className="bg-gold hover:bg-dark hover:text-white transition-colors duration-200 text-dark font-semibold px-8 py-3 rounded disabled:opacity-60"
        >
          {saving ? "Saving..." : isEdit ? "Save Changes" : "Add Review"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/tripadvisor/reviews")}
          className="text-charcoal text-sm hover:text-dark"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
