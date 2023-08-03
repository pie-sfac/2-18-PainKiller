import StudyTicketListHeader from './StudyTicketListHeader';
import Tiket from '../../../img/Tiket_ac.svg';
import React, { useState, useEffect } from 'react';
import instance from '../../../api/axios_interceptors';
import { useNavigate,Link } from 'react-router-dom';

interface Ticket {
  id: number;
  title: string;
  lessonType: string;
  granted: number;
  defaultCount: number;
  duration: number;
  defaultTerm: number;
  defaultTermUnit: string;
  isActive: boolean;
}

interface StudyTicketListProps {}

function convertTermUnitToKorean(termUnit: string) {
  switch (termUnit) {
    case 'MONTH':
      return '개월';
    case 'WEEK':
      return '주';
    case 'DAY':
      return '일';
    default:
      return termUnit;
  }
}

export default function StudyTicketList(StudyTicketListProps) {
  const [ticketData, setTicketData] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTicketData = async () => {
      try {
        const response = await instance.get('/tickets', {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // 수강권 생성 성공 시 처리할 코드
        console.log('수강권 출력 완료:', response.data);
        // 판매 중인 수강권 필터링
        const sellingTickets = response.data.tickets.filter(
          (ticket) => ticket.isActive,
        );
        setTicketData(sellingTickets); // 판매 중인 수강권만 ticketData 상태에 설정
        setLoading(false);
      } catch (error) {
        // 오류 처리
        console.error('수강권 출력 오류:', error);
        setLoading(false);
      }
    };

    fetchTicketData();
  }, []);

  const handleTicketClick = (ticketId: number) => {
    // 페이지 이동 및 선택한 수강권 ID 전달
    navigate(`/createticketlist/${ticketId}`);
  };

  if (!ticketData) {
    return <div>Loading...</div>;
  }

  // ticketData 상태가 배열인 경우에만 수강권 정보를 렌더링
  if (!Array.isArray(ticketData) || ticketData.length === 0) {
    return <div>Error: 수강권 데이터가 유효하지 않거나 데이터가 없습니다.</div>;
  }
  return (
    <>
      {/* ticketData 배열을 map으로 순회하면서 각 항목을 처리 */}
      <StudyTicketListHeader />
      <p className="text-left my-2 font-semibold text-Gray-700">
        OO센터 수강권
      </p>
      {ticketData.map((ticket) => (
        <div key={ticket.id} >
          <Link to={`/createstudyticket/${ticket.id}`}>
          <div className="border border-Gray-200 rounded-xl p-6 mb-3" >
            {/* ticket 정보를 이용하여 동적으로 렌더링 */}
            <div>
              <div className="flex justify-between items-end">
                <p className="text-left truncate font-semibold">
                  {ticket.title}
                </p>
                <p className="text-right bg-Pri-50 text-xs px-2 py-1 rounded text-Pri-500">
                  {ticket.lessonType === 'GROUP'
                    ? '그룹 수업'
                    : '개인수업 - 1:1'}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-left mt-2 mb-9">
                  <span className="text-Gray-400 mr-2">부여</span>{' '}
                  {ticket.granted}건
                </p>
                <p className="text-left">
                  <span className="text-Gray-400 mr-2">수강권 횟수</span>{' '}
                  {ticket.defaultCount}회
                </p>
                <p className="text-left">
                  <span className="text-Gray-400 mr-6">수업시간</span>{' '}
                  {ticket.bookableLessons[0].duration}분
                </p>
                <p className="text-left">
                  <span className="text-Gray-400 mr-2">수강권 기간</span>{' '}
                  {ticket.defaultTerm}{' '}
                  {convertTermUnitToKorean(ticket.defaultTermUnit)}
                </p>
              </div>
              <img src={Tiket} alt="티켓 아이콘" />
            </div>
          </div>
          </Link>
        </div>
      ))}
    </>
  );
}
