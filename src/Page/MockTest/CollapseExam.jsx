import React, { useContext, useEffect, useState } from "react";
import { Button, Collapse, Popconfirm, message, notification } from "antd";
import {
  deleteExam,
  deleteQuestion,
  deleteSection,
  getDataExam,
} from "../../Services/APImocktest";
import {
  DeleteFilled,
  EditFilled,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { AppContext } from "../../Components/AppContext/AppContext";
import ModalEditExam from "../../Components/Modal/ModalEditExam";
import ModalEditSection from "../../Components/Modal/ModalEditSection";
import ModalEditQuestion from "../../Components/Modal/ModalEditQuestion";
import ModalAddQuestionToSection from "../../Components/Modal/ModalAddQuestionToSection";
import { useNavigate } from "react-router-dom";

function CollapseExam({ dataItems }) {
  const { data, dispatch } = useContext(AppContext);
  const [items, setItems] = useState();
  const [idExam, setIdExam] = useState(null);
  const [dataExam, setDataExam] = useState(null);
  const [dataQuestion, setDataQuestion] = useState(null);
  const [listAnswer, setListAnswer] = useState(null);

  const [idSection, setIdSection] = useState(null);
  const [sectionTitle, setSectionTitle] = useState(null);
  const [dataSection, setDataSection] = useState(null);
  const [isDeletedQuestion, setIsDeletedQuestion] = useState(false);
  const [isDeletedSection, setIsDeletedSection] = useState(false);
  const [isDeletedExam, setIsDeletedExam] = useState(false);
  const [listExam, setListExam] = useState([]);
  const navigate = useNavigate();
  const {isUpdateExam} = data

  console.log("dataItems : ", dataItems);
  const handleGetDataExam = async () => {
    const res = getDataExam();

    if (res?.data?.success === true) {
      setListExam(res?.data?.data?.items);
      console.log("listExam", listExam);
      handleSetItems(res?.data?.data?.items);
    }
  };

  const handleAddQuestionInSection = (id, title) => {
    dispatch({ type: "openModalCreateQuestionInSection" });
    setIdSection(id);
    setSectionTitle(title);
  };
  const handleAddExam = () => {
    notification.success({ message: "Clicked" });
  };

  const handleEditExam = (id, item) => {
    console.log(id);
    setIdExam(id);
    setDataExam(item);
    dispatch({ type: "openModalEditExam" });
  };

  const handleEditSection = (id, item) => {
    dispatch({ type: "openModalEditSection" });
    setIdSection(id);
    setDataSection(item);
  };
  const handleEditQuestion = (question, listAnswer) => {
    dispatch({ type: "openModalEditQuestion" });
    setListAnswer(listAnswer);
    setDataQuestion(question);
    // console.log("Cau hoi va danh sach cau tra loi la " ,question , listAnswer);
  };
  const handelDeleteQuestion = (id) => {
    console.log(id);
    deleteQuestion(id)
      .then((res) => {
        if (res.data.success === true) {
          notification.success({ message: "Xóa thành công câu hỏi " });
          handleGetDataExam();
        }
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    // message.success("Xóa thành công ");
  };
  const handelDeleteSection = (id) => {
    console.log(id);
    deleteSection(id)
      .then((res) => {
        if (res.data === true) {
          notification.success({ message: "Xóa thành công phần thi " });
          handleGetDataExam();
        }
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    // message.success("Xóa thành công ");
  };
  const handelDeleteExam = (id) => {
    console.log(id);
    deleteExam(id)
      .then((res) => {
        if (res.data === true) {
          notification.success({ message: "Xóa thành công bài thi " });
          handleGetDataExam();
        }
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const cancel = (e) => {
    console.log(e);
    // message.error("Click on No");
  };
  const handleSetItems = (data) => {
    setItems(
      data &&
        data.map((item) => {
          const listSection = item.sections.map((section) => {
            const listQuestion = section.questions.map((question) => {
              const listAnswer = question.listAnswer.map((answer) => (
                <p
                  key={answer.id}
                  onClick={() => {
                    console.log(answer.id);
                  }}
                >
                  {answer.answer}
                </p>
              ));
              return {
                key: question.id,
                label: (
                  <div className="flex items-center justify-between">
                    <p
                      onClick={() => {
                        console.log(question.id);
                      }}
                    >
                      {question.content}
                    </p>
                    <div>
                      <EditFilled
                        className="mx-5"
                        onClick={() => {
                          handleEditQuestion(question, listAnswer);
                        }}
                      />
                      <Popconfirm
                        title="Delete the task"
                        placement="bottomRight"
                        description="Bạn có muốn xóa câu hỏi này ?"
                        onConfirm={() => handelDeleteQuestion(question.id)}
                        onCancel={cancel}
                        okText="Có"
                        cancelText="Không"
                      >
                        <DeleteFilled className="text-orange-900" />
                      </Popconfirm>
                    </div>
                  </div>
                ),
                collapsible: false,
                children: <div>{listAnswer}</div>,
              };
            });
            return {
              key: section.id,

              label: (
                <div className="flex items-center justify-between">
                  <p className="font-medium text-base">{section.title}</p>
                  <div>
                    <PlusCircleOutlined
                      onClick={() =>
                        handleAddQuestionInSection(section.id, section.title)
                      }
                    />
                    {/* <Button
                     className="mx-3 "
                     onClick={() => handleEditSection(section.id, section)} */}
                    {/* > */}
                    <EditFilled
                      className="mx-5"
                      onClick={() => handleEditSection(section.id, section)}
                    />
                    {/* </Button> */}
                    <Popconfirm
                      title="Delete the task"
                      placement="bottomRight"
                      description="Bạn có muốn xóa phần thi này không"
                      onConfirm={() => handelDeleteSection(section.id)}
                      onCancel={cancel}
                      okText="Yes"
                      cancelText="No"
                    >
                      <DeleteFilled className="text-orange-700  " />
                      {/* <Button> */}
                      {/* </Button> */}
                    </Popconfirm>
                  </div>
                </div>
              ),
              children: <Collapse collapsible={true} items={listQuestion} />,
            };
          });

          return {
            key: item.id,
            label: (
              <div className="flex items-center justify-between">
                <p className="font-bold text-base">{item.name}</p>
                <div>
                  <PlusCircleOutlined
                    onClick={() =>
                      navigate(`/adminpage/add-section/${item.id}`)
                    }
                  />

                  <EditFilled
                    onClick={() => handleEditExam(item.id, item)}
                    className="mx-5"
                  />
                  <Popconfirm
                    title="Delete the task"
                    description="Nếu đồng ý xóa bài thi này sẽ ảnh hưởng tới việc lưu trữ kết quả bài thi của người dùng  "
                    onConfirm={() => handelDeleteExam(item.id)}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <DeleteFilled className="text-orange-600 " />
                  </Popconfirm>
                </div>
              </div>
            ),
            children: <Collapse items={listSection} />,
          };
        })
    );
  };
  useEffect(() => {
    console.log(dataItems);
    handleSetItems(dataItems);
    // handleGetDataExam();
    if(isUpdateExam){
      handleGetDataExam()
      dispatch({type : "updateExam"})
    }
  }, [dataItems , isUpdateExam]);
  
  // if()

  const onChange = (key) => {
    console.log(key);
  };

  return (
    <div className="">
      <Collapse items={items} defaultActiveKey={["1"]} className="" />

      <ModalEditExam
        idExam={idExam}
        dataExam={dataExam}
        handleGetDataExam={handleGetDataExam}
      />
      <ModalEditSection
        idSection={idSection}
        dataSection={dataSection}
        handleGetDataExam={handleGetDataExam}
      />
      <ModalEditQuestion
        dataQuestion={dataQuestion}
        answers={listAnswer}
        handleGetDataExam={handleGetDataExam}
      />
      <ModalAddQuestionToSection
        idSection={idSection}
        title={sectionTitle}
        handleGetDataExam={handleGetDataExam}
      />
    </div>
  );
}

export default CollapseExam;
