import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, Card, Steps, Typography } from 'antd'
import { EnvironmentOutlined } from '@ant-design/icons'
import useCartStore from '@/store/cartStore'

const { Title } = Typography

const ShippingPage = () => {
  const navigate = useNavigate()
  const { shippingAddress, saveShippingAddress } = useCartStore()

  const onFinish = (values) => {
    saveShippingAddress(values)
    navigate('/payment')
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <Steps
        current={0}
        items={[{ title: 'Sign In' }, { title: 'Shipping' }, { title: 'Payment' }, { title: 'Place Order' }]}
        style={{ marginBottom: 24 }}
      />
      <Card>
        <Title level={4}>
          <EnvironmentOutlined /> Shipping Address
        </Title>
        <Form layout="vertical" onFinish={onFinish} initialValues={shippingAddress}>
          <Form.Item name="address" label="Address" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="city" label="City" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="postalCode" label="Postal Code" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="country" label="Country" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Continue
          </Button>
        </Form>
      </Card>
    </div>
  )
}

export default ShippingPage
