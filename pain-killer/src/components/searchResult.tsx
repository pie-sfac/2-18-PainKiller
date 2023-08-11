import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
//import SearchBar from '../components/search';
import Profile from '../assets/Profile_24px.svg';
import BackImage from '../img/Back_24px 2.svg';
import instance from '../api/axios_interceptors';

export default function SearchResult() {
  // interface IEmpSearch {
  //   searchParam: { query: string; resources: [] };
  //   members: IEmpMembersList[];
  //   users: IEmpUserhList[];
  //   message: string;
  // }

  interface IEmpMembersList {
    id: number;
    name: string;
    phone: string;
    sex: string;
    // birthDate: string;
    // createdAt: string;
    // updatedAt: string;
    // visitedAt: string;
  }
  interface IEmpUserhList {
    id: number;
    type: string;
    loginId: string;
    name: string;
    phone: string;
    // isActive: boolean;
    // createdAt: string;
    // updatedAt: string;
    // lastLoginedAt: string;
  }

  const [empMembersList, setEmpMembersList] = useState<IEmpMembersList[]>();
  const [empUserList, setEmpUserList] = useState<IEmpUserhList[]>();

  const location = useLocation();
  const navigate = useNavigate();

  const onPrevious = () => {
    navigate(-1);
  };
  
  const getSearchEmp = async () => {
    try {
      const response = await instance.get(`/search?query=${location.state.value}`)

      setEmpUserList(response.data.users)
      setEmpMembersList(response.data.members);
      
    } catch (error: any) {
      alert(error);
    }
  };

  useEffect(() => {
    getSearchEmp();
  }, []);

  return (
    <div className="w-full h-screen bg-[#f4f4f4] px-4 py-3">
      <header>
        <nav>
          <div className="cursor-pointer" onClick={onPrevious}>
            <img src={BackImage} alt="Back" />
          </div>
        </nav>
      </header>
      {/* <div className="px-1">
        <SearchBar />
      </div> */}

      <div className="flex flex-col gap-2 h-[600px] overflow-y-auto ">
        <p className="mb-1 text-left text-sm text-[#aeaeae] mt-5">
          검색결과: "{location.state.value}"
        </p>
        
        {/* 삼항연산자 부분 and연산자(&&)로 수정  */}
        {empMembersList &&
          empMembersList.map((emp) => (
            <div
              key={emp.id}
              className="mb-1 flex flex-col bg-[#FFFFFF] rounded-[4px] w-full px-[10px] py-3 gap-2"
            >
              <div className="flex justify-between">
                <div className="flex gap-3">
                  <img src={Profile} alt="프사" />
                  <div className='bg-[#F4F4F4] text-[#6691FF] px-2 rounded'>회원</div>
                  <span className="font-bold">{emp.name}</span>
                </div>
                <span>{emp.phone}</span>
              </div>
            </div>
          ))}

        {empUserList &&
          empUserList.map((emp) => (
            <div
              key={emp.id}
              className="mb-1 flex flex-col bg-[#FFFFFF] rounded-[4px] w-full px-[10px] py-3 gap-2"
            >
              <div className="flex justify-between">
                <div className="flex gap-3">
                  <img src={Profile} alt="프사" />
                  <div className='bg-[#F4F4F4] text-[#6691FF] px-2 rounded'>직원</div>
                  <span className="font-bold">{emp.name}</span>
                </div>
                <span>{emp.phone}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
