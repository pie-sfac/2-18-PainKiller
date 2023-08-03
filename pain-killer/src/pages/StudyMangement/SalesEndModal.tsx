import React from 'react';
import Out  from '../../img/Close_24px.svg'
interface SalesEndModalProps {
  isOpen: boolean;
  onClose: (confirmed: boolean) => void;
}

const SalesEndModal: React.FC<SalesEndModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onClose(true); // 판매종료 확인
  };

  const handleCancel = () => {
    onClose(false); // 판매종료 취소
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white w-80 p-6 rounded-lg">
        <div className="flex justify-end"> 
          <button className="text-gray-500" onClick={onClose}>
          <img src={Out}/>
          </button>
        </div>
        <div className="text-center">
          <p className=" mb-2 text-Gray-900  font-extrabold text-lg">수강권 판매 종료</p>
          <p>해당 수강권을 판매종료하시겠습니까?</p>
          <p className="mb-7">새로운 회원에게 부여할 수 없습니다</p>
          <div className="flex justify-center w-full">
            
          <button onClick={handleCancel} className="mr-2 bg-Gray-100 text-bs lack px-4 py-2 rounded w-40 hover:bg-Pri-500 hover:text-bswhite">취소</button>
          <button className="mr-2 bg-Gray-100 text-bs lack px-4 py-2 rounded w-40 hover:bg-Pri-500 hover:text-bswhite" onClick={handleConfirm}>확인</button>
            
          
          </div>
        </div>
      </div>
    </div>
  );
};



export default SalesEndModal;
