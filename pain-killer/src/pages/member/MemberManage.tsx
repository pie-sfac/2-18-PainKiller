import SearchBar from '../../components/search';
import Profile from '../../assets/Profile_24px.svg';
import { useEffect, useState } from 'react';
import instance from '../../api/axios_interceptors';
import { Link } from "react-router-dom";
//branch

interface IMembersList {
  id: number;
  name: string;
  phone: string;
  sex: string;
  birthDate: string;
  createdAt: string;
  updatedAt: string;
  visitedAt: string;
}

const MemberManage = () => {
  const [empTotalCount, setEmpTotalCount] = useState(0);
  const [empMembersManageList, setEmpMembersManageList] = useState<IMembersList[]>();

  const getMemberEmp = async () => {
    try {
      const res = await instance.get('/members');

      setEmpTotalCount(res.data.meta.totalCount);
      setEmpMembersManageList(res.data.datas);
      
      console.log(res);
    } catch (error: any) {
      alert(error);
    }
  };

  useEffect(() => {
    getMemberEmp();
  }, []);

  return (
    <div className="flex flex-col items-center bg-[#F4F4F4] p-2 gap-3 h-[600px] overflow-y-auto">
      <SearchBar />
      <div className="flex justify-between items-center w-full">
        <span>
          전체 회원
          <span className="text-[#2D62EA]"> {empTotalCount}</span>
        </span>
        <Link to = '/addmember'>
          <div className="border rounded-[10px] py-1 px-[10px] text-[12px]">등록하기</div>
        </Link>
      </div>
      <div className='w-full flex flex-col gap-3 h-[500px] overflow-y-auto'>
        {empMembersManageList &&
          empMembersManageList.map((emp) => (
            <div className="flex flex-col bg-[#FFFFFF] rounded-[4px] w-full px-[10px] py-3 gap-2" key={emp.id}>
              <div className="flex justify-between">
                
                  <Link to={`${emp.id}`} className='flex gap-3'>
                    <img src={Profile} alt="프사" />
                    <span className="font-bold">{emp.name}</span>
                  </Link>
              
                <span className='font-bold'>{emp.sex === 'MALE' ? '남' : '여'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className='rounded-[4px] bg-[#F4F4F4] px-[10px] py-1 text-[#505050]'>생년월일</span>
              
                <span>{emp.birthDate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="rounded-[4px] bg-[#F4F4F4] px-[10px] py-1 text-[#505050]">
                  최근 방문일
                </span>
                <span>{emp.visitedAt.slice(0,10)}</span>
              </div>
            </div>
          ))}
        </div>
    </div>
  );
};

export default MemberManage;
