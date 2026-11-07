import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Form, Input, Button, Card, Typography, Divider } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import useAuthStore from '@/store/authStore'
import Message from '@/components/Message'
import welcome from '@/assets/images/welcome.png'

const { Title, Text } = Typography

const LoginPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { userInfo, login, loading, error, clearError } = useAuthStore()
  const redirect = location.state?.from?.pathname || '/'

  useEffect(() => {
    if (userInfo) navigate(redirect, { replace: true })
  }, [userInfo, navigate, redirect])

  const onFinish = async (values) => {
    try {
      await login(values.email, values.password)
    } catch (e) {
      /* error set in store */
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Card style={{ width: 420 }}>
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <img src={welcome} alt="welcome" style={{ maxWidth: 120 }} />
        </div>
        <Title level={3} style={{ textAlign: 'center' }}>
          Sign In
        </Title>
        {error && (
          <Message variant="danger">{error}</Message>
        )}
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Email is required' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" size="large" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Password is required' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" size="large" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block size="large" loading={loading}>
            Sign In
          </Button>
        </Form>
        <Divider />
        <Text>
          New Customer?{' '}
          <Link to="/register">Register</Link>
        </Text>
      </Card>
    </div>
  )
}

export default LoginPage
