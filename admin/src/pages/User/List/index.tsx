import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Table,
  Card,
  Button,
  Input,
  Space,
  Select,
  Tag,
  message,
  Popconfirm,
} from 'antd'
import { SearchOutlined, UserOutlined, EditOutlined } from '@ant-design/icons'
import { api } from '../../../services/api'
import type { UserInfo, UserListParams } from '../../../types/api'

const { Search } = Input

export default function UserList() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState<UserInfo[]>([])
  const [total, setTotal] = useState(0)
  const [params, setParams] = useState<UserListParams>({
    page: 1,
    page_size: 10,
  })

  const loadUsers = async () => {
    setLoading(true)
    try {
      const response = await api.getUserList(params)
      setUsers(response.list)
      setTotal(response.total)
    } catch (error) {
      message.error('加载用户列表失败')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [params])

  const handleSearch = (keyword: string) => {
    setParams({ ...params, keyword, page: 1 })
  }

  const handleStatusChange = async (id: number, status: 'active' | 'inactive') => {
    try {
      await api.updateUserStatus(id, status)
      message.success('用户状态更新成功')
      loadUsers()
    } catch (error) {
      message.error('更新用户状态失败')
      console.error(error)
    }
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => (
        <Tag color={role === 'admin' ? 'red' : 'blue'}>{role === 'admin' ? '管理员' : '用户'}</Tag>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string, record: UserInfo) => (
        <Select
          value={status}
          size="small"
          style={{ width: 100 }}
          onChange={(value) => handleStatusChange(record.id, value)}
        >
          <Select.Option value="active">启用</Select.Option>
          <Select.Option value="inactive">禁用</Select.Option>
        </Select>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text: string) => new Date(text).toLocaleString('zh-CN'),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: UserInfo) => (
        <Button
          type="link"
          icon={<EditOutlined />}
          onClick={() => navigate(`/users/${record.id}`)}
        >
          查看详情
        </Button>
      ),
    },
  ]

  return (
    <div>
      <Card
        title="用户管理"
        extra={
          <Space>
            <Search
              placeholder="搜索用户名、邮箱"
              allowClear
              onSearch={handleSearch}
              style={{ width: 300 }}
            />
            <Select
              placeholder="状态筛选"
              allowClear
              style={{ width: 120 }}
              onChange={(value) =>
                setParams({ ...params, status: value, page: 1 })
              }
            >
              <Select.Option value="active">启用</Select.Option>
              <Select.Option value="inactive">禁用</Select.Option>
            </Select>
          </Space>
        }
      >
        <Table
          columns={columns}
          dataSource={users}
          loading={loading}
          rowKey="id"
          pagination={{
            current: params.page,
            pageSize: params.page_size,
            total,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条`,
            onChange: (page, pageSize) => {
              setParams({ ...params, page, page_size: pageSize })
            },
          }}
        />
      </Card>
    </div>
  )
}

