"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createTheme, updateTheme } from "./actions";
import { uploadImage } from "@/lib/supabase/upload";

export default function ThemeForm({ initialData }) {
  const router = useRouter();
  const isEdit = Boolean(initialData);

  const [title, setTitle] = useState(initialData?.title || "");
  const [tag, setTag] = useState(initialData?.tag || "");
  const [intro, setIntro] = useState(initialData?.intro || "");
  const [imagePreview, setImagePreview] = useState(initialData?.img || null);
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

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
      let finalImage = imagePreview;
      if (imageFile) {
        setUploading(true);
        finalImage = await uploadImage(imageFile, "themes");
        setUploading(false);
      }

      const payload = { title, tag, intro, img: finalImage };

      if (isEdit) {
        await updateTheme(initialData.id, payload);
      } else {
        await createTheme(payload);
      }
      router.push("/admin/places/themes");
      router.refresh();
    } catch (err) {
      alert("Failed to save: " + err.message);
      setSaving(false);
      setUploading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="bg-white rounded-2xl shadow-sm p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-dark mb-1">
            Theme Title
          </label>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Echoes of Ariana"
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
            placeholder="e.g. Cities of Memory"
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
            accept="image/*,.heic,.heif"
            onChange={handleImageChange}
            className="text-sm text-charcoal file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gold file:text-dark file:font-medium file:text-sm hover:file:bg-dark hover:file:text-white file:transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={saving || uploading}
          className="bg-gold hover:bg-dark hover:text-white transition-colors duration-200 text-dark font-semibold px-8 py-3 rounded disabled:opacity-60"
        >
          {uploading
            ? "Uploading..."
            : saving
              ? "Saving..."
              : isEdit
                ? "Save Changes"
                : "Create Theme"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/places/themes")}
          className="text-charcoal text-sm hover:text-dark"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
