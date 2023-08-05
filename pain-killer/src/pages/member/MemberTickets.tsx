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
      setMemtickets((prevTickets) =>
        prevTickets.map((ticket) => {
          if (ticket.id === ticketId) {
            return { ...ticket, isRefunded: true };
          }
          return ticket;
        }),
      );
      localStorage.setItem(`refundStatus_${ticketId}`, 'refunded');
      console.log('수강권이 환불되었습니다.');
    } catch (error) {
      console.error('수강권 환불 오류:', error);
    }
  };

  const fetchMemberTickets = async () => {
    try {
      const response = await instance.get(`/members/${memberId}/issued-tickets`);
      setMemtickets(response.data.issuedTickets);
      console.log(response);
    } catch (error) {
      // API 호출 실패 시 오류 처리
      console.error('수강권 조회 오류:', error);
    }
  };

  useEffect(() => {
    fetchMemberTickets();
  }, [memberId]);

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
            <span>부여하기</span>
          </div>
        </nav>
      </header>
      <div className="font-bold text-left p-2">수강권</div>

      {memTickets.length === 0 ? (
        <div>등록된 수강권이 없습니다.</div>
      ) : (
        <div>
          <div className="flex gap-3">
            <button onClick={handleSellingClick}>이용중</button>
            <button onClick={handleDeactivatedClick}>종료됨</button>
          </div>
          {activeButton === 'deactivated' && renderNoDeactivatedTicketsMessage()}
          <div className="flex flex-col gap-5">
            {getFilteredTickets().map((ticket) => (
              <div
                key={ticket.id}
                className={`flex justify-between border rounded p-2 ${ticket.isSuspended ? 'suspended-ticket' : 'active-ticket'
                  }`}
              >
                <div className="flex flex-col gap-3">
                  <div>수강권 이름 : {ticket.title}</div>
                  <div>잔여횟수 : {ticket.remainingCount}</div>
                  <div>
                    유효기간 : {ticket.startAt} ~ {ticket.endAt}
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  {ticket.isSuspended ? (
                    <button onClick={() => handleUnsuspendClick(ticket.id)}>
                      수강권 일시중단 해제
                    </button>
                  ) : (
                    <button onClick={() => handleSuspendClick(ticket.id)}>
                      수강권 일시중단
                    </button>
                  )}
                  <button>수강권 양도</button>
                  {!ticket.isRefunded ? (
                    <button onClick={() => handleRefundClick(ticket.id)}>
                      수강권 환불
                    </button>
                  ) : (
                    <span>환불</span>
                  )}
                </div>
              </div>
            ))}
          </div>

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
