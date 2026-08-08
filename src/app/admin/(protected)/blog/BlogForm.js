"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createBlogPost, updateBlogPost } from "./actions";
import { uploadImage } from "@/lib/supabase/upload";

const categoryOptions = [
  "Safety & Ethics",
  "Culture",
  "Food",
  "Visa & Practical Info",
  "Best Time to Visit",
  "Destinations",
];

function FormatToolbar({ textareaRef, onInsert }) {
  function wrap(before, after = before) {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const value = textarea.value;
    const selected = value.slice(start, end) || "text";
    const newValue =
      value.slice(0, start) + before + selected + after + value.slice(end);
    onInsert(newValue);
  }

  function insertBlock(tag) {
    wrap(`<${tag}>`, `</${tag}>`);
  }

  return (
    <div className="flex flex-wrap gap-2 mb-2 pb-2 border-b border-dark/10">
      <button
        type="button"
        onClick={() => insertBlock("h2")}
        className="px-3 py-1.5 text-xs font-semibold bg-cream hover:bg-gold/20 rounded"
      >
        H2
      </button>
      <button
        type="button"
        onClick={() => insertBlock("h3")}
        className="px-3 py-1.5 text-xs font-semibold bg-cream hover:bg-gold/20 rounded"
      >
        H3
      </button>
      <button
        type="button"
        onClick={() => insertBlock("strong")}
        className="px-3 py-1.5 text-xs font-bold bg-cream hover:bg-gold/20 rounded"
      >
        Bold
      </button>
      <button
        type="button"
        onClick={() => insertBlock("p")}
        className="px-3 py-1.5 text-xs bg-cream hover:bg-gold/20 rounded"
      >
        Paragraph
      </button>
      <button
        type="button"
        onClick={() => wrap("<ul>\n  <li>", "</li>\n</ul>")}
        className="px-3 py-1.5 text-xs bg-cream hover:bg-gold/20 rounded"
      >
        Bullet List
      </button>
      <button
        type="button"
        onClick={() => wrap('<a href="https://">', "</a>")}
        className="px-3 py-1.5 text-xs bg-cream hover:bg-gold/20 rounded"
      >
        Link
      </button>
    </div>
  );
}

export default function BlogForm({ initialData }) {
  const router = useRouter();
  const isEdit = Boolean(initialData);
  const textareaRef = useRef(null);

  const [title, setTitle] = useState(initialData?.title || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [category, setCategory] = useState(
    initialData?.category || categoryOptions[0],
  );
  const [author, setAuthor] = useState(
    initialData?.author || "Ariana Expeditions Team",
  );
  const [published, setPublished] = useState(initialData?.published ?? true);
  const [imagePreview, setImagePreview] = useState(
    initialData?.cover_image || null,
  );
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
      let finalImageUrl = imagePreview;
      if (imageFile) {
        setUploading(true);
        finalImageUrl = await uploadImage(imageFile, "blog");
        setUploading(false);
      }

      const payload = {
        title,
        excerpt,
        content,
        category,
        author,
        published,
        coverImage: finalImageUrl,
      };

      if (isEdit) {
        await updateBlogPost(initialData.id, {
          ...payload,
          slug: initialData.slug,
        });
      } else {
        await createBlogPost(payload);
      }
      router.push("/admin/blog");
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
        <h2 className="font-heading text-lg text-dark">Article Details</h2>

        <div>
          <label className="block text-sm font-medium text-dark mb-1">
            Title
          </label>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Is Afghanistan Safe to Visit?"
            className="w-full border border-dark/20 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          <div>
            <label className="block text-sm font-medium text-dark mb-1">
              Author
            </label>
            <input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full border border-dark/20 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-dark mb-1">
            Excerpt{" "}
            <span className="text-charcoal/50 font-normal">
              (shown on the listing page and used for SEO)
            </span>
          </label>
          <textarea
            required
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={2}
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

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="w-5 h-5 accent-gold"
          />
          <span className="text-sm text-dark">
            Published{" "}
            <span className="text-charcoal/60">
              (uncheck to save as a draft)
            </span>
          </span>
        </label>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <label className="block text-sm font-medium text-dark mb-2">
          Article Content
        </label>
        <FormatToolbar textareaRef={textareaRef} onInsert={setContent} />
        <textarea
          ref={textareaRef}
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={16}
          placeholder="Select text and click a button above to format it, or type HTML tags directly (e.g. <h2>, <p>, <strong>, <ul><li>)."
          className="w-full border border-dark/20 rounded px-4 py-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-gold"
        />
        <p className="text-xs text-charcoal/60 mt-2">
          Tip: select some text first, then click a formatting button to wrap it
          — or just type HTML tags directly if you're comfortable with them.
        </p>
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
                : "Publish Article"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/blog")}
          className="text-charcoal text-sm hover:text-dark"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
