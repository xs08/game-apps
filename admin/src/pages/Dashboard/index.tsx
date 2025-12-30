import { Card, Row, Col, Statistic } from 'antd'
import {
  UserOutlined,
  ApiOutlined,
  GatewayOutlined,
  RobotOutlined,
} from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { api } from '../../services/api'

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    services: {
      backend: { status: 'unknown' as 'healthy' | 'unhealthy' | 'unknown' },
      gateway: { status: 'unknown' as 'healthy' | 'unhealthy' | 'unknown' },
      agent: { status: 'unknown' as 'healthy' | 'unhealthy' | 'unknown' },
    },
  })

  useEffect(() => {
    // TODO: 加载统计数据
    // 这里可以调用 API 获取实际的统计数据
    setStats({
      totalUsers: 0,
      activeUsers: 0,
      services: {
        backend: { status: 'unknown' },
        gateway: { status: 'unknown' },
        agent: { status: 'unknown' },
      },
    })
  }, [])

  return (
    <div>
      <h1>仪表盘</h1>
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="总用户数"
              value={stats.totalUsers}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="活跃用户"
              value={stats.activeUsers}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="后端服务"
              value={stats.services.backend.status === 'healthy' ? '正常' : '异常'}
              prefix={<ApiOutlined />}
              valueStyle={{
                color: stats.services.backend.status === 'healthy' ? '#3f8600' : '#cf1322',
              }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="网关服务"
              value={stats.services.gateway.status === 'healthy' ? '正常' : '异常'}
              prefix={<GatewayOutlined />}
              valueStyle={{
                color: stats.services.gateway.status === 'healthy' ? '#3f8600' : '#cf1322',
              }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

