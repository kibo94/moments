import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

export function ProtectedRoute() {
  const { user, loading } = useAuth()

  if (loading) {
    return <main className="page-loading">Loading your account...</main>
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />
}

export function PublicRoute() {
  const { user, loading } = useAuth()

  if (loading) {
    return <main className="page-loading">Loading your account...</main>
  }

  return user ? <Navigate to="/dashboard" replace /> : <Outlet />
}
