import GrantHeader from '../../components/GrantHeader';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import instance from '../../api/axios_interceptors';
// 수강권 부여내역

interface Owner {
  id: number;
  name: string;
  phone: string;
}

interface PrivateTutor {
  id: number;
  name: string;
}

interface IssuedTicket {
  id: number;
  owners: Owner[];
  privateTutor: PrivateTutor;
  remainingTimes: number;
  startAt: string;
  endAt: string;
}

const GrantList: React.FC = () => {
  const [issuedTickets, setIssuedTickets] = useState<IssuedTicket[]>([]);

  // useParams 훅을 사용하여 현재 경로의 파라미터에서 ticketId를 가져옴
  const { ticketId } = useParams<{ ticketId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    fetchIssuedTickets(ticketId); // ticketId를 인자로 전달
  }, [ticketId]);

  const fetchIssuedTickets = async (ticketId: string) => {
    try {
      const response = await instance.get<IssuedTicket[]>(
        `/tickets/${ticketId}/issued-tickets`,
        {
          headers: {
            
            'Content-Type': 'application/json',
          },
        }
      );
      setIssuedTickets(response.data.datas); // API 응답에서 datas 배열을 사용하여 데이터를 설정
    } catch (error) {
      console.error('수강권 부여내역을 불러오는데 에러가 발생했습니다:', error);
    }
  };

  return (
    <>
      <GrantHeader />
      <div className='flex justify-start mt-6 mb-9 pl-12'>
        <p className='font-bold text-lg'>총 {issuedTickets.length}건</p>
      </div>
      <div>
        {issuedTickets.map((ticket) => (
          <div className="grid grid-cols-6 gap-3 border-b border-Gray-200" key={ticket.id} onClick={() => setSelectedTicketId(ticket.id)}>
            <p className="max-w-32 font-bold">{ticket.name}</p>
            <p className="max-w-32">{ticket.owners[0].phone}</p>
            <p className="max-w-32">{ticket.privateTutor.name}</p>
            <p className="max-w-32">잔여 {ticket.remainingTimes}회</p>
            <p>
              유효기간: {ticket.startAt} - {ticket.endAt}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default GrantList;
