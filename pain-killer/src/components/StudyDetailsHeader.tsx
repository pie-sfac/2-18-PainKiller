import BackImage from '../img/Back_24px.svg';
import More from '../img/More vert.svg';
import { useState } from 'react';
import SalesEndModal from '../pages/StudyMangement/SalesEndModal'

interface StudyDetailsHeaderProps {
  onDeleteTicket: () => void;
  onEditTicket: () => void;
  onToggleActivation: () => void; // 수강권 활성화/비활성화를 처리하는 새로운 함수
  isTicketActive: boolean;

}

export default function StudyDetailsHeader({
  onDeleteTicket,
  onEditTicket,
  onToggleActivation,
  isTicketActive,
}: StudyDetailsHeaderProps) {
  const [showOptions, setShowOptions] = useState(false);
  const [showSalesEndModal, setShowSalesEndModal] = useState(false);

  const handleMoreClick = () => {
    setShowOptions(!showOptions);
  };



  const handleToggleActivation = () => {
    setShowSalesEndModal(true);
  };

  const handleSalesEndModalClose = (confirmed: boolean) => {
    if (confirmed && isTicketActive) {
      onToggleActivation(false);
    }
    setShowSalesEndModal(false);
  };



  return (
    <header className="bg-white border-b border-t-neutral-100">
      <nav className="flex p-5 justify-between items-center">
        <div className="flex justify-between">
          <img src={BackImage} alt="Back" />
          <p className="text-lg ml-2">수강권 생성</p>
        </div>
        <div className="relative">
          <button onClick={handleMoreClick}>
            <img src={More} alt="More" />
          </button>
          {showOptions && (
            <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-md w-[228px] ">
              <ul>
                <li className="px-6 py-4 text-left">
                  <button onClick={onEditTicket} >편집</button>
                </li>
                <li className="px-6 py-4 text-left">
                  {/* "isTicketActive" 값을 기준으로 "수강권 활성화" 또는 "판매종료" 버튼을 렌더링 */}
                  {isTicketActive ? (
                    <button onClick={handleToggleActivation}>판매종료</button>
                  ) : (
                    <button onClick={() => onToggleActivation(true)}>수강권 활성화</button>
                  )}
                </li>
                <li className="px-6 py-4 text-left">
                  <button onClick={onDeleteTicket}>수강권 삭제</button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
      {showSalesEndModal && (
        <SalesEndModal
          isOpen={showSalesEndModal}
          onClose={handleSalesEndModalClose}
        />
      )}
    </header>
  );
}
