"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getInfo, updateInfo } from "./actions";

export default function AdminTripAdvisor() {
  const [info, setInfo] = useState(null);
  const [overallRating, setOverallRating] = useState("5.0");
  const [reviewCount, setReviewCount] = useState(0);
  const [profileUrl, setProfileUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function loadInfo() {
    setLoading(true);
    try {
      const data = await getInfo();
      setInfo(data);
      setOverallRating(String(data.overall_rating));
      setReviewCount(data.review_count);
      setProfileUrl(data.profile_url || "");
    } catch (err) {
      console.error("Failed to load TripAdvisor info:", err.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time load on mount, safe
    loadInfo();
  }, []);

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      await updateInfo(info.id, {
        overallRating: parseFloat(overallRating),
        reviewCount: parseInt(reviewCount, 10),
        profileUrl,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      alert("Failed to save: " + err.message);
    }
    setSaving(false);
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="font-heading text-2xl md:text-3xl text-dark mb-1">
          TripAdvisor
        </h1>
        <p className="text-charcoal text-sm">
          Manage the TripAdvisor rating and reviews shown on your homepage.
        </p>
      </div>

      <Link
        href="/admin/tripadvisor/reviews"
        className="block bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 px-6 py-4 mb-8"
      >
        <p className="font-heading text-lg text-dark mb-1">Manage Reviews</p>
        <p className="text-charcoal text-xs">
          Add, edit, reorder, or remove individual reviews
        </p>
      </Link>

      <form
        onSubmit={handleSave}
        className="bg-white rounded-2xl shadow-sm p-6 space-y-5"
      >
        <h2 className="font-heading text-lg text-dark">
          Overall Rating Summary
        </h2>
        {loading ? (
          <p className="text-charcoal text-sm">Loading...</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark mb-1">
                  Overall Rating (out of 5)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={overallRating}
                  onChange={(e) => setOverallRating(e.target.value)}
                  className="w-full border border-dark/20 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-1">
                  Total Review Count
                </label>
                <input
                  type="number"
                  min="0"
                  value={reviewCount}
                  onChange={(e) => setReviewCount(e.target.value)}
                  className="w-full border border-dark/20 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-1">
                TripAdvisor Profile URL
              </label>
              <input
                type="url"
                value={profileUrl}
                onChange={(e) => setProfileUrl(e.target.value)}
                className="w-full border border-dark/20 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>
            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={saving}
                className="bg-gold hover:bg-dark hover:text-white transition-colors duration-200 text-dark font-semibold px-6 py-2.5 rounded disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
              {saved && (
                <span className="text-gold text-sm">Saved successfully.</span>
              )}
            </div>
          </>
        )}
      </form>
    </div>
  );
}
