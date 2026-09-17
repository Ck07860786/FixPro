import { lazy, Suspense } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import BusinessSignup from './pages/auth/BusinessSignup'
import PendingApproval from './pages/auth/PendingApproval'
import Unauthorized from './pages/auth/Unauthorized'
import ProtectedRoute from './components/common/ProtectedRoute'
import DashboardLayout from './components/layout/DashboardLayout'
import LoadingSpinner from './components/common/LoadingSpinner'
import Setting from './pages/dashboard/technician/Setting'
import Profile from './pages/dashboard/technician/Profile'
import MyJobs from './pages/dashboard/technician/MyJobs'
import Schedule from './pages/dashboard/technician/Schedule'
const AdminDashboard = lazy(() => import('./pages/dashboard/admin/AdminDashboard'))
const CustomerDashboard = lazy(() => import('./pages/dashboard/customer/CustomerDashboard'))
const ServiceRequests = lazy(() => import('./pages/dashboard/admin/ServiceRequests'))
const Services = lazy(() => import('./pages/dashboard/admin/Services'))
const Technicians = lazy(() => import('./pages/dashboard/admin/Technicians'))
const TechnicianDashboard = lazy(() => import('./pages/dashboard/technician/TechnicianDashboard'))

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/business-signup" element={<BusinessSignup />} />
        <Route path="/pending-approval" element={<PendingApproval />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route
          path="/business"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "SUPER_ADMIN"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="service-requests" element={<ServiceRequests />} />
          <Route path="services" element={<Services />} />
          <Route path="technicians" element={<Technicians />} />
        </Route>
        <Route
          path="/customer"
          element={
            <ProtectedRoute allowedRoles={["CUSTOMER"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<CustomerDashboard />} />
        </Route>
        <Route
          path="/technician"
          element={
            <ProtectedRoute allowedRoles={["TECHNICIAN"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<TechnicianDashboard />} />
          <Route path="setting" element={<Setting />} />
          <Route path="profile" element={<Profile />} />
          <Route path="jobs" element={<MyJobs />} />
          <Route path="schedule" element={<Schedule />} />

        </Route>
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="service-requests" element={<ServiceRequests />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
