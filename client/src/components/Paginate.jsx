import { Pagination } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'

const Paginate = ({ pages, isAdmin = false, keyword = '' }) => {
  const navigate = useNavigate()
  const { pageNumber } = useParams()
  const current = Number(pageNumber) || 1

  if (pages <= 1) return null

  const handleChange = (page) => {
    if (isAdmin) {
      navigate(`/admin/productlist/${page}`)
    } else if (keyword) {
      navigate(`/search/${keyword}/page/${page}`)
    } else {
      navigate(`/page/${page}`)
    }
  }

  return (
    <div style={{ textAlign: 'center', margin: '24px 0' }}>
      <Pagination
        current={current}
        total={pages * 10}
        pageSize={10}
        showSizeChanger={false}
        onChange={handleChange}
      />
    </div>
  )
}

export default Paginate
