import GrantHeader from '../../components/GrantHeader';
import { useState, useEffect } from 'react';
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
  privateTutor: PrivateTutor[];
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
    fetchIssuedTickets(); // ticketId를 인자로 전달
  }, []);

  const fetchIssuedTickets = async () => {
    try {
      const response = await instance.get(
        `/tickets/${ticketId}/issued-tickets`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      setIssuedTickets(response.data.datas); // API 응답에서 datas 배열을 사용하여 데이터를 설정
      console.log(response.data.datas);

    } catch (error) {
      console.error('수강권 부여내역을 불러오는데 에러가 발생했습니다:', error);
    }
  };

  return (
    <>
      <GrantHeader />
      <div className='flex justify-start mt-6 mb-9 p-2'>
        <p className='font-bold text-lg'>총 {issuedTickets.length}건</p>
      </div>
      {issuedTickets.length === 0 && <div>부여 내역이 없습니다.</div>}
      <div className='flex flex-col gap-5'>
        {issuedTickets.map((ticket) => (
          <div className='flex flex-col border rounded-[10px] p-2 gap-2' key={ticket.id}>
            <div className='flex justify-between'>
              <div className='font-bold px-2'>{ticket.owners[0].name}</div>
              <div>{ticket.owners[0].phone}</div>
            </div>
            <div className='flex justify-between items-center'>
              <div className='text-[#505050] bg-[#F4F4F4] rounded px-2'>{ticket.privateTutor.name}</div>
              <p className="max-w-32">
                잔여 {ticket.remainingTimes}회
              </p>
            </div>
            <p className='text-left'>
              유효기간: {ticket.startAt} - {ticket.endAt}
            </p>

          </div>
        ))}
      </div>
    </>
  );
}

export default GrantList;
