import { useState } from "react";
import {
  CheckCircle2,
  X,
  Eye,
  EyeOff,
  AlertCircle,
  Copy,
  Check,
} from "lucide-react";

export default function CredentialsModal({ credentials, onClose }) {
  const [copied, setCopied] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (!credentials) return null;

  const handleCopy = async () => {
    const text = `Email: ${credentials.email}\nTemporary Password: ${credentials.tempPassword}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {

      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <>

      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >

          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Technician Created!
                </h3>
                <p className="text-xs text-slate-500">
                  Share these credentials securely
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mb-5 rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Name
              </span>
              <p className="text-sm font-semibold text-slate-800">
                {credentials.name}
              </p>
            </div>

            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Email
              </span>
              <p className="text-sm font-semibold text-slate-800">
                {credentials.email}
              </p>
            </div>

            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Temporary Password
              </span>
              <div className="flex items-center gap-2">
                <p className="text-sm font-mono font-bold text-blue-700">
                  {showPassword ? credentials.tempPassword : "••••••••"}
                </p>
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-3.5 w-3.5" />
                  ) : (
                    <Eye className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="mb-5 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2.5">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
            <p className="text-xs leading-relaxed text-amber-800">
              This password is shown only once. Please copy and share it
              securely with the technician. They should change it after
              their first login.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleCopy}
              className={`inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold shadow-sm transition ${copied
                ? "bg-emerald-600 text-white"
                : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" /> Copy Credentials
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
