import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../Login/login.css";
import { forgotPassword } from "../../Services/lead";

function ForgotPassword(props) {
  const navigate = useNavigate();
  const onFinish = (values) => {
    forgotPassword(values)
      .then((res) => {
        if (res.status === 200) {
          message.success("Vui lòng check emai");
        }
      })
      .finally(() => {});
  };
  return (
    <div className="relative flex">
      <div className="p-21.6 w-1/2 bg-orange-300 border border-solid border-transparent"></div>
      <Form className="login_form" onFinish={onFinish}>
        <h1 className="text-35 mb-10">Quên mật khẩu</h1>

        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              message: "E-mail không hợp lệ",
            },
            {
              required: true,
              message: "Vui lòng nhập E-mail của bạn",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined />}
            placeholder="E-mail"
            className="input"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className=" button">
            Gửi Email
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            type="link"
            onClick={() => {
              navigate("/");
            }}
            className="register"
          >
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ForgotPassword;
