import React, {useEffect, useState} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import BackImage from '../../img/Back_24px.svg'
import InfoEdit from '../../assets/Edit_24px.svg';
import instance from '../../api/axios_interceptors';
import Profile from '../../assets/Profile edit_48px.png';
import profileImg from '../../assets/Profile_24px.svg';
import EmptyPerson from '../../assets/Empty_person.svg'

interface IEmpContent {
  
    id : number, 
    type : string,
    name : string,
    phone : string,
    active : boolean,
    createdAt: string,
    updatedAt : string,
    loginId: string,
    memo: string,
    pwdChangeRequired: boolean,
    lastLoginedAt : string,
    roles : IRoles[],

    members : IMember[],
    prescriptionReviews : IReview[],

}

interface IRoles{
  id: number,
  name: string
}

interface IMember {
        id: number,
        name: string,
        phone: string,
        sex: string,
        birthDate: string,
        createdAt: string,
        updatedAt: string,
        visitedAt: string,
}

interface IReview {
        id: number,
        privateTutor: {
          id : number,
          name : string
        },
        member: {
          id: number,
          name : string,
          phone : string
        },
        rating : number,
        content : string,
        createdAt : string
}


const EmpDetail = () => {

    const {userId} = useParams();

    const navigate = useNavigate();

    const [empContent, setEmpContent] = useState<IEmpContent>()

    const onPrevPage = () => {
      navigate(-1);
    }

    // 
    const getEmpDetail = async () => {


      try {
          const res = await instance.get(`/staffs/${userId}`);

          setEmpContent(res.data);

      } catch (error) {
        alert(error);
      }
    
  }

  useEffect(()=> {

    getEmpDetail();

  }, [])



    

    return(
        <>
            <header className="bg-white border-b border-t-neutral-100">
                <nav className="flex p-5">
                    <div className="flex justify-between items-center cursor-pointer" onClick={onPrevPage}>
                      <img src={BackImage} alt="Back" />
                      <p className="text-lg ml-2">직원 상세</p>
                    </div>
                </nav>
            </header>
           
            {
              empContent &&
              <div className='flex flex-col gap-5 p-2'>
                <div className='flex justify-between'>
                  <div className='flex gap-2 items-center'>
                    <span>직원 정보</span>
                    <span className='text-[10px] text-[#AEAEAE]'>{empContent.createdAt.slice(0,10)} 등록(재직중)</span>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <Link to = {`/modrole/${userId}`}>
                      <span className='text-[10px] text-[#AEAEAE] cursor-pointer'>권한 설정</span>
                    </Link>
                    {empContent.pwdChangeRequired && <span className='text-[10px] text-[#AEAEAE] cursor-pointer'>비밀번호 변경</span>}
                    <span className='text-[10px] text-[#AEAEAE] cursor-pointer'>직원 퇴사</span>
                  </div>
                </div>
                <div className='border rounded flex items-center p-2 justify-between'>
                  <div className='flex items-center gap-2'>
                    <img src={Profile} alt='프사'/>
                    <span className='text-[#2D62EA]'>{empContent.name}</span>
                    <span className='text-[10px]'>{empContent.phone}</span>
                    <span className='text-[10px]'>{empContent.loginId}</span>
                  </div>
                  <Link to={`/modemp/${empContent.id}`}>
                  <img src={InfoEdit} alt = '내정보 수정'/>
                  </Link>                  
                </div>
                <div className='flex justify-start'>
                  <span>나의 회원 리스트 <span className='text-[#2D62EA]'>{empContent.members.length}</span></span>
                </div>
                <div className='flex flex-col justify-center items-center h-[350px]'>
                  <img className='w-[48px] h-[48px]' src={EmptyPerson} alt = '빈회원'/>
                  <span>배정된 회원이 없습니다.</span>
                </div>
                <div className='flex flex-col h-[575px]'>
                  <div className='border rounded flex flex-col p-2 gap-2 mb-5'>
                    <div className='flex justify-between'>
                      <div className='flex gap-2'>
                        <img src={profileImg} alt='프사'/>
                        <span>김회원(회원이 있다면)</span>
                      </div>
                      <div>
                        <span>여</span>
                      </div>
                    </div>
                    <div className='flex justify-between'>
                      <span>22.00.00~22.00.00</span>
                      <span>100/100회 </span>
                    </div>
                    <div className='flex justify-between'>
                      <div className='flex items-center gap-2'>
                        <span>담담 강사</span>
                        <div className='bg-[#F4F4F4] text-[#505050] rounded p-1'>김파이</div>
                      </div>
                      <div className='flex items-center gap-2'>
                        <span>최근 방문일</span>
                        <span className='text-[10px] text-[#AEAEAE]'> 2022.00.00</span>
                      </div>  
                    </div>
                  </div>

                  <div className='border rounded flex flex-col p-2 gap-2 mb-5'>
                    <div className='flex justify-between'>
                      <div className='flex gap-2'>
                        <img src={profileImg} alt='프사'/>
                        <span>김회원(회원이 있다면)</span>
                      </div>
                      <div>
                        <span>여</span>
                      </div>
                    </div>
                    <div className='flex justify-between'>
                      <span>22.00.00~22.00.00</span>
                      <span>100/100회 </span>
                    </div>
                    <div className='flex justify-between'>
                      <div className='flex items-center gap-2'>
                        <span>담담 강사</span>
                        <div className='bg-[#F4F4F4] text-[#505050] rounded p-1'>김파이</div>
                      </div>
                      <div className='flex items-center gap-2'>
                        <span>최근 방문일</span>
                        <span className='text-[10px] text-[#AEAEAE]'> 2022.00.00</span>
                      </div>  
                    </div>
                  </div>
                </div>

                <div className='flex justify-between items-center'>
                  <span>메모</span>
                  <span className='text-[#AEAEAE] text-[10px]'>최근 업데이트 {empContent.updatedAt.slice(0, 10)}</span>
                </div>
                
                <div className='flex flex-col items-start border rounded bg-[#F4F4F4] text-[#505050] h-[100px] p-2 items-left'>
                  { empContent.roles.length === 0 ?
                    <div>일반 직원(기본)</div>
                    :
                    empContent.roles.map((role) => (
                      <div key={role.id}>
                        <div> {role.name} </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            }
        </>
    )
}

    


export default EmpDetail;