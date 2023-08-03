import RegModalHeader from "../../components/RegModalHeader";
import React from 'react';
import Out  from '../../img/Close_24px.svg'


const RegModal3 = ({ onClose }) => {
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
          <p className="mb-4">발송완료</p>
        
          <div className="flex justify-center w-full">
            <button className="mr-2 bg-Gray-100 text-bs lack px-4 py-2 rounded w-full">예</button>
            
          </div>
        </div>
      </div>
    </div>
    </>
  );
};




export default RegModal3;