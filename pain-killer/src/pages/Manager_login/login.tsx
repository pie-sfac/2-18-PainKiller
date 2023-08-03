import React, { useState } from 'react';
import VisibilityON from '../../img/Visibility_24px.svg'; // 아이콘 이미지 경로
import VisibilityOFF from '../../assets/Hide_password.svg';
import { useNavigate } from 'react-router-dom';
import Home from '../home/home';
import NavBar from '../../components/layout/NavBar';
import FooterBar from '../../components/layout/FooterBar';

const LoginPage = () => {

  const [adminLogin, setAdminLogin] = useState(true);  

  const onAdminLogin = () => {
    setAdminLogin(true);
  }

  const onEmpLogin = () =>{
    setAdminLogin(false);
  }

  const [visible, setVisible] = useState(false);
  // 비밀번호 표시여부
  const onVisibleToggle = () => {
    setVisible((prev) => !prev);
  }
  const navigate = useNavigate();

  const [centerCode, setCenterCode] = useState("");

  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");

  const onIdChange = (event : any) => {
    setId(event.target.value)
  }
  const onPwdChage = (event : any) => {
    setPwd(event.target.value);
  }
  const onCodeChage = (event : any) => {
    setCenterCode(event.target.value);
  }


  // 전역상태로 토큰값을 가지고 있어야 함.(상태 선언) 

  // 관리자 로그인 로직
  const onAdminLoginSubmit = (event : React.FormEvent) =>{
    event.preventDefault();

    try {
      
        fetch("http://223.130.161.221/api/v1/admins/login", {
          method: 'POST',
          headers: {
            "Authorization" : `Basic ${btoa(id + ":" + pwd)}`,
          },
          body: JSON.stringify({
            username: id,
            password: pwd,
          }),
        }).then((response) => response.json())
          .then((result) => {

            

            if(result.accessToken !== undefined) {
               // 로컬스토리지에 access토큰 값 저장
              localStorage.setItem('access_token', result.accessToken)
              localStorage.setItem('refresh_token', result.refreshToken)

              alert(result.message);

              navigate('/')

            }else{
              alert(result.message);
            }

            console.log(result);
            console.log(result.accessToken);
            console.log(result.refreshToken);
            
           }
        )
    } catch (error : any) {
      alert(error);
    }
  }

  // 직원 로그인 로직
  const onEmpLoginSubmit = (event : React.FormEvent) =>{

    event.preventDefault();

    try {
      
        fetch(`http://223.130.161.221/api/v1/staffs/login?centerCode=${centerCode}`, {
          method: 'POST',
          headers: {
            "Authorization" : `Basic ${btoa(id + ":" + pwd)}`,
          },
          body: JSON.stringify({
            username: id,
            password: pwd,
          }),
        }).then((response) => response.json())
          .then((result) => {
            if(result.accessToken !== undefined) {
              // 로컬스토리지에 access토큰 값 저장
              localStorage.setItem('access_token', result.accessToken)
              // 로컬스토리지에 refresh토큰 값 저장
              localStorage.setItem("refresh_token", result.refreshToken);

              alert(result.message);

              navigate('/')

            }else{
              alert(result.message);
            }


            console.log(result);
            console.log(result.accessToken);
            
           }
        )
    } catch (error : any) {
      alert(error);
    }
  }

  const accessToken = localStorage.getItem('access_token');


  return (
    <>
    {accessToken ?  
    (
      <>
        <NavBar/>
        <Home/>
        <FooterBar/>
      </>
    )
      :
    (
      <div className="flex flex-col items-center p-5">

      <div className="my-10 font-bold text-3xl text-Pri-500">Point T</div>

      <div className="flex justify-start w-64">
        <div
          onClick={onAdminLogin} 
          className={
            adminLogin ? 
            "border-b-2 py-2 px-3 border-Pri-300 text-Pri-300 font-semibold " :
            "border-b-2 py-2 px-3 text-Gray-400 font-semibold"
            }
          >
            관리자 로그인
        </div>
        <div
          onClick={onEmpLogin} 
          className={
            adminLogin ? 
            "border-b-2 py-2 px-3 text-Gray-400 font-semibold" :
            "border-b-2 py-2 px-3 border-Pri-300 text-Pri-300 font-semibold "
          }>
            직원 로그인
        </div>
      </div>

      <form 
        onSubmit={adminLogin ? onAdminLoginSubmit : onEmpLoginSubmit}
        className="flex flex-col items-start w-full mt-6">

        {
          !adminLogin && 
          <>
            <div className="mb-1">센터 코드</div>
            <input
              className="w-full h-8 px-4 py-2 border border-Gray-300 rounded focus:outline-none"
              type="number"
              value={centerCode}
              onChange={onCodeChage}
              placeholder='2300862'
            />
          </>
        }

        <div className="mt-6 mb-1">아이디</div>
        <input
          className="w-full h-8 px-4 py-2 border border-Gray-300 rounded focus:outline-none"
          type="text"
          value={id}
          onChange={onIdChange}
        />

        <div className="mt-6 mb-1">비밀번호</div>
        <div className="flex items-center w-full border border-Gray-300 rounded">
          <input
            className="w-full h-8 px-4 py-2 rounded focus:outline-none"
            type={visible ? "text" : "password"}
            value={pwd}
            onChange={onPwdChage}
          />
          <img
            src={visible ? VisibilityON : VisibilityOFF}
            alt="icon"
            onClick={onVisibleToggle}
            className="w-6 h-6 cursor-pointer mx-3"
          />
        </div>

        <div className="flex w-64 mt-2">
          <button className='text-sm text-Gray-700 mr-1'>아이디 찾기</button>
          <span className='text-sm text-Gray-700'>/</span>
          <button className='text-sm text-Gray-700 ml-1'>비밀번호 찾기</button>
        </div>

        <div className='flex flex-col items-center w-full'>
          <div className="mt-24 mb-4 text-Gray-700">포인티 계정이 없으세요? | 회원가입</div>
          <button className="w-full h-10 p-2 bg-Gray-100 text-Gray-400 hover:bg-Pri-500 hover:text-white rounded">
            로그인
          </button>
        </div>
        
      </form>
        
    </div>
      )
    }
    </>
    
  );
};

export default LoginPage;
