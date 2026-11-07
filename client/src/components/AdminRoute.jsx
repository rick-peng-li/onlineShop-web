import { Navigate } from 'react-router-dom'
import { Spin } from 'antd'
import useAuthStore from '@/store/authStore'

const AdminRoute = ({ children }) => {
  const userInfo = useAuthStore((s) => s.userInfo)
  const hasHydrated = useAuthStore((s) => s.hasHydrated)

  if (!hasHydrated) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}>
        <Spin size="large" />
      </div>
    )
  }

  if (!userInfo || !userInfo.isAdmin) {
    return <Navigate to="/" replace />
  }
  return children
}

export default AdminRoute
