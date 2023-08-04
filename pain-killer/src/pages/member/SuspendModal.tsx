import React from 'react';
import Out  from '../../img/Close_24px.svg'

interface SuspendModalProps {
  show: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const SuspendModal: React.FC<SuspendModalProps> = ({
  show,
  onConfirm,
  onCancel,
  
}) => {

  const onClose = () => {
    onCancel(); 
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white w-80 p-6 rounded-lg">
        <div className="flex justify-end">
          <button className="text-gray-500" onClick={onClose}>
            <img src={Out} />
          </button>
        </div>
        <div className="text-center">
          <p className=" mb-2 text-Gray-900 font-bold text-lg">
            수강권 일시중단
          </p>
          <p>해당 수강권을 일시중단하시겠습니까?</p>
          <p>기존 예약이 취소되고,</p>
          <p className='mb-7'>신규 예약이 제한됩니다.</p>
          <div className="flex justify-center w-full">
            <button
              onClick={onCancel}
              className="mr-2 bg-Gray-100 text-bs lack px-4 py-2 rounded w-40 hover:bg-Pri-500 hover:text-bswhite"
              type="button"
            >
              아니요
            </button>
            <button
              onClick={onConfirm}
              className="mr-2 bg-Gray-100 text-bs lack px-4 py-2 rounded w-40 hover:bg-Pri-500 hover:text-bswhite"
              type="button"
            >
              예, 일시중단
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuspendModal;
