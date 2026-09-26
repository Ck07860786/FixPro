import React from "react";
import { Building2, Loader2 } from "lucide-react";
import BusinessTableRow from "./BusinessTableRow";
import BusinessPagination from "./BusinessPagination";

function SkeletonRow() {
  return (
    <tr className="animate-pulse border-b border-slate-50">
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-slate-100" />
          <div className="space-y-1.5">
            <div className="h-3.5 w-28 rounded bg-slate-100" />
            <div className="h-2.5 w-16 rounded bg-slate-100" />
          </div>
        </div>
      </td>
      <td className="px-5 py-4">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-slate-100" />
          <div className="space-y-1">
            <div className="h-3 w-20 rounded bg-slate-100" />
            <div className="h-2.5 w-24 rounded bg-slate-100" />
          </div>
        </div>
      </td>
      <td className="px-5 py-4">
        <div className="space-y-1">
          <div className="h-3 w-24 rounded bg-slate-100" />
          <div className="h-2.5 w-20 rounded bg-slate-100" />
        </div>
      </td>
      <td className="px-5 py-4">
        <div className="h-3 w-20 rounded bg-slate-100" />
      </td>
      <td className="px-5 py-4">
        <div className="h-5 w-16 rounded-full bg-slate-100" />
      </td>
      <td className="px-5 py-4">
        <div className="h-3 w-20 rounded bg-slate-100" />
      </td>
      <td className="px-5 py-4">
        <div className="mx-auto h-7 w-20 rounded bg-slate-100" />
      </td>
    </tr>
  );
}

export default function BusinessTable({
  businesses,
  loading,
  searchQuery,
  pagination,
  currentPage,
  onPageChange,
  onViewDetails,
  onStatusChange,
  statusUpdateLoading,
  openDropdownId,
  onToggleDropdown,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      {loading && (
        <div className="flex items-center justify-center border-b border-slate-100 bg-violet-50/50 px-4 py-2">
          <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin text-violet-600" />
          <span className="text-xs font-medium text-violet-600">
            Updating businesses...
          </span>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/80">
              <th className="px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Business
              </th>
              <th className="px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Owner
              </th>
              <th className="px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Contact
              </th>
              <th className="px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Location
              </th>
              <th className="px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Status
              </th>
              <th className="px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Registered
              </th>
              <th className="px-5 py-3.5 text-center text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {loading && businesses.length === 0 ? (
              <>
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
              </>
            ) : businesses.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-16 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-300">
                      <Building2 className="h-7 w-7" />
                    </div>
                    <p className="text-sm font-semibold text-slate-700">
                      {searchQuery
                        ? "No businesses match your search"
                        : "No businesses found"}
                    </p>
                    <p className="mt-1 text-xs text-slate-400 max-w-sm">
                      {searchQuery
                        ? "Try searching with a different term or clear the filter."
                        : "Registered businesses requiring approval will appear here."}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              businesses.map((biz) => (
                <BusinessTableRow
                  key={biz._id}
                  business={biz}
                  onViewDetails={onViewDetails}
                  onStatusChange={onStatusChange}
                  statusUpdateLoading={statusUpdateLoading}
                  isDropdownOpen={openDropdownId === biz._id}
                  onToggleDropdown={() =>
                    onToggleDropdown(openDropdownId === biz._id ? null : biz._id)
                  }
                />
              ))
            )}
          </tbody>
        </table>
      </div>


      <BusinessPagination
        currentPage={currentPage}
        onPageChange={onPageChange}
        pagination={pagination}
      />
    </div>
  );
}
