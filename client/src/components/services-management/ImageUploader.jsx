import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { Upload, X } from "lucide-react";
import { API_BASE } from "./serviceConstants";
export default function ImageUploader({
  newFiles,
  existingImages,
  onNewFilesChange,
  onExistingChange,
}) {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const newPreviews = useMemo(
    () => newFiles.map((f) => ({ url: URL.createObjectURL(f), name: f.name })),
    [newFiles]
  );
  useEffect(() => {
    return () => newPreviews.forEach((p) => URL.revokeObjectURL(p.url));
  }, [newPreviews]);

  const addFiles = useCallback(
    (fileList) => {
      const allowed = /\.(jpe?g|png|gif|webp|svg)$/i;
      const valid = Array.from(fileList).filter((f) => allowed.test(f.name));
      if (valid.length === 0) return;
      onNewFilesChange([...newFiles, ...valid]);
    },
    [newFiles, onNewFilesChange]
  );
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
  };

  const handleFileInput = (e) => {
    if (e.target.files?.length) addFiles(e.target.files);
    e.target.value = "";
  };

  const removeNewFile = (index) => {
    onNewFilesChange(newFiles.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index) => {
    onExistingChange(existingImages.filter((_, i) => i !== index));
  };

  const totalCount = existingImages.length + newFiles.length;

  return (
    <div className="space-y-3">
      <label className="block text-xs font-semibold text-slate-700">
        <span className="flex items-center gap-1.5">
          <Upload className="h-3.5 w-3.5 text-slate-400" />
          Images
        </span>
      </label>
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-8 text-center transition ${
          dragActive
            ? "border-blue-400 bg-blue-50/60"
            : "border-slate-200 bg-slate-50/50 hover:border-slate-300 hover:bg-slate-50"
        }`}
      >
        <div
          className={`mb-3 flex h-11 w-11 items-center justify-center rounded-xl transition ${
            dragActive
              ? "bg-blue-100 text-blue-600"
              : "bg-slate-100 text-slate-400"
          }`}
        >
          <Upload className="h-5 w-5" />
        </div>
        <p className="text-sm font-medium text-slate-700">
          {dragActive ? "Drop images here" : "Drag & drop images here"}
        </p>
        <p className="mt-1 text-xs text-slate-400">
          or{" "}
          <span className="font-semibold text-blue-600">click to browse</span> ·
          JPG, PNG, GIF, WebP · max 5 MB
        </p>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp,image/svg+xml"
          multiple
          onChange={handleFileInput}
          className="hidden"
        />
      </div>
      {totalCount > 0 && (
        <div className="flex flex-wrap gap-3">
          {existingImages.map((url, idx) => (
            <div
              key={`existing-${idx}`}
              className="group relative h-20 w-20 overflow-hidden rounded-xl border border-slate-200 bg-slate-50"
            >
              <img
                src={url.startsWith("http") ? url : `${API_BASE}${url}`}
                alt={`Existing ${idx + 1}`}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              <button
                type="button"
                onClick={() => removeExistingImage(idx)}
                className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white opacity-0 shadow-sm transition group-hover:opacity-100"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          {newPreviews.map((p, idx) => (
            <div
              key={`new-${idx}`}
              className="group relative h-20 w-20 overflow-hidden rounded-xl border border-blue-200 bg-blue-50"
            >
              <img
                src={p.url}
                alt={p.name}
                className="h-full w-full object-cover"
              />
              <span className="absolute bottom-0 left-0 right-0 bg-blue-600/70 px-1 py-0.5 text-center text-[9px] font-semibold text-white backdrop-blur-sm">
                New
              </span>
              <button
                type="button"
                onClick={() => removeNewFile(idx)}
                className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white opacity-0 shadow-sm transition group-hover:opacity-100"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
