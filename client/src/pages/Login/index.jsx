import React, { useEffect, useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import authService from "../../services/authService";
import axios from "axios";
export default function Login() {
  var [message, setMesage] = useState("");
  let navigate = useNavigate();
  async function HandleSubmit(e) {
    e.preventDefault();
    let postData = { username: e.target[1].value, password: e.target[3].value };
    try {
      navigate("/");
    } catch (error) {
      const errorMessage = error.response.data.message;
      setMesage(errorMessage);
    }

    // let data  = await fetch('http://localhost:8080/signin',{method:'POST',headers: {
    //   "Content-Type": "application/json",
    //   "Access-Control-Allow-Origin": "*",
    // },body:JSON.stringify({
    //   'username': e.target[1].value,
    //   'password': e.target[3].value,

    // }),credetials: 'include'});
  }

  const onFinish = async (values) => {
    const { username, password } = values;

    try {
      const response = await authService.login(username, password);
      console.log(response);
      navigate("/");
    } catch (error) {
      console.error(error);
      setMesage("Invalid credentials");
    }
    console.log("Received values of form: ", values);
  };
  return (
    <div className="flex place-items-center justify-center items-center h-screen w-full">
      <div className="loginContainer  shadow-lg p-10 rounded-xl">
        {/* loginpage
      <ul>
        <li>
          {" "}
        
        </li>

        <li>
          
        </li>
      </ul> */}
        <div className="logo_side mb-10">
          <h1>Threat Matrix. </h1>
        </div>
        <div className="login_side">
          <div className="login-container">
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please input your Username!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <a className="login-form-forgot" href="">
                  Forgot password
                </a>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Log in
                </Button>
                Or <a href="">register now!</a>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
