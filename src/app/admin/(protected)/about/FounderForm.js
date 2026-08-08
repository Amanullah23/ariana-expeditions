"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createFounder, updateFounder } from "./actions";
import { uploadImage } from "@/lib/supabase/upload";

export default function FounderForm({ initialData }) {
  const router = useRouter();
  const isEdit = Boolean(initialData);

  const [fullName, setFullName] = useState(initialData?.full_name || "");
  const [position, setPosition] = useState(initialData?.position || "");
  const [bio, setBio] = useState(initialData?.bio || "");
  const [imagePreview, setImagePreview] = useState(initialData?.image || null);
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
        finalImage = await uploadImage(imageFile, "founders");
        setUploading(false);
      }

      const payload = { fullName, position, bio, image: finalImage };

      if (isEdit) {
        await updateFounder(initialData.id, payload);
      } else {
        await createFounder(payload);
      }
      router.push("/admin/about/founders");
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
            Full Name
          </label>
          <input
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="e.g. Jalal Mosavi"
            className="w-full border border-dark/20 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-dark mb-1">
            Position
          </label>
          <input
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            placeholder="e.g. Co-Founder & Guide, Kabul, Afghanistan"
            className="w-full border border-dark/20 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-dark mb-1">
            Bio
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={8}
            placeholder="Write in normal paragraphs — leave a blank line between paragraphs."
            className="w-full border border-dark/20 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-dark mb-1">
            Photo
          </label>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-lg mb-3 border border-dark/10"
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
                : "Add Founder"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/about/founders")}
          className="text-charcoal text-sm hover:text-dark"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
