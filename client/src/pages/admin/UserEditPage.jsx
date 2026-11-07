import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Form, Input, Button, Card, Switch, message, Typography } from 'antd'
import Loader from '@/components/Loader'
import { getUserById, updateUser } from '@/services/userService'

const { Title } = Typography

const UserEditPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [form] = Form.useForm()

  useEffect(() => {
    getUserById(id)
      .then((data) => {
        setUser(data)
        form.setFieldsValue(data)
      })
      .finally(() => setLoading(false))
  }, [id, form])

  const onFinish = async (values) => {
    try {
      await updateUser(id, values)
      message.success('User updated')
      navigate('/admin/userlist')
    } catch (err) {
      message.error(err.response?.data?.message || err.message)
    }
  }

  if (loading) return <Loader />
  return (
    <Card>
      <Title level={4}>Edit User</Title>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="isAdmin" label="Is Admin" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Button type="primary" htmlType="submit">Update</Button>
      </Form>
    </Card>
  )
}

export default UserEditPage
