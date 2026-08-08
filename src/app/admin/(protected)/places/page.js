"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import useConfirm from "@/hooks/useConfirm";
import { getPlaces, deletePlace, reorderPlaces } from "./actions";

export default function AdminPlacesList() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const { confirm, dialogProps } = useConfirm();

  async function loadPlaces() {
    setLoading(true);
    try {
      const data = await getPlaces();
      setPlaces(data);
    } catch (err) {
      console.error("Failed to load places:", err.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time load on mount, safe
    loadPlaces();
  }, []);

  async function handleDelete(id) {
    const ok = await confirm({
      title: "Delete this destination?",
      message:
        "This will permanently remove it from the site. This cannot be undone.",
      confirmLabel: "Delete Destination",
    });
    if (ok) {
      try {
        await deletePlace(id);
        setPlaces(places.filter((p) => p.id !== id));
      } catch (err) {
        alert("Failed to delete: " + err.message);
      }
    }
  }
  function moveItem(id, direction) {
    const index = places.findIndex((p) => p.id === id);
    if (index === -1) return;

    let newIndex;
    if (direction === "up") newIndex = index - 1;
    else if (direction === "down") newIndex = index + 1;
    else if (direction === "top") newIndex = 0;
    else if (direction === "bottom") newIndex = places.length - 1;

    if (newIndex < 0 || newIndex >= places.length) return;

    const reordered = [...places];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(newIndex, 0, moved);

    setPlaces(reordered);
    reorderPlaces(reordered.map((p) => p.id)).catch((err) => {
      alert("Failed to save new order: " + err.message);
      loadPlaces();
    });
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl text-dark mb-1">
            Historical & Cultural Places
          </h1>
          <p className="text-charcoal text-sm">
            Manage the full destination encyclopedia shown on the public Places
            page.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/places/themes"
            className="text-dark text-sm font-medium hover:underline whitespace-nowrap"
          >
            Manage Themes
          </Link>
          <Link
            href="/admin/places/new"
            className="inline-flex items-center gap-2 bg-gold hover:bg-dark hover:text-white transition-colors duration-200 text-dark font-semibold rounded-full px-5 py-2.5 whitespace-nowrap"
          >
            <svg
              className="w-5 h-5 shrink-0"
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
            Add New Place
          </Link>
        </div>
      </div>

      {loading ? (
        <p className="text-charcoal text-sm text-center py-12">
          Loading destinations...
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {places.map((pl) => (
            <div
              key={pl.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden flex flex-col sm:flex-row"
            >
              <div className="relative w-full h-40 sm:w-32 sm:h-auto shrink-0">
                <Image
                  src={pl.main_image || "/images/hero1.jpg"}
                  alt={pl.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 128px"
                  className="object-cover"
                />
                {pl.status === "hidden" && (
                  <span className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs font-semibold">
                    Hidden
                  </span>
                )}
              </div>
              <div className="p-5 flex-1 flex flex-col min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {pl.category && (
                    <span className="text-gold text-xs font-semibold uppercase tracking-wide">
                      {pl.category}
                    </span>
                  )}
                </div>
                <h3 className="font-heading text-lg text-dark mb-1 truncate">
                  {pl.name}
                </h3>
                <p className="text-charcoal text-xs mb-3 line-clamp-2">
                  {pl.short_description}
                </p>

                <div className="mt-auto flex items-center justify-between">
                  <span className="text-charcoal/60 text-xs truncate">
                    {pl.province}
                  </span>
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => moveItem(pl.id, "top")}
                        aria-label="Move to top"
                        className="w-7 h-7 rounded-full bg-dark/5 hover:bg-dark/10 flex items-center justify-center text-dark text-xs"
                        title="Move to top"
                      >
                        ⤒
                      </button>
                      <button
                        onClick={() => moveItem(pl.id, "up")}
                        aria-label="Move up"
                        className="w-7 h-7 rounded-full bg-dark/5 hover:bg-dark/10 flex items-center justify-center text-dark text-xs"
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => moveItem(pl.id, "down")}
                        aria-label="Move down"
                        className="w-7 h-7 rounded-full bg-dark/5 hover:bg-dark/10 flex items-center justify-center text-dark text-xs"
                      >
                        ↓
                      </button>
                      <button
                        onClick={() => moveItem(pl.id, "bottom")}
                        aria-label="Move to bottom"
                        className="w-7 h-7 rounded-full bg-dark/5 hover:bg-dark/10 flex items-center justify-center text-dark text-xs"
                        title="Move to bottom"
                      >
                        ⤓
                      </button>
                    </div>
                    <Link
                      href={`/admin/places/${pl.id}/edit`}
                      className="w-8 h-8 rounded-full bg-dark/5 hover:bg-dark/10 flex items-center justify-center text-dark"
                      aria-label="Edit destination"
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
                      onClick={() => handleDelete(pl.id)}
                      className="w-8 h-8 rounded-full bg-dark/5 hover:bg-red-50 hover:text-red-600 flex items-center justify-center text-dark"
                      aria-label="Delete destination"
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
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && places.length === 0 && (
        <p className="text-charcoal text-sm text-center py-12">
          No destinations yet — click &quot;Add New Site&quot; to create one.
        </p>
      )}

      <ConfirmDialog {...dialogProps} />
    </div>
  );
}
