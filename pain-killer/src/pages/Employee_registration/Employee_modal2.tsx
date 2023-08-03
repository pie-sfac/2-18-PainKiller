import RegModalHeader from "../../components/RegModalHeader";
import React from 'react';
import Out  from '../../img/Close_24px.svg'


const RegModal2 = ({ onClose }) => {
  return (
    <>
    <RegModalHeader></RegModalHeader>
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white w-80 p-6 rounded-lg">
        <div className="flex justify-end"> 
          <button className="text-gray-500" onClick={onClose}>
          <img src={Out}/>
          </button>
        </div>
        <div className="text-center">
          <p className="mb-4">계정 정보 전달</p>
          <p>서비스 사용을 위해</p>
          <p className="mb-6">계정정보 전달이 필요합니다</p>
          <div className="flex justify-center w-full">
            <button className="mr-2 bg-Gray-100 text-bs lack px-4 py-2 rounded w-full">예</button>
            <button className="bg-Pri-500  text-bswhite px-4 py-2 rounded w-full">지금 전달하기 </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};




export default RegModal2;