import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchAllBusinesses,
    updateBusinessStatus,
} from "@/features/superAdmin/superAdminSlice";
import { CheckCircle2 } from "lucide-react";
import {
    BusinessManagementHeader,
    BusinessFilters,
    BusinessTable,
    BusinessDetailModal,
    RejectionModal,
} from "@/components/business-management";

export default function BusinessRequests() {
    const dispatch = useDispatch();
    const { allBusinesses = [], pagination, loading, statusUpdateLoading } =
        useSelector((state) => state.superAdmin);


    const [activeFilter, setActiveFilter] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);


    const [selectedBusiness, setSelectedBusiness] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [rejectionReason, setRejectionReason] = useState("");
    const [actionTargetId, setActionTargetId] = useState(null);
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");

    const refreshData = () => {
        const params = { page: currentPage, limit: 20 };
        if (activeFilter) params.status = activeFilter;
        dispatch(fetchAllBusinesses(params));
    };

    useEffect(() => {
        refreshData();
    }, [dispatch, activeFilter, currentPage]);


    useEffect(() => {
        const handleDocumentClick = (e) => {
            if (!e.target.closest("[data-dropdown]")) {
                setOpenDropdownId(null);
            }
        };
        document.addEventListener("click", handleDocumentClick);
        return () => document.removeEventListener("click", handleDocumentClick);
    }, []);


    const statusCounts = useMemo(() => {
        const counts = { total: allBusinesses.length };
        allBusinesses.forEach((biz) => {
            counts[biz.status] = (counts[biz.status] || 0) + 1;
        });
        return counts;
    }, [allBusinesses]);


    const filteredBusinesses = useMemo(() => {
        if (!searchQuery.trim()) return allBusinesses;
        const q = searchQuery.toLowerCase().trim();
        return allBusinesses.filter(
            (b) =>
                b.name?.toLowerCase().includes(q) ||
                b.email?.toLowerCase().includes(q) ||
                b.phone?.includes(q) ||
                b.businessType?.toLowerCase().includes(q) ||
                b.ownerId?.name?.toLowerCase().includes(q) ||
                b.ownerId?.email?.toLowerCase().includes(q)
        );
    }, [allBusinesses, searchQuery]);

    const showSuccess = (msg) => {
        setSuccessMessage(msg);
        setTimeout(() => setSuccessMessage(""), 3000);
    };

    const handleFilterChange = (key) => {
        setActiveFilter(key);
        setCurrentPage(1);
    };

    const handleStatusChange = async (businessId, newStatus) => {
        if (newStatus === "REJECTED") {
            setActionTargetId(businessId);
            setShowRejectModal(true);
            setOpenDropdownId(null);
            return;
        }

        setOpenDropdownId(null);
        const result = await dispatch(
            updateBusinessStatus({ businessId, status: newStatus })
        );

        if (!result.error) {
            showSuccess(`Business status updated to ${newStatus.toLowerCase()}`);
            refreshData();
        }
    };

    const handleRejectConfirm = async () => {
        if (!rejectionReason.trim() || !actionTargetId) return;

        const result = await dispatch(
            updateBusinessStatus({
                businessId: actionTargetId,
                status: "REJECTED",
                rejectionReason: rejectionReason.trim(),
            })
        );

        if (!result.error) {
            setShowRejectModal(false);
            setRejectionReason("");
            setActionTargetId(null);
            showSuccess("Business rejected successfully");
            refreshData();
        }
    };

    const handleOpenDetailModal = (biz) => {
        setSelectedBusiness(biz);
        setShowDetailModal(true);
    };

    const handleCloseDetailModal = () => {
        setShowDetailModal(false);
        setSelectedBusiness(null);
    };

    const handleCloseRejectModal = () => {
        setShowRejectModal(false);
        setRejectionReason("");
        setActionTargetId(null);
    };

    return (
        <div className="p-6 lg:p-8">

            {successMessage && (
                <div className="fixed right-6 top-6 z-[100] flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 shadow-lg animate-in slide-in-from-top-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm font-medium text-emerald-700">
                        {successMessage}
                    </span>
                </div>
            )}


            <BusinessManagementHeader
                totalCount={pagination?.total ?? allBusinesses.length}
                loading={loading}
                onRefresh={refreshData}
            />


            <BusinessFilters
                activeFilter={activeFilter}
                onFilterChange={handleFilterChange}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                statusCounts={statusCounts}
                totalCount={pagination?.total ?? allBusinesses.length}
            />


            <BusinessTable
                businesses={filteredBusinesses}
                loading={loading}
                searchQuery={searchQuery}
                pagination={pagination}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                onViewDetails={handleOpenDetailModal}
                onStatusChange={handleStatusChange}
                statusUpdateLoading={statusUpdateLoading}
                openDropdownId={openDropdownId}
                onToggleDropdown={setOpenDropdownId}
            />


            <BusinessDetailModal
                business={selectedBusiness}
                isOpen={showDetailModal}
                onClose={handleCloseDetailModal}
                onStatusChange={handleStatusChange}
                statusUpdateLoading={statusUpdateLoading}
            />


            <RejectionModal
                isOpen={showRejectModal}
                onClose={handleCloseRejectModal}
                reason={rejectionReason}
                onReasonChange={setRejectionReason}
                onConfirm={handleRejectConfirm}
                loading={statusUpdateLoading}
            />
        </div>
    );
}