import { useState } from 'react'
import { Form, Input, Button, Card, Row, Col, Typography, message } from 'antd'
import { MailOutlined } from '@ant-design/icons'
import { createContact } from '@/services/contactService'
import contactImg from '@/assets/images/contact.png'

const { Title, Text } = Typography
const { TextArea } = Input

const ContactPage = () => {
  const [loading, setLoading] = useState(false)

  const onFinish = async (values) => {
    setLoading(true)
    try {
      await createContact(values)
      message.success('Your message has been sent successfully')
    } catch (err) {
      message.error(err.response?.data?.message || err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <Title level={2}>Contact Us</Title>
        <Text type="secondary">Share your query and ideas with us!</Text>
      </div>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <img src={contactImg} alt="contact" style={{ width: '100%' }} />
        </Col>
        <Col xs={24} md={12}>
          <Card>
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                <Input size="large" placeholder="Enter name" />
              </Form.Item>
              <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                <Input size="large" placeholder="Enter email" />
              </Form.Item>
              <Form.Item name="message" label="Message" rules={[{ required: true }]}>
                <TextArea rows={4} placeholder="Enter your message" />
              </Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading} icon={<MailOutlined />}>
                Send
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: 32 }}>
        <Col xs={24} md={8}>
          <Card><Text strong>Address</Text><div>Uttura, Dhaka-1229</div></Card>
        </Col>
        <Col xs={24} md={8}>
          <Card><Text strong>Phone</Text><div>+########</div></Card>
        </Col>
        <Col xs={24} md={8}>
          <Card><Text strong>Email</Text><div>onlinesp@gmail.com</div></Card>
        </Col>
      </Row>
    </div>
  )
}

export default ContactPage
