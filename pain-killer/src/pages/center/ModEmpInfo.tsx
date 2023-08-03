import React, {useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import instance from "../../api/axios_interceptors"
import BackImage from '../../img/Back_24px.svg'
import Profile from '../../assets/Profile edit_48px.png';

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

}

const ModEmpInfo = () => {
    const {userId} = useParams();
   

    const navigate = useNavigate();

    const [empContent, setEmpContent] = useState<IEmpContent>();
    const [empName, setEmpName] = useState("");
    const [phoneNum, setPhoneNum] = useState("");

    const getEmpDetail = async () => {

      try {
        const res = await instance.get(`/staffs/${userId}`);

        setEmpContent(res.data);
                  
        setEmpName(res.data.name);
        setPhoneNum(res.data.phone);

        } catch (error) {
          alert(error);
        }
    
      }
    
      useEffect(()=> {
        getEmpDetail();
      }, [])

    const onEmpNameChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setEmpName(event.target.value)
    }
    const onPhoneNumChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNum(event.target.value);
    }
    
      const onModEmpInfoHandler = async(e : React.FormEvent) => {
        e.preventDefault();

       try {
        const res = await instance.put(`/staffs/${userId}`, {
          name : empName,
          phone : phoneNum,
        });

        console.log(res);

        navigate('/centerInfo')
        
      } catch (error) {
          alert(error);
        }

      }

      const onPrevPage = () => {
        navigate(-1);
      }

      return(
        <div>
          <header className="bg-white border-b border-t-neutral-100">
                <nav className="flex p-5">
                    <div className="flex justify-between items-center cursor-pointer" onClick={onPrevPage}>
                      <img src={BackImage} alt="Back" />
                      <p className="text-lg ml-2">직원 정보 수정</p>
                    </div>
                </nav>
            </header>
            {empContent &&
              <div className="flex flex-col gap-5 mt-5 p-2">
                <div className="flex rounded border p-5 items-center gap-5">
                  <img src = {Profile} alt="프로필"/>
                  <span>{empContent.name} (재직중)</span>
                </div>

                <span className="font-bold"> 직원 정보</span>

                <form className="flex flex-col gap-5" onSubmit={onModEmpInfoHandler}>
                    
                    <span className="text-left">이름</span>
                    <input 
                        className="p-2 border rounded"
                        value={empName} 
                        type="text"
                        onChange={onEmpNameChange}/>
                    
                    <span className="text-left">휴대폰 번호</span>
                    <input 
                        className="p-2 border rounded"
                        value={phoneNum} 
                        type="text"
                        onChange={onPhoneNumChange}/>

                    <span className="text-left">아이디</span>
                    <div className="rounded border text-[#AEAEAE] bg-[#F4F4F4] text-left p-2">{empContent.loginId}</div>

                    <button className="rounded mt-5 p-3 text-[#AEAEAE] bg-[#F4F4F4] hover:text-[#FFFFFF] hover:bg-[#2D62EA]">저장</button>
                </form>

            </div>
            
            }
            
        </div>
      )
}

export default ModEmpInfo;
