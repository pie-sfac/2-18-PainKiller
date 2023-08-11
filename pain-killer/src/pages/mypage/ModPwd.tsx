import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import instance from "../../api/axios_interceptors";

interface MyPage {
  id: string;
  loginId : string;
}

function ModPwd() {
  
  const {userId} = useParams();

  const [userData, setUserData] = useState<MyPage>();

  const [loginId, setLoginId] = useState('');
  const [pwd, setPwd] = useState('');
  const [pwdConfirm, setPwdConfirm] = useState('');

  const getUserData = async () => {

    try {
    const response = await instance.get(`/me`)
    setUserData(response.data);
    setLoginId(response.data.loginId);
    }
    catch (error) {
    }

  };

  useEffect(() => {
    getUserData();
  }, []);


  const onChangePwdHandler = (e : React.FormEvent) => {
    e.preventDefault();

  }


  return (
    <div className="flex flex-col p-3">
      <h1 className="text-2xl font-extrabold">임시 비밀번호 변경</h1>
      
      <form
        onSubmit={onChangePwdHandler}
        className="mt-10 flex flex-col text-left"
      >
        <div className="mb-5">
          <p className="text-sm text-[#1D1D1D]">
            아이디
            <span className="text-[#2D62EA]">*</span>
          </p>
          <div className="mt-1 w-full px-4 py-2 rounded border-solid border-[1.5px] border-[#CFCFCF)] bg=[#F4F4F4] text-[#AEAEAE]">
            {loginId}
          </div>
        </div>
        
        <div className="mb-5">
          <p className="text-sm text-[#1D1D1D]">
            비밀번호<span className="text-[#2D62EA]">*</span>
          </p>
          <input
            className="mt-1 w-full px-4 py-2 rounded border-solid border-[1.5px] border-[#CFCFCF)]"
            type="text"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            placeholder="새로운 비밀번호를 입력해주세요"
            required
          />
        </div>
        <div className="mb-5">
          <p className="text-sm text-[#1D1D1D]">
            비밀번호 확인<span className="text-[#2D62EA]">*</span>
          </p>
          <input
            className="mt-1 w-full px-4 py-2 rounded border-solid border-[1.5px] border-[#CFCFCF)]"
            type="text"
            value={pwdConfirm}
            onChange={(e) => setPwdConfirm(e.target.value)}
            placeholder="비밀번호 확인란입니다."
            required
            />
        </div>
        <button
          className="mt-10 py-3 px-4 rounded disabled:text-[#aeaeae] disabled:bg-[#f4f4f4] enabled:text-white enabled:bg-[#2d62ea]">
          확인
        </button>
      </form>
    </div>
  );
}

export default ModPwd;
