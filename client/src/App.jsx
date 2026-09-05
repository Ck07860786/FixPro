
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './components/pages/Home'
import Login from './components/pages/auth/Login'
import Signup from './components/pages/auth/Signup'
import BusinessSignup from './components/pages/auth/BusinessSignup'
import PendingApproval from './components/pages/auth/PendingApproval'
import Unauthorized from './components/pages/auth/Unauthorized'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './components/pages/dashboard/Dashboard'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Public */}
      <Route
        path="/signup"
        element={<Signup />}
      />

      <Route
        path="/business-signup"
        element={<BusinessSignup />}
      />

      <Route
        path="/pending-approval"
        element={<PendingApproval />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/unauthorized"
        element={<Unauthorized />}
      />

      {/* Business Dashboard */}
      <Route
        path="/business/dashboard"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/customer/dashboard"
        element={
          <ProtectedRoute allowedRoles={["CUSTOMER"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Technician Dashboard */}
      <Route
        path="/technician/dashboard"
        element={
          <ProtectedRoute allowedRoles={["TECHNICIAN"]}>
            <Dashboard />
          </ProtectedRoute>
        }/>

        <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App

