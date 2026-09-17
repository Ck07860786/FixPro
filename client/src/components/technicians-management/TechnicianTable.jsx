import { Wrench } from "lucide-react";
import TechnicianRow from "./TechnicianRow";
function SkeletonRow() {
  return (
    <tr className="animate-pulse border-b border-slate-50">
      <td className="px-4 py-4"><div className="h-4 w-32 rounded bg-slate-100" /></td>
      <td className="px-4 py-4"><div className="h-4 w-40 rounded bg-slate-100" /></td>
      <td className="px-4 py-4"><div className="h-4 w-24 rounded bg-slate-100" /></td>
      <td className="px-4 py-4"><div className="h-4 w-20 rounded bg-slate-100" /></td>
      <td className="px-4 py-4"><div className="h-4 w-16 rounded bg-slate-100" /></td>
      <td className="px-4 py-4"><div className="h-4 w-16 rounded bg-slate-100" /></td>
      <td className="px-4 py-4"><div className="h-4 w-20 rounded bg-slate-100" /></td>
    </tr>
  );
}
export default function TechnicianTable({
  loading,
  technicians,
  isFiltered,
  confirmDeleteId,
  deleting,
  onOpenEdit,
  onRequestDelete,
  onCancelDelete,
  onConfirmDelete,
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              <th className="px-4 pb-3 pt-4">Technician</th>
              <th className="px-4 pb-3 pt-4">Contact</th>
              <th className="px-4 pb-3 pt-4">Specialization</th>
              <th className="px-4 pb-3 pt-4">Type</th>
              <th className="px-4 pb-3 pt-4">Availability</th>
              <th className="px-4 pb-3 pt-4">Status</th>
              <th className="px-4 pb-3 pt-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <>
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
              </>
            ) : technicians.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-4 py-16 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
                      <Wrench className="h-7 w-7 text-slate-300" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-700">
                        {isFiltered
                          ? "No technicians match your filters"
                          : "No technicians yet"}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        {isFiltered
                          ? "Try adjusting your search or filters."
                          : 'Click \u201CAdd Technician\u201D to register your first team member.'}
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              technicians.map((tech) => (
                <TechnicianRow
                  key={tech._id}
                  tech={tech}
                  isConfirmingDelete={confirmDeleteId === tech._id}
                  isDeleting={deleting}
                  onOpenEdit={onOpenEdit}
                  onRequestDelete={onRequestDelete}
                  onCancelDelete={onCancelDelete}
                  onConfirmDelete={onConfirmDelete}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
