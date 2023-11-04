import React, { useEffect, useState } from "react";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Avatar, Drawer, Dropdown, Space } from "antd";
import { useNavigate } from "react-router-dom";
import RecordUser from "../../Components/RecordUser/RecordUser";
import Cookies from "js-cookie";
import { getProfileUser } from "../../Services/lead";

function HeaderEtest(props) {
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState();
  const [data, setData] = useState({});

  const handleGetProfileUser = () => {
    getProfileUser().then((res) => {
      setData(res?.data?.data);
    });
  };
  useEffect(() => {
    handleGetProfileUser();
  }, []);

  const checkPermission = data?.role?.roleId === "ADMIN";

  const items = [
    {
      icon: <UserOutlined />,
      label: "Hồ sơ",
      key: "1",
      onClick: () => {
        setOpenDrawer(true);
        navigate("/adminpage/user/recorduser");
      },
    },
    {
      icon: <LogoutOutlined />,
      label: "Đăng xuất",
      key: "2",
      onClick: () => {
        navigate("/");
        Cookies.remove("jwt");
      },
    },
  ];

  return (
    <div className="flex justify-between ">
      <h1 className="font-sans text-xl font-medium pt-2 ">{`Xin chào ${
        checkPermission ? "ADMIN" : "STAFF"
      } 👋🏼`}</h1>
      <div>
        <Dropdown menu={{ items }} trigger={["click"]}>
          <Space>
            <Avatar
              style={{ backgroundColor: "#1677FF" }}
              icon={<UserOutlined />}
            />
            {`${checkPermission ? "ADMIN" : "STAFF"}`}
          </Space>
        </Dropdown>
        <Drawer
          title="Thông tin chi tiết của người dùng"
          width={500}
          open={openDrawer}
          onClose={() => {
            setOpenDrawer(false);
            navigate("/adminpage/user");
          }}
        >
          <RecordUser />
        </Drawer>
      </div>
    </div>
  );
}

export default HeaderEtest;
