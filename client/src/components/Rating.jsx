import { Rate, Typography } from 'antd'

const { Text } = Typography

const Rating = ({ value, text, color = '#faad14' }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <Rate
        disabled
        allowHalf
        value={value}
        style={{ fontSize: 14, color }}
      />
      {text && <Text type="secondary">{text}</Text>}
    </div>
  )
}

export default Rating
