import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  Row,
  Col,
  Image,
  List,
  Card,
  Button,
  Form,
  Input,
  Rate,
  Select,
  message,
  Typography,
  Divider,
} from 'antd'
import { LeftOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import Rating from '@/components/Rating'
import Loader from '@/components/Loader'
import Message from '@/components/Message'
import { getProductById, createProductReview } from '@/services/productService'
import { formatPrice, formatDate } from '@/utils/format'
import useAuthStore from '@/store/authStore'
import useCartStore from '@/store/cartStore'

const { Title, Paragraph, Text } = Typography
const { TextArea } = Input

const ProductPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { userInfo } = useAuthStore()
  const addToCart = useCartStore((s) => s.addToCart)
  const [product, setProduct] = useState(null)
  const [qty, setQty] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [reviewLoading, setReviewLoading] = useState(false)

  const load = () => {
    setLoading(true)
    getProductById(id)
      .then(setProduct)
      .catch((err) => setError(err.response?.data?.message || err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, [id])

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, qty)
      navigate('/cart')
    }
  }

  const onFinishReview = async (values) => {
    if (!userInfo) {
      message.error('Please sign in to write a review')
      return
    }
    setReviewLoading(true)
    try {
      await createProductReview(id, values)
      message.success('Review submitted')
      load()
    } catch (err) {
      message.error(err.response?.data?.message || err.message)
    } finally {
      setReviewLoading(false)
    }
  }

  if (loading) return <Loader />
  if (error) return <Message variant="danger">{error}</Message>
  if (!product) return null

  return (
    <>
      <Link to="/">
        <Button type="link" icon={<LeftOutlined />}>
          Go Back
        </Button>
      </Link>
      <Row gutter={[24, 24]} style={{ marginTop: 8 }}>
        <Col xs={24} md={10}>
          <Image src={product.image} alt={product.name} />
        </Col>
        <Col xs={24} md={8}>
          <Title level={4}>{product.name}</Title>
          <Rating value={product.rating} text={`${product.numReviews} reviews`} />
          <Divider />
          <Paragraph>
            <Text strong>Price:</Text> {formatPrice(product.price)}
          </Paragraph>
          <Paragraph>
            <Text strong>Description:</Text> {product.description}
          </Paragraph>
        </Col>
        <Col xs={24} md={6}>
          <Card>
            <List.Item>
              <Row justify="space-between" style={{ width: '100%' }}>
                <Col>Price:</Col>
                <Col>{formatPrice(product.price)}</Col>
              </Row>
            </List.Item>
            <List.Item>
              <Row justify="space-between" style={{ width: '100%' }}>
                <Col>Status:</Col>
                <Col>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
              </Row>
            </List.Item>
            {product.countInStock > 0 && (
              <List.Item>
                <Row justify="space-between" style={{ width: '100%' }}>
                  <Col>Qty:</Col>
                  <Col>
                    <Select
                      value={qty}
                      onChange={setQty}
                      style={{ width: 80 }}
                      options={Array.from({ length: product.countInStock }, (_, i) => ({
                        value: i + 1,
                        label: i + 1,
                      }))}
                    />
                  </Col>
                </Row>
              </List.Item>
            )}
            <Button
              type="primary"
              block
              icon={<ShoppingCartOutlined />}
              disabled={product.countInStock === 0}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </Card>
        </Col>
      </Row>

      <Row style={{ marginTop: 32 }}>
        <Col xs={24} md={12}>
          <Title level={5}>Reviews</Title>
          {product.reviews.length === 0 ? (
            <Message variant="info">No reviews</Message>
          ) : (
            <List
              dataSource={product.reviews}
              renderItem={(r) => (
                <List.Item key={r._id}>
                  <List.Item.Meta
                    title={r.name}
                    description={
                      <>
                        <Rating value={r.rating} />
                        <div>{formatDate(r.createdAt)}</div>
                        <div>{r.comment}</div>
                      </>
                    }
                  />
                </List.Item>
              )}
            />
          )}
          <Divider />
          <Title level={5}>Write a review</Title>
          <Form layout="vertical" onFinish={onFinishReview}>
            <Form.Item name="rating" label="Rating" rules={[{ required: true }]}>
              <Rate />
            </Form.Item>
            <Form.Item name="comment" label="Comment" rules={[{ required: true }]}>
              <TextArea rows={3} />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={reviewLoading}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  )
}

export default ProductPage
