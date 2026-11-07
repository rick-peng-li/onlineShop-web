import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Button, Card, Row, Col, Table, Typography, message, Tag } from 'antd'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'
import useAuthStore from '@/store/authStore'
import { getMyOrders } from '@/services/orderService'
import Message from '@/components/Message'
import Loader from '@/components/Loader'
import { formatPrice, formatDate } from '@/utils/format'

const { Title } = Typography

const ProfilePage = () => {
  const { userInfo, updateProfile, loading, error } = useAuthStore()
  const [orders, setOrders] = useState([])
  const [ordersLoading, setOrdersLoading] = useState(true)

  useEffect(() => {
    if (userInfo) {
      getMyOrders()
        .then(setOrders)
        .finally(() => setOrdersLoading(false))
    }
  }, [userInfo])

  const onFinish = async (values) => {
    try {
      await updateProfile(values)
      message.success('Profile updated')
    } catch (e) {
      message.error(e.message)
    }
  }

  if (!userInfo) return null

  const columns = [
    { title: 'ID', dataIndex: '_id', key: 'id' },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'date',
      render: (v) => formatDate(v),
    },
    {
      title: 'Total',
      dataIndex: 'totalPrice',
      key: 'total',
      render: (v) => formatPrice(v),
    },
    {
      title: 'Paid',
      dataIndex: 'isPaid',
      key: 'paid',
      render: (v) =>
        v ? <Tag color="success">{formatDate(v.paidAt)}</Tag> : <Tag color="default">No</Tag>,
    },
    {
      title: 'Delivered',
      dataIndex: 'isDelivered',
      key: 'delivered',
      render: (v) =>
        v ? <Tag color="success">Yes</Tag> : <Tag color="default">No</Tag>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, r) => <Link to={`/order/${r._id}`}>Details</Link>,
    },
  ]

  return (
    <Row gutter={[24, 24]}>
      <Col xs={24} md={8}>
        <Card>
          <Title level={4}>User Profile</Title>
          {error && <Message variant="danger">{error}</Message>}
          <Form layout="vertical" onFinish={onFinish} initialValues={userInfo}>
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
              <Input prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true }]}>
              <Input prefix={<MailOutlined />} />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <Input.Password prefix={<LockOutlined />} placeholder="Leave blank to keep current" />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Update
            </Button>
          </Form>
        </Card>
      </Col>
      <Col xs={24} md={16}>
        <Card title="My Orders">
          {ordersLoading ? (
            <Loader />
          ) : (
            <Table columns={columns} dataSource={orders} rowKey="_id" pagination={false} />
          )}
        </Card>
      </Col>
    </Row>
  )
}

export default ProfilePage
