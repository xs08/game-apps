import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Layout as AntLayout, Menu } from 'antd'
import {
  DashboardOutlined,
  SettingOutlined,
  UserOutlined,
  ApiOutlined,
  GatewayOutlined,
  RobotOutlined,
  SafetyOutlined,
  BellOutlined,
} from '@ant-design/icons'
import Header from './Header'
import Sidebar from './Sidebar'
import './index.css'

const { Content } = AntLayout

export default function Layout() {
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: '仪表盘',
    },
    {
      key: 'config',
      icon: <SettingOutlined />,
      label: '服务配置',
      children: [
        {
          key: '/config/backend',
          icon: <ApiOutlined />,
          label: '后端服务',
        },
        {
          key: '/config/gateway',
          icon: <GatewayOutlined />,
          label: '网关服务',
        },
        {
          key: '/config/agent',
          icon: <RobotOutlined />,
          label: 'Agent 服务',
        },
      ],
    },
    {
      key: '/users',
      icon: <UserOutlined />,
      label: '用户管理',
    },
    {
      key: 'system',
      icon: <SettingOutlined />,
      label: '系统配置',
      children: [
        {
          key: '/system/basic',
          icon: <SettingOutlined />,
          label: '基础配置',
        },
        {
          key: '/system/security',
          icon: <SafetyOutlined />,
          label: '安全配置',
        },
        {
          key: '/system/notification',
          icon: <BellOutlined />,
          label: '通知配置',
        },
      ],
    },
  ]

  const selectedKeys = [location.pathname]
  const openKeys = menuItems
    .filter((item) => item.children?.some((child) => child.key === location.pathname))
    .map((item) => item.key)

  return (
    <AntLayout className="admin-layout">
      <Sidebar
        menuItems={menuItems}
        selectedKeys={selectedKeys}
        defaultOpenKeys={openKeys}
        onMenuClick={(key) => navigate(key)}
      />
      <AntLayout>
        <Header />
        <Content className="admin-content">
          <Outlet />
        </Content>
      </AntLayout>
    </AntLayout>
  )
}

