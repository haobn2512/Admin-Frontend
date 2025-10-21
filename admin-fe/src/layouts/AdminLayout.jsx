import { Layout, Menu, Avatar, Dropdown, Space, theme } from "antd";
import {
  DashboardOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";

const { Header, Sider, Content } = Layout;

export default function AdminLayout() {
  const [isSiderCollapsed, setIsSiderCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const primaryNavigationItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: <Link to="/admin/dashboard">Dashboard</Link>,
    },
    {
      key: "products",
      icon: <ShoppingOutlined />,
      label: <Link to="/admin/products">Sản phẩm</Link>,
    },
    {
      key: "orders",
      icon: <ShoppingCartOutlined />,
      label: <Link to="/admin/orders">Đơn hàng</Link>,
    },
    {
      key: "users",
      icon: <UserOutlined />,
      label: <Link to="/admin/users">Người dùng</Link>,
    },
  ];

  const profileMenuItems = [
    { key: "logout", icon: <LogoutOutlined />, label: "Đăng xuất" },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider
        collapsible
        collapsed={isSiderCollapsed}
        onCollapse={setIsSiderCollapsed}
        width={230}
        style={{
          background: "#001529",
          position: "fixed",
          height: "100vh",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div
          style={{
            color: "#fff",
            padding: "24px 12px",
            textAlign: "center",
            fontSize: "1.2rem",
            fontWeight: "bold",
            borderBottom: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          {isSiderCollapsed ? "ADM" : "StyleWear Admin"}
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["dashboard"]}
          items={primaryNavigationItems}
          style={{ marginTop: 10 }}
        />
      </Sider>

      {/* Main layout */}
      <Layout
        style={{
          marginLeft: isSiderCollapsed ? 80 : 230,
          minHeight: "100vh",
          transition: "margin-left 0.2s ease",
          background: "#f5f6fa",
        }}
      >
        <Header
          style={{
            background: colorBgContainer,
            padding: "0 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: 64,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <Space>
            {isSiderCollapsed ? (
              <MenuUnfoldOutlined
                onClick={() => setIsSiderCollapsed(false)}
                style={{ fontSize: 20, cursor: "pointer" }}
              />
            ) : (
              <MenuFoldOutlined
                onClick={() => setIsSiderCollapsed(true)}
                style={{ fontSize: 20, cursor: "pointer" }}
              />
            )}
            <span style={{ fontWeight: 600 }}>Bảng điều khiển</span>
          </Space>

          <Dropdown
            menu={{ items: profileMenuItems }}
            placement="bottomRight"
            trigger={["click"]}
          >
            <Space style={{ cursor: "pointer" }}>
              <Avatar icon={<UserOutlined />} />
              <span>Admin</span>
            </Space>
          </Dropdown>
        </Header>

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: colorBgContainer,
            minHeight: "calc(100vh - 112px)",
            borderRadius: 8,
            boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}