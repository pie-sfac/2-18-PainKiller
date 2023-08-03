import React, { Fragment, useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';

import instance from '../../api/axios_interceptors';
import BackImage from '../../img/Back_24px.svg';

const selectJob = [
  {
    id: 0,
    option: '선택하세요',
  },
  {
    id: 1,
    option: '사무직',
  },
  {
    id: 2,
    option: '현장직',
  },
  {
    id: 3,
    option: '가사노동자',
  },
  {
    id: 4,
    option: '학생',
  },
  {
    id: 5,
    option: '무직',
  },
  {
    id: 6,
    option: '기타',
  },
];

const selectPath = [
  {
    id: 0,
    option: '선택하세요',
  },
  {
    id: 1,
    option: '주변 추천',
  },
  {
    id: 2,
    option: '오프라인 관고 (배너, 현수막)',
  },
  {
    id: 3,
    option: 'SNS 광고 (페이스북, 인스타)',
  },
  {
    id: 4,
    option: '네이버 지도',
  },
  {
    id: 5,
    option: '기타',
  },
];

interface Modificate_mem {
  name: string;
  birthDate: string;
  phone: string;
  sex: string;
  job: string;
  acquisitionFunnel: string;
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const ModMemInfo = () => {
  const { userId } = useParams();
  const access_token = localStorage.getItem('access_token');
  const [jobSelected, setJobSelected] = useState(selectJob);
  const [pathSelected, setPathSelected] = useState(selectPath);

  const [memContent, setMemContent] = useState<Modificate_mem>();
  const [memName, setMemName] = useState('');
  const [memBirthdate, setMemBirthdate] = useState('');
  const [memPhone, setMemPhone] = useState('');
  const [memSex, setMemSex] = useState('');
  const [memJob, setMemJob] = useState('');
  const [memPath, setMemPath] = useState('');

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
      setMemJob(show.data.job);
      setMemPath(show.data.acquisitionFunnel);
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

  const onMemJobChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMemJob(event.target.value);
  };

  const onMemInfoHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      //put 부분(수정하는 부분)
      const response = await instance.put(`/members/${userId}`, {
        name: memName,
        BirthDate: memBirthdate,
        phone: memPhone,
        Sex: memSex,
        Job: selectJob.option,
        acquisitionFunnel: selectPath.option,
      });

      console.log(response);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="flex flex-col">
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
              <Listbox value={jobSelected} onChange={setJobSelected}>
                {({ open }) => (
                  <>
                    <div className="relative z-1">
                      <Listbox.Button className="relative cursor-default mt-1 w-full px-4 py-2 rounded border-solid border-[1.5px] border-[#CFCFCF] bg-white text-left focus:outline-none focus:ring-[1.5px] focus:ring-[#2d62ea] sm:leading-6">
                        <span className="flex items-center">
                          <span className="block truncate">
                            {jobSelected.option ? jobSelected.option : memJob}
                          </span>
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                          <ChevronDownIcon
                            className="mr-1 h-5 w-5"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>

                      <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute z-10 mt-1 max-h-65 w-full overflow-auto rounded border-solid border-[1.5px] border-[#CFCFCF] bg-white py-1 text-base font-bold focus:outline-none">
                          {selectJob.map((options) => (
                            <Listbox.Option
                              key={options.id}
                              className={({ active }) =>
                                classNames(
                                  active ? 'bg-[#BFD1FF]' : 'text-gray-900',
                                  'relative cursor-default select-none py-2 pl-3 pr-9',
                                )
                              }
                              value={options}
                            >
                              {({ selected, active }) => (
                                <>
                                  <div className="flex items-center">
                                    <span
                                      className={classNames(
                                        selected
                                          ? 'font-semibold'
                                          : 'font-normal',
                                        'ml-3 block truncate',
                                      )}
                                    >
                                      {options.option}
                                    </span>
                                  </div>

                                  {selected ? (
                                    <span
                                      className={classNames(
                                        active
                                          ? 'text-black'
                                          : 'text-[#BFD1FF]',
                                        'absolute inset-y-0 right-0 flex items-center pr-4',
                                      )}
                                    >
                                      <CheckIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </>
                )}
              </Listbox>
            </div>
            {/* <input value={memJob} type="text" onChange={onMemJobChange} /> */}

            <div className="mb-2">
              <p className="text-sm text-[#1D1D1D]">방문 경로</p>
              <Listbox value={pathSelected} onChange={setPathSelected}>
                {({ open }) => (
                  <>
                    <div className="relative z-0">
                      <Listbox.Button className="relative cursor-default mt-1 w-full px-4 py-2 rounded border-solid border-[1.5px] border-[#CFCFCF] text-left focus:outline-none focus:ring-[1.5px] focus:ring-[#2d62ea] sm:leading-6">
                        <span className="flex items-center">
                          <span className="block truncate">
                            {pathSelected.option
                              ? pathSelected.option
                              : memPath}
                          </span>
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                          <ChevronDownIcon
                            className="mr-1 h-5 w-5"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>

                      <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute z-10 mt-1 max-h-65 w-full overflow-auto rounded border-solid border-[1.5px] border-[#CFCFCF] bg-white py-1 text-base font-bold focus:outline-none">
                          {selectPath.map((options) => (
                            <Listbox.Option
                              key={options.id}
                              className={({ active }) =>
                                classNames(
                                  active ? 'bg-[#BFD1FF]' : 'text-gray-900',
                                  'relative cursor-default select-none py-2 pl-3 pr-9',
                                )
                              }
                              value={options}
                            >
                              {({ selected, active }) => (
                                <>
                                  <div className="flex items-center">
                                    <span
                                      className={classNames(
                                        selected
                                          ? 'font-semibold'
                                          : 'font-normal',
                                        'ml-3 block truncate',
                                      )}
                                    >
                                      {options.option}
                                    </span>
                                  </div>

                                  {selected ? (
                                    <span
                                      className={classNames(
                                        active
                                          ? 'text-black'
                                          : 'text-[#BFD1FF]',
                                        'absolute inset-y-0 right-0 flex items-center pr-4',
                                      )}
                                    >
                                      <CheckIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </>
                )}
              </Listbox>
            </div>

            <button
              className="mt-10 py-3 px-4 rounded disabled:text-[#aeaeae] disabled:bg-[#f4f4f4] enabled:text-white enabled:bg-[#2d62ea]/75 enabled:hover:bg-[#2d62ea]"
              disabled={
                memName === '' || memBirthdate === '' || memPhone === ''
                  ? true
                  : false
              }
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
