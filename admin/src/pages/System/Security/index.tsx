import { useEffect, useState } from 'react'
import { Card, Form, InputNumber, Switch, Input, Button, Space, message, Spin } from 'antd'
import { SaveOutlined } from '@ant-design/icons'
import { api } from '../../../services/api'
import type { SystemSecurityConfig } from '../../../types/config'

export default function SystemSecurityConfig() {
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form] = Form.useForm()

  useEffect(() => {
    loadConfig()
  }, [])

  const loadConfig = async () => {
    setLoading(true)
    try {
      const config = await api.getSystemConfigCategory('security')
      form.setFieldsValue(config)
    } catch (error) {
      message.error('加载配置失败')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (values: SystemSecurityConfig) => {
    setSaving(true)
    try {
      await api.updateSystemConfigCategory('security', values)
      message.success('安全配置保存成功')
    } catch (error) {
      message.error('保存配置失败')
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

  return (
    <div>
      <Card
        title="安全配置"
        extra={
          <Button
            type="primary"
            icon={<SaveOutlined />}
            onClick={() => form.submit()}
            loading={saving}
          >
            保存
          </Button>
        }
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
          initialValues={{
            password_policy: {
              min_length: 8,
              require_uppercase: true,
              require_lowercase: true,
              require_numbers: true,
              require_special_chars: false,
              expiration_days: 90,
            },
            ip_whitelist: [],
            jwt: {
              secret: '',
              expiration_hours: 24,
              refresh_expiration_hours: 168,
            },
            session: {
              timeout_minutes: 30,
              max_concurrent_sessions: 5,
            },
          }}
        >
          <Card title="密码策略" style={{ marginBottom: 24 }}>
            <Form.Item
              name={['password_policy', 'min_length']}
              label="最小长度"
              rules={[{ required: true, message: '请输入最小长度' }]}
            >
              <InputNumber min={6} max={32} />
            </Form.Item>

            <Form.Item
              name={['password_policy', 'require_uppercase']}
              label="要求大写字母"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>

            <Form.Item
              name={['password_policy', 'require_lowercase']}
              label="要求小写字母"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>

            <Form.Item
              name={['password_policy', 'require_numbers']}
              label="要求数字"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>

            <Form.Item
              name={['password_policy', 'require_special_chars']}
              label="要求特殊字符"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>

            <Form.Item
              name={['password_policy', 'expiration_days']}
              label="密码过期天数（0 表示永不过期）"
            >
              <InputNumber min={0} />
            </Form.Item>
          </Card>

          <Card title="IP 白名单" style={{ marginBottom: 24 }}>
            <Form.Item name="ip_whitelist" label="IP 地址列表（每行一个）">
              <Input.TextArea
                rows={5}
                placeholder="127.0.0.1&#10;192.168.1.0/24"
              />
            </Form.Item>
          </Card>

          <Card title="JWT 配置" style={{ marginBottom: 24 }}>
            <Form.Item
              name={['jwt', 'secret']}
              label="JWT 密钥"
              rules={[{ required: true, message: '请输入 JWT 密钥' }]}
            >
              <Input.Password placeholder="留空则不修改" />
            </Form.Item>

            <Form.Item
              name={['jwt', 'expiration_hours']}
              label="Token 过期时间（小时）"
              rules={[{ required: true, message: '请输入过期时间' }]}
            >
              <InputNumber min={1} />
            </Form.Item>

            <Form.Item
              name={['jwt', 'refresh_expiration_hours']}
              label="Refresh Token 过期时间（小时）"
              rules={[{ required: true, message: '请输入过期时间' }]}
            >
              <InputNumber min={1} />
            </Form.Item>
          </Card>

          <Card title="会话配置">
            <Form.Item
              name={['session', 'timeout_minutes']}
              label="会话超时时间（分钟）"
              rules={[{ required: true, message: '请输入超时时间' }]}
            >
              <InputNumber min={1} />
            </Form.Item>

            <Form.Item
              name={['session', 'max_concurrent_sessions']}
              label="最大并发会话数"
              rules={[{ required: true, message: '请输入最大并发会话数' }]}
            >
              <InputNumber min={1} />
            </Form.Item>
          </Card>

          <Form.Item style={{ marginTop: 24 }}>
            <Space>
              <Button type="primary" htmlType="submit" loading={saving}>
                保存配置
              </Button>
              <Button onClick={() => form.resetFields()}>重置</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

