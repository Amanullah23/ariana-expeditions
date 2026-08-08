"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import useConfirm from "@/hooks/useConfirm";
import { getFounders, deleteFounder, reorderFounders } from "../actions";

export default function AdminFoundersList() {
  const [founders, setFounders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { confirm, dialogProps } = useConfirm();

  async function loadFounders() {
    setLoading(true);
    try {
      const data = await getFounders();
      setFounders(data);
    } catch (err) {
      console.error("Failed to load founders:", err.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time load on mount, safe
    loadFounders();
  }, []);

  async function handleDelete(id) {
    const ok = await confirm({
      title: "Delete this founder?",
      message:
        "This will remove them from the public About page. This cannot be undone.",
      confirmLabel: "Delete Founder",
    });
    if (ok) {
      try {
        await deleteFounder(id);
        setFounders(founders.filter((f) => f.id !== id));
      } catch (err) {
        alert("Failed to delete: " + err.message);
      }
    }
  }

  function moveItem(id, direction) {
    const index = founders.findIndex((f) => f.id === id);
    if (index === -1) return;
    let newIndex;
    if (direction === "up") newIndex = index - 1;
    else if (direction === "down") newIndex = index + 1;
    if (newIndex < 0 || newIndex >= founders.length) return;

    const reordered = [...founders];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(newIndex, 0, moved);

    setFounders(reordered);
    reorderFounders(reordered.map((f) => f.id)).catch((err) => {
      alert("Failed to save new order: " + err.message);
      loadFounders();
    });
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/about"
          className="text-gold text-sm font-medium hover:underline"
        >
          ← Back to About
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl text-dark mb-1">
            Founders
          </h1>
          <p className="text-charcoal text-sm">
            Shown on the public About page.
          </p>
        </div>
        <Link
          href="/admin/about/founders/new"
          className="inline-flex items-center gap-2 bg-gold hover:bg-dark hover:text-white transition-colors duration-200 text-dark font-semibold rounded-full px-5 py-2.5 whitespace-nowrap"
        >
          + Add Founder
        </Link>
      </div>

      {loading ? (
        <p className="text-charcoal text-sm text-center py-12">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {founders.map((f, i) => (
            <div
              key={f.id}
              className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col sm:flex-row"
            >
              <div className="relative w-full h-32 sm:w-28 sm:h-auto shrink-0">
                <Image
                  src={f.image || "/images/hero1.jpg"}
                  alt={f.full_name}
                  fill
                  sizes="(max-width: 640px) 100vw, 112px"
                  className="object-cover"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col min-w-0">
                <h3 className="font-heading text-lg text-dark truncate">
                  {f.full_name}
                </h3>
                <p className="text-gold text-xs mb-3 truncate">{f.position}</p>

                <div className="mt-auto flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => moveItem(f.id, "up")}
                      disabled={i === 0}
                      className="w-7 h-7 rounded-full bg-dark/5 hover:bg-dark/10 flex items-center justify-center text-dark text-xs disabled:opacity-30"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => moveItem(f.id, "down")}
                      disabled={i === founders.length - 1}
                      className="w-7 h-7 rounded-full bg-dark/5 hover:bg-dark/10 flex items-center justify-center text-dark text-xs disabled:opacity-30"
                    >
                      ↓
                    </button>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      href={`/admin/about/founders/${f.id}/edit`}
                      className="text-dark text-xs font-medium hover:underline"
                    >
                      Edit
                    </Link>
                    <span className="text-charcoal/30">·</span>
                    <button
                      onClick={() => handleDelete(f.id)}
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

      {!loading && founders.length === 0 && (
        <p className="text-charcoal text-sm text-center py-12">
          No founders yet.
        </p>
      )}

      <ConfirmDialog {...dialogProps} />
    </div>
  );
}
