import { Loader2 } from "lucide-react";
export default function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 p-8">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-sm">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
      <p className="text-xs font-medium text-slate-400">{message}</p>
    </div>
  );
}
