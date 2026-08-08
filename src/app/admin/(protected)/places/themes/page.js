"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import useConfirm from "@/hooks/useConfirm";
import { getThemes, deleteTheme, reorderThemes } from "../actions";

export default function AdminThemesList() {
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { confirm, dialogProps } = useConfirm();

  async function loadThemes() {
    setLoading(true);
    try {
      const data = await getThemes();
      setThemes(data);
    } catch (err) {
      console.error("Failed to load themes:", err.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time load on mount, safe
    loadThemes();
  }, []);

  async function handleDelete(id) {
    const ok = await confirm({
      title: "Delete this theme?",
      message:
        "Sites assigned to this theme will become uncategorized, not deleted. This cannot be undone.",
      confirmLabel: "Delete Theme",
    });
    if (ok) {
      try {
        await deleteTheme(id);
        setThemes(themes.filter((t) => t.id !== id));
      } catch (err) {
        alert("Failed to delete: " + err.message);
      }
    }
  }

  function moveItem(id, direction) {
    const index = themes.findIndex((t) => t.id === id);
    if (index === -1) return;

    let newIndex;
    if (direction === "up") newIndex = index - 1;
    else if (direction === "down") newIndex = index + 1;
    else if (direction === "top") newIndex = 0;
    else if (direction === "bottom") newIndex = themes.length - 1;

    if (newIndex < 0 || newIndex >= themes.length) return;

    const reordered = [...themes];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(newIndex, 0, moved);

    setThemes(reordered);
    reorderThemes(reordered.map((t) => t.id)).catch((err) => {
      alert("Failed to save new order: " + err.message);
      loadThemes();
    });
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/places"
          className="text-gold text-sm font-medium hover:underline"
        >
          ← Back to Sites
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl text-dark mb-1">
            Manage Themes
          </h1>
          <p className="text-charcoal text-sm">
            Themes group sites for browsing on the public Sites page (e.g.
            &quot;Echoes of Ariana&quot;).
          </p>
        </div>
        <Link
          href="/admin/places/themes/new"
          className="inline-flex items-center gap-2 bg-gold hover:bg-dark hover:text-white transition-colors duration-200 text-dark font-semibold rounded-full px-5 py-2.5 whitespace-nowrap"
        >
          + Add Theme
        </Link>
      </div>

      {loading ? (
        <p className="text-charcoal text-sm text-center py-12">
          Loading themes...
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {themes.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col sm:flex-row"
            >
              <div className="relative w-full h-32 sm:w-28 sm:h-auto shrink-0">
                <Image
                  src={t.img || "/images/hero1.jpg"}
                  alt={t.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 112px"
                  className="object-cover"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col min-w-0">
                <span className="text-gold text-xs font-semibold uppercase tracking-wide">
                  {t.tag}
                </span>
                <h3 className="font-heading text-lg text-dark mb-2 truncate">
                  {t.title}
                </h3>

                <div className="mt-auto flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => moveItem(t.id, "top")}
                      aria-label="Move to top"
                      title="Move to top"
                      className="w-7 h-7 rounded-full bg-dark/5 hover:bg-dark/10 flex items-center justify-center text-dark text-xs"
                    >
                      ⤒
                    </button>
                    <button
                      onClick={() => moveItem(t.id, "up")}
                      aria-label="Move up"
                      className="w-7 h-7 rounded-full bg-dark/5 hover:bg-dark/10 flex items-center justify-center text-dark text-xs"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => moveItem(t.id, "down")}
                      aria-label="Move down"
                      className="w-7 h-7 rounded-full bg-dark/5 hover:bg-dark/10 flex items-center justify-center text-dark text-xs"
                    >
                      ↓
                    </button>
                    <button
                      onClick={() => moveItem(t.id, "bottom")}
                      aria-label="Move to bottom"
                      title="Move to bottom"
                      className="w-7 h-7 rounded-full bg-dark/5 hover:bg-dark/10 flex items-center justify-center text-dark text-xs"
                    >
                      ⤓
                    </button>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      href={`/admin/places/themes/${t.id}/edit`}
                      className="text-dark text-xs font-medium hover:underline"
                    >
                      Edit
                    </Link>
                    <span className="text-charcoal/30">·</span>
                    <button
                      onClick={() => handleDelete(t.id)}
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

      {!loading && themes.length === 0 && (
        <p className="text-charcoal text-sm text-center py-12">
          No themes yet — click &quot;Add Theme&quot; to create one.
        </p>
      )}

      <ConfirmDialog {...dialogProps} />
    </div>
  );
}
