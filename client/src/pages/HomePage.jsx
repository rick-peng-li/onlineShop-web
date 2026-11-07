import { useEffect, useState } from 'react'
import { Row, Col, Typography } from 'antd'
import { useParams } from 'react-router-dom'
import ProductCard from '@/components/ProductCard'
import ProductCarousel from '@/components/ProductCarousel'
import Paginate from '@/components/Paginate'
import Loader from '@/components/Loader'
import Message from '@/components/Message'
import { getProducts } from '@/services/productService'

const { Title } = Typography

const HomePage = () => {
  const { keyword, pageNumber } = useParams()
  const [state, setState] = useState({ products: [], page: 1, pages: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    setLoading(true)
    getProducts({ keyword, pageNumber })
      .then((data) => {
        if (active) setState(data)
      })
      .catch((err) => setError(err.response?.data?.message || err.message))
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [keyword, pageNumber])

  return (
    <>
      {!keyword && <ProductCarousel />}
      <Title level={3} className="page-header">
        {keyword ? `Results for "${keyword}"` : 'All Products'}
      </Title>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : state.products.length === 0 ? (
        <Message variant="info">No products found</Message>
      ) : (
        <>
          <Row gutter={[16, 24]}>
            {state.products.map((product) => (
              <Col key={product._id} xs={12} sm={8} md={6} lg={6}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={state.pages}
            page={state.page}
            keyword={keyword}
          />
        </>
      )}
    </>
  )
}

export default HomePage
