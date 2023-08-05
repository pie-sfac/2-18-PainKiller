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

  const [memTickets, setMemtickets] = useState<IIssuedTicket[]>([]);
  const [activeButton, setActiveButton] = useState('selling');
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);

  const handleSellingClick = () => {
    setActiveButton('selling');
  };

  const handleDeactivatedClick = () => {
    setActiveButton('deactivated');
  };

  const getFilteredTickets = () => {
    if (activeButton === 'selling') {
      return memTickets.filter((ticket) => !ticket.isCanceled && !ticket.isSuspended);
    } else {
      return memTickets.filter((ticket) => ticket.isCanceled);
    }
  };

  const getDeactivatedTickets = () => {
    return memTickets.filter((ticket) => ticket.isCanceled);
  };

  const renderNoDeactivatedTicketsMessage = () => {
    const deactivatedTickets = getDeactivatedTickets();
    if (deactivatedTickets.length === 0) {
      return <div>종료된 수강권이 없습니다.</div>;
    }
    return null;
  };

  const handleSuspendConfirmation = async () => {
    if (selectedTicketId) {
      try {
        await instance.post(`/issued-tickets/${selectedTicketId}/suspend`);
        setMemtickets((prevTickets) =>
          prevTickets.map((ticket) => {
            if (ticket.id === selectedTicketId) {
              return { ...ticket, isSuspended: true };
            }
            return ticket;
          }),
        );
      } catch (error) {
        // API 호출 실패 시 오류 처리
      }
      console.log('수강권이 일시중단 되었습니다');
    }
    setShowSuspendModal(false);
  };

  const handleUnsuspendClick = async (ticketId: number) => {
    try {
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

  const handleSuspendClick = (ticketId: number) => {
    setSelectedTicketId(ticketId);
    setShowSuspendModal(true);
  };

  const handleRefundClick = async (ticketId: number) => {
    try {
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
      console.error('수강권 조회 오류:', error);
    }
  };

  useEffect(() => {
    fetchMemberTickets();
  }, [memberId]);

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
                  <div key={ticket.id} className={`suspended-ticket`}>
                    <Link key={ticket.id} to={`/dtickets/${ticket.id}`}>
                      <div className="flex justify-between border rounded-lg  border-solid border-[1.5px]">
                        <div className="flex flex-col gap-3 text-left">
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
                        <div className="p-4 flex flex-col gap-3 bg-[#ebf1ff] text-[#2d62ea] text-sm">
                          <button
                            onClick={() => handleUnsuspendClick(ticket.id)}
                          >
                            수강권 일시중단 해제
                          </button>
                          <button>수강권 양도</button>
                          <button onClick={() => handleRefundClick(ticket.id)}>
                            수강권 환불
                          </button>
                        </div>
                      </div>
                    </Link>
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
                  <div key={ticket.id} className={` active-ticket`}>
                    <Link key={ticket.id} to={`/dtickets/${ticket.id}`}>
                      <div className="flex justify-between border rounded-lg border-solid border-[1.5px]">
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
                        <div className="p-4 flex flex-col gap-3 bg-[#ebf1ff] text-[#2d62ea] text-sm">
                          <button onClick={() => handleSuspendClick(ticket.id)}>
                            수강권 일시중단
                          </button>
                          <button>수강권 양도</button>
                          <button onClick={() => handleRefundClick(ticket.id)}>
                            수강권 환불
                          </button>
                        </div>
                      </div>
                    </Link>
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
