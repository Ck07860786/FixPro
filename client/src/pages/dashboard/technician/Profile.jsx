import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ChevronRight, Settings, Edit3, CircleUser, ExternalLink } from "lucide-react";

import ProfileHero from "@/components/technician-profile/ProfileHero";
import ProfileContactCard from "@/components/technician-profile/ProfileContactCard";
import ProfileProfessionalCard from "@/components/technician-profile/ProfileProfessionalCard";
import ProfileQuickActions from "@/components/technician-profile/ProfileQuickActions";

export default function Profile() {
  const { user, technician, business } = useSelector((state) => state.auth);

  if (!user || !technician) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-6">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
            <CircleUser className="h-8 w-8 text-slate-400" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Profile Unavailable</h2>
          <p className="mt-1 text-sm text-slate-500">
            Couldn't load your profile. Please try logging in again.
          </p>
          <Link
            to="/login"
            className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-700"
          >
            Go to Login <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-slate-50/50 p-6 lg:p-8">
      <div className="mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <Link to="/technician/dashboard" className="transition hover:text-blue-600">
                Technician Portal
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
              <span className="text-slate-800">My Profile</span>
            </div>
            <h1 className="mt-1.5 text-2xl font-bold tracking-tight text-slate-900">
              Technician Profile
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              View your professional details and account information.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/technician/setting"
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-xs transition hover:bg-slate-50"
            >
              <Settings className="h-3.5 w-3.5" />
              Settings
            </Link>
            <Link
              to="/technician/setting"
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-blue-700"
            >
              <Edit3 className="h-3.5 w-3.5" />
              Edit Profile
            </Link>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <ProfileHero user={user} technician={technician} business={business} />
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <ProfileContactCard user={user} technician={technician} />
        </div>

        <div className="space-y-6 lg:col-span-7">
          <ProfileProfessionalCard technician={technician} />
          <ProfileQuickActions />
        </div>
      </div>
    </div>
  );
}