import React , { useState, useEffect }from 'react';
import SearchBar from '../../components/search';
import bannerImg from '../../assets/img/banner-img.png';
import instance from '../../api/axios_interceptors';
//import bannerImg from '../../assets/img/banner-img.png';
//merge with branch_jhPark
//jhPark


interface Home {
  
    center: {
        staffCount: number,
        memberCount: number,
        myMemberCount: number
    },
    mySchedule: {
        counselingCount: number,
        lessonCount: number
    },
    message: string
}


export default function Home() {

  const [usedata, setUsedata] = useState<Home>();
  const [mySchduleCount, setMyScheduleCount] = useState();

  const inquiry = async () => {
    try{
      const ref = await instance.get('/me/summary')

      setUsedata(ref.data)
      console.log(ref.data.center.staffCount)

      setMyScheduleCount(ref.data.mySchedule.counselingCount + ref.data.mySchedule.lessonCount);

      console.log(ref);
    } catch(error : any){
      alert(error);
    }
  }

  useEffect(() => {
    inquiry();
  }, []);

//merge 함
  

  return (
    <div className="w-full flex flex-col items-center bg-[#f4f4f4] p-5 h-[900px] overflow-y-auto">
      <SearchBar />
      <div className="w-[21rem] h-[5rem] text-xs my-7 pl-6 pr-4 py-px bg-[#2d62ea] rounded-[10px] flex justify-end items-center">
        <div className="text-white text-left pr-3">
          <p className="font-normal">시리어스 근적외선</p>
          <p className="font-bold">대량구매 특별할인 최대 40%</p>
        </div>
        <div>
          <img className="bg-no-repeat" src={bannerImg} alt="Banner Image" />
        </div>
      </div>

      <div className="w-full text-left mb-4">
        <p className="text-[#505050] mb-1 text-base font-light">
          나의 오늘 일정
        </p>
        <div className="h-36 bg-white rounded-[10px] px-5 pt-5 pb-3">
          <div className="flex">
            <div className="flex-1 ">
              <p className="text-[#1d1d1d] text-base/[24px] font-extrabold">
                총 {mySchduleCount}건의 일정
              </p>
              <p className="text-[#1d1d1d] text-base font-normal">
                수업 {usedata?.mySchedule.lessonCount}건, 상담 {usedata?.mySchedule.counselingCount}건
              </p>
            </div>
            <div className="w-10 h-10 bg-[#f4f4f4] rounded-full px-3 py-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M8 2C9.1 2 10 2.9 10 4C10 5.1 9.1 6 8 6C6.9 6 6 5.1 6 4C6 2.9 6.9 2 8 2ZM8 11C10.7 11 13.8 12.29 14 13V14H2V13.01C2.2 12.29 5.3 11 8 11ZM8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8C10.21 8 12 6.21 12 4C12 1.79 10.21 0 8 0ZM8 9C5.33 9 0 10.34 0 13V16H16V13C16 10.34 10.67 9 8 9Z"
                  fill="#CFCFCF"
                />
              </svg>
            </div>
          </div>
          <p className="mt-6 font-['Roboto'] text-[#0833a0] text-right text-3xl ">
            {mySchduleCount}
          </p>
        </div>
      </div>
      <div className="w-full text-left mb-4">
        <p className="text-[#505050] mb-1 text-base font-light">나의 회원</p>
        <div className="h-36 bg-white rounded-[10px] px-5 pt-5 pb-3">
          <div className="flex">
            <div className="flex-1 ">
              <p className="text-[#1d1d1d] text-base/[24px] font-extrabold">
                나의 회원 수
              </p>
            </div>
            <div className="w-10 h-10 bg-[#f4f4f4] rounded-full px-3 py-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M8 2C9.1 2 10 2.9 10 4C10 5.1 9.1 6 8 6C6.9 6 6 5.1 6 4C6 2.9 6.9 2 8 2ZM8 11C10.7 11 13.8 12.29 14 13V14H2V13.01C2.2 12.29 5.3 11 8 11ZM8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8C10.21 8 12 6.21 12 4C12 1.79 10.21 0 8 0ZM8 9C5.33 9 0 10.34 0 13V16H16V13C16 10.34 10.67 9 8 9Z"
                  fill="#CFCFCF"
                />
              </svg>
            </div>
            <p className="font-['Roboto'] text-[#0833a0] text-right text-3xl ">
              
            </p>
          </div>
          <p className="mt-7 font-['Roboto'] text-[#0833a0] text-right text-3xl ">
            {usedata?.center.myMemberCount}
          </p>
        </div>
      </div>
      <div className="w-full text-left mb-4">
        <p className="text-[#505050] mb-1 text-base font-light">전체 직원</p>
        <div className="h-36 bg-white rounded-[10px] px-5 pt-5 pb-3">
          <div className="flex">
            <div className="flex-1 ">
              <p className="text-[#1d1d1d] text-base/[24px] font-extrabold">
                전체 직원 수
              </p>
            </div>
            <div className="w-10 h-10 bg-[#f4f4f4] rounded-full px-3 py-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M8 2C9.1 2 10 2.9 10 4C10 5.1 9.1 6 8 6C6.9 6 6 5.1 6 4C6 2.9 6.9 2 8 2ZM8 11C10.7 11 13.8 12.29 14 13V14H2V13.01C2.2 12.29 5.3 11 8 11ZM8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8C10.21 8 12 6.21 12 4C12 1.79 10.21 0 8 0ZM8 9C5.33 9 0 10.34 0 13V16H16V13C16 10.34 10.67 9 8 9Z"
                  fill="#CFCFCF"
                />
              </svg>
            </div>
          </div>
          <p className="mt-7 font-['Roboto'] text-[#0833a0] text-right text-3xl ">
            {usedata?.center.staffCount}
          </p>
        </div>
      </div>
    </div>
  );
}
