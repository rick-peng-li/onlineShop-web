import { Card, Button } from 'antd'
import { Link } from 'react-router-dom'
import Rating from '@/components/Rating'
import { formatPrice } from '@/utils/format'

const ProductCard = ({ product }) => {
  return (
    <Card
      hoverable
      className="product-card"
      cover={<img alt={product.name} src={product.image} />}
    >
      <Card.Meta
        title={
          <Link to={`/product/${product._id}`} style={{ color: '#1677ff' }}>
            {product.name}
          </Link>
        }
        description={
          <div>
            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
            <h3 style={{ marginTop: 8, color: '#111' }}>
              {formatPrice(product.price)}
            </h3>
            <Button type="primary" block>
              Details
            </Button>
          </div>
        }
      />
    </Card>
  )
}

export default ProductCard
