import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import AppHeader from '@/components/AppHeader'
import AppFooter from '@/components/AppFooter'

const { Content } = Layout

const MainLayout = () => (
  <Layout className="site-layout">
    <AppHeader />
    <Content className="site-content">
      <Outlet />
    </Content>
    <AppFooter />
  </Layout>
)

export default MainLayout
