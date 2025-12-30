import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/auth'
import Login from './pages/Login'
import Layout from './components/Layout/Layout'
import Dashboard from './pages/Dashboard'
import BackendServiceConfig from './pages/Config/BackendService'
import GatewayServiceConfig from './pages/Config/GatewayService'
import AgentServiceConfig from './pages/Config/AgentService'
import UserList from './pages/User/List'
import UserDetail from './pages/User/Detail'
import SystemBasicConfig from './pages/System/Basic'
import SystemSecurityConfig from './pages/System/Security'
import SystemNotificationConfig from './pages/System/Notification'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore()
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="config/backend" element={<BackendServiceConfig />} />
          <Route path="config/gateway" element={<GatewayServiceConfig />} />
          <Route path="config/agent" element={<AgentServiceConfig />} />
          <Route path="users" element={<UserList />} />
          <Route path="users/:id" element={<UserDetail />} />
          <Route path="system/basic" element={<SystemBasicConfig />} />
          <Route path="system/security" element={<SystemSecurityConfig />} />
          <Route
            path="system/notification"
            element={<SystemNotificationConfig />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

