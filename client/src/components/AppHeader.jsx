import { Layout, Menu, Dropdown, Space, Badge, Button } from 'antd'
import {
  HomeOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  LogoutOutlined,
  UserAddOutlined,
  MailOutlined,
  LoginOutlined,
} from '@ant-design/icons'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import SearchBox from '@/components/SearchBox'
import logo from '@/assets/images/logo3.png'
import useAuthStore from '@/store/authStore'
import useCartStore from '@/store/cartStore'

const { Header } = Layout

const AppHeader = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { userInfo, logout } = useAuthStore()
  const cartItems = useCartStore((s) => s.cartItems)

  const selectedKey = `/${location.pathname.split('/')[1] || ''}`

  const items = [
    { key: '/', icon: <HomeOutlined />, label: <Link to="/">Home</Link> },
    {
      key: '/cart',
      icon: <ShoppingCartOutlined />,
      label: (
        <Link to="/cart">
          <Badge count={cartItems.length} size="small" offset={[6, -2]}>
            Cart
          </Badge>
        </Link>
      ),
    },
    {
      key: '/contact',
      icon: <MailOutlined />,
      label: <Link to="/contact">Contact</Link>,
    },
  ]

  const userMenu = userInfo
    ? [
        {
          key: 'profile',
          icon: <UserOutlined />,
          label: <Link to="/profile">Profile</Link>,
        },
        ...(userInfo.isAdmin
          ? [
              { key: 'admin-userlist', label: <Link to="/admin/userlist">Users</Link> },
              { key: 'admin-productlist', label: <Link to="/admin/productlist">Products</Link> },
              { key: 'admin-orderlist', label: <Link to="/admin/orderlist">Orders</Link> },
            ]
          : []),
        { type: 'divider' },
        {
          key: 'logout',
          icon: <LogoutOutlined />,
          label: 'Logout',
          onClick: () => {
            logout()
            navigate('/')
          },
        },
      ]
    : [
        {
          key: 'login',
          icon: <UserOutlined />,
          label: <Link to="/login">Sign In</Link>,
        },
        {
          key: 'register',
          icon: <UserAddOutlined />,
          label: <Link to="/register">Sign Up</Link>,
        },
      ]

  return (
    <Header className="site-header">
      <div className="header-content">
        <Link to="/">
          <img src={logo} alt="sam's accurium" className="brand-logo" />
        </Link>
        <div className="header-search">
          <SearchBox />
        </div>
        <Menu
          mode="horizontal"
          selectedKeys={[selectedKey]}
          items={items}
          overflowedIndicator={null}
          className="header-nav"
          style={{ flex: '0 0 auto', minWidth: 340, borderBottom: 'none' }}
        />
        {userInfo ? (
          <Dropdown menu={{ items: userMenu }} placement="bottomRight">
            <Button type="text" icon={<UserOutlined />}>
              {userInfo.name}
            </Button>
          </Dropdown>
        ) : (
          <Space>
            <Link to="/login">
              <Button type="text" icon={<LoginOutlined />}>Sign In</Button>
            </Link>
            <Link to="/register">
              <Button type="text" icon={<UserAddOutlined />}>Sign Up</Button>
            </Link>
          </Space>
        )}
      </div>
    </Header>
  )
}

export default AppHeader
