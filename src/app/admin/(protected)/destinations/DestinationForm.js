"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createDestination, updateDestination } from "./actions";
import { uploadImage } from "@/lib/supabase/upload";

function PlacesBuilder({ places, setPlaces }) {
  function update(i, field, value) {
    const next = [...places];
    next[i] = { ...next[i], [field]: value };
    setPlaces(next);
  }
  function add() {
    setPlaces([...places, { name: "", desc: "" }]);
  }
  function remove(i) {
    setPlaces(places.filter((_, idx) => idx !== i));
  }

  return (
    <div>
      <label className="block text-sm font-medium text-dark mb-2">Places</label>
      <div className="space-y-4">
        {places.map((p, i) => (
          <div
            key={i}
            className="border border-dark/10 rounded-lg p-4 relative"
          >
            <button
              type="button"
              onClick={() => remove(i)}
              className="absolute top-3 right-3 text-charcoal/50 hover:text-red-600"
              aria-label="Remove place"
            >
              ✕
            </button>
            <input
              value={p.name}
              onChange={(e) => update(i, "name", e.target.value)}
              placeholder="Place name (e.g. Herat)"
              className="w-full border border-dark/20 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold mb-3"
            />
            <textarea
              value={p.desc}
              onChange={(e) => update(i, "desc", e.target.value)}
              placeholder="Short description"
              rows={2}
              className="w-full border border-dark/20 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={add}
        className="mt-3 text-gold text-sm font-medium hover:underline"
      >
        + Add place
      </button>
    </div>
  );
}

function RepeatableImages({ images, setImages }) {
  function update(i, value) {
    const next = [...images];
    next[i] = value;
    setImages(next);
  }
  function add() {
    setImages([...images, ""]);
  }
  function remove(i) {
    setImages(images.filter((_, idx) => idx !== i));
  }

  return (
    <div>
      <label className="block text-sm font-medium text-dark mb-2">
        Gallery Images (URLs for now)
      </label>
      <div className="space-y-2">
        {images.map((val, i) => (
          <div key={i} className="flex gap-2">
            <input
              value={val}
              onChange={(e) => update(i, e.target.value)}
              placeholder="/images/example.jpg"
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
        + Add image
      </button>
      <p className="text-xs text-charcoal/60 mt-1">
        Real file upload will be wired to Supabase Storage.
      </p>
    </div>
  );
}

export default function DestinationForm({ initialData }) {
  const router = useRouter();
  const isEdit = Boolean(initialData);

  const [title, setTitle] = useState(initialData?.title || "");
  const [tag, setTag] = useState(initialData?.tag || "");
  const [intro, setIntro] = useState(initialData?.intro || "");
  const [imagePreview, setImagePreview] = useState(initialData?.img || null);
  const [gallery, setGallery] = useState(initialData?.gallery || [""]);
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [places, setPlaces] = useState(
    initialData?.places || [{ name: "", desc: "" }],
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
        finalImageUrl = await uploadImage(imageFile, "destinations");
        setUploading(false);
      }

      const payload = {
        title,
        tag,
        intro,
        imagePreview: finalImageUrl,
        gallery,
        places,
      };

      if (isEdit) {
        await updateDestination(initialData.id, initialData.slug, payload);
      } else {
        await createDestination(payload);
      }
      router.push("/admin/destinations");
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
        <h2 className="font-heading text-lg text-dark">Theme Details</h2>

        <div>
          <label className="block text-sm font-medium text-dark mb-1">
            Theme Title
          </label>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Ancient Cities"
            className="w-full border border-dark/20 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark mb-1">
            Tag Line
          </label>
          <input
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="e.g. Best for history & architecture"
            className="w-full border border-dark/20 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark mb-1">
            Intro
          </label>
          <textarea
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
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
        <RepeatableImages images={gallery} setImages={setGallery} />
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <PlacesBuilder places={places} setPlaces={setPlaces} />
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
                : "Create Theme"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/destinations")}
          className="text-charcoal text-sm hover:text-dark"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
