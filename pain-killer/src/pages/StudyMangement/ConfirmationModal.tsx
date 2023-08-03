import React from 'react';
import Out  from '../../img/Close_24px.svg'
import { Link } from 'react-router-dom';
const ConfirmationModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white w-80 p-6 rounded-lg">
        <div className="flex justify-end"> 
          <button className="text-gray-500" onClick={onClose}>
          <img src={Out}/>
          </button>
        </div>
        <div className="text-center">
          <p className=" mb-2 text-Gray-900 font-bold text-lg">저장 완료</p>
          <p className="mb-7">새로운 수강권이 생성되었습니다</p>
          <div className="flex justify-center w-full">
            <Link to="/studylist">
            <button className="mr-2 bg-Gray-100 text-bs lack px-4 py-2 rounded w-40 hover:bg-Pri-500 hover:text-bswhite" type="button">확인</button>
            </Link>
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
