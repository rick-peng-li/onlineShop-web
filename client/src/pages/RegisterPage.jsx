import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Input, Button, Card, Typography, Divider, message } from 'antd'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'
import useAuthStore from '@/store/authStore'
import Message from '@/components/Message'

const { Title, Text } = Typography

const RegisterPage = () => {
  const navigate = useNavigate()
  const { userInfo, register, loading, error } = useAuthStore()

  useEffect(() => {
    if (userInfo) navigate('/', { replace: true })
  }, [userInfo, navigate])

  const onFinish = async (values) => {
    if (values.password !== values.confirmPassword) {
      message.error('Passwords do not match')
      return
    }
    try {
      await register(values.name, values.email, values.password)
    } catch (e) {
      /* handled */
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Card style={{ width: 420 }}>
        <Title level={3} style={{ textAlign: 'center' }}>
          Sign Up
        </Title>
        {error && <Message variant="danger">{error}</Message>}
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="name" rules={[{ required: true, message: 'Name is required' }]}>
            <Input prefix={<UserOutlined />} placeholder="Name" size="large" />
          </Form.Item>
          <Form.Item name="email" rules={[{ required: true, message: 'Email is required' }]}>
            <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Password is required' }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Password" size="large" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            rules={[{ required: true, message: 'Please confirm password' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" size="large" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block size="large" loading={loading}>
            Register
          </Button>
        </Form>
        <Divider />
        <Text>
          Have an account? <Link to="/login">Sign In</Link>
        </Text>
      </Card>
    </div>
  )
}

export default RegisterPage
