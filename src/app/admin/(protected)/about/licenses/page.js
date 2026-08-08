"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import useConfirm from "@/hooks/useConfirm";
import { getLicenses, deleteLicense, reorderLicenses } from "../actions";

export default function AdminLicensesList() {
  const [licenses, setLicenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { confirm, dialogProps } = useConfirm();

  async function loadLicenses() {
    setLoading(true);
    try {
      const data = await getLicenses();
      setLicenses(data);
    } catch (err) {
      console.error("Failed to load licenses:", err.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time load on mount, safe
    loadLicenses();
  }, []);

  async function handleDelete(id) {
    const ok = await confirm({
      title: "Delete this license?",
      message:
        "This will remove it from the public About page. This cannot be undone.",
      confirmLabel: "Delete License",
    });
    if (ok) {
      try {
        await deleteLicense(id);
        setLicenses(licenses.filter((l) => l.id !== id));
      } catch (err) {
        alert("Failed to delete: " + err.message);
      }
    }
  }

  function moveItem(id, direction) {
    const index = licenses.findIndex((l) => l.id === id);
    if (index === -1) return;
    let newIndex;
    if (direction === "up") newIndex = index - 1;
    else if (direction === "down") newIndex = index + 1;
    if (newIndex < 0 || newIndex >= licenses.length) return;

    const reordered = [...licenses];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(newIndex, 0, moved);

    setLicenses(reordered);
    reorderLicenses(reordered.map((l) => l.id)).catch((err) => {
      alert("Failed to save new order: " + err.message);
      loadLicenses();
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
            Licenses
          </h1>
          <p className="text-charcoal text-sm">
            Shown on the public About page.
          </p>
        </div>
        <Link
          href="/admin/about/licenses/new"
          className="inline-flex items-center gap-2 bg-gold hover:bg-dark hover:text-white transition-colors duration-200 text-dark font-semibold rounded-full px-5 py-2.5 whitespace-nowrap"
        >
          + Add License
        </Link>
      </div>

      {loading ? (
        <p className="text-charcoal text-sm text-center py-12">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {licenses.map((lic, i) => (
            <div
              key={lic.id}
              className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col sm:flex-row"
            >
              <div className="relative w-full h-32 sm:w-28 sm:h-auto shrink-0 bg-cream">
                <Image
                  src={lic.image || "/images/hero1.jpg"}
                  alt={lic.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 112px"
                  className="object-contain p-2"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col min-w-0">
                <h3 className="font-heading text-lg text-dark truncate">
                  {lic.title}
                </h3>
                <p className="text-charcoal text-xs mb-3 line-clamp-2">
                  {lic.description}
                </p>

                <div className="mt-auto flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => moveItem(lic.id, "up")}
                      disabled={i === 0}
                      className="w-7 h-7 rounded-full bg-dark/5 hover:bg-dark/10 flex items-center justify-center text-dark text-xs disabled:opacity-30"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => moveItem(lic.id, "down")}
                      disabled={i === licenses.length - 1}
                      className="w-7 h-7 rounded-full bg-dark/5 hover:bg-dark/10 flex items-center justify-center text-dark text-xs disabled:opacity-30"
                    >
                      ↓
                    </button>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      href={`/admin/about/licenses/${lic.id}/edit`}
                      className="text-dark text-xs font-medium hover:underline"
                    >
                      Edit
                    </Link>
                    <span className="text-charcoal/30">·</span>
                    <button
                      onClick={() => handleDelete(lic.id)}
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

      {!loading && licenses.length === 0 && (
        <p className="text-charcoal text-sm text-center py-12">
          No licenses yet.
        </p>
      )}

      <ConfirmDialog {...dialogProps} />
    </div>
  );
}
