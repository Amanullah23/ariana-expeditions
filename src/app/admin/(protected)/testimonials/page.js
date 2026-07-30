"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import useConfirm from "@/hooks/useConfirm";
import { getTestimonials, deleteTestimonial } from "./actions";

export default function AdminTestimonialsList() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const { confirm, dialogProps } = useConfirm();

  useEffect(() => {
    loadTestimonials();
  }, []);

  async function loadTestimonials() {
    setLoading(true);
    try {
      const data = await getTestimonials();
      setTestimonials(data);
    } catch (err) {
      console.error("Failed to load testimonials:", err.message);
    }
    setLoading(false);
  }

  async function handleDelete(id) {
    const ok = await confirm({
      title: "Delete this testimonial?",
      message:
        "This will permanently remove it from the site. This cannot be undone.",
      confirmLabel: "Delete Testimonial",
    });
    if (ok) {
      try {
        await deleteTestimonial(id);
        setTestimonials(testimonials.filter((t) => t.id !== id));
      } catch (err) {
        alert("Failed to delete: " + err.message);
      }
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading text-3xl text-dark mb-1">Testimonials</h1>
          <p className="text-charcoal text-sm">
            Manage traveler quotes shown on the public site.
          </p>
        </div>
        <Link
          href="/admin/testimonials/new"
          className="inline-flex items-center gap-2 bg-gold hover:bg-dark hover:text-white transition-colors duration-200 text-dark font-semibold rounded-full px-6 py-3"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add Testimonial
        </Link>
      </div>

      {loading ? (
        <p className="text-charcoal text-sm text-center py-12">
          Loading testimonials...
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 p-6 flex flex-col"
            >
              <span className="text-gold text-3xl font-heading mb-2">
                &ldquo;
              </span>
              <p className="text-charcoal text-sm leading-relaxed flex-1 mb-4 line-clamp-4">
                {t.quote}
              </p>
              <div className="mb-4">
                <p className="font-heading text-dark text-sm">{t.name}</p>
                <p className="text-charcoal/60 text-xs">{t.location}</p>
              </div>
              <div className="flex items-center gap-2 pt-3 border-t border-dark/10">
                <Link
                  href={`/admin/testimonials/${t.id}/edit`}
                  className="w-8 h-8 rounded-full bg-dark/5 hover:bg-dark/10 flex items-center justify-center text-dark"
                  aria-label="Edit testimonial"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"
                    />
                  </svg>
                </Link>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="w-8 h-8 rounded-full bg-dark/5 hover:bg-red-50 hover:text-red-600 flex items-center justify-center text-dark"
                  aria-label="Delete testimonial"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.02-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && testimonials.length === 0 && (
        <p className="text-charcoal text-sm text-center py-12">
          No testimonials yet — click &quot;Add Testimonial&quot; to create one.
        </p>
      )}

      <ConfirmDialog {...dialogProps} />
    </div>
  );
}
