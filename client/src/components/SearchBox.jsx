import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input } from 'antd'

const { Search } = Input

const SearchBox = () => {
  const [keyword, setKeyword] = useState('')
  const navigate = useNavigate()

  const handleSearch = (value) => {
    if (value.trim()) {
      navigate(`/search/${value.trim()}`)
    } else {
      navigate('/')
    }
  }

  return (
    <Search
      placeholder="Search here..."
      allowClear
      enterButton="Search"
      size="large"
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
      onSearch={handleSearch}
    />
  )
}

export default SearchBox
