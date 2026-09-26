import React from "react";
import { AlertTriangle, Loader2, XCircle } from "lucide-react";

export default function RejectionModal({
  isOpen,
  onClose,
  reason,
  onReasonChange,
  onConfirm,
  loading = false,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-800">
              Reject Business Request
            </h2>
            <p className="text-xs text-slate-500">
              Provide a clear reason that will be sent to the business owner
            </p>
          </div>
        </div>

        <div className="px-6 py-5">
          <label className="mb-2 block text-xs font-semibold text-slate-700">
            Reason for rejection <span className="text-red-500">*</span>
          </label>
          <textarea
            value={reason}
            onChange={(e) => onReasonChange(e.target.value)}
            placeholder="Explain why this business registration is rejected (e.g. invalid documentation, unverifiable address)..."
            rows={4}
            autoFocus
            disabled={loading}
            className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-red-300 focus:bg-white focus:ring-2 focus:ring-red-100 disabled:opacity-50"
          />
        </div>


        <div className="flex items-center justify-end gap-2 border-t border-slate-100 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={!reason.trim() || loading}
            className="inline-flex items-center gap-1.5 rounded-xl bg-red-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Rejecting...
              </>
            ) : (
              <>
                <XCircle className="h-3.5 w-3.5" />
                Confirm Rejection
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
