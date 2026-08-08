"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getIntro, updateIntro } from "./actions";

export default function AdminAbout() {
  const [intro, setIntro] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function loadIntro() {
    setLoading(true);
    try {
      const data = await getIntro();
      setIntro(data);
      setDescription(data.description || "");
    } catch (err) {
      console.error("Failed to load intro:", err.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time load on mount, safe
    loadIntro();
  }, []);

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      await updateIntro(intro.id, description);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      alert("Failed to save: " + err.message);
    }
    setSaving(false);
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="font-heading text-2xl md:text-3xl text-dark mb-1">
          About Page
        </h1>
        <p className="text-charcoal text-sm">
          Manage the content shown on your public About page.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        <Link
          href="/admin/about/founders"
          className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 px-6 py-4 flex-1 min-w-[200px]"
        >
          <p className="font-heading text-lg text-dark mb-1">Founders</p>
          <p className="text-charcoal text-xs">
            Manage founder profiles and bios
          </p>
        </Link>
        <Link
          href="/admin/about/licenses"
          className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 px-6 py-4 flex-1 min-w-[200px]"
        >
          <p className="font-heading text-lg text-dark mb-1">Licenses</p>
          <p className="text-charcoal text-xs">
            Manage licensing & registration cards
          </p>
        </Link>
      </div>

      <form
        onSubmit={handleSave}
        className="bg-white rounded-2xl shadow-sm p-6"
      >
        <h2 className="font-heading text-lg text-dark mb-4">Top Description</h2>
        {loading ? (
          <p className="text-charcoal text-sm">Loading...</p>
        ) : (
          <>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              className="w-full border border-dark/20 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
            />
            <div className="flex items-center gap-4 mt-4">
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
