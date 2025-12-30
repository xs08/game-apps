import { Layout, Dropdown, Avatar, Button } from 'antd'
import { UserOutlined, LogoutOutlined } from '@ant-design/icons'
import { useAuthStore } from '../../store/auth'
import { useNavigate } from 'react-router-dom'
import './Header.css'

const { Header: AntHeader } = Layout

export default function Header() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const menuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人资料',
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      danger: true,
    },
  ]

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === 'logout') {
      handleLogout()
    } else if (key === 'profile') {
      // TODO: 跳转到个人资料页面
    }
  }

  return (
    <AntHeader className="admin-header">
      <div className="admin-header-content">
        <div className="admin-header-title">游戏服务管理控制台</div>
        <div className="admin-header-actions">
          <Dropdown
            menu={{ items: menuItems, onClick: handleMenuClick }}
            placement="bottomRight"
          >
            <Button type="text" className="admin-header-user">
              <Avatar size="small" icon={<UserOutlined />} />
              <span className="admin-header-username">
                {user?.nickname || user?.username || '管理员'}
              </span>
            </Button>
          </Dropdown>
        </div>
      </div>
    </AntHeader>
  )
}

