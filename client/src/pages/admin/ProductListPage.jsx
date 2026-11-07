import { useEffect, useState } from 'react'
import { Table, Button, Space, Popconfirm, message, Tag, Row, Col } from 'antd'
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Loader from '@/components/Loader'
import Paginate from '@/components/Paginate'
import { getProducts, deleteProduct, createProduct } from '@/services/productService'

const ProductListPage = () => {
  const navigate = useNavigate()
  const { pageNumber } = useParams()
  const [products, setProducts] = useState([])
  const [pages, setPages] = useState(0)
  const [loading, setLoading] = useState(true)

  const load = () => {
    setLoading(true)
    getProducts({ pageNumber })
      .then((data) => {
        setProducts(data.products)
        setPages(data.pages)
      })
      .finally(() => setLoading(false))
  }

  useEffect(load, [pageNumber])

  const handleCreate = async () => {
    try {
      const p = await createProduct()
      navigate(`/admin/product/${p._id}/edit`)
    } catch (err) {
      message.error(err.response?.data?.message || err.message)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id)
      message.success('Product deleted')
      load()
    } catch (err) {
      message.error(err.response?.data?.message || err.message)
    }
  }

  const columns = [
    { title: 'ID', dataIndex: '_id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Price', dataIndex: 'price', key: 'price', render: (v) => `$${v}` },
    { title: 'Brand', dataIndex: 'brand', key: 'brand' },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    {
      title: 'Action',
      key: 'action',
      render: (_, r) => (
        <Space>
          <Link to={`/admin/product/${r._id}/edit`}>
            <Button icon={<EditOutlined />} size="small" />
          </Link>
          <Popconfirm title="Delete?" onConfirm={() => handleDelete(r._id)}>
            <Button danger icon={<DeleteOutlined />} size="small" />
          </Popconfirm>
        </Space>
      ),
    },
  ]

  if (loading) return <Loader />
  return (
    <>
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <h2>Products</h2>
        </Col>
        <Col>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
            Create Product
          </Button>
        </Col>
      </Row>
      <Table columns={columns} dataSource={products} rowKey="_id" pagination={false} />
      <Paginate pages={pages} isAdmin />
    </>
  )
}

export default ProductListPage
