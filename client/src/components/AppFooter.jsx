import { Layout, Row, Col, Typography } from 'antd'

const { Footer } = Layout
const { Title, Paragraph } = Typography

const AppFooter = () => (
  <Footer className="site-footer">
    <Row gutter={[16, 16]} justify="center">
      <Col xs={24} sm={8}>
        <Title level={5} style={{ color: '#fff' }}>Contact</Title>
        <Paragraph style={{ color: 'rgba(255,255,255,0.65)', margin: 0 }}>
          Uttura, Dhaka-1229
        </Paragraph>
        <Paragraph style={{ color: 'rgba(255,255,255,0.65)', margin: 0 }}>
          onlinesp@gmail.com
        </Paragraph>
      </Col>
      <Col xs={24} sm={8}>
        <Title level={5} style={{ color: '#fff' }}>Information</Title>
        <Paragraph style={{ color: 'rgba(255,255,255,0.65)', margin: 0 }}>
          About Us
        </Paragraph>
        <Paragraph style={{ color: 'rgba(255,255,255,0.65)', margin: 0 }}>
          Privacy Policy
        </Paragraph>
      </Col>
      <Col xs={24} sm={8}>
        <Title level={5} style={{ color: '#fff' }}>Customer Service</Title>
        <Paragraph style={{ color: 'rgba(255,255,255,0.65)', margin: 0 }}>
          Shipping Policy
        </Paragraph>
        <Paragraph style={{ color: 'rgba(255,255,255,0.65)', margin: 0 }}>
          Returns
        </Paragraph>
      </Col>
    </Row>
    <div style={{ marginTop: 16, color: 'rgba(255,255,255,0.45)' }}>
      sam's accurium © {new Date().getFullYear()}
    </div>
  </Footer>
)

export default AppFooter
