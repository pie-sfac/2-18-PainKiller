import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BackImage from '../../img/Back_24px.svg'
import instance from '../../api/axios_interceptors';

interface Schedule {
  
    users: [
        {
            id: number,
            name: string,
        },
        {
            id: number,
            name: string,
        },
        {
            id: number,
            name: string,
        },
        {
            id: number,
            name: string,
        },
        {
            id: number,
            name: string,
        },
        {
            id: number,
            name: string,
        },
        {
            id: number,
            name: string,
        },
        {
            id: number,
            name: string,
        },
        {
            id: number,
            name: string,
        },
        {
            id: number,
            name: string,
        },
        {
            id: number,
            name: string,
        },
        {
            id: number,
            name: string,
        },
        {
            id: number,
            name: string,
        },
        {
            id: number,
            name: string,
        }
    ],
    counselingSchedules: [
        {
            id: number,
            startAt: string,
            endAt: string,
            memo: string,
            isCanceled: boolean,
            canceledAt: string,
            counselor: {
                id: number,
                name: string
            },
            client: {
                memberId: string,
                name: string,
                phone: string,
            },
            createdAt: string,
            updatedAt: string,
        }
    ],
    privateSchedules: [
        {
            id: number,
            tutor: {
                id: number,
                name: string,
            },
            startAt: string,
            endAt: string,
            memo: string,
            isCanceled: boolean,
            canceledAt: string,
            issuedTicket: {
                id: number,
                lessonType: string,
                title: string,
                startAt: string,
                endAt: string,
                remainingCount: number,
                defaultCount: number,
                serviceCount: number,
                availableReservationCount: number,
                defaultTerm: number,
                defaultTermUnit: string,
                isSuspended: boolean,
                suspendedAt: string,
                isCanceled: boolean,
                canceledAt: string,
                createdAt: string,
                updatedAt: string
            },
            attendanceHistories: [
                {
                    id: number,
                    member: {
                        id: number,
                        name: string,
                        phone: string,
                    },
                    status: string,
                }
            ],
            createdAt: string,
            updatedAt: string
        },
        {
            id: number,
            tutor: {
                id: number,
                name: string
            },
            startAt: string,
            endAt: string,
            memo: string,
            isCanceled: boolean,
            canceledAt: string,
            issuedTicket: {
                id: number,
                lessonType: string,
                title: string,
                startAt: string,
                endAt: string,
                remainingCount: number,
                defaultCount: number,
                serviceCount: number,
                availableReservationCount: number,
                defaultTerm: number,
                defaultTermUnit: string,
                isSuspended: boolean,
                suspendedAt: string,
                isCanceled: boolean,
                canceledAt: string,
                createdAt: string,
                updatedAt: string,
            },
            attendanceHistories : [
                {
                    id: number,
                    member: {
                        id: number,
                        name: string,
                        phone: string,
                    },
                    status: string,
                }
            ],
            createdAt: string,
            updatedAt: string;
        }
    ]
}



const Inquiry_schedule = () =>  {

  const navigate = useNavigate();

  const onPrepage = () => {
    navigate(-1);
  }

  const [inSchedule, setInSchedule] = useState<Schedule[]>([]);

  const getSchedule = async () => {
    const results = await instance.get(`/schedules?from=2023-08-01&to=2023-08-31`);
    
    setInSchedule(results.data);
    console.log(results);
    console.log(results.data);
  }

  useEffect(()=> {
    getSchedule();
  }, []);


  return (
    <React.Fragment>
      <div>
        <header className="bg-white border-b border-t-neutral-100">
          <nav className="flex p-5 justify-between">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={onPrepage}
            >
              <img src={BackImage} alt="Back" />
              <p className="text-lg ml-2">11시 서태지</p>
            </div>
            <div className="flex items-center space-x-2">   
              <span>변경</span>
              <span>취소</span> 
            </div>
          </nav>
        </header>
        
        <div className="flex justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-left mt-8 text-Gray-800 text-lg">
              개인 수업 일정
            </span>
            <span className="text-gray-200 text-lg">
              생성일
            </span>
            <span className="text-gray-200 text-lg">
              2022년 12월 09일(금) 13시 30분
            </span>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
};

export default Inquiry_schedule;