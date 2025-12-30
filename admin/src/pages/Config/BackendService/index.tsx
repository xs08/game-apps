import { useEffect } from 'react'
import { Button, Space, Card, Modal, message } from 'antd'
import { SaveOutlined, ReloadOutlined, CheckCircleOutlined } from '@ant-design/icons'
import { useConfig } from '../../../hooks/useConfig'
import YAMLEditor from '../../../components/ConfigEditor/YAMLEditor'
import { SERVICE_TYPES } from '../../../config/constants'

export default function BackendServiceConfig() {
  const {
    loading,
    config,
    setConfig,
    hasChanges,
    loadConfig,
    saveConfig,
    validateConfig,
    reloadConfig,
  } = useConfig(SERVICE_TYPES.BACKEND)

  useEffect(() => {
    loadConfig()
  }, [loadConfig])

  const handleSave = async () => {
    const isValid = await validateConfig()
    if (!isValid) {
      return
    }

    Modal.confirm({
      title: '确认保存配置',
      content: '保存配置后，服务可能需要重启才能生效。是否继续？',
      onOk: async () => {
        const success = await saveConfig()
        if (success) {
          // 可以选择是否自动重新加载配置
          // await reloadConfig()
        }
      },
    })
  }

  const handleReload = () => {
    Modal.confirm({
      title: '确认重新加载配置',
      content: '重新加载配置将应用最新的配置文件内容。是否继续？',
      onOk: reloadConfig,
    })
  }

  return (
    <div>
      <Card
        title="后端服务配置"
        extra={
          <Space>
            <Button
              icon={<CheckCircleOutlined />}
              onClick={validateConfig}
              loading={loading}
            >
              验证配置
            </Button>
            <Button
              icon={<ReloadOutlined />}
              onClick={handleReload}
              loading={loading}
            >
              重新加载
            </Button>
            <Button
              type="primary"
              icon={<SaveOutlined />}
              onClick={handleSave}
              loading={loading}
              disabled={!hasChanges}
            >
              保存配置
            </Button>
          </Space>
        }
      >
        <YAMLEditor value={config} onChange={(value) => setConfig(value || '')} />
        {hasChanges && (
          <div style={{ marginTop: 16, color: '#ff4d4f' }}>
            提示：配置已修改，请保存后生效
          </div>
        )}
      </Card>
    </div>
  )
}

