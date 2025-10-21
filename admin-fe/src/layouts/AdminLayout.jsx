import { Layout, Menu } from "antd";
import { Link, Outlet } from "react-router-dom";

const { Header, Sider, Content } = Layout;

export default function AdminLayout() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible>
        <div style={{ color: "#fff", padding: 16, textAlign: "center", fontWeight: "bold" }}>
          ADMIN
        </div>
        <Menu theme="dark" mode="inline">
          <Menu.Item key="1"><Link to="/admin/dashboard">Dashboard</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/admin/products">Sản phẩm</Link></Menu.Item>
          <Menu.Item key="3"><Link to="/admin/orders">Đơn hàng</Link></Menu.Item>
          <Menu.Item key="4"><Link to="/admin/users">Người dùng</Link></Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Header style={{ background: "#fff", textAlign: "right", paddingRight: 20 }}>
          Xin chào, Admin
        </Header>
        <Content style={{ margin: 16 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}