import React from 'react';
import { useState } from 'react';

const CheckboxBox = ({ text, checked, onChange }) => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg flex items-center w-96 mb-2">
      <input
        type="checkbox"
        className="mr-4"
        checked={checked}
        onChange={onChange}
      />
      <span className="font-medium">{text}</span>
      {text !== '전체동의' && <a href="#" className="ml-auto text-bsblack hover:underline">약관보기</a>}
    </div>
  );
};

const Agree = () => {
  const [allChecked, setAllChecked] = useState(false);
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);
  const [isChecked4, setIsChecked4] = useState(false);

  const handleAllCheck = () => {
    setAllChecked(!allChecked);
    setIsChecked1(!allChecked);
    setIsChecked2(!allChecked);
    setIsChecked3(!allChecked);
    setIsChecked4(!allChecked);
  };

  return (
    <div className=" flex flex-col items-center justify-center ">
      <h2 className=" text-xl font-bold mb-4 mt-14">직원등록</h2>
      <p className='font-semibold text-left  mb-4'>직원 약관동의</p>
      <CheckboxBox
        text="전체동의"
        checked={allChecked}
        onChange={handleAllCheck}
      />
      <CheckboxBox text="[필수] CRM서비스 이용약관" checked={isChecked1} onChange={() => setIsChecked1(!isChecked1)} />
      <CheckboxBox text="[필수] 회원정보 이용약관 동의" checked={isChecked2} onChange={() => setIsChecked2(!isChecked2)} />
      <CheckboxBox text="[필수] 푸쉬알림 동의" checked={isChecked3} onChange={() => setIsChecked3(!isChecked3)} />
      <CheckboxBox text="[필수] 마케팅 수신 동의" checked={isChecked4} onChange={() => setIsChecked4(!isChecked4)} />
      <button className=" mt-32 px-5 py-3 bg-Gray-100 text-Gray-400 rounded-lg  hover:bg-Pri-500 hover:text-bswhite w-72">
        확인
      </button>
    </div>
  );
};

export default Agree;
