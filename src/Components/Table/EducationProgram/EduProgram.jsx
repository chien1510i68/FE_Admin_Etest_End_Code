import {
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  FilterOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { PageContainer, useEditableArray } from "@ant-design/pro-components";
import { Button, Drawer, Input, Modal, Popover, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import FilterEdu from "../../FormFilter/FilterEdu";
import AddEditEp from "../../AddEdit/AddEditEP/AddEditEp";
import { dataSourceEP } from "../DataDemo";
import {
  delAllService,
  deleteService,
  filterService,
  getListService,
} from "../../../Services/lead";
import { useNavigate } from "react-router-dom";
import DetailEdu from "../../Details/DetailEdu/DetailEdu";
import FilterService from "../../FormFilter/FilterEdu";

function EduProgram(props) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [openDrawer, setOpenDrawer] = useState();
  const [searchData, setSearchData] = useState();
  const [currentEP, setCurrentEP] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [openModal, setOpenModal] = useState();
  const [data, setData] = useState([]);
  const { confirm } = Modal;
  const navigate = useNavigate();

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const showhowConfirm = () => {
    confirm({
      title: "Xoá chương trình học ",
      content:
        "Việc này sẽ xóa chương trình học được chọn. Bạn có chắc chắn muốn xóa?",
      onOk: handleDeleteAll,
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const hide = () => {
    setClicked(false);
  };

  const handleClick = (open) => {
    setClicked(open);
  };

  const hasSelected = selectedRowKeys.length > 0;
  const handleDeleteAll = () => {
    delAllService(selectedRowKeys)
      .then((res) => {
        if (res?.data?.success === true) {
          handleGetEP();
          setSelectedRowKeys([]);
        }
      })
      .catch((error) => {
        console.error("Lỗi xóa người dùng", error);
      });
  };

  // getALl
  const handleGetEP = () => {
    getListService().then((res) => {
      setData(res?.data?.data?.items);
    });
  };

  // Hàm xóa từng người dùng
  const handleDelete = (userId) => {
    deleteService(userId).then((res) => {
      if (res.status === 200) {
        handleGetEP();
      }
    });
  };

  // Lọc từ bảng service các dữ liệu thuộc EP
  const dataED = data.filter(
    (Edu) =>
      Edu.typeOfService === "EDUCATION_PROGRAM" ||
      Edu.typeOfService === "COURSE"
  );

  const handleSearch = (e) => {
    setSearchData(e.target.value);
  };

  const handleSearchEdu = (values) => {
    filterService({
      name: values,
    }).then((res) => {
      if (res.status === 200) {
        setData(res?.data?.data?.items);
      }
    });
  };

  // Hàm lọc người dùng
  const handleFilter = (values) => {
    console.log("values:: ", values);
    filterService(values).then((res) => {
      console.log("res", res);
      if (res?.status === 200) {
        setData(res?.data?.data?.items);
      }
    });
  };

  // console.log("dataED", dataED);
  useEffect(() => {
    handleGetEP();
  }, []);

  const columns = [
    {
      title: "Tên chương trình học",
      dataIndex: "name",
    },
    {
      title: "Lịch học",
      dataIndex: "schedule",
    },
    {
      title: "Số buổi",
      dataIndex: "numberTeachingSessions",
    },

    {
      title: "Hình thức học",
      dataIndex: "learningForm",
    },
    {
      title: "Loại dịch vụ",
      dataIndex: "typeOfService",
    },

    {
      title: "Action",
      key: "action",
      render: (e, record, idx) => (
        <Space>
          <Button
            className="update"
            icon={<EditOutlined />}
            onClick={() => {
              setCurrentEP(record);
              setOpenModal(true);
            }}
          ></Button>
          {/* <Button
            className="delete"
            icon={<DeleteOutlined />}
            onClick={() => {
              handleDelete(record.id);
            }}
          ></Button> */}
          <Button
            className="detail"
            icon={<SolutionOutlined />}
            onClick={() => {
              setOpenDrawer(true);
              navigate(`/adminpage/eduprogram/detaileduprogram/${record.id}`);
            }}
          ></Button>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <PageContainer
        title="Các chương trình Anh ngữ"
        extra={[
          // <Button
          //   className="bg-1677ff text-white hover:bg-white"
          //   onClick={() => {
          //     setOpenModal(true);
          //   }}
          // >
          //   + Thêm chương trình
          // </Button>,
          <Input.Search
            placeholder="Nhập tên chương trình"
            onChange={handleSearch}
            value={searchData}
            onSearch={(values) => {
              handleSearchEdu(values);
            }}
          />,
          <Popover
            content={
              <FilterService
                onSearch={(values) => {
                  handleFilter(values);
                }}
                hide={hide}
              />
            }
            trigger="click"
            open={clicked}
            onOpenChange={handleClick}
          >
            <Button className="border-1677ff text-1677ff">
              <FilterOutlined />
              Lọc
            </Button>
          </Popover>,
        ]}
      >
        {/* Thêm + cập nhật chương trình */}
        <AddEditEp
          onSuccess={() => {
            handleGetEP();
            setOpenModal(false);
          }}
          openModal={openModal}
          onOpenChange={(open) => {
            if (!open) {
              setOpenModal(false);
              setCurrentEP({});
            }
          }}
          data={currentEP}
        />
        <Table
          rowSelection={rowSelection}
          rowKey={"id"}
          columns={columns}
          pagination={{
            pageSize: 5,
          }}
          dataSource={dataED}
          size="middle"
        />
        <Drawer
          title="Thông tin chi tiết chương trình học"
          width={600}
          open={openDrawer}
          onClose={() => {
            navigate("/adminpage/eduprogram");
            setOpenDrawer(false);
          }}
        >
          <DetailEdu />
        </Drawer>
        <div
          className="absolute bottom-6"
          style={{ display: hasSelected ? "block" : "none" }}
        >
          <>Đã chọn {selectedRowKeys.length}</>
          <Button
            className="bg-white ml-2.5 py-1 px-2.5"
            onClick={() => {
              showhowConfirm();
            }}
            disabled={selectedRowKeys.length === 0}
          >
            <CloseOutlined />
            Xoá
          </Button>
        </div>
      </PageContainer>
    </div>
  );
}

export default EduProgram;
