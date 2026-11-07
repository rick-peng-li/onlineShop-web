import { Alert } from 'antd'

const Message = ({ variant = 'info', children }) => (
  <Alert
    type={variant === 'danger' ? 'error' : variant}
    message={children}
    showIcon
    style={{ marginBottom: 16 }}
  />
)

export default Message
