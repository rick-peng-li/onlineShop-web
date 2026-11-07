import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  Row,
  Col,
  List,
  Image,
  InputNumber,
  Button,
  Card,
  Typography,
  Select,
  message,
} from 'antd'
import { DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import Message from '@/components/Message'
import useCartStore from '@/store/cartStore'
import useAuthStore from '@/store/authStore'
import { formatPrice } from '@/utils/format'

const { Title, Text } = Typography

const CartPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { userInfo } = useAuthStore()
  const cartItems = useCartStore((s) => s.cartItems)
  const updateQty = useCartStore((s) => s.updateQty)
  const removeFromCart = useCartStore((s) => s.removeFromCart)

  const subtotal = cartItems.reduce((acc, i) => acc + i.price * i.qty, 0)

  const checkoutHandler = () => {
    if (!userInfo) {
      navigate('/login', { state: { from: { pathname: '/shipping' } } })
    } else {
      navigate('/shipping')
    }
  }

  return (
    <>
      <Title level={3}>
        <ShoppingCartOutlined /> Shopping Cart
      </Title>
      {cartItems.length === 0 ? (
        <Message variant="info">
          Your cart is empty <Link to="/">Go Back</Link>
        </Message>
      ) : (
        <Row gutter={[24, 24]}>
          <Col xs={24} md={16}>
            <List
              itemLayout="horizontal"
              dataSource={cartItems}
              renderItem={(item) => (
                <List.Item key={item.product}>
                  <List.Item.Meta
                    avatar={<Image src={item.image} width={80} />}
                    title={<Link to={`/product/${item.product}`}>{item.name}</Link>}
                    description={formatPrice(item.price)}
                  />
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Select
                      value={item.qty}
                      onChange={(v) => updateQty(item.product, v)}
                      style={{ width: 70 }}
                      options={Array.from({ length: item.countInStock }, (_, i) => ({
                        value: i + 1,
                        label: i + 1,
                      }))}
                    />
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => removeFromCart(item.product)}
                    />
                  </div>
                </List.Item>
              )}
            />
          </Col>
          <Col xs={24} md={8}>
            <Card>
              <Title level={5}>Subtotal ({cartItems.reduce((a, i) => a + i.qty, 0)} items)</Title>
              <Text strong style={{ fontSize: 18 }}>
                {formatPrice(subtotal)}
              </Text>
              <Button
                type="primary"
                block
                style={{ marginTop: 16 }}
                onClick={checkoutHandler}
              >
                Proceed to Checkout
              </Button>
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

export default CartPage
