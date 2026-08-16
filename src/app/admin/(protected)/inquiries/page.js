"use client";
import { useState, useEffect } from "react";
import { getInquiries, getPassportSignedUrl } from "./actions";

function InquiryDetail({ inquiry, onClose }) {
  const [passportUrl, setPassportUrl] = useState(null);
  const [loadingPassport, setLoadingPassport] = useState(false);

  async function handleViewPassport() {
    setLoadingPassport(true);
    const url = await getPassportSignedUrl(inquiry.passport_path);
    setPassportUrl(url);
    setLoadingPassport(false);
  }

  return (
    <div
      className="modal-backdrop fixed inset-0 z-[100] bg-black/50 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        className="modal-panel bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-5">
          <h2 className="font-heading text-xl text-dark">Inquiry Details</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-charcoal/50 hover:text-dark text-xl"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-xs text-charcoal/60 uppercase tracking-wide mb-0.5">
              Full Name
            </p>
            <p className="text-dark font-medium">{inquiry.fullname || "—"}</p>
          </div>
          <div>
            <p className="text-xs text-charcoal/60 uppercase tracking-wide mb-0.5">
              Email
            </p>
            <a
              href={`mailto:${inquiry.email}`}
              className="text-gold font-medium hover:underline"
            >
              {inquiry.email || "—"}
            </a>
          </div>
          <div>
            <p className="text-xs text-charcoal/60 uppercase tracking-wide mb-0.5">
              Phone
            </p>
            <p className="text-dark font-medium">{inquiry.phone || "—"}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-charcoal/60 uppercase tracking-wide mb-0.5">
                Preferred Trip
              </p>
              <p className="text-dark font-medium">
                {inquiry.preferred_trip || "—"}
              </p>
            </div>
            <div>
              <p className="text-xs text-charcoal/60 uppercase tracking-wide mb-0.5">
                Travel Dates
              </p>
              <p className="text-dark font-medium">
                {inquiry.travel_dates || "—"}
              </p>
            </div>
          </div>
          <div>
            <p className="text-xs text-charcoal/60 uppercase tracking-wide mb-0.5">
              # of Travelers
            </p>
            <p className="text-dark font-medium">{inquiry.travelers || "—"}</p>
          </div>
          <div>
            <p className="text-xs text-charcoal/60 uppercase tracking-wide mb-0.5">
              Message
            </p>
            <p className="text-dark whitespace-pre-wrap">
              {inquiry.message || "—"}
            </p>
          </div>

          <div className="pt-2 border-t border-dark/10">
            <p className="text-xs text-charcoal/60 uppercase tracking-wide mb-2">
              Passport
            </p>
            {!inquiry.passport_path ? (
              <p className="text-charcoal/50 text-sm">No passport attached.</p>
            ) : passportUrl ? (
              <a
                href={passportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-gold font-medium hover:underline text-sm"
              >
                Open Passport File →
              </a>
            ) : (
              <button
                onClick={handleViewPassport}
                disabled={loadingPassport}
                className="bg-gold hover:bg-dark hover:text-white transition-colors duration-200 text-dark font-semibold text-sm px-5 py-2 rounded disabled:opacity-60"
              >
                {loadingPassport ? "Loading..." : "View Passport"}
              </button>
            )}
            <p className="text-xs text-charcoal/50 mt-2">
              Link expires 5 minutes after generation, for security.
            </p>
          </div>

          <div className="pt-2 text-xs text-charcoal/50">
            Submitted {new Date(inquiry.created_at).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  async function loadInquiries() {
    setLoading(true);
    try {
      const data = await getInquiries();
      setInquiries(data);
    } catch (err) {
      console.error("Failed to load inquiries:", err.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time load on mount, safe
    loadInquiries();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-2xl md:text-3xl text-dark mb-1">
          Contact Form
        </h1>
        <p className="text-charcoal text-sm">
          Every inquiry submitted through the public Contact page.
        </p>
      </div>

      {loading ? (
        <p className="text-charcoal text-sm text-center py-12">
          Loading inquiries...
        </p>
      ) : inquiries.length === 0 ? (
        <p className="text-charcoal text-sm text-center py-12">
          No inquiries yet.
        </p>
      ) : (
        <div className="space-y-3">
          {inquiries.map((inq) => (
            <button
              key={inq.id}
              onClick={() => setSelected(inq)}
              className="w-full text-left bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 p-5 flex items-center justify-between gap-4"
            >
              <div className="min-w-0">
                <p className="text-dark font-semibold truncate">
                  {inq.fullname || "Unnamed"}
                </p>
                <p className="text-charcoal text-sm truncate">{inq.email}</p>
                <p className="text-charcoal/60 text-xs mt-1">
                  {inq.preferred_trip || "No trip specified"}
                  {inq.passport_path && (
                    <span className="ml-2 text-gold font-medium">
                      · Passport attached
                    </span>
                  )}
                </p>
              </div>
              <span className="text-charcoal/50 text-xs shrink-0">
                {new Date(inq.created_at).toLocaleDateString()}
              </span>
            </button>
          ))}
        </div>
      )}

      {selected && (
        <InquiryDetail inquiry={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
