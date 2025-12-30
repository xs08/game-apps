import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Card,
  Form,
  Input,
  Button,
  Space,
  Descriptions,
  Tag,
  message,
  Spin,
} from 'antd'
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons'
import { api } from '../../../services/api'
import type { UserInfo, UpdateUserRequest } from '../../../types/api'

export default function UserDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [user, setUser] = useState<UserInfo | null>(null)
  const [form] = Form.useForm()

  useEffect(() => {
    if (id) {
      loadUser()
    }
  }, [id])

  const loadUser = async () => {
    setLoading(true)
    try {
      const userData = await api.getUserDetail(id!)
      setUser(userData)
      form.setFieldsValue({
        nickname: userData.nickname,
        email: userData.email,
        status: userData.status,
      })
    } catch (error) {
      message.error('加载用户信息失败')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (values: UpdateUserRequest) => {
    if (!id) return

    setSaving(true)
    try {
      await api.updateUser(parseInt(id), values)
      message.success('用户信息更新成功')
      loadUser()
    } catch (error) {
      message.error('更新用户信息失败')
      console.error(error)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    )
  }

  if (!user) {
    return <div>用户不存在</div>
  }

  return (
    <div>
      <Card
        title={
          <Space>
            <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/users')}>
              返回
            </Button>
            <span>用户详情</span>
          </Space>
        }
      >
        <Descriptions title="基本信息" bordered style={{ marginBottom: 24 }}>
          <Descriptions.Item label="用户ID">{user.id}</Descriptions.Item>
          <Descriptions.Item label="用户名">{user.username}</Descriptions.Item>
          <Descriptions.Item label="角色">
            <Tag color={user.role === 'admin' ? 'red' : 'blue'}>
              {user.role === 'admin' ? '管理员' : '用户'}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="状态">
            <Tag color={user.status === 'active' ? 'green' : 'red'}>
              {user.status === 'active' ? '启用' : '禁用'}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="创建时间">
            {new Date(user.created_at).toLocaleString('zh-CN')}
          </Descriptions.Item>
          <Descriptions.Item label="更新时间">
            {new Date(user.updated_at).toLocaleString('zh-CN')}
          </Descriptions.Item>
        </Descriptions>

        <Card title="编辑信息" style={{ marginTop: 24 }}>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSave}
            initialValues={{
              nickname: user.nickname,
              email: user.email,
              status: user.status,
            }}
          >
            <Form.Item
              name="nickname"
              label="昵称"
              rules={[{ required: true, message: '请输入昵称' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="email"
              label="邮箱"
              rules={[
                { required: true, message: '请输入邮箱' },
                { type: 'email', message: '请输入有效的邮箱地址' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item name="status" label="状态">
              <Input disabled />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit" icon={<SaveOutlined />} loading={saving}>
                  保存
                </Button>
                <Button onClick={() => form.resetFields()}>重置</Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </Card>
    </div>
  )
}

