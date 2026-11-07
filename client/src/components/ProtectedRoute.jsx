import { Navigate, useLocation } from 'react-router-dom'
import { Spin } from 'antd'
import useAuthStore from '@/store/authStore'

const ProtectedRoute = ({ children }) => {
  const userInfo = useAuthStore((s) => s.userInfo)
  const hasHydrated = useAuthStore((s) => s.hasHydrated)
  const location = useLocation()

  if (!hasHydrated) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}>
        <Spin size="large" />
      </div>
    )
  }

  if (!userInfo) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  return children
}

export default ProtectedRoute
