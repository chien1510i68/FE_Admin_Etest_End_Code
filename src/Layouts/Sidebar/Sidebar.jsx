import React, { useEffect, useState } from "react";
import {
  TeamOutlined,
  ReadOutlined,
  ScheduleOutlined,
  CalendarOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu } from "antd";
import { getProfileUser } from "../../Services/lead";
import logo from "../../Assets/Images/logo-admin.jpg";

function Sidebar(props) {
  const [data, setData] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const handleGetProfileUser = () => {
    getProfileUser().then((res) => {
      setData(res?.data?.data);
    });
  };
  useEffect(() => {
    handleGetProfileUser();
  }, []);

  const checkPermission = data?.role?.roleId === "ADMIN";

  const checkPathname = () => {
    const pathname = location.pathname;
    if (pathname.includes("/adminpage/user")) {
      return "1";
    }
    if (pathname.includes("/adminpage/staff")) {
      return "2";
    }
    if (pathname.includes("/adminpage/customer")) {
      return "3";
    }
    if (pathname.includes("/adminpage/eduprogram")) {
      return "4";
    }
    if (pathname.includes("/adminpage/consultingRegister")) {
      return "5";
    }
    if (pathname.includes("/adminpage/examschedule")) {
      return "6";
    }
    if (pathname.includes("/adminpage/reviewschedule")) {
      return "7";
    }
    if (pathname.includes("/adminpage/news")) {
      return "8";
    }
    if (pathname.includes("/adminpage/document")) {
      return "9";
    }
    if (pathname.includes("/adminpage/displayhome")) {
      return "10";
    }
    if (pathname.includes("/adminpage/displaypages")) {
      return "11";
    }
    if (pathname.includes("/adminpage/displayprogram")) {
      return "12";
    }
  };
  const items = [
    {
      label: "Quản lý người dùng",
      key: "user",
      icon: <TeamOutlined />,
      children: [
        checkPermission
          ? {
              label: "Tất cả người dùng",
              key: "1",
              onClick: () => {
                navigate("/adminpage/user");
              },
            }
          : undefined,
        checkPermission
          ? {
              label: "Nhân viên",
              key: "2",
              onClick: () => {
                navigate("/adminpage/staff");
              },
            }
          : undefined,
        {
          label: "Khách hàng",
          key: "3",
          onClick: () => {
            navigate("/adminpage/customer");
          },
        },
      ],
    },
    {
      label: "Chương trình Anh ngữ",
      key: "4",
      icon: <ReadOutlined />,
      onClick: () => {
        navigate("/adminpage/eduprogram");
      },
    },
    {
      label: "Đăng ký tư vấn",
      key: "5",
      icon: <ReadOutlined />,
      onClick: () => {
        navigate("/adminpage/consultingRegister");
      },
    },
    {
      label: "Lịch thi",
      key: "6",
      icon: <ScheduleOutlined />,
      onClick: () => {
        navigate("/adminpage/examschedule");
      },
    },
    {
      label: "Lịch ôn tập",
      key: "7",
      icon: <CalendarOutlined />,
      onClick: () => {
        navigate("/adminpage/reviewschedule");
      },
    },
    {
      label: "Tin tức",
      key: "8",
      icon: <FileTextOutlined />,
      onClick: () => {
        navigate("/adminpage/news");
      },
    },
    {
      label: "Tài liệu",
      key: "9",
      icon: <ReadOutlined />,
      onClick: () => {
        navigate("/adminpage/document");
      },
    },
    {
      label: "Thi thử ",
      key: "mocktest",
      icon: <TeamOutlined />,
      children: [
        {
          label: "Quản lý đề thi",
          key: "11",
          icon: <FileTextOutlined />,
          onClick: () => {
            navigate("/adminpage/infor-exam");
          },
        },
        {
          label: "Quản lý bài thi",
          icon: <FileTextOutlined />,
          key: "12",
          onClick: () => {
            navigate("/adminpage/user-test");
          },
        },
        {
          label: "Thống kê",
          icon: <FileTextOutlined />,
          key: "13",
          onClick: () => {
            navigate("/adminpage/statistics");
          },
        },
      ],
    },
    {
      label: "Quản lý hiện thị",
      key: "display",
      icon: <ReadOutlined />,
      children: [
        {
          label: "Trang chủ",
          key: "10",
          onClick: () => {
            navigate("/adminpage/displayhome");
          },
        },
        {
          label: "Pages",
          key: "11",
          onClick: () => {
            navigate("/adminpage/displaypages");
          },
        },
        {
          label: "Chương trình",
          key: "12",
          onClick: () => {
            navigate("/adminpage/displayprogram");
          },
        },
      ],
    },
    
  ];
  return (
    <div>
      <div className="p-2.5 m-2.5 bg-white " >
        <img src={logo} alt="" className="w-[4rem] ml-[4rem] h-[5rem] " />
      </div>
      <Menu
        theme="dark"
        mode="inline"
        // className="h-full"
        items={items}
        defaultSelectedKeys={checkPathname}
        defaultOpenKeys={["user"]}
      />
    </div>
  );
}

export default Sidebar;
