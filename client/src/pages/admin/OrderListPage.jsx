import { useEffect, useState } from 'react'
import { Table, Tag, Button, Space, message } from 'antd'
import { Link } from 'react-router-dom'
import Loader from '@/components/Loader'
import { getOrders, deliverOrder } from '@/services/orderService'
import { formatPrice, formatDate } from '@/utils/format'

const OrderListPage = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const load = () => {
    setLoading(true)
    getOrders()
      .then(setOrders)
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  const handleDeliver = async (id) => {
    try {
      await deliverOrder(id)
      message.success('Delivered')
      load()
    } catch (err) {
      message.error(err.response?.data?.message || err.message)
    }
  }

  const columns = [
    { title: 'ID', dataIndex: '_id', key: 'id' },
    { title: 'User', dataIndex: ['user', 'name'], key: 'user' },
    { title: 'Date', dataIndex: 'createdAt', key: 'date', render: (v) => formatDate(v) },
    { title: 'Total', dataIndex: 'totalPrice', key: 'total', render: (v) => formatPrice(v) },
    {
      title: 'Paid',
      dataIndex: 'isPaid',
      key: 'paid',
      render: (v) => (v ? <Tag color="success">{formatDate(v.paidAt)}</Tag> : <Tag>No</Tag>),
    },
    {
      title: 'Delivered',
      dataIndex: 'isDelivered',
      key: 'delivered',
      render: (v) => (v ? <Tag color="success">Yes</Tag> : <Tag>No</Tag>),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, r) => (
        <Space>
          <Link to={`/order/${r._id}`}>
            <Button size="small">Details</Button>
          </Link>
          {r.isPaid && !r.isDelivered && (
            <Button size="small" onClick={() => handleDeliver(r._id)}>Deliver</Button>
          )}
        </Space>
      ),
    },
  ]

  if (loading) return <Loader />
  return <Table columns={columns} dataSource={orders} rowKey="_id" pagination={false} />
}

export default OrderListPage
