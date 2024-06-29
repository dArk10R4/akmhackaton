import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import CreateReport from "./pages/Report/CreateReport";

import Home from "./pages/Home";
import "./App.css";
import Login from "./pages/Login";
import ReportList from "./pages/Report/ReportList";
import ReportDetail from "./pages/Report/ReportDetail";

function App() {
  return (
    <>
      <Routes>
        <>
          <Route
            path="/"
            element={
              <MainLayout>
                <Home />
              </MainLayout>
            }
          />
        </>
        <Route
          path="/report/create"
          element={
            <MainLayout>
              <CreateReport />
            </MainLayout>
          }
        />
        <Route
          path="/reports"
          element={
            <MainLayout>
              <ReportList />
            </MainLayout>
          }
        />
        <Route
          path="/reports/:reportId"
          element={
            <MainLayout>
              <ReportDetail />
            </MainLayout>
          }
        />

        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

// const App = () => {
//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();
//   return (
//     <Layout>
//       <Header
//         style={{
//           position: "sticky",
//           top: 0,
//           zIndex: 1,
//           width: "100%",
//           display: "flex",
//           alignItems: "center",
//         }}
//       >
//         <div className="demo-logo" />
//         <Menu
//           theme="dark"
//           mode="horizontal"
//           defaultSelectedKeys={["2"]}
//           items={items}
//           style={{
//             flex: 1,
//             minWidth: 0,
//           }}
//         />
//       </Header>
//       <Content
//         style={{
//           padding: "0 48px",
//         }}
//       >
//         <Breadcrumb
//           style={{
//             margin: "16px 0",
//           }}
//         >
//           <Breadcrumb.Item>Home</Breadcrumb.Item>
//           <Breadcrumb.Item>List</Breadcrumb.Item>
//           <Breadcrumb.Item>App</Breadcrumb.Item>
//         </Breadcrumb>
//         <div
//           style={{
//             padding: 24,
//             minHeight: 380,
//             background: colorBgContainer,
//             borderRadius: borderRadiusLG,
//           }}
//         >
//           Content
//         </div>
//       </Content>
//       <Footer
//         style={{
//           textAlign: "center",
//         }}
//       >
//         Ant Design ©{new Date().getFullYear()} Created by Ant UED
//       </Footer>
//     </Layout>
//   );
// };

export default App;
