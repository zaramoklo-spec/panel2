import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useAuthStore } from './stores/authStore'
import { Layout } from './components/Layout'
import LoginPage from './features/auth/LoginPage'
import DashboardPage from './features/dashboard/DashboardPage'
import DeviceDetailPage from './features/devices/DeviceDetailPage'
import ProfilePage from './features/profile/ProfilePage'
import SettingsPage from './features/settings/SettingsPage'
import AdminManagementPage from './features/admins/AdminManagementPage'
import { ROUTES } from './lib/constants'
import { useEffect, useRef } from 'react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
})

// Scroll Restoration Component
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Scroll main content to top when navigating to device detail pages
    if (pathname.startsWith('/devices/')) {
      const mainElement = document.querySelector('main')
      if (mainElement) {
        mainElement.scrollTop = 0
      }
    }
  }, [pathname])

  return null
}

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }
  
  return <>{children}</>
}

// Super Admin Route
function SuperAdminRoute({ children }: { children: React.ReactNode }) {
  const admin = useAuthStore((state) => state.admin)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }
  
  if (admin?.role !== 'super_admin') {
    return <Navigate to={ROUTES.DASHBOARD} replace />
  }
  
  return <>{children}</>
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          
          {/* Protected Routes */}
          <Route
            path={ROUTES.DASHBOARD}
            element={
              <ProtectedRoute>
                <Layout>
                  <DashboardPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/devices/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <DeviceDetailPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path={ROUTES.PROFILE}
            element={
              <ProtectedRoute>
                <Layout>
                  <ProfilePage />
                </Layout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path={ROUTES.SETTINGS}
            element={
              <ProtectedRoute>
                <Layout>
                  <SettingsPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          
          {/* Super Admin Only */}
          <Route
            path={ROUTES.ADMIN_MANAGEMENT}
            element={
              <SuperAdminRoute>
                <Layout>
                  <AdminManagementPage />
                </Layout>
              </SuperAdminRoute>
            }
          />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
