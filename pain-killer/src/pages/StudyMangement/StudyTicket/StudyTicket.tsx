import StudyTicketHeader from './StudyTicketHeader';
import Tiket from '../../../img/Tiket_ac.svg';

export default function StudyTicket() {
  return (
    <>
      <StudyTicketHeader />
      <div>
        <div className="flex justify-between items-center">
          <p className="text-Gray-800 font-extrabold text-lg mt-6">수강권</p>
        </div>

        <div className="flex justify-start mt-6 mb-4">
          {/* 판매중 버튼 */}
          <button className="py-2 px-3 font-semibold text-Pri-300 border-b-2 border-Pri-300">
            이용중 ()
          </button>
          {/* 판매종료 버튼 */}
          <button className="py-2 px-3 font-semibold text-Gray-300 border-b-2 border-Gray-300">
            종료됨 ()
          </button>
        </div>

        <div className="flex">
          <div className="border border-Gray-200 rounded-l-xl p-6">
            <div>
              <div className="flex justify-between items-center">
                <p className="text-left truncate font-semibold">
                  [이벤트 특가] 설맞이 30% 할인
                </p>
                <img src={Tiket} alt="티켓 아이콘" />
              </div>
            </div>
              <p className="text-left bg-Pri-50 text-xs px-2 py-1 rounded text-Pri-500 w-[83px]">
                개인수업 - 1:1
              </p>
            <div className="flex justify-between items-start flex-col mt-10">
              <div>
                <p className="text-left">
                  <span className="text-Gray-400 mr-6">잔여횟수</span> 2회
                </p>
                <p className="text-left">
                  <span className="text-Gray-400 mr-2">유효기간</span>
                  2022/08/22 - 2023/08/22
                </p>
              </div>
            </div>
          </div>
          <div className="bg-Pri-50 border border-Gray-200 rounded-r-xl p-6 flex flex-col items-center justify-between">
            <button className="text-Pri-500 mb-3">수강권 일시중단</button>
            <button className="text-Pri-500 mb-3">수강권 양도</button>
            <button className="text-Pri-500">환불</button>
          </div>
        </div>
      </div>
    </>
  );
}
