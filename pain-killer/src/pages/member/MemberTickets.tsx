import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import BackImage from '../../img/Back_24px.svg';
import instance from '../../api/axios_interceptors';
import SuspendModal from './SuspendModal';

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

  // 회원 수강권 조회 api
  const getMemTickets = async () => {
    const response = await instance.get(`/members/${memberId}/issued-tickets`);

    setMemtickets(response.data.issuedTickets);
    console.log(response);
  };
  useEffect(() => {
    getMemTickets();
  }, []);

  // 경원 구현 zone
  // 모달의 표시 여부를 관리하는 상태
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);

  // 일시 중단을 확인하고 처리하는 함수
  const handleSuspendConfirmation = async () => {
    if (selectedTicketId) {
      try {
        // 일시 중단을 API로 호출하고, 필요한 경우 상태를 업데이트
        await instance.post(`/issued-tickets/${selectedTicketId}/suspend`);
      } catch (error) {
        // API 호출 실패 시 오류 처리
      }
    }
    console.log('수강권이 일시중단 되었습니다');

    // 모달을 닫기
    setShowSuspendModal(false);
  };

  // 일시중단을 해제하는 함수
  const handleUnsuspendClick = async (ticketId: number) => {
    try {
      // 일시중단 해제를 API로 호출하고, 필요한 경우 상태를 업데이트
      await instance.post(`/issued-tickets/${ticketId}/unsuspend`);
      setMemtickets((prevTickets) =>
        prevTickets.map((ticket) => {
          if (ticket.id === ticketId) {
            return { ...ticket, isSuspended: false };
          }
          return ticket;
        }),
      );
    } catch (error) {
      // API 호출 실패 시 오류 처리
    }
    console.log('수강권 일시중단이 해제되었습니다.');
  };

  // "수강권 일시중단" 버튼 클릭 처리 함수
  const handleSuspendClick = (ticketId: number) => {
    setSelectedTicketId(ticketId);
    setShowSuspendModal(true);
  };
  // 수강권 환불 처리 함수
  const handleRefundClick = async (ticketId: number) => {
    try {
      // 수강권 환불을 API로 호출하고, 필요한 경우 상태를 업데이트
      await instance.post(`/issued-tickets/${ticketId}/refund`);
      console.log('수강권 환불이 완료되었습니다.');

      // 환불이 성공적으로 이뤄졌으면 해당 수강권을 memTickets에서 삭제
      setMemtickets((prevTickets) =>
        prevTickets.filter((ticket) => ticket.id !== ticketId),
      );

      // 업데이트된 상태를 로컬 스토리지에 저장 (로컬 스토리지에 저장할 때 API로 받은 수강권 상태를 저장)
      const updatedTickets = memTickets.filter(
        (ticket) => ticket.id !== ticketId,
      );
      saveTicketsToLocalStorage(updatedTickets);
    } catch (error) {
      // API 호출 실패 시 오류 처리
    }
  };

  // 상태를 로컬 스토리지에 저장하고 초기화하는 함수
  const saveTicketsToLocalStorage = (tickets: IIssuedTicket[]) => {
    localStorage.setItem('memTickets', JSON.stringify(tickets));
  };

  const loadTicketsFromLocalStorage = () => {
    const storedTickets = localStorage.getItem('memTickets');
    if (storedTickets) {
      return JSON.parse(storedTickets);
    }
    return [];
  };

  // useEffect를 사용하여 수강권 정보를 로컬 스토리지와 동기화
  useEffect(() => {
    // API로부터 받은 수강권 정보가 있을 경우 로컬 스토리지로부터 로드하지 않음
    if (memTickets.length > 0) return;

    const storedTickets = loadTicketsFromLocalStorage();
    setMemtickets(storedTickets);
  }, []);
  // 현재 눌린 버튼 상태
  const [activeButton, setActiveButton] = useState('INUSE');
  // 수강권 상태를 토글하는 변수
  const [showSuspended, setShowSuspended] = useState(false);

  // 이용중 수강권 리스트
  const [activeTickets, setActiveTickets] = useState<IIssuedTicket[]>([]);
  // 종료됨 수강권 리스트
  const [suspendedTickets, setSuspendedTickets] = useState<IIssuedTicket[]>([]);

  // 이용중 버튼 클릭 시 이벤트 핸들러
  const handleInUseClick = () => {
    setActiveButton('INUSE');
    setShowSuspended(false);
  };
  // 종료됨 버튼 클릭 시 이벤트 핸들러
  const handleEndedClick = () => {
    setActiveButton('ENDED');
    setShowSuspended(true);
  };

  useEffect(() => {
    // 수강권 리스트를 이용중과 종료됨으로 분류하여 업데이트
    const activeTicketsList: IIssuedTicket[] = [];
    const suspendedTicketsList: IIssuedTicket[] = [];

    memTickets.forEach((ticket) => {
      if (ticket.isSuspended) {
        suspendedTicketsList.push(ticket);
      } else {
        activeTicketsList.push(ticket);
      }
    });

    setActiveTickets(activeTicketsList);
    setSuspendedTickets(suspendedTicketsList);
  }, [memTickets]);

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

          {showSuspended ? (
            // 종료됨 수강권 출력
            <div className="mt-3 flex flex-col gap-4">
              {suspendedTickets.length > 0 ? (
                suspendedTickets.map((ticket) => (
                  <div key={ticket.id} className={`suspended-ticket flex`}>
                    <Link key={ticket.id} to={`/dtickets/${ticket.id}`}>
                      <div className="flex justify-between border rounded-l-lg">
                        <div className="p-4 flex flex-col gap-1 text-left">
                          <h1 className="font-extrabold mb-6">
                            {ticket.title}
                          </h1>
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
                      </div>
                    </Link>
                    <div className="p-4 flex flex-col justify-between bg-[#ebf1ff] text-[#2d62ea] text-sm rounded-r-lg border-y border-r">
                      <button onClick={() => handleUnsuspendClick(ticket.id)}>
                        수강권 <br></br> 일시중단 해제
                      </button>
                      <button>수강권 양도</button>
                      <button onClick={() => handleRefundClick(ticket.id)}>
                        수강권 환불
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div>종료된 수강권이 없습니다.</div>
              )}
            </div>
          ) : (
            // 이용중 수강권 출력
            <div className="mt-3 flex flex-col gap-4">
              {activeTickets.length > 0 ? (
                activeTickets.map((ticket) => (
                  <div key={ticket.id} className={` active-ticket flex`}>
                    <Link key={ticket.id} to={`/dtickets/${ticket.id}`}>
                      <div className="flex justify-between border rounded-l-lg">
                        <div className="p-4 flex flex-col gap-1 text-left">
                          <h1 className="font-extrabold mb-6">
                            {ticket.title}
                          </h1>
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
                      </div>
                    </Link>
                    <div className="p-4 flex flex-col justify-between bg-[#ebf1ff] text-[#2d62ea] text-sm rounded-r-lg border-y border-r">
                      <button onClick={() => handleSuspendClick(ticket.id)}>
                        수강권 일시중단
                      </button>
                      <button>수강권 양도</button>
                      <button onClick={() => handleRefundClick(ticket.id)}>
                        수강권 환불
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div>이용중인 수강권이 없습니다.</div>
              )}
            </div>
          )}

          {/* 일시중단 모달 표시 */}
          <SuspendModal
            show={showSuspendModal}
            onConfirm={handleSuspendConfirmation}
            onCancel={() => setShowSuspendModal(false)}
          />
        </div>
      )}
    </div>
  );
};

export default MemberTickets;
