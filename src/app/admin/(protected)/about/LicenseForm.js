"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createLicense, updateLicense } from "./actions";
import { uploadImage } from "@/lib/supabase/upload";

export default function LicenseForm({ initialData }) {
  const router = useRouter();
  const isEdit = Boolean(initialData);

  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || "",
  );
  const [licenseNumber, setLicenseNumber] = useState(
    initialData?.license_number || "",
  );
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
        finalImage = await uploadImage(imageFile, "licenses");
        setUploading(false);
      }

      const payload = { title, description, licenseNumber, image: finalImage };

      if (isEdit) {
        await updateLicense(initialData.id, payload);
      } else {
        await createLicense(payload);
      }
      router.push("/admin/about/licenses");
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
            Title
          </label>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Licensed in Afghanistan"
            className="w-full border border-dark/20 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-dark mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            placeholder="e.g. Registered tour and travel operator, Kabul, Afghanistan."
            className="w-full border border-dark/20 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-dark mb-1">
            License / Registration Number
          </label>
          <input
            value={licenseNumber}
            onChange={(e) => setLicenseNumber(e.target.value)}
            placeholder="e.g. AFG-2021-00458"
            className="w-full border border-dark/20 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-dark mb-1">
            License Image / Scan
          </label>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-40 h-28 object-contain rounded-lg mb-3 border border-dark/10 bg-white"
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
                : "Add License"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/about/licenses")}
          className="text-charcoal text-sm hover:text-dark"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
