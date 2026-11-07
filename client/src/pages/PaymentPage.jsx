import { useNavigate } from 'react-router-dom'
import { Form, Radio, Button, Card, Steps, Typography } from 'antd'
import { CreditCardOutlined } from '@ant-design/icons'
import useCartStore from '@/store/cartStore'

const { Title } = Typography

const PaymentPage = () => {
  const navigate = useNavigate()
  const { paymentMethod, savePaymentMethod } = useCartStore()

  const onFinish = (values) => {
    savePaymentMethod(values.paymentMethod)
    navigate('/placeorder')
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <Steps
        current={1}
        items={[{ title: 'Sign In' }, { title: 'Shipping' }, { title: 'Payment' }, { title: 'Place Order' }]}
        style={{ marginBottom: 24 }}
      />
      <Card>
        <Title level={4}>
          <CreditCardOutlined /> Payment Method
        </Title>
        <Form layout="vertical" onFinish={onFinish} initialValues={{ paymentMethod: paymentMethod || 'PayPal' }}>
          <Form.Item name="paymentMethod" label="Select Method" rules={[{ required: true }]}>
            <Radio.Group>
              <Radio value="PayPal">PayPal</Radio>
            </Radio.Group>
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Continue
          </Button>
        </Form>
      </Card>
    </div>
  )
}

export default PaymentPage
