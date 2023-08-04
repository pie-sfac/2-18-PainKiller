import { Link, useNavigate } from "react-router-dom";
import instance from "../../api/axios_interceptors";
import BackImage from '../../img/Back_24px.svg';
import Tiket from '../../img/Tiket_ac.svg';
import React, {useState, useEffect} from 'react'



interface Ticket {
    id: 0,
    title: string,
    lessonType: string,
    defaultCount: number,
    defaultTerm: number,
    defaultTermUnit: string,
    isActive: boolean,
    maxServiceCount: number,
    issuedTicketCount: number,
    bookableLessons: BookableLessons[]
  }

interface BookableLessons{
    id: number,
    type: string,
    title: string,
    duration: number,
    maxGroupMember: number
}


const CenterTickets = () => {

    const [ticketList, setTicketList] = useState<Ticket[]>([]);

    const navigate = useNavigate();
    
    const onPrevious = () => {
        navigate(-1);
      }

    const getSellingTicket = async() => {
        try {
            const response = await instance.get('/tickets', {
              headers: {
                'Content-Type': 'application/json',
              },
            });

            // 판매중인 티켓만 가져오도록 함.
            setTicketList(response.data.tickets.filter((ticket : Ticket) => ticket.isActive));

          } catch (error) {
            // 오류 처리
            console.error('수강권 출력 오류:', error);
          }
    }

    useEffect(()=> {
        getSellingTicket();
    }, [])

     // 영어값을 한글로 변환하는 함수
  function convertTermUnitToKorean(termUnit : any) {
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

    return(
        <div>
            <header className="bg-white border-b border-t-neutral-100">
                <nav className="flex p-5 justify-between">
                    <div className="flex justify-between items-center cursor-pointer" onClick={onPrevious}>
                        <img src={BackImage} alt="Back" />
                        <p className="text-lg ml-2">수강권 부여</p>
                    </div>
                 </nav>
            </header>
            <div>
                <div className="font-bold text-left p-2">센터 수강권</div>
                {
                    ticketList.map((ticket) => (
                    <Link to = {`/grantticket/${ticket.id}`}>    
                        <div className="border border-Gray-200 rounded-xl p-6 mb-3" key={ticket.id}>
                            <div>
                                <div className="flex justify-between items-end mb-2">
                                <p className="text-left truncate font-semibold">{ticket.title}</p>
                                <p className="text-right bg-Pri-50 text-xs px-2 py-1 rounded text-Pri-500">
                                    {ticket.lessonType === 'GROUP' ? '그룹 수업' : '개인수업 - 1:1'}
                                </p>
                                </div>
                            </div>
                            <div className="flex justify-between items-end">
                              <div>
                                <p className="text-left mt-2 mb-5">
                                  <span className="text-Gray-400 mr-2">부여</span> {ticket.issuedTicketCount}건
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
                    ))
                }
            </div>
        </div>
    )
}

export default CenterTickets;