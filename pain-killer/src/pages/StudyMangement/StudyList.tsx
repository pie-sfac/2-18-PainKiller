import Tiket from '../../img/Tiket_ac.svg';
import DisTiket from '../../img/Tiket_dis.svg'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import instance from '../../api/axios_interceptors';




//수강권 조회페이지

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
export default function StudyList() {
  // const access_Token = localStorage.getItem('access_token')
  const [ticketData, setTicketData] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [deactivatedTickets, setDeactivatedTickets] = useState<Ticket[]>([]);
  const [deactivatedCount, setDeactivatedCount] = useState(0); // 판매 종료된 수강권 개수 추가
  // 판매중인 수강권 목록 상태
  const [sellingTickets, setSellingTickets] = useState<Ticket[]>([]);
  // 현재 눌린 버튼 상태
  const [activeButton, setActiveButton] = useState('selling');
  

  useEffect(() => {
    // 판매중인 수강권 필터링
    const sellingTickets = ticketData.filter((ticket) => ticket.isActive);
    // 판매종료된 수강권 필터링
    const deactivatedTickets = ticketData.filter((ticket) => !ticket.isActive);
  
    setSellingTickets(sellingTickets);
    setDeactivatedTickets(deactivatedTickets);
    setCount(sellingTickets.length); 
    setDeactivatedCount(deactivatedTickets.length); // 판매 종료된 수강권 개수 업데이트
  }, [ticketData]);

  // 판매중 버튼 클릭 시 이벤트 핸들러
  const handleSellingClick = () => {
    setActiveButton('selling');
  };


  // API에 POST 요청으로 수강권 생성 한걸 가져오기
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
        setTicketData(response.data.tickets); // API 응답 데이터를 ticketData 상태에 설정
        setCount(response.data.tickets.filter((ticket) => ticket.lessonType === 'SINGLE').length); // 판매중인 수강권 갯수 설정
        setLoading(false);
      } catch (error) {
        // 오류 처리
        console.error('수강권 출력 오류:', error);
        setLoading(false);
      }
    };

    fetchTicketData();
  }, []);

  // 로딩 상태를 확인하고 로딩 중이면 "Loading..."을 렌더링
  if (loading) {
    return <div>Loading...</div>;
  }

  // ticketData 상태가 배열인 경우에만 수강권 정보를 렌더링
  if (!Array.isArray(ticketData) || ticketData.length === 0) {
    return <div>Error: 수강권 데이터가 유효하지 않거나 데이터가 없습니다.</div>;
  }

  // 영어값을 한글로 변환하는 함수
  function convertTermUnitToKorean(termUnit) {
    switch (termUnit) {
      case "MONTH":
        return "개월";
      case "WEEK":
        return "주";
      case "DAY":
        return "일";
      default:
        return termUnit;
    }
  }
  // ticketId 값을 매개변수로 
  const fetchTicketsById = async (ticketId: number) => {
    try {
      const response = await instance.get(`/tickets/${ticketId}/issued-tickets`, {

      });
      console.log(response)
      return response.data;

    } catch (error) {
      console.error('수강권 출력 오류:', error);
      return null;
    }
  };



  // 판매 종료된 수강권을 구분하는 클래스
  const deactivatedTicketClass = "deactivated-ticket";




  // 판매 종료 처리 함수
  const handleDeactivateTicket = async (ticketId: number) => {
    try {
      // 판매 종료 요청을 보낼 API 엔드포인트와 데이터 설정
      await instance.post(`/api/v1/tickets/${ticketId}/deactivate`, null, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // 판매 종료된 수강권을 ticketData 상태에서 제거
    setTicketData((prevTicketData) => prevTicketData.filter(ticket => ticket.id !== ticketId));
    // 판매 종료된 수강권을 deactivatedTickets 상태에서 제거
    setDeactivatedTickets((prevDeactivatedTickets) => prevDeactivatedTickets.filter(ticket => ticket.id !== ticketId));

     // 판매 종료된 수강권 개수인 deactivatedCount를 1 줄여서 업데이트
     setDeactivatedCount((prevCount) => prevCount + 1);

     // 판매중인 수강권 개수인 count 업데이트
    setCount((prevCount) => prevCount - 1);

      console.log('수강권이 성공적으로 판매 종료되었습니다.');
    } catch (error) {
      console.error('판매 종료 오류:', error);
    }
  };
  // 판매종료 버튼 클릭 시 이벤트 핸들러
  const handleDeactivatedClick = () => {
    setActiveButton('deactivated');
  };


  
  return (
    <>

      <div>
        <div className="flex justify-between items-center">
          <p className="text-Gray-800 font-extrabold text-lg mt-6">센터 수강권</p>
          <Link to="/create">

            <button className="font-blod text-base mt-10 ">생성하기</button>
          </Link>
        </div>

        <div className="flex justify-start mt-6 mb-4">
          {/* 판매중 버튼 */}
          <button
            className={`py-2 px-3 font-semibold ${activeButton === 'selling' ? 'text-Pri-300 border-b-2 border-Pri-300' : 'text-Gray-300 border-b-2 border-Gray-300'
              }`}
            onClick={handleSellingClick}
          >
            판매중 ({count})
          </button>
          {/* 판매종료 버튼 */}
          <button
            className={`py-2 px-3 font-semibold ${activeButton === 'deactivated' ? 'text-Pri-300 border-b-2 border-Pri-300' : 'text-Gray-300 border-b-2 border-Gray-300'
              }`}
            onClick={handleDeactivatedClick}
          >
            판매종료 ({deactivatedCount})
          </button>
        </div>

        {/* 수강권 목록 렌더링 */}
        {activeButton === 'selling' && sellingTickets.length > 0 && (
            
          <>
            {ticketData.map((ticket) => (
              ticket.isActive && (

              <Link to={`/studydetails/${ticket.id}`} key={ticket.id}>
                <div className="border border-Gray-200 rounded-xl p-6 mb-3" key={ticket.id}>
                  <div>
                    <div className="flex justify-between items-end">
                      <p className="text-left truncate font-semibold">{ticket.title}</p>
                      <p className="text-right bg-Pri-50 text-xs px-2 py-1 rounded text-Pri-500">
                        {ticket.lessonType === 'GROUP' ? '그룹 수업' : '개인수업 - 1:1'}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-left mt-2 mb-9">
                        <span className="text-Gray-400 mr-2">부여</span> {ticket.granted}건
                      </p>
                      <p className="text-left">
                        <span className="text-Gray-400 mr-2">수강권 횟수</span> {ticket.defaultCount}회
                      </p>
                      <p className="text-left">
                        <span className="text-Gray-400 mr-6">수업시간</span> {ticket.bookableLessons[0].duration}분
                      </p>
                      <p className="text-left">
                        <span className="text-Gray-400 mr-2">수강권 기간</span> {ticket.defaultTerm}{convertTermUnitToKorean(ticket.defaultTermUnit)}
                      </p>
                    </div>
                    <img src={Tiket} alt="티켓 아이콘" />
                  </div>
                </div>
              </Link>
              )
            ))}
          </>
        )}

        {/* 판매 종료된 수강권 목록 렌더링 */}
        {activeButton === 'deactivated' && deactivatedTickets.length > 0 && (
          <>
            {deactivatedTickets.map((deactivatedTicket) => (
             
              <Link to={`/studydetails/${deactivatedTicket.id}`} key={deactivatedTicket.id}>
                <div className={`border border-Gray-200 bg-Gray-100 rounded-xl p-6 mb-3 ${deactivatedTicketClass}`} key={deactivatedTicket.id}>
                  <div>
                    <div className="flex justify-between items-end">
                      <p className="text-left truncate font-semibold text-Gray-400">{deactivatedTicket.title}</p>
                      <p className="text-right bg-Gray-200 text-xs px-2 py-1 rounded text-Gray-400">
                        {deactivatedTicket.lessonType === 'GROUP' ? '그룹 수업' : '개인수업 - 1:1'}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-left mt-2 mb-9">
                        <span className="text-Gray-400 mr-2">부여</span> <span className="text-Gray-400">{deactivatedTicket.granted}건</span>
                      </p>
                      <p className="text-left">
                        <span className="text-Gray-400 mr-2">수강권 횟수</span> <span className="text-Gray-400">{deactivatedTicket.defaultCount}회</span>
                      </p>
                      <p className="text-left">
                        <span className="text-Gray-400 mr-6">수업시간</span> <span className="text-Gray-400">{deactivatedTicket.bookableLessons[0].duration}분</span>
                      </p>
                      <p className="text-left">
                        <span className="text-Gray-400 mr-2">수강권 기간</span><span className="text-Gray-400">{deactivatedTicket.defaultTerm}{convertTermUnitToKorean(deactivatedTicket.defaultTermUnit)}</span>
                      </p>
                    </div>
                    <img src={DisTiket} alt="티켓 아이콘" />
                  </div>
                </div>
              </Link>
              
            ))}
          </>
        )}
      </div>

    </>
  );



};