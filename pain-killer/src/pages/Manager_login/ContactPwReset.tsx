import React, {useState, useEffect} from 'react';
import ManagerFindHeader from '../../components/ManagerFindAccount';
import { useNavigate } from 'react-router-dom';
import instance from "../../api/axios_interceptors"
import BackImage from '../../img/Back_24px.svg'


//아래의 모든 코드들은 임시비밀번호 변경을 구현하기 위해 쓴 코드들입니다. 

export default function PwReset(){
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const acceess_Token = localStorage.getItem('access_token')

  const [hashKey, setHashKey] = useState('');
  const [loginId, setLoginId] = useState('');


  const onPasswordChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }
  const onConfirmPasswordChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event?.target.value);
  }

  const gethashKeyOthers = async () => {

    //http://223.130.161.221/api/v1/me 질문 -- 원래 API에 change-password도 있었는데 지금 API목록 가보니까 안보입니다. 
    try {
      // Perform the API call using fetch or any other library (e.g., axios)
      const response = await fetch("http://223.130.161.221/api/v1/me", {
        method: "GET",
        headers: {
          // Add any required headers (e.g., authorization token) here
          'Authorization' : `Bearer ${acceess_Token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const data = await response.json();

      setHashKey(data.hashKey);
      setLoginId(data.loginId);
      console.log(data);
    } catch (error) {
      console.error("Error fetching user data:", error);

    }
  };

  useEffect(() => {
    gethashKeyOthers();
  }, []);

 

 const onPasswordChangeHandler = async (event : React.FormEvent) =>{
   event.preventDefault();
   try {
    // 비밀번호 변경 api
    const pwdchange = await fetch("http://223.130.161.221/api/v1/me/change-password", {
      method: "POST", 
      headers: {
        "Authorization": `Bearer ${acceess_Token}`,
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({
        hashKey : hashKey,
        password : password,
        confirmPassword : confirmPassword
      })
    });

    const result = await pwdchange.json();

    console.log(result);


    if(pwdchange.ok){
      console.log("비밀번호 변경 성공!");
      navigate("/");
    } else{
      console.log("비밀번호 변경 실패!");
    }

    
   } catch (error) {
     alert(error);
   }
 }


  return(
    <>
      <header className="bg-white border-b border-t-neutral-100">
        <nav className="flex p-5">
          <div className="flex justify-between items-center">
            <img src={BackImage} alt="Back" />
            <p className="text-lg ml-2">비밀번호 변경</p>
          </div>
        </nav>
      </header>
      <div className="flex  justify-center ">
        <div className=" p-8 ">
          <div className="text-center mb-10">
            임시비밀번호 변경 
          </div>
          <form className="space-y-2 text-left mb-2">
            <span className="block font-medium">아이디</span>
            <input
             type="id"
             value={loginId}
             className="blck w-full rounded border px-4 py-3 border-gray-300 bg-gray-100"
             style={{ color: 'gray' }}
            />
          </form>
          <form className="space-y-2 text-left mb-2" onSubmit={onPasswordChangeHandler}>
            <span className="block font-medium">변경할 비밀번호(pin)</span>
            <input
              type="password"
              value={password}
              onChange={onPasswordChange}
              className="block w-full rounded border px-4 py-3 border-Gray-300 "
            />
            <p className='text-xs text-Gray-400'>4~6자리 숫자로 구성해 주세요.</p>
          
            <div className="space-y-2 text-left mb-52">
              {/* 왼쪽 정렬된 비밀번호 확인 */}
              <span className="block font-medium">변경할 비밀번호 재확인 (pin)</span>
              <input
                type="password"
                value={confirmPassword}
                onChange={onConfirmPasswordChange}
                className="block w-full rounded border px-4 py-3 border-Gray-300"
              />
            </div>
            <div className="flex justify-between mt-52">
              <button className="hover:bg-Pri-500 hover:text-white bg-gray-100  text-Gray-400 py-3 px-4 rounded  w-full">
                확인
              </button>
            </div>
          </form>
        </div>
        
      </div>

    </>
  )
}