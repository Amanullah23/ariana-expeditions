"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { categoryOptions } from "./mockData";
import { createFaqItem, updateFaqItem } from "./actions";

export default function FaqForm({ initialData }) {
  const router = useRouter();
  const isEdit = Boolean(initialData);

  const [category, setCategory] = useState(
    initialData?.category || categoryOptions[0],
  );
  const [question, setQuestion] = useState(initialData?.question || "");
  const [answer, setAnswer] = useState(initialData?.answer || "");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);

    const payload = { category, question, answer };

    try {
      if (isEdit) {
        await updateFaqItem(initialData.id, payload);
      } else {
        await createFaqItem(payload);
      }
      router.push("/admin/faq");
      router.refresh();
    } catch (err) {
      alert("Failed to save: " + err.message);
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
      <div className="bg-white rounded-2xl shadow-sm p-6 space-y-5">
        <h2 className="font-heading text-lg text-dark">Question Details</h2>

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
            Question
          </label>
          <input
            required
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full border border-dark/20 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark mb-1">
            Answer
          </label>
          <textarea
            required
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={5}
            className="w-full border border-dark/20 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={saving}
          className="bg-gold hover:bg-dark hover:text-white transition-colors duration-200 text-dark font-semibold px-8 py-3 rounded disabled:opacity-60"
        >
          {saving ? "Saving..." : isEdit ? "Save Changes" : "Add Question"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/faq")}
          className="text-charcoal text-sm hover:text-dark"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
