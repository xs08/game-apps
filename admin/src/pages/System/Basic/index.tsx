import { useEffect, useState } from 'react'
import { Card, Form, Input, Select, Button, Space, message, Spin } from 'antd'
import { SaveOutlined } from '@ant-design/icons'
import { api } from '../../../services/api'
import type { SystemBasicConfig } from '../../../types/config'

export default function SystemBasicConfig() {
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form] = Form.useForm()

  useEffect(() => {
    loadConfig()
  }, [])

  const loadConfig = async () => {
    setLoading(true)
    try {
      const config = await api.getSystemConfigCategory('basic')
      form.setFieldsValue(config)
    } catch (error) {
      message.error('加载配置失败')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (values: SystemBasicConfig) => {
    setSaving(true)
    try {
      await api.updateSystemConfigCategory('basic', values)
      message.success('基础配置保存成功')
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
        title="基础配置"
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
            timezone: 'Asia/Shanghai',
            language: 'zh-CN',
            theme: 'light',
            site_name: '游戏服务管理控制台',
            site_description: '',
            site_logo: '',
          }}
        >
          <Form.Item
            name="timezone"
            label="时区"
            rules={[{ required: true, message: '请选择时区' }]}
          >
            <Select>
              <Select.Option value="Asia/Shanghai">Asia/Shanghai (UTC+8)</Select.Option>
              <Select.Option value="UTC">UTC</Select.Option>
              <Select.Option value="America/New_York">America/New_York (UTC-5)</Select.Option>
              <Select.Option value="Europe/London">Europe/London (UTC+0)</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="language"
            label="语言"
            rules={[{ required: true, message: '请选择语言' }]}
          >
            <Select>
              <Select.Option value="zh-CN">简体中文</Select.Option>
              <Select.Option value="zh-TW">繁体中文</Select.Option>
              <Select.Option value="en-US">English</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="theme"
            label="主题"
            rules={[{ required: true, message: '请选择主题' }]}
          >
            <Select>
              <Select.Option value="light">浅色</Select.Option>
              <Select.Option value="dark">深色</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="site_name"
            label="站点名称"
            rules={[{ required: true, message: '请输入站点名称' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="site_description" label="站点描述">
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item name="site_logo" label="站点 Logo URL">
            <Input placeholder="https://example.com/logo.png" />
          </Form.Item>

          <Form.Item>
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

