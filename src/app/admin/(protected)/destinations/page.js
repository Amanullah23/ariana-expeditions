"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import useConfirm from "@/hooks/useConfirm";
import { getDestinations, deleteDestination } from "./actions";

export default function AdminDestinationsList() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { confirm, dialogProps } = useConfirm();

  async function loadDestinations() {
    setLoading(true);
    try {
      const data = await getDestinations();
      setDestinations(data);
    } catch (err) {
      console.error("Failed to load destinations:", err.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time load on mount, safe
    loadDestinations();
  }, []);

  async function handleDelete(id) {
    const ok = await confirm({
      title: "Delete this destination theme?",
      message:
        "This will permanently remove it from the site. This cannot be undone.",
      confirmLabel: "Delete Theme",
    });
    if (ok) {
      try {
        await deleteDestination(id);
        setDestinations(destinations.filter((d) => d.id !== id));
      } catch (err) {
        alert("Failed to delete: " + err.message);
      }
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading text-3xl text-dark mb-1">Destinations</h1>
          <p className="text-charcoal text-sm">
            Manage the themed destination groups shown on the public site.
          </p>
        </div>
        <Link
          href="/admin/destinations/new"
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
          Add New Theme
        </Link>
      </div>

      {loading ? (
        <p className="text-charcoal text-sm text-center py-12">
          Loading destinations...
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {destinations.map((d) => (
            <div
              key={d.id}
              className="bg-white rounded-2xl shadow-sm overflow-hidden flex"
            >
              <div className="relative w-32 shrink-0">
                <Image
                  src={d.img || "/images/hero1.jpg"}
                  alt={d.title}
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <span className="text-gold text-xs font-semibold uppercase tracking-wide mb-1">
                  {d.tag}
                </span>
                <h3 className="font-heading text-lg text-dark mb-1">
                  {d.title}
                </h3>
                <p className="text-charcoal text-xs mb-3 line-clamp-2">
                  {d.intro}
                </p>

                <div className="mt-auto flex items-center justify-between">
                  <span className="bg-gold/20 text-dark text-xs font-semibold px-3 py-1 rounded-full">
                    {d.destination_places?.length || 0} places
                  </span>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/destinations/${d.slug}/edit`}
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
                      onClick={() => handleDelete(d.id)}
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

      {!loading && destinations.length === 0 && (
        <p className="text-charcoal text-sm text-center py-12">
          No destination themes yet — click &quot;Add New Theme&quot; to create
          one.
        </p>
      )}

      <ConfirmDialog {...dialogProps} />
    </div>
  );
}
