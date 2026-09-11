"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import useConfirm from "@/hooks/useConfirm";
import { getReviews, deleteReview, reorderReviews } from "../actions";

export default function AdminTripAdvisorReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { confirm, dialogProps } = useConfirm();

  async function loadReviews() {
    setLoading(true);
    try {
      const data = await getReviews();
      setReviews(data);
    } catch (err) {
      console.error("Failed to load reviews:", err.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time load on mount, safe
    loadReviews();
  }, []);

  async function handleDelete(id) {
    const ok = await confirm({
      title: "Delete this review?",
      message:
        "This will remove it from the public homepage. This cannot be undone.",
      confirmLabel: "Delete Review",
    });
    if (ok) {
      try {
        await deleteReview(id);
        setReviews(reviews.filter((r) => r.id !== id));
      } catch (err) {
        alert("Failed to delete: " + err.message);
      }
    }
  }

  function moveItem(id, direction) {
    const index = reviews.findIndex((r) => r.id === id);
    if (index === -1) return;
    let newIndex;
    if (direction === "up") newIndex = index - 1;
    else if (direction === "down") newIndex = index + 1;
    if (newIndex < 0 || newIndex >= reviews.length) return;

    const reordered = [...reviews];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(newIndex, 0, moved);

    setReviews(reordered);
    reorderReviews(reordered.map((r) => r.id)).catch((err) => {
      alert("Failed to save new order: " + err.message);
      loadReviews();
    });
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/tripadvisor"
          className="text-gold text-sm font-medium hover:underline"
        >
          ← Back to TripAdvisor
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl text-dark mb-1">
            Reviews
          </h1>
          <p className="text-charcoal text-sm">Shown on the public homepage.</p>
        </div>
        <Link
          href="/admin/tripadvisor/reviews/new"
          className="inline-flex items-center gap-2 bg-gold hover:bg-dark hover:text-white transition-colors duration-200 text-dark font-semibold rounded-full px-5 py-2.5 whitespace-nowrap"
        >
          + Add Review
        </Link>
      </div>

      {loading ? (
        <p className="text-charcoal text-sm text-center py-12">Loading...</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((r, i) => (
            <div key={r.id} className="bg-white rounded-2xl shadow-sm p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-heading text-dark">{r.reviewer_name}</p>
                    <span className="text-charcoal/50 text-xs">
                      {r.reviewer_location}
                    </span>
                  </div>
                  <p className="text-gold text-xs mb-2">
                    {r.review_date} · {r.rating}★
                  </p>
                  {r.title && (
                    <p className="font-semibold text-dark text-sm mb-1">
                      {r.title}
                    </p>
                  )}
                  <p className="text-charcoal text-sm line-clamp-2">
                    {r.excerpt}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => moveItem(r.id, "up")}
                      disabled={i === 0}
                      className="w-7 h-7 rounded-full bg-dark/5 hover:bg-dark/10 flex items-center justify-center text-dark text-xs disabled:opacity-30"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => moveItem(r.id, "down")}
                      disabled={i === reviews.length - 1}
                      className="w-7 h-7 rounded-full bg-dark/5 hover:bg-dark/10 flex items-center justify-center text-dark text-xs disabled:opacity-30"
                    >
                      ↓
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/tripadvisor/reviews/${r.id}/edit`}
                      className="text-dark text-xs font-medium hover:underline"
                    >
                      Edit
                    </Link>
                    <span className="text-charcoal/30">·</span>
                    <button
                      onClick={() => handleDelete(r.id)}
                      className="text-red-600 text-xs font-medium hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && reviews.length === 0 && (
        <p className="text-charcoal text-sm text-center py-12">
          No reviews yet.
        </p>
      )}

      <ConfirmDialog {...dialogProps} />
    </div>
  );
}
