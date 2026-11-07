import { Carousel } from 'antd'
import offer2 from '@/assets/images/offer2.jpg'
import offer3 from '@/assets/images/offer3.png'

const ProductCarousel = () => {
  const slides = [offer2, offer3]
  return (
    <Carousel autoplay effect="fade" style={{ marginBottom: 24, background: '#fafafa' }}>
      {slides.map((src, idx) => (
        <div key={idx} className="carousel-slide">
          <img src={src} alt={`offer-${idx}`} />
        </div>
      ))}
    </Carousel>
  )
}

export default ProductCarousel
