import React from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
const { Header, Content, Footer } = Layout;
import { useNavigate } from "react-router-dom";

const navigation = [
  { label: "Home", key: 1, target: "/" },
  { label: "Reports", key: 2, target:"/reports" },
  { label: "Create Report", key: 3, target:"/report/create" },
];

function MainLayout({ children }) {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = ({ key }) => {
    const { target } = navigation.find(item => item.key == key) || {};
    console.log(target)
    if (target) {
      navigate(target);
    }
  };
  return (
    <Layout
      style={{
        width: "100vw",
        minHeight: "100vh",
      }}
    >
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={navigation}
          style={{
            flex: 1,
            minWidth: 0,
          }}
          onClick={handleMenuClick}
        />
      </Header>
      <Content
        style={{
          padding: '0 48px',
        }}
      >
        {children}
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Threat Matrix ©{new Date().getFullYear()} Created by AKM TEAM
      </Footer>
    </Layout>
  );
}

export default MainLayout;
