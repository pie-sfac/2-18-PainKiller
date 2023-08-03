import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const ChangePwd = () => {

    // 비밀번호 변경 완료 시 이동할 페이지를 useNavigate를 이용해서 설정한다.
    const navigate = useNavigate();

    // 로그인 시 받아온 토큰 값을 로컬스토리지 이용하여 받아온다.
    const access_Token = localStorage.getItem('access_token');

    // input 태그(비밀번호 및 비밀번호 확인)의 value 값이 될 
    // 상태값을 선언
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // password, confirmPassword의 onChage 함수
    const onPasswordChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }
    const onConfirmPasswordChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
    }

    /* 
        hashKey(비밀번호 변경 구현하기 위해 필요)와 
        loginId(피그마 디자인 페이지에 logId가 표시되어 있으므로 웹페이지 띄워두도록 하기위해) 상태값 선언
    */
        const [hashKey, setHashKey] = useState('');
        const [loginId, setLoginId] = useState('');

    // fetch 방식(내정보조회 API 이용)으로 hashKey와 loginId 필드값을 받아옴
    const getMyInfo = async () => {

        try {
            // Perform the API call using fetch or any other library (e.g., axios)
            const response = await fetch("http://223.130.161.221/api/v1/me", {
              method: "GET",
              headers: {
                'Authorization' : `Bearer ${access_Token}`,
                'Content-Type': 'application/json',
              },
            });
      
            const data = await response.json();

            setHashKey(data.hashKey);
            setLoginId(data.loginId);     


          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        
    }

    // useEffect를 이용하여 해당 컴포넌트 렌더링 시 getMyInfo 함수 실행되도록함.
    useEffect(() => {
        getMyInfo();
      }, []);

    /* 
        fetch 방식(내 비밀번호 변경 API 이용)으로 
        getMyInfo 함수를 통해 받아온 hashKey값과
        input 태그를 통해 받아온 password, confirmPassword 값을 request body에 json형식으로 
        담아 비밀번호 변경 기능 구현
    */
    const onPasswordChangeHandler = async (e : React.FormEvent) => {
        e.preventDefault();

        try{

            const res = await fetch(`http://223.130.161.221/api/v1/me/change-password`, {
              method: 'POST',
              headers: {
                "Authorization" : `Bearer ${access_Token}`,
                "Content-Type"  : "application/json",
              },
              body: JSON.stringify({
                hashKey: hashKey,
                password : password,
                confirmPassword : confirmPassword
              })
            });

            const result = await res.json();
                
                // console.log를 이용하여 result 값을 확인
                console.log(result)
                
                /*  
                    비밀번호 변경 완료 시
                    navigete를 이용해 이동할 페이지를 설정("알아서 설절해주세요") 
                 */

    
        } catch (error) {
          alert(error);
        }

    }

    // input 태그 type = 'text' 추후 password로 변경 필요
    return(
        <div>
            <div>
                loginId : {loginId}
            </div>
            <form className="flex flex-col" onSubmit={onPasswordChangeHandler}>
                <span>비밀번호</span>
                <input
                    type = 'text'
                    value = {password}
                    onChange={onPasswordChange}/>
                <span>비밀번호 확인</span>
                <input
                    type = 'text'
                    value = {confirmPassword}
                    onChange={onConfirmPasswordChange}/>
                <button>완료</button>
            </form>
        </div>
    )
}

export default ChangePwd;