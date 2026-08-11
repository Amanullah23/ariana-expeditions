"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  createPlace,
  updatePlace,
  getAllTripsForLinking,
  getAllThemesForSelect,
} from "./actions";
import { uploadImage } from "@/lib/supabase/upload";
import { uploadVideo } from "@/lib/supabase/uploadVideo";

const categoryOptions = ["Historical Site", "Nature", "Culture", "Heritage"];

const MAX_VIDEO_MB = 20;

function GalleryUploader({
  images,
  setImages,
  uploadingIndex,
  setUploadingIndex,
}) {
  async function handleFileAdd(e) {
    const file = e.target.files[0];
    if (!file) return;
    const idx = images.length;
    setUploadingIndex(idx);
    try {
      const url = await uploadImage(file, "places-gallery");
      setImages([...images, url]);
    } catch (err) {
      alert("Upload failed: " + err.message);
    }
    setUploadingIndex(null);
    e.target.value = "";
  }

  function removeImage(idx) {
    setImages(images.filter((_, i) => i !== idx));
  }

  return (
    <div>
      <label className="block text-sm font-medium text-dark mb-2">
        Gallery Images
      </label>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-3">
        {images.map((url, idx) => (
          <div key={idx} className="relative group">
            <img
              src={url}
              alt=""
              className="w-full h-20 object-cover rounded-lg border border-dark/10"
            />
            <button
              type="button"
              onClick={() => removeImage(idx)}
              className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              ✕
            </button>
          </div>
        ))}
        {uploadingIndex !== null && (
          <div className="w-full h-20 rounded-lg border border-dark/10 bg-cream flex items-center justify-center text-xs text-charcoal/50">
            Uploading...
          </div>
        )}
      </div>
      <input
        type="file"
        accept="image/*,.heic,.heif"
        onChange={handleFileAdd}
        className="text-sm text-charcoal file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gold file:text-dark file:font-medium file:text-sm hover:file:bg-dark hover:file:text-white file:transition-colors"
      />
      <p className="text-xs text-charcoal/60 mt-1">
        Add photos one at a time — each uploads automatically.
      </p>
    </div>
  );
}

export default function PlaceForm({ initialData }) {
  const router = useRouter();
  const isEdit = Boolean(initialData);

  const [name, setName] = useState(initialData?.name || "");
  const [province, setProvince] = useState(initialData?.province || "");
  const [category, setCategory] = useState(
    initialData?.category || categoryOptions[0],
  );
  const [shortDescription, setShortDescription] = useState(
    initialData?.short_description || "",
  );
  const [fullDetails, setFullDetails] = useState(
    initialData?.full_details || "",
  );
  const [visitorExperience, setVisitorExperience] = useState(
    initialData?.visitor_experience || "",
  );
  const [status, setStatus] = useState(initialData?.status || "active");
  const [mainImagePreview, setMainImagePreview] = useState(
    initialData?.main_image || null,
  );
  const [mainImageFile, setMainImageFile] = useState(null);
  const [gallery, setGallery] = useState(initialData?.gallery || []);
  const [galleryUploadingIndex, setGalleryUploadingIndex] = useState(null);

  const [allTrips, setAllTrips] = useState([]);
  const [linkedTripIds, setLinkedTripIds] = useState(
    initialData?.place_trips?.map((pt) => pt.trip_id) || [],
  );

  const [allThemes, setAllThemes] = useState([]);
  const [destinationId, setDestinationId] = useState(
    initialData?.destination_id || "",
  );

  const [youtubeUrl, setYoutubeUrl] = useState(initialData?.youtube_url || "");
  const [videoFile, setVideoFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState(initialData?.video_url || "");
  const [videoError, setVideoError] = useState("");
  const [uploadingVideo, setUploadingVideo] = useState(false);

  const [saving, setSaving] = useState(false);
  const [uploadingMain, setUploadingMain] = useState(false);

  useEffect(() => {
    async function loadOptions() {
      const trips = await getAllTripsForLinking();
      setAllTrips(trips);
      const themes = await getAllThemesForSelect();
      setAllThemes(themes);
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time load on mount, safe
    loadOptions();
  }, []);

  function handleMainImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setMainImageFile(file);
      setMainImagePreview(URL.createObjectURL(file));
    }
  }

  function handleVideoFileChange(e) {
    const file = e.target.files[0];
    setVideoError("");
    if (!file) return;

    const sizeMB = file.size / 1024 / 1024;
    if (sizeMB > MAX_VIDEO_MB) {
      setVideoError(
        `That file is ${sizeMB.toFixed(1)}MB — the maximum allowed is ${MAX_VIDEO_MB}MB. Please compress it and try again.`,
      );
      e.target.value = "";
      return;
    }

    setVideoFile(file);
  }

  function toggleTrip(tripId) {
    setLinkedTripIds((prev) =>
      prev.includes(tripId)
        ? prev.filter((id) => id !== tripId)
        : [...prev, tripId],
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);

    try {
      let finalMainImage = mainImagePreview;
      if (mainImageFile) {
        setUploadingMain(true);
        finalMainImage = await uploadImage(mainImageFile, "places");
        setUploadingMain(false);
      }

      let finalVideoUrl = videoUrl;
      if (videoFile) {
        setUploadingVideo(true);
        try {
          finalVideoUrl = await uploadVideo(videoFile, "place-videos");
        } catch (err) {
          setUploadingVideo(false);
          setVideoError(err.message);
          setSaving(false);
          return;
        }
        setUploadingVideo(false);
      }

      const payload = {
        name,
        province,
        category,
        shortDescription,
        fullDetails,
        visitorExperience,
        status,
        mainImage: finalMainImage,
        gallery,
        linkedTripIds,
        destinationId: destinationId || null,
        youtubeUrl,
        videoUrl: finalVideoUrl,
      };

      if (isEdit) {
        await updatePlace(initialData.id, {
          ...payload,
          slug: initialData.slug,
        });
      } else {
        await createPlace(payload);
      }
      router.push("/admin/places");
      router.refresh();
    } catch (err) {
      alert("Failed to save: " + err.message);
      setSaving(false);
      setUploadingMain(false);
      setUploadingVideo(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
      <div className="bg-white rounded-2xl shadow-sm p-6 space-y-5">
        <h2 className="font-heading text-lg text-dark">Basic Information</h2>

        <div>
          <label className="block text-sm font-medium text-dark mb-1">
            Destination Name
          </label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Bamiyan Valley"
            className="w-full border border-dark/20 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-dark mb-1">
              Province
            </label>
            <input
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              placeholder="e.g. Bamyan Province"
              className="w-full border border-dark/20 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-dark/20 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
            >
              {categoryOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-dark mb-1">
            Theme
          </label>
          <select
            value={destinationId}
            onChange={(e) => setDestinationId(e.target.value)}
            className="w-full border border-dark/20 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
          >
            <option value="">No theme (uncategorized)</option>
            {allThemes.map((t) => (
              <option key={t.id} value={t.id}>
                {t.title}
              </option>
            ))}
          </select>
          <p className="text-xs text-charcoal/60 mt-1">
            Optional — groups this site under a browsable theme on the public
            Sites page.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-dark mb-1">
            Short Description
          </label>
          <textarea
            required
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            rows={2}
            placeholder="A brief introduction shown on the listing card"
            className="w-full border border-dark/20 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark mb-1">
            Main Image
          </label>
          {mainImagePreview && (
            <img
              src={mainImagePreview}
              alt="Preview"
              className="w-40 h-28 object-cover rounded-lg mb-3 border border-dark/10"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleMainImageChange}
            className="text-sm text-charcoal file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gold file:text-dark file:font-medium file:text-sm hover:file:bg-dark hover:file:text-white file:transition-colors"
          />
        </div>

        <div>
          <label className="flex items-center gap-3 cursor-pointer">
            <span className="text-sm font-medium text-dark">Status:</span>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border border-dark/20 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
            >
              <option value="active">Active (visible on site)</option>
              <option value="hidden">Hidden (not shown publicly)</option>
            </select>
          </label>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6 space-y-5">
        <h2 className="font-heading text-lg text-dark">Full Details</h2>
        <div>
          <label className="block text-sm font-medium text-dark mb-1">
            History, Culture & Importance
          </label>
          <textarea
            value={fullDetails}
            onChange={(e) => setFullDetails(e.target.value)}
            rows={8}
            placeholder="Write in normal paragraphs — leave a blank line between paragraphs."
            className="w-full border border-dark/20 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-dark mb-1">
            Visitor Experience / Story
          </label>
          <textarea
            value={visitorExperience}
            onChange={(e) => setVisitorExperience(e.target.value)}
            rows={4}
            placeholder="A human story, local tradition, or firsthand experience"
            className="w-full border border-dark/20 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <GalleryUploader
          images={gallery}
          setImages={setGallery}
          uploadingIndex={galleryUploadingIndex}
          setUploadingIndex={setGalleryUploadingIndex}
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6 space-y-5">
        <h2 className="font-heading text-lg text-dark">Video (Optional)</h2>

        <div>
          <label className="block text-sm font-medium text-dark mb-1">
            YouTube Link
          </label>
          <input
            type="url"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            placeholder="https://youtube.com/watch?v=... or a Shorts link"
            className="w-full border border-dark/20 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
          />
          <p className="text-xs text-charcoal/60 mt-1">
            If filled in, this video takes priority over an uploaded file below.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-dark mb-1">
            Or Upload a Video File (max {MAX_VIDEO_MB}MB)
          </label>
          {videoError && (
            <p className="text-red-600 text-sm bg-red-50 rounded px-3 py-2 mb-2">
              {videoError}
            </p>
          )}
          {videoUrl && !videoFile && (
            <p className="text-xs text-charcoal/60 mb-2">
              A video is currently uploaded for this place.
            </p>
          )}
          {videoFile && (
            <p className="text-xs text-gold mb-2">
              Ready to upload: {videoFile.name} (
              {(videoFile.size / 1024 / 1024).toFixed(1)}MB)
            </p>
          )}
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoFileChange}
            className="text-sm text-charcoal file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gold file:text-dark file:font-medium file:text-sm hover:file:bg-dark hover:file:text-white file:transition-colors"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <label className="block text-sm font-medium text-dark mb-3">
          Connected Trips
        </label>
        {allTrips.length === 0 ? (
          <p className="text-charcoal text-sm">No trips exist yet to link.</p>
        ) : (
          <div className="space-y-2">
            {allTrips.map((trip) => (
              <label
                key={trip.id}
                className="flex items-center gap-3 cursor-pointer py-1.5"
              >
                <input
                  type="checkbox"
                  checked={linkedTripIds.includes(trip.id)}
                  onChange={() => toggleTrip(trip.id)}
                  className="w-5 h-5 accent-gold"
                />
                <span className="text-sm text-dark">{trip.title}</span>
              </label>
            ))}
          </div>
        )}
        <p className="text-xs text-charcoal/60 mt-3">
          Select which trips include this destination — they&apos;ll appear on
          its public page.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={saving || uploadingMain || uploadingVideo}
          className="bg-gold hover:bg-dark hover:text-white transition-colors duration-200 text-dark font-semibold px-8 py-3 rounded disabled:opacity-60"
        >
          {uploadingVideo
            ? "Uploading video..."
            : uploadingMain
              ? "Uploading image..."
              : saving
                ? "Saving..."
                : isEdit
                  ? "Save Changes"
                  : "Create Destination"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/places")}
          className="text-charcoal text-sm hover:text-dark"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
