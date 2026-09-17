import { useState } from "react";
import {
  X,
  Wrench,
  FileText,
  IndianRupee,
  Clock,
  ToggleLeft,
  ToggleRight,
  Loader2,
} from "lucide-react";
import CategorySelect from "./CategorySelect";
import ImageUploader from "./ImageUploader";
import { EMPTY_FORM } from "./serviceConstants";
export default function ServiceForm({ initial, onSubmit, onCancel, isBusy }) {
  const [form, setForm] = useState(initial || EMPTY_FORM);

  const set = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", form.name.trim());
    fd.append("description", form.description.trim());
    fd.append("category", form.category.trim());
    fd.append("price", Number(form.price));
    fd.append("estimatedDuration", Number(form.estimatedDuration));
    fd.append("isActive", form.isActive);
    if (form.existingImages.length > 0) {
      fd.append("existingImages", JSON.stringify(form.existingImages));
    }
    form.newFiles.forEach((file) => fd.append("images", file));

    onSubmit(fd);
  };

  const isEdit = !!initial?._id;

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-base font-bold text-slate-900">
          {isEdit ? "Update Service" : "List a New Service"}
        </h2>
        <button
          type="button"
          onClick={onCancel}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-700">
              <span className="flex items-center gap-1.5">
                <Wrench className="h-3.5 w-3.5 text-slate-400" />
                Service Name *
              </span>
            </label>
            <input
              required
              type="text"
              value={form.name}
              onChange={set("name")}
              placeholder="e.g. AC Deep Clean"
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <CategorySelect
            value={form.category}
            onChange={(val) =>
              setForm((prev) => ({ ...prev, category: val }))
            }
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-slate-700">
            <span className="flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 text-slate-400" />
              Description
            </span>
          </label>
          <textarea
            value={form.description}
            onChange={set("description")}
            rows={3}
            placeholder="Brief description of the service…"
            className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-700">
              <span className="flex items-center gap-1.5">
                <IndianRupee className="h-3.5 w-3.5 text-slate-400" />
                Price (₹) *
              </span>
            </label>
            <input
              required
              type="number"
              min="0"
              step="1"
              value={form.price}
              onChange={set("price")}
              placeholder="e.g. 1500"
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-700">
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-slate-400" />
                Est. Duration (mins) *
              </span>
            </label>
            <input
              required
              type="number"
              min="1"
              value={form.estimatedDuration}
              onChange={set("estimatedDuration")}
              placeholder="e.g. 60"
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>
        <ImageUploader
          newFiles={form.newFiles}
          existingImages={form.existingImages}
          onNewFilesChange={(files) =>
            setForm((prev) => ({ ...prev, newFiles: files }))
          }
          onExistingChange={(imgs) =>
            setForm((prev) => ({ ...prev, existingImages: imgs }))
          }
        />
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() =>
              setForm((prev) => ({
                ...prev,
                isActive: !prev.isActive,
              }))
            }
            className="text-slate-600 transition hover:text-blue-600"
          >
            {form.isActive ? (
              <ToggleRight className="h-7 w-7 text-blue-600" />
            ) : (
              <ToggleLeft className="h-7 w-7 text-slate-400" />
            )}
          </button>
          <span className="text-sm font-medium text-slate-700">
            {form.isActive ? "Active" : "Inactive"}
          </span>
        </div>
        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={isBusy}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-60"
          >
            {isBusy && <Loader2 className="h-4 w-4 animate-spin" />}
            {isEdit ? "Update Service" : "Create Service"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
