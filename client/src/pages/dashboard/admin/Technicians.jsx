import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTechnicians,
  addTechnician,
  editTechnician,
  removeTechnician,
  clearTechnicianError,
  clearCreatedCredentials,
} from "@/features/technicians/technicianSlice";
import { UserPlus, AlertCircle, X } from "lucide-react";
import TechnicianStats from "@/components/technicians-management/TechnicianStats";
import TechnicianFilters from "@/components/technicians-management/TechnicianFilters";
import TechnicianTable from "@/components/technicians-management/TechnicianTable";
import TechnicianForm from "@/components/technicians-management/TechnicianForm";
import CredentialsModal from "@/components/technicians-management/CredentialsModal";
export default function Technicians() {
  const dispatch = useDispatch();

  const {
    technicians,
    loading,
    error,
    creating,
    updating,
    deleting,
    lastCreatedCredentials,
  } = useSelector((state) => state.technicians);
  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  useEffect(() => {
    dispatch(fetchTechnicians());
  }, [dispatch]);
  const filteredTechnicians = useMemo(() => {
    let list = technicians;

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (t) =>
          t.name?.toLowerCase().includes(q) ||
          t.email?.toLowerCase().includes(q) ||
          t.phone?.includes(q) ||
          t.specialization?.toLowerCase().includes(q)
      );
    }

    if (statusFilter === "Active") {
      list = list.filter((t) => t.isActive);
    } else if (statusFilter === "Inactive") {
      list = list.filter((t) => !t.isActive);
    }

    return list;
  }, [technicians, search, statusFilter]);
  const totalCount = technicians.length;
  const activeCount = technicians.filter((t) => t.isActive).length;
  const availableCount = technicians.filter(
    (t) => t.isActive && t.availabilityStatus === "AVAILABLE"
  ).length;
  const openCreateForm = () => {
    setEditTarget(null);
    setShowForm(true);
    dispatch(clearTechnicianError());
  };

  const openEditForm = (tech) => {
    setEditTarget(tech);
    setShowForm(true);
    dispatch(clearTechnicianError());
  };

  const closeForm = () => {
    setShowForm(false);
    setEditTarget(null);
    dispatch(clearTechnicianError());
  };

  const handleCreate = async (data) => {
    const result = await dispatch(addTechnician(data));
    if (!result.error) closeForm();
  };

  const handleUpdate = async (data) => {
    if (!editTarget?._id) return;
    const result = await dispatch(
      editTechnician({ id: editTarget._id, data })
    );
    if (!result.error) closeForm();
  };

  const handleDelete = (id) => {
    dispatch(removeTechnician(id));
    setConfirmDeleteId(null);
  };

  const handleCloseCredentials = () => {
    dispatch(clearCreatedCredentials());
  };

  return (
    <div className="p-6 lg:p-8">
      <CredentialsModal
        credentials={lastCreatedCredentials}
        onClose={handleCloseCredentials}
      />
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Technicians
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your team of service technicians.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateForm}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          <UserPlus className="h-4 w-4" />
          Add Technician
        </button>
      </div>
      <TechnicianStats
        totalCount={totalCount}
        activeCount={activeCount}
        availableCount={availableCount}
      />
      {error && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span className="flex-1">{error}</span>
          <button
            type="button"
            onClick={() => dispatch(clearTechnicianError())}
            className="text-red-400 transition hover:text-red-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
      {showForm && (
        <div className="mb-6">
          <TechnicianForm
            key={editTarget?._id || "new"}
            initial={editTarget}
            onSubmit={editTarget ? handleUpdate : handleCreate}
            onCancel={closeForm}
            isBusy={creating || updating}
          />
        </div>
      )}
      <TechnicianFilters
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />
      <TechnicianTable
        loading={loading}
        technicians={filteredTechnicians}
        isFiltered={Boolean(search.trim() || statusFilter !== "All")}
        confirmDeleteId={confirmDeleteId}
        deleting={deleting}
        onOpenEdit={openEditForm}
        onRequestDelete={setConfirmDeleteId}
        onCancelDelete={() => setConfirmDeleteId(null)}
        onConfirmDelete={handleDelete}
      />
    </div>
  );
}
