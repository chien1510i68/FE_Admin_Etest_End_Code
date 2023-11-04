
import { Button, Collapse, Input, Space, Table, Tag, notification } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CollapseExam from "../MockTest/CollapseExam";
import ModalCreateExamByExcel from "../../Components/Modal/ModalCreateExamByExcel";
import { AppContext } from "../../Components/AppContext/AppContext";
import { findExamByName, getDataExam } from "../../Services/APImocktest";
const { Search } = Input;
function InforExams(props) {
  const navigate = useNavigate();
  const{data , dispatch} = useContext(AppContext)
  const [items , setItems ] = useState([])
  const [isOpenModalExcel, setIsOpenModalExcel] = useState(false);
  const {isUpdateExam} = data
  const {isOpenModalCreateExamByExcel} = data
  const onSearch = (value) => {
    findExamByName(value).then((res)=>{
      if(res?.data?.body?.success === true && res?.data?.body?.data?.total!= 0){
        console.log(res?.data?.body?.data?.total);
       setItems(res?.data?.body?.data?.items)
      }else{
        notification.error({message : "Khoong co bai thi nao phu hop"})
        handleGetDataExam()
      }
    }).catch((err) =>{
      console.log(err);
    
    })
  };

  const handleGetDataExam =  () => {
   getDataExam().then((res) =>{
    console.log("data" , res?.data?.data?.items);
    setItems(res?.data?.data?.items)
    
   })}

   useEffect(() =>{
    if(isUpdateExam){
      handleGetDataExam();
      dispatch({type : "setUpdateExam"})
    }
   },[isUpdateExam])
   useEffect(() =>{
      handleGetDataExam();
   },[])

    

  return (
    <div className="px-[5%] bg-white">
      <div className="grid grid-cols-3 gap-12  pt-10 mb-20">
        {/* <Button
          className="uppercase col-span-1 font-medium text-white bg-teal-400 mr-[1%]"
          onClick={handleGetDataExam}
        >
          Quay lại{" "}
        </Button> */}
        <Button
          className="uppercase col-span-1 font-medium text-white bg-teal-400 mr-[1%]"
          onClick={() => navigate("/adminpage/contest")}
        >
          Tạo bài thi mới{" "}
        </Button>
        <Button
          className="uppercase col-span-1 font-medium text-white bg-teal-400 mr-[1%]"
          onClick={() =>  dispatch ({type : "openModalCreateExamByExcel"})}
        >
          tạo bài thi bằng excel
        </Button>
        <Search
      placeholder="Tìm kiếm tên bài thi "
      allowClear
      enterButton="Search"
      className="col-span-1 "
      // size="large"
      onSearch={onSearch}
    />
      </div>
      <CollapseExam dataItems = {items} />
      <ModalCreateExamByExcel isOpenModalExcel={isOpenModalExcel} />
    </div>
  );
}

export default InforExams;
