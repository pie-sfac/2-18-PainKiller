import React, { Fragment, useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';

import instance from '../../api/axios_interceptors';
import BackImage from '../../img/Back_24px.svg';


interface Modificate_mem {
  name: string;
  birthDate: string;
  phone: string;
  sex: string;
  job: string;
  acquisitionFunnel: string;
}



const ModMemInfo = () => {
  const { userId } = useParams();

  const [jobSelected, setJobSelected] = useState();
  const [pathSelected, setPathSelected] = useState();

  const [memContent, setMemContent] = useState<Modificate_mem>();
  const [memName, setMemName] = useState('');
  const [memBirthdate, setMemBirthdate] = useState('');
  const [memPhone, setMemPhone] = useState('');
  const [memSex, setMemSex] = useState('');
 

  const navigate = useNavigate();

  const onPrevious = () => {
    navigate(-1);
  };

  const getMemDetail = async () => {
    //get부분으로 가져오는 모습
    try {
      const show = await instance.get(`/members/${userId}`);
      setMemContent(show.data);
      setMemName(show.data.name);
      setMemBirthdate(show.data.birthDate);
      setMemPhone(show.data.phone);
      setMemSex(show.data.sex);
      setJobSelected(show.data.job);
      setPathSelected(show.data.acquisitionFunnel);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getMemDetail();
  }, []);

  const onMemNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMemName(event.target.value);
  };

  const onMemBirthDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMemBirthdate(event.target.value);
  };

  const onMemPhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMemPhone(event.target.value);
  };

  const onMemSexChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMemSex(event.target.value);
  };

  const handleJobSelect = (e: any) => {
    setJobSelected(e.target.value);
   };
  const handlePathSelect = (e: any) => {
    setPathSelected(e.target.value);
  };

  

  // 회원 정보 수정
  const onMemInfoHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await instance.put(`/members/${userId}`, {
        name: memName,
        BirthDate: memBirthdate,
        phone: memPhone,
        sex: memSex,
        job: jobSelected,
        acquisitionFunnel: pathSelected,
      });

      console.log(
        `${memName}, ${memBirthdate}, ${memPhone}, ${memSex}, ${jobSelected}. ${pathSelected} `, response
      );
      
      navigate(`/memberInfo/${userId}`);

    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="flex flex-col p-3">
      <header className="bg-white border-b border-t-neutral-100">
        <nav className="flex p-5">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={onPrevious}
          >
            <img src={BackImage} alt="Back" />
            <p className="text-lg ml-2">회원 정보</p>
          </div>
        </nav>
      </header>
      <h1 className="text-2xl font-extrabold mt-6">회원 정보</h1>
      <p className="text-sm text-[#1D1D1D]">등록된 회원 정보 입니다.</p>
      {memContent && (
        <>
          <form
            className="mt-10 flex flex-col text-left"
            onSubmit={onMemInfoHandler}
          >
            <div className="mb-2">
              <p className="text-sm text-[#1D1D1D]">
                이름
                <span className="text-[#2D62EA]">*</span>
              </p>
              <input
                className="mt-1 w-full px-4 py-2 rounded border-solid border-[1.5px] border-[#CFCFCF)]"
                type="text"
                value={memName}
                onChange={onMemNameChange}
                placeholder="이름을 입력해 주세요"
                required
              />
            </div>

            <p className="text-sm text-[#1D1D1D]">
              성별
              <span className="text-[#2D62EA]">*</span>
            </p>
            <ul className="flex mb-2">
              <li className="mr-1">
                <input
                  type="radio"
                  id="FEMALE"
                  name="gender"
                  value="FEMALE"
                  className="hidden peer"
                  onChange={onMemSexChange}
                  required
                  checked={memSex === 'FEMALE'}
                />
                <label
                  htmlFor="FEMALE"
                  className="inline-flex items-center justify-between px-4 py-2 text-[#1D1D1D] bg-white border-[1.5px] border-[#CFCFCF] rounded cursor-pointer peer-checked:border-[#4679FC] peer-checked:text-white peer-checked:bg-[#6691FF]"
                >
                  <div className="block">
                    <div className="font-semibold">여</div>
                  </div>
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="MALE"
                  name="gender"
                  value="MALE"
                  className="hidden peer"
                  onChange={onMemSexChange}
                  required
                  checked={memSex === 'MALE'}
                />
                <label
                  htmlFor="MALE"
                  className="inline-flex items-center justify-between px-4 py-2 text-[#1D1D1D] bg-white border-[1.5px] border-[#CFCFCF] rounded cursor-pointer peer-checked:border-[#4679FC] peer-checked:text-white peer-checked:bg-[#6691FF]"
                >
                  <div className="block">
                    <div className="font-semibold">남</div>
                  </div>
                </label>
              </li>
            </ul>
            {/* <input value={memSex} type="text" onChange={onMemSexChange} /> */}

            <div className="mb-2">
              <p className="text-sm text-[#1D1D1D]">
                생년월일<span className="text-[#2D62EA]">*</span>
              </p>
              <input
                className="mt-1 w-full px-4 py-2 rounded border-solid border-[1.5px] border-[#CFCFCF)]"
                type="text"
                value={memBirthdate}
                onChange={onMemBirthDateChange}
                placeholder="0000-00-00"
                required
              />
            </div>
            <div className="mb-2">
              <p className="text-sm text-[#1D1D1D]">
                휴대폰 번호<span className="text-[#2D62EA]">*</span>
              </p>
              <input
                className="mt-1 w-full px-4 py-2 rounded border-solid border-[1.5px] border-[#CFCFCF)]"
                type="text"
                value={memPhone}
                onChange={onMemPhoneChange}
                placeholder="000 - 0000 - 0000"
                required
              />
            </div>

            <div className="mb-2">
              <p className="text-sm text-[#1D1D1D]">직업</p>
              <div className="mt-1 w-full px-4 py-2 rounded border-solid border-[1.5px] border-[#CFCFCF)]">
                <select className="w-full" onChange={handleJobSelect} value={jobSelected}>
                  <option value="">선택해주세요</option>
                  <option value="사무직">사무직</option>
                  <option value="현장직">현장직</option>
                  <option value="가사노동자">가사노동자</option>
                  <option value="학생">학생</option>
                  <option value="무직">무직</option>
                  <option value="기타">기타 - 직접입력</option>
                </select>
              </div>
            </div>
            

            <div className="mb-2">
              <p className="text-sm text-[#1D1D1D]">방문 경로</p>
              <div className="mt-1 w-full px-4 py-2 rounded border-solid border-[1.5px] border-[#CFCFCF)]">
                <select className="w-full" onChange={handlePathSelect} value={pathSelected}>
                  <option value="">선택해주세요</option>
                  <option value="주변 추천">주변 추천</option>
                  <option value="오프라인 광고">오프라인 광고(배너, 현수막)</option>
                  <option value="SNS 광고">SNS 광고(페이스북, 인스타)</option>
                  <option value="네이버 지도">네이버 지도</option>
                  <option value="기타">기타 - 직접입력</option>
                </select>
              </div>
            </div>

            <button
              className="mt-10 py-3 px-4 rounded disabled:text-[#aeaeae] disabled:bg-[#f4f4f4] enabled:text-white enabled:bg-[#2d62ea]/75 enabled:hover:bg-[#2d62ea]"
            >
              수정
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default ModMemInfo;
