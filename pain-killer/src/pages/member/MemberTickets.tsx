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

  // 이용중 종료됨 구분
  const [isCancel, setIsCancel] = useState(false);

  // 회원 수강권 조회 api
  const getMemTickets = async () => {
    const response = await instance.get(`/members/${memberId}/issued-tickets`);

    setMemtickets(response.data.issuedTickets);
    console.log(response);
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
            <span>이용중</span>
            <span>종료됨</span>
          </div>
          <div className="flex flex-col gap-5">
            {memTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="flex justify-between border rounded p-2"
              >
                <div className="flex flex-col gap-3">
                  <div>수강권 이름 : {ticket.title}</div>
                  <div>잔여횟수 : {ticket.remainingCount}</div>
                  <div>
                    유효기간 : {ticket.startAt} ~ {ticket.endAt}
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div>수강권 일시중단</div>
                  <div>수강권 양도</div>
                  <div>수강권 환불</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberTickets;
