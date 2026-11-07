import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Row,
  Col,
  Card,
  List,
  Image,
  Button,
  Typography,
  Steps,
  message,
} from 'antd'
import useCartStore from '@/store/cartStore'
import useAuthStore from '@/store/authStore'
import { createOrder } from '@/services/orderService'
import { formatPrice } from '@/utils/format'

const { Title, Text } = Typography

const PlaceOrderPage = () => {
  const navigate = useNavigate()
  const { userInfo } = useAuthStore()
  const { cartItems, shippingAddress, paymentMethod, clearCart } = useCartStore()
  const [loading, setLoading] = useState(false)

  const itemsPrice = cartItems.reduce((a, i) => a + i.price * i.qty, 0)
  const shippingPrice = itemsPrice > 100 ? 0 : 100
  const taxPrice = Number((itemsPrice * 0.15).toFixed(2))
  const totalPrice = Number((itemsPrice + shippingPrice + taxPrice).toFixed(2))

  const placeOrder = async () => {
    setLoading(true)
    try {
      const order = await createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      })
      clearCart()
      navigate(`/order/${order._id}`)
    } catch (err) {
      message.error(err.response?.data?.message || err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Steps
        current={2}
        items={[{ title: 'Sign In' }, { title: 'Shipping' }, { title: 'Payment' }, { title: 'Place Order' }]}
        style={{ marginBottom: 24 }}
      />
      <Row gutter={[24, 24]}>
        <Col xs={24} md={16}>
          <Card title="Shipping" style={{ marginBottom: 16 }}>
            <Text>
              {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode},{' '}
              {shippingAddress.country}
            </Text>
          </Card>
          <Card title="Payment Method" style={{ marginBottom: 16 }}>
            <Text>Method: {paymentMethod}</Text>
          </Card>
          <Card title="Order Items">
            {cartItems.length === 0 ? (
              <Text type="secondary">Your cart is empty</Text>
            ) : (
              <List
                dataSource={cartItems}
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
            )}
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
                <span>{formatPrice(shippingPrice)}</span>
              </List.Item>
              <List.Item>
                <span>Tax:</span>
                <span>{formatPrice(taxPrice)}</span>
              </List.Item>
              <List.Item>
                <Text strong>Total:</Text>
                <Text strong>{formatPrice(totalPrice)}</Text>
              </List.Item>
            </List>
            <Button
              type="primary"
              block
              loading={loading}
              disabled={cartItems.length === 0}
              onClick={placeOrder}
            >
              Place Order
            </Button>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderPage
