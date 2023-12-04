import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { login } from "../../Services/lead";
import Cookies from "js-cookie";
import pic from "../../Assets/Images/Anh-Admin.jpg";

function Login(props) {
  const navgate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onFinish = (values) => {
    setLoading(true);
    login(values)
      .then((res) => {
        if (res?.data?.success === true) {
          Cookies.set("jwt", res?.data?.data?.jwt);
          message.success("Đăng nhập thành công");
          setLoading(false);
        }
        if (res?.data?.success === false) {
          navgate("/");
          message.error("Hết phiên đăng nhập");
        }
        const checkPermission = res?.data?.data?.roles?.at(0);
        if (checkPermission === "ADMIN") {
          navgate("/adminpage/user");
        } else {
          navgate("/adminpage/customer");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="relative flex h-[100vh]">
      <div>
        <img src={pic} alt="" className="w-[42rem] h-[43rem] " />
      </div>
      <Form
        className="login_form"
        onFinishFailed={onFinishFailed}
        onFinish={onFinish}
      >
        <h1 className="text-35 mb-10">Đăng Nhập</h1>
        <Form.Item
          name="username" // cần thay đổi theo request của be
          rules={[
            {
              required: true,
              message: "Tên tài khoản tối thiểu 6 ký tự",
            },
          ]}
        >
          <Input
            className="input"
            prefix={<UserOutlined />}
            placeholder="Tên tài khoản"
          />
        </Form.Item>
        <Form.Item
          name="password" // cần thay đổi theo request của be
          rules={[
            {
              required: true,
              message: "Mật khẩu phải tối thiểu 6 - 20 ký tự ",
            },
          ]}
        >
          <Input.Password
            className="input"
            prefix={<LockOutlined />}
            type="Mật khẩu"
            placeholder="Mật khẩu"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="button"
            loading={loading}
          >
            Đăng nhập
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            type="link"
            className="login-form-forgot"
            onClick={() => navgate("/forgotpassword")}
          >
            Quên mật khẩu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
