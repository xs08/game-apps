import { useState, useCallback } from 'react'
import { api } from '../services/api'
import { message } from 'antd'
import type { ConfigResponse, ValidateConfigResponse } from '../types/api'

export function useConfig(service: string) {
  const [loading, setLoading] = useState(false)
  const [config, setConfig] = useState<string>('')
  const [originalConfig, setOriginalConfig] = useState<string>('')

  const loadConfig = useCallback(async () => {
    setLoading(true)
    try {
      const response: ConfigResponse = await api.getConfig(service)
      setConfig(response.content)
      setOriginalConfig(response.content)
    } catch (error) {
      message.error('加载配置失败')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [service])

  const saveConfig = useCallback(async () => {
    setLoading(true)
    try {
      await api.updateConfig(service, config)
      setOriginalConfig(config)
      message.success('配置保存成功')
      return true
    } catch (error) {
      message.error('保存配置失败')
      console.error(error)
      return false
    } finally {
      setLoading(false)
    }
  }, [service, config])

  const validateConfig = useCallback(async (): Promise<boolean> => {
    try {
      const response: ValidateConfigResponse = await api.validateConfig(
        service,
        { content: config }
      )
      if (response.valid) {
        message.success('配置格式正确')
        return true
      } else {
        message.error(
          `配置格式错误: ${response.errors?.join(', ') || '未知错误'}`
        )
        return false
      }
    } catch (error) {
      message.error('配置验证失败')
      console.error(error)
      return false
    }
  }, [service, config])

  const reloadConfig = useCallback(async () => {
    setLoading(true)
    try {
      await api.reloadConfig(service)
      message.success('配置重新加载成功')
    } catch (error) {
      message.error('重新加载配置失败')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [service])

  const hasChanges = config !== originalConfig

  return {
    loading,
    config,
    setConfig,
    originalConfig,
    hasChanges,
    loadConfig,
    saveConfig,
    validateConfig,
    reloadConfig,
  }
}

