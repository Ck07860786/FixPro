import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchServices,
  addService,
  editService,
  removeService,
  clearServiceError,
} from "@/features/services/serviceSlice";
import { Plus, X, AlertCircle, PackageOpen } from "lucide-react";
import ServiceFilters from "@/components/services-management/ServiceFilters";
import ServiceCard from "@/components/services-management/ServiceCard";
import ServiceForm from "@/components/services-management/ServiceForm";
import SkeletonCard from "@/components/services-management/SkeletonCard";
export default function Services() {
  const dispatch = useDispatch();

  const { services, loading, error, creating, updating, deleting } =
    useSelector((state) => state.services);
  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);
  const filteredServices = useMemo(() => {
    let list = services;

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q) ||
          (s.description && s.description.toLowerCase().includes(q))
      );
    }

    if (categoryFilter !== "All") {
      list = list.filter(
        (s) => s.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    return list;
  }, [services, search, categoryFilter]);
  const openCreateForm = () => {
    setEditTarget(null);
    setShowForm(true);
    dispatch(clearServiceError());
  };

  const openEditForm = (service) => {
    setEditTarget({
      ...service,
      price: String(service.price),
      estimatedDuration: String(service.estimatedDuration),
      existingImages: service.images || [],
      newFiles: [],
    });
    setShowForm(true);
    dispatch(clearServiceError());
  };

  const closeForm = () => {
    setShowForm(false);
    setEditTarget(null);
    dispatch(clearServiceError());
  };

  const handleCreate = async (formData) => {
    const result = await dispatch(addService(formData));
    if (!result.error) closeForm();
  };

  const handleUpdate = async (formData) => {
    if (!editTarget?._id) return;
    const result = await dispatch(
      editService({ id: editTarget._id, data: formData })
    );
    if (!result.error) closeForm();
  };

  const handleDelete = (id) => {
    dispatch(removeService(id));
  };

  const isFiltered = Boolean(search.trim() || categoryFilter !== "All");

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Services
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage and list the services your business offers.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateForm}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          List Service
        </button>
      </div>
      {error && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span className="flex-1">{error}</span>
          <button
            type="button"
            onClick={() => dispatch(clearServiceError())}
            className="text-red-400 transition hover:text-red-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
      {showForm && (
        <div className="mb-6">
          <ServiceForm
            key={editTarget?._id || "new"}
            initial={editTarget}
            onSubmit={editTarget ? handleUpdate : handleCreate}
            onCancel={closeForm}
            isBusy={creating || updating}
          />
        </div>
      )}
      <ServiceFilters
        search={search}
        onSearchChange={setSearch}
        categoryFilter={categoryFilter}
        onCategoryFilterChange={setCategoryFilter}
      />
      {loading ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : filteredServices.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service._id}
              service={service}
              onEdit={openEditForm}
              onDelete={handleDelete}
              isDeleting={deleting}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white py-20">
          <PackageOpen className="mb-4 h-12 w-12 text-slate-300" />
          <h3 className="mb-1 text-base font-bold text-slate-700">
            {isFiltered
              ? "No services match your filters"
              : "No services listed yet"}
          </h3>
          <p className="mb-5 text-sm text-slate-500">
            {isFiltered
              ? "Try adjusting your search or category filter."
              : "Get started by listing your first service."}
          </p>
          {!isFiltered && (
            <button
              type="button"
              onClick={openCreateForm}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              List Service
            </button>
          )}
        </div>
      )}
      {!loading && services.length > 0 && (
        <div className="mt-6 flex items-center justify-between text-xs text-slate-500">
          <span>
            Showing {filteredServices.length} of {services.length} service
            {services.length !== 1 && "s"}
          </span>
        </div>
      )}
    </div>
  );
}
