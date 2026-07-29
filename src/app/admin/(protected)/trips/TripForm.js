"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createTrip, updateTrip } from "./actions";
import { uploadImage } from "@/lib/supabase/upload";

function RepeatableList({ label, items, setItems, placeholder }) {
  function update(i, value) {
    const next = [...items];
    next[i] = value;
    setItems(next);
  }
  function add() {
    setItems([...items, ""]);
  }
  function remove(i) {
    setItems(items.filter((_, idx) => idx !== i));
  }

  return (
    <div>
      <label className="block text-sm font-medium text-dark mb-2">
        {label}
      </label>
      <div className="space-y-2">
        {items.map((val, i) => (
          <div key={i} className="flex gap-2">
            <input
              value={val}
              onChange={(e) => update(i, e.target.value)}
              placeholder={placeholder}
              className="flex-1 border border-dark/20 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
            />
            <button
              type="button"
              onClick={() => remove(i)}
              className="text-charcoal/50 hover:text-red-600 px-2"
              aria-label="Remove"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={add}
        className="mt-2 text-gold text-sm font-medium hover:underline"
      >
        + Add item
      </button>
    </div>
  );
}

function ItineraryBuilder({ days, setDays }) {
  function update(i, field, value) {
    const next = [...days];
    next[i] = { ...next[i], [field]: value };
    setDays(next);
  }
  function add() {
    setDays([...days, { day: "", title: "", desc: "" }]);
  }
  function remove(i) {
    setDays(days.filter((_, idx) => idx !== i));
  }

  return (
    <div>
      <label className="block text-sm font-medium text-dark mb-2">
        Day-by-Day Itinerary
      </label>
      <div className="space-y-4">
        {days.map((d, i) => (
          <div
            key={i}
            className="border border-dark/10 rounded-lg p-4 relative"
          >
            <button
              type="button"
              onClick={() => remove(i)}
              className="absolute top-3 right-3 text-charcoal/50 hover:text-red-600"
              aria-label="Remove day"
            >
              ✕
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                value={d.day}
                onChange={(e) => update(i, "day", e.target.value)}
                placeholder="Day label (e.g. Day 1–2)"
                className="border border-dark/20 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
              />
              <input
                value={d.title}
                onChange={(e) => update(i, "title", e.target.value)}
                placeholder="Title"
                className="sm:col-span-2 border border-dark/20 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>
            <textarea
              value={d.desc}
              onChange={(e) => update(i, "desc", e.target.value)}
              placeholder="Description"
              rows={2}
              className="mt-3 w-full border border-dark/20 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={add}
        className="mt-3 text-gold text-sm font-medium hover:underline"
      >
        + Add day
      </button>
    </div>
  );
}

export default function TripForm({ initialData }) {
  const router = useRouter();
  const isEdit = Boolean(initialData);

  const [title, setTitle] = useState(initialData?.title || "");
  const [days, setDays] = useState(initialData?.days || "");
  const [region, setRegion] = useState(initialData?.region || "");
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [difficulty, setDifficulty] = useState(
    initialData?.difficulty || "Easy",
  );
  const [desc, setDesc] = useState(initialData?.desc || "");
  const [imagePreview, setImagePreview] = useState(initialData?.img || null);
  const [highlights, setHighlights] = useState(initialData?.highlights || [""]);
  const [includes, setIncludes] = useState(initialData?.includes || [""]);
  const [excludes, setExcludes] = useState(initialData?.excludes || [""]);
  const [itinerary, setItinerary] = useState(
    initialData?.itinerary || [{ day: "", title: "", desc: "" }],
  );
  const [saving, setSaving] = useState(false);

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);

    try {
      let finalImageUrl = imagePreview;

      if (imageFile) {
        setUploading(true);
        finalImageUrl = await uploadImage(imageFile, "trips");
        setUploading(false);
      }

      const payload = {
        title,
        days,
        region,
        difficulty,
        desc,
        img: finalImageUrl,
        highlights,
        includes,
        excludes,
        itinerary,
      };

      if (isEdit) {
        await updateTrip(initialData.id, {
          ...payload,
          slug: initialData.slug,
        });
      } else {
        await createTrip(payload);
      }
      router.push("/admin/trips");
      router.refresh();
    } catch (err) {
      alert("Failed to save: " + err.message);
      setSaving(false);
      setUploading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
      <div className="bg-white rounded-2xl shadow-sm p-6 space-y-5">
        <h2 className="font-heading text-lg text-dark">Basic Information</h2>

        <div>
          <label className="block text-sm font-medium text-dark mb-1">
            Trip Title
          </label>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-dark/20 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-dark mb-1">
              Duration
            </label>
            <input
              required
              value={days}
              onChange={(e) => setDays(e.target.value)}
              placeholder="e.g. 10 Days"
              className="w-full border border-dark/20 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1">
              Region
            </label>
            <input
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              placeholder="e.g. Kabul · Bamyan"
              className="w-full border border-dark/20 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1">
              Difficulty
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full border border-dark/20 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
            >
              <option>Easy</option>
              <option>Moderate</option>
              <option>Challenging</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-dark mb-1">
            Short Description
          </label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows={3}
            className="w-full border border-dark/20 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark mb-1">
            Cover Image
          </label>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-40 h-28 object-cover rounded-lg mb-3 border border-dark/10"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="text-sm text-charcoal file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gold file:text-dark file:font-medium file:text-sm hover:file:bg-dark hover:file:text-white file:transition-colors"
          />
          <p className="text-xs text-charcoal/60 mt-1">
            Preview only for now — actual upload will be wired to Supabase
            Storage.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <RepeatableList
          label="Highlights"
          items={highlights}
          setItems={setHighlights}
          placeholder="e.g. The Buddha niches of Bamyan"
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <RepeatableList
          label="Includes"
          items={includes}
          setItems={setIncludes}
          placeholder="e.g. Private vehicle & driver"
        />
        <RepeatableList
          label="Excludes"
          items={excludes}
          setItems={setExcludes}
          placeholder="e.g. International flights"
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <ItineraryBuilder days={itinerary} setDays={setItinerary} />
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={saving || uploading}
          className="bg-gold hover:bg-dark hover:text-white transition-colors duration-200 text-dark font-semibold px-8 py-3 rounded disabled:opacity-60"
        >
          {uploading
            ? "Uploading image..."
            : saving
              ? "Saving..."
              : isEdit
                ? "Save Changes"
                : "Create Trip"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/trips")}
          className="text-charcoal text-sm hover:text-dark"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
