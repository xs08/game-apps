import { Layout, Menu } from 'antd'
import './Sidebar.css'

const { Sider } = Layout

interface MenuItem {
  key: string
  icon?: React.ReactNode
  label: string
  children?: MenuItem[]
}

interface SidebarProps {
  menuItems: MenuItem[]
  selectedKeys: string[]
  defaultOpenKeys: string[]
  onMenuClick: (key: string) => void
}

export default function Sidebar({
  menuItems,
  selectedKeys,
  defaultOpenKeys,
  onMenuClick,
}: SidebarProps) {
  const handleMenuClick = ({ key }: { key: string }) => {
    onMenuClick(key)
  }

  return (
    <Sider width={200} className="admin-sidebar">
      <Menu
        mode="inline"
        selectedKeys={selectedKeys}
        defaultOpenKeys={defaultOpenKeys}
        items={menuItems}
        onClick={handleMenuClick}
      />
    </Sider>
  )
}

