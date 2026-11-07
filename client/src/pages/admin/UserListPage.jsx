import { useEffect, useState } from 'react'
import { Table, Button, Space, Popconfirm, message, Tag } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import Loader from '@/components/Loader'
import { getUsers, deleteUser } from '@/services/userService'

const UserListPage = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  const load = () => {
    setLoading(true)
    getUsers()
      .then(setUsers)
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  const handleDelete = async (id) => {
    try {
      await deleteUser(id)
      message.success('User deleted')
      load()
    } catch (err) {
      message.error(err.response?.data?.message || err.message)
    }
  }

  const columns = [
    { title: 'ID', dataIndex: '_id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    {
      title: 'Admin',
      dataIndex: 'isAdmin',
      key: 'admin',
      render: (v) => (v ? <Tag color="success">Yes</Tag> : <Tag>No</Tag>),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, r) => (
        <Space>
          <Link to={`/admin/user/${r._id}/edit`}>
            <Button icon={<EditOutlined />} size="small" />
          </Link>
          <Popconfirm title="Delete this user?" onConfirm={() => handleDelete(r._id)}>
            <Button danger icon={<DeleteOutlined />} size="small" />
          </Popconfirm>
        </Space>
      ),
    },
  ]

  if (loading) return <Loader />
  return <Table columns={columns} dataSource={users} rowKey="_id" pagination={false} />
}

export default UserListPage
