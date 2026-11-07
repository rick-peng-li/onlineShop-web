import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Form,
  Input,
  InputNumber,
  Button,
  Card,
  Upload,
  Image,
  message,
  Typography,
  Row,
  Col,
} from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import Loader from '@/components/Loader'
import { getProductById, updateProduct } from '@/services/productService'
import { uploadImage } from '@/services/uploadService'

const { Title } = Typography
const { TextArea } = Input

const ProductEditPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [form] = Form.useForm()
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    getProductById(id)
      .then((data) => {
        setProduct(data)
        form.setFieldsValue(data)
      })
      .finally(() => setLoading(false))
  }, [id, form])

  const customRequest = async ({ file, onSuccess, onError }) => {
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('image', file)
      const path = await uploadImage(formData)
      form.setFieldValue('image', path)
      setProduct((p) => ({ ...p, image: path }))
      onSuccess?.()
      message.success('Uploaded')
    } catch (err) {
      message.error(err.response?.data?.message || err.message)
      onError?.(err)
    } finally {
      setUploading(false)
    }
  }

  const onFinish = async (values) => {
    try {
      await updateProduct(id, values)
      message.success('Product updated')
      navigate('/admin/productlist')
    } catch (err) {
      message.error(err.response?.data?.message || err.message)
    }
  }

  if (loading) return <Loader />
  return (
    <Card>
      <Title level={4}>Edit Product</Title>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={16}>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="price" label="Price" rules={[{ required: true }]}>
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name="image" label="Image URL" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="brand" label="Brand" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="countInStock" label="Count In Stock" rules={[{ required: true }]}>
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name="category" label="Category" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="description" label="Description" rules={[{ required: true }]}>
              <TextArea rows={3} />
            </Form.Item>
            <Button type="primary" htmlType="submit">Update</Button>
          </Form>
        </Col>
        <Col xs={24} md={8}>
          <Image src={product?.image} style={{ width: '100%' }} />
          <Upload customRequest={customRequest} showUploadList={false}>
            <Button icon={<UploadOutlined />} loading={uploading} block style={{ marginTop: 12 }}>
              Upload Image
            </Button>
          </Upload>
        </Col>
      </Row>
    </Card>
  )
}

export default ProductEditPage
