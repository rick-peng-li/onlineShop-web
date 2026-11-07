import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  Row,
  Col,
  Card,
  List,
  Image,
  Button,
  Typography,
  Tag,
  message,
  Descriptions,
  Space,
} from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined, TruckOutlined } from '@ant-design/icons'
import Loader from '@/components/Loader'
import Message from '@/components/Message'
import { getOrderById, payOrder, deliverOrder } from '@/services/orderService'
import { getPaypalClientId } from '@/services/uploadService'
import useAuthStore from '@/store/authStore'
import { formatPrice, formatDate } from '@/utils/format'

const { Title, Text } = Typography

const OrderPage = () => {
  const { id } = useParams()
  const { userInfo } = useAuthStore()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [payLoading, setPayLoading] = useState(false)

  const load = () => {
    setLoading(true)
    getOrderById(id)
      .then(setOrder)
      .catch((err) => setError(err.response?.data?.message || err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, [id])

  const successPaymentHandler = async (paymentResult) => {
    setPayLoading(true)
    try {
      await payOrder(id, paymentResult)
      message.success('Payment successful')
      load()
    } catch (err) {
      message.error(err.response?.data?.message || err.message)
    } finally {
      setPayLoading(false)
    }
  }

  const handlePay = () => {
    successPaymentHandler({
      id: 'PAY' + Date.now(),
      status: 'COMPLETED',
      update_time: new Date().toISOString(),
      payer: { email_address: userInfo?.email },
    })
  }

  const handleDeliver = async () => {
    try {
      await deliverOrder(id)
      message.success('Order marked as delivered')
      load()
    } catch (err) {
      message.error(err.response?.data?.message || err.message)
    }
  }

  if (loading) return <Loader />
  if (error) return <Message variant="danger">{error}</Message>
  if (!order) return null

  const itemsPrice = order.orderItems.reduce((a, i) => a + i.price * i.qty, 0)

  return (
    <>
      <Title level={4}>Order {order._id}</Title>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={16}>
          <Card title="Shipping" style={{ marginBottom: 16 }}>
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Name">{order.user?.name}</Descriptions.Item>
              <Descriptions.Item label="Email">
                <a href={`mailto:${order.user?.email}`}>{order.user?.email}</a>
              </Descriptions.Item>
              <Descriptions.Item label="Address">
                {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                {order.shippingAddress.postalCode}, {order.shippingAddress.country}
              </Descriptions.Item>
              <Descriptions.Item label="Delivered">
                {order.isDelivered ? (
                  <Tag color="success" icon={<TruckOutlined />}>
                    Delivered on {formatDate(order.deliveredAt)}
                  </Tag>
                ) : (
                  <Tag color="default" icon={<CloseCircleOutlined />}>
                    Not Delivered
                  </Tag>
                )}
              </Descriptions.Item>
            </Descriptions>
          </Card>
          <Card title="Payment" style={{ marginBottom: 16 }}>
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Method">{order.paymentMethod}</Descriptions.Item>
              <Descriptions.Item label="Status">
                {order.isPaid ? (
                  <Tag color="success" icon={<CheckCircleOutlined />}>
                    Paid on {formatDate(order.paidAt)}
                  </Tag>
                ) : (
                  <Tag color="default" icon={<CloseCircleOutlined />}>
                    Not Paid
                  </Tag>
                )}
              </Descriptions.Item>
            </Descriptions>
          </Card>
          <Card title="Order Items">
            <List
              dataSource={order.orderItems}
              renderItem={(item) => (
                <List.Item key={item.product}>
                  <List.Item.Meta
                    avatar={<Image src={item.image} width={50} />}
                    title={<Link to={`/product/${item.product}`}>{item.name}</Link>}
                  />
                  <span>
                    {item.qty} x {formatPrice(item.price)} ={' '}
                    {formatPrice(item.qty * item.price)}
                  </span>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="Order Summary">
            <List>
              <List.Item>
                <span>Items:</span>
                <span>{formatPrice(itemsPrice)}</span>
              </List.Item>
              <List.Item>
                <span>Shipping:</span>
                <span>{formatPrice(order.shippingPrice)}</span>
              </List.Item>
              <List.Item>
                <span>Tax:</span>
                <span>{formatPrice(order.taxPrice)}</span>
              </List.Item>
              <List.Item>
                <Text strong>Total:</Text>
                <Text strong>{formatPrice(order.totalPrice)}</Text>
              </List.Item>
            </List>
            {!order.isPaid && (
              <Button
                type="primary"
                block
                loading={payLoading}
                onClick={handlePay}
              >
                Pay Now (Simulated)
              </Button>
            )}
            {userInfo?.isAdmin && order.isPaid && !order.isDelivered && (
              <Button
                type="primary"
                block
                style={{ marginTop: 8 }}
                onClick={handleDeliver}
              >
                Mark as Delivered
              </Button>
            )}
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderPage
