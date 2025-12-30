import { useEffect, useState } from 'react'
import { Card, Form, Switch, Input, InputNumber, Button, Space, message, Spin } from 'antd'
import { SaveOutlined } from '@ant-design/icons'
import { api } from '../../../services/api'
import type { SystemNotificationConfig } from '../../../types/config'

export default function SystemNotificationConfig() {
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form] = Form.useForm()

  useEffect(() => {
    loadConfig()
  }, [])

  const loadConfig = async () => {
    setLoading(true)
    try {
      const config = await api.getSystemConfigCategory('notification')
      form.setFieldsValue(config)
    } catch (error) {
      message.error('加载配置失败')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (values: SystemNotificationConfig) => {
    setSaving(true)
    try {
      await api.updateSystemConfigCategory('notification', values)
      message.success('通知配置保存成功')
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
        title="通知配置"
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
            email: {
              enabled: false,
              smtp_host: '',
              smtp_port: 587,
              smtp_user: '',
              smtp_password: '',
              from_email: '',
              from_name: '',
            },
            sms: {
              enabled: false,
              provider: '',
              api_key: '',
              api_secret: '',
            },
            push: {
              enabled: false,
              provider: '',
              api_key: '',
            },
          }}
        >
          <Card title="邮件配置" style={{ marginBottom: 24 }}>
            <Form.Item
              name={['email', 'enabled']}
              label="启用邮件通知"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>

            <Form.Item
              name={['email', 'smtp_host']}
              label="SMTP 服务器"
              rules={[{ required: true, message: '请输入 SMTP 服务器地址' }]}
            >
              <Input placeholder="smtp.example.com" />
            </Form.Item>

            <Form.Item
              name={['email', 'smtp_port']}
              label="SMTP 端口"
              rules={[{ required: true, message: '请输入 SMTP 端口' }]}
            >
              <InputNumber min={1} max={65535} />
            </Form.Item>

            <Form.Item
              name={['email', 'smtp_user']}
              label="SMTP 用户名"
              rules={[{ required: true, message: '请输入 SMTP 用户名' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name={['email', 'smtp_password']}
              label="SMTP 密码"
              rules={[{ required: true, message: '请输入 SMTP 密码' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name={['email', 'from_email']}
              label="发件人邮箱"
              rules={[
                { required: true, message: '请输入发件人邮箱' },
                { type: 'email', message: '请输入有效的邮箱地址' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name={['email', 'from_name']}
              label="发件人名称"
              rules={[{ required: true, message: '请输入发件人名称' }]}
            >
              <Input />
            </Form.Item>
          </Card>

          <Card title="短信配置" style={{ marginBottom: 24 }}>
            <Form.Item
              name={['sms', 'enabled']}
              label="启用短信通知"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>

            <Form.Item
              name={['sms', 'provider']}
              label="服务提供商"
              rules={[{ required: true, message: '请选择服务提供商' }]}
            >
              <Input placeholder="aliyun, tencent, twilio" />
            </Form.Item>

            <Form.Item
              name={['sms', 'api_key']}
              label="API Key"
              rules={[{ required: true, message: '请输入 API Key' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name={['sms', 'api_secret']}
              label="API Secret"
              rules={[{ required: true, message: '请输入 API Secret' }]}
            >
              <Input.Password />
            </Form.Item>
          </Card>

          <Card title="推送通知配置">
            <Form.Item
              name={['push', 'enabled']}
              label="启用推送通知"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>

            <Form.Item
              name={['push', 'provider']}
              label="服务提供商"
              rules={[{ required: true, message: '请选择服务提供商' }]}
            >
              <Input placeholder="fcm, apns, jpush" />
            </Form.Item>

            <Form.Item
              name={['push', 'api_key']}
              label="API Key"
              rules={[{ required: true, message: '请输入 API Key' }]}
            >
              <Input />
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

