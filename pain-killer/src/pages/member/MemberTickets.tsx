import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import BackImage from '../../img/Back_24px.svg';
import instance from '../../api/axios_interceptors';

interface IIssuedTicket {
  id: number;
  lessonType: string;
  title: string;
  startAt: string;
  endAt: string;
  remainingCount: number;
  defaultCount: number;
  serviceCount: number;
  availableReservationCount: number;
  defaultTerm: number;
  defaultTermUnit: string;
  isSuspended: boolean;
  suspendedAt: string;
  isCanceled: boolean;
  canceledAt: string;
  createdAt: string;
  updatedAt: string;
}

const MemberTickets = () => {
  const { memberId } = useParams();

  const navigate = useNavigate();
  const onPrevious = () => {
    navigate(-1);
  };

  // 해당 회원에게 부여된 수강권 담을 배열
  const [memTickets, setMemtickets] = useState<IIssuedTicket[]>([]);
  const [inUseTickets, setInUseTickets] = useState();
  // 현재 눌린 버튼 상태
  const [activeButton, setActiveButton] = useState('INUSE');
  const [inUseCount, setInUseCount] = useState(0);
  const [endedCount, setEndedCount] = useState(0);

  // 이용중 버튼 클릭 시 이벤트 핸들러
  const handleInUseClick = () => {
    setActiveButton('INUSE');
  };
  // 종료됨 버튼 클릭 시 이벤트 핸들러
  const handleEndedClick = () => {
    setActiveButton('ENDED');
  };

  // 회원 수강권 조회 api
  const getMemTickets = async () => {
    const response = await instance.get(`/members/${memberId}/issued-tickets`);

    setMemtickets(response.data.issuedTickets);
    setInUseTickets(response.data.remainingCount);

    // console.log(response);
  };

  useEffect(() => {
    getMemTickets();
  }, []);

  console.log(memberId);

  return (
    <div>
      <header className="bg-white border-b border-t-neutral-100">
        <nav className="flex p-5 justify-between">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={onPrevious}
          >
            <img src={BackImage} alt="Back" />
            <p className="text-lg ml-2">수강권</p>
          </div>
          <div className="flex">
            <Link
              to={`/centerticket`}
              state={{ id: memberId }}
              className="flex items-center"
            >
              <span>부여하기</span>
            </Link>
          </div>
        </nav>
      </header>
      <div className="font-bold text-left p-2">수강권</div>

      {memTickets.length === 0 ? (
        <div>등록된 수강권이 없습니다.</div>
      ) : (
        <div>
          <div className="flex">
            <button
              className={`py-2 px-3 font-semibold ${
                activeButton === 'INUSE'
                  ? 'text-Pri-300 border-b-2 border-Pri-300'
                  : 'text-Gray-300 border-b-2 border-Gray-300'
              }`}
              onClick={handleInUseClick}
            >
              이용중
            </button>
            <button
              className={`py-2 px-3 font-semibold ${
                activeButton === 'ENDED'
                  ? 'text-Pri-300 border-b-2 border-Pri-300'
                  : 'text-Gray-300 border-b-2 border-Gray-300'
              }`}
              onClick={handleEndedClick}
            >
              종료됨
            </button>
          </div>
          {activeButton === 'INUSE' && inUseTickets != 0 && (
            <div className="mt-3 flex flex-col gap-4">
              {memTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="flex justify-between border rounded-lg  border-solid border-[1.5px]"
                >
                  <div className="p-4 flex flex-col gap-1 text-left">
                    <h1 className="font-extrabold mb-6">{ticket.title}</h1>
                    <div className="text-sm text-[#aeaeae]">
                      잔여횟수
                      <span className="ml-1 text-[#1d1d1d]">
                        {ticket.remainingCount}회
                      </span>
                    </div>
                    <div className="text-sm text-[#aeaeae]">
                      유효기간
                      <span className="ml-1 text-[#1d1d1d]">
                        {ticket.startAt} ~ {ticket.endAt}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col gap-3 bg-[#ebf1ff] text-[#2d62ea] text-sm">
                    <button>수강권 일시중단</button>
                    <button>수강권 양도</button>
                    <button>수강권 환불</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MemberTickets;
