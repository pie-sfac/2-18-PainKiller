import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import BackImage from '../../img/Back_24px.svg'
import instance from '../../api/axios_interceptors';
import InfoEdit from '../../assets/Edit_24px.svg';
import Profile from '../../assets/Profile edit_48px.png';
import profileImg from '../../assets/Profile_24px.svg';
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

interface Memdetail {
    id: number,
    name: string,
    phone: string,
    job: string,
    birthDate: string,
    sex: string,
    acqusitionFunnel: string,
    acquisitionFunnel: string,
    visitedAt: string,
    createdAt: string,
    updatedAt: string
}


const MemDetail = () => {
  const { useData } = useParams();

  const [memContent, setMemContent] = useState<Memdetail>();

  const navigate = useNavigate();

  const onPrevious = () => {
    navigate(-1);
  }


  const getMemDetail = async () => {
    try{
      const indicate = await instance.get(`/members/${useData}`)
      setMemContent(indicate.data)
      console.log(indicate);
    }catch(error){
      alert(error);
    }
  }

  useEffect(() => {
    getMemDetail();
  }, [])
  
  const [activeTab, setActiveTab] = React.useState("html");

  const table = [
    {
      label: "기록지",
      value: "기록지",
      desc: `It really matters and then like it really doesn't matter.
      What matters is the people who are sparked by it. And the people 
      who are like offended by it, it doesn't matter.`,
    },
    {
      label: "알림메시지",
      value: "알림메시지",
      desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
    },
    {
      label: "앨범",
      value: "앨범",
      desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
    },
  ];

  return(
    <>

      <header className="bg-white border-b border-t-neutral-100">
        <nav className="flex p-5">
            <div className="flex justify-between items-center cursor-pointer" onClick={onPrevious}>
              <img src={BackImage} alt="Back" />
              <p className="text-lg ml-2">회원 정보</p>
            </div>
        </nav>
      </header>

      {
        memContent &&
        <div className='p-2 gap 5'>
          <div className='flex justify-between'>
            <div className='flex gap-2 items-center'>
              <span className='font-semibold'>회원정보</span>
            </div>
            <div className='flex gap-2 items-center'>
              <span className='text -[6px] text-[#000000]'>수강권/계약서</span> 
              <span className = 'text - [6px] text-[#000000] cursor-pointer'>알림메세지 보내기</span>
            </div>
          </div>

          {/* 칸이 작아서 그런건지 모르겠지만 figma처럼 만들다 보니 글자가 자꾸 아래로 내려와서 이렇게 만들긴 했음, 방법 강구해 보겠음(마진 문제?) */}
          <div className='border rounded flex flex-col p-2 gap-5 mb-4'>
            <div className='flex flex-row justify-between'>
              <div className='flex items-center gap-2'> 
                <img src={profileImg} alt='프사'/>
                <span className='text-[14px] text-[#808080]'>이름:</span>
                <span>{memContent.name}</span>
              </div>
              <div className='flex items-center justify-end'>
                <span className='text-[14px] text-[#808080]'>생년월일 : </span> 
                <span>{memContent.birthDate}</span>
              </div>
              <div className='flex items-center justify-end'>
                <div>
                  <Link to={`/modmem/${memContent.id}`}>
                    <img src={InfoEdit} alt = "정보수정 아이콘"/>
                  </Link>
                </div>
              </div>
            </div>
            <div className='flex justify-between'>
              <div className='flex items-center gap-2'>
                <span className='text-[14px] text-[#808080]'>등록일</span>
                <span className='text-[14px] text-[#000000]'>{memContent.visitedAt.slice(0,10)}</span>
              </div>
              <div className='felx items-center gap-2'>
                <span className='text-[14px] text-[#808080]'>성별 </span>
                <span className='text-[14px] text-[#000000]'>{memContent.sex}</span>
              </div>   
            </div>
            <div className='flex justify-between'>
              <div className='flex items-center gap-2'>
                <span className='text-[14px] text-[#808080]'>전화번호</span>
                <span className='text-[14px] text-[#000000]'>{memContent.phone}</span>
              </div>
              <div className='flex items-center gap-2'>
                <span className='text-[14px] text-[#808080]'>직업형태</span>
                <span className='text-[14px] text-[#000000]'>{memContent.job}</span>
              </div>
            </div>
          </div>
        </div>
      }
      <Tabs value={activeTab}>
      <TabsHeader
        className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
        indicatorProps={{
          className:
            "bg-transparent border-b-2 border-blue-500 shadow-none rounded-none",
        }}
      >
        {table.map(({ label, value }) => (
          <Tab
            key={value}
            value={value}
            onClick={() => setActiveTab(value)}
            className={activeTab === value ? "text-blue-500" : ""}
          >
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {table.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
    </>
  )
}



export default MemDetail;