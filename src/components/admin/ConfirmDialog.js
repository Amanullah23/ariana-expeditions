"use client";

export default function ConfirmDialog({
  open,
  title = "Are you sure?",
  message,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  danger = true,
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center px-4"
      onClick={onCancel}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6"
      >
        <div className="flex items-start gap-4 mb-5">
          <span
            className={`shrink-0 w-11 h-11 rounded-full flex items-center justify-center ${
              danger ? "bg-red-50 text-red-600" : "bg-gold/15 text-dark"
            }`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </span>
          <div>
            <h3 className="font-heading text-lg text-dark mb-1">{title}</h3>
            {message && <p className="text-charcoal text-sm">{message}</p>}
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 cursor-pointer text-sm font-medium text-charcoal hover:text-dark rounded-lg transition-colors duration-200"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`px-5 py-2 text-sm cursor-pointer font-semibold rounded-lg transition-colors duration-200 ${
              danger
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-gold hover:bg-dark hover:text-white text-dark"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
