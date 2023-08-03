import { ChangeEvent, FormEvent, Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';

import instance from '../../api/axios_interceptors';

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

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const CreateMember = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  //const [job, setJob] = useState('');
  const [jobSelected, setJobSelected] = useState(selectJob[0]);
  //const [path, setPath] = useState('');
  const [pathSelected, setPathSelected] = useState(selectPath[0]);

  const getGender = (e: any) => {
    setGender(e.target.value);
  };
  // const handleJobSelect = (e: ChangeEvent<HTMLSelectElement>) => {
  //   setJob(e.target.value);
  // };
  // const handlePathSelect = (e: ChangeEvent<HTMLSelectElement>) => {
  //   setPath(e.target.value);
  // };

  const onRegMemberHandler = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await instance.post(`/members`, {
        name: name,
        birthDate: birthDate,
        phone: phoneNum,
        sex: gender,
        job: jobSelected.option,
        acqusitionFunnel: pathSelected.option,
        acquisitionFunnel: pathSelected.option,
        toss: [],
      });
      console.log(res);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-extrabold">회원 등록</h1>
      <p className="text-sm text-[#1D1D1D]">회원 정보를 등록하세요</p>
      <form
        onSubmit={onRegMemberHandler}
        className="mt-10 flex flex-col text-left"
      >
        <div className="mb-2">
          <p className="text-sm text-[#1D1D1D]">
            이름
            <span className="text-[#2D62EA]">*</span>
          </p>
          <input
            className="mt-1 w-full px-4 py-2 rounded border-solid border-[1.5px] border-[#CFCFCF)]"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
              onClick={getGender}
              required
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
              onClick={getGender}
              required
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
        <div className="mb-2">
          <p className="text-sm text-[#1D1D1D]">
            생년월일<span className="text-[#2D62EA]">*</span>
          </p>
          <input
            className="mt-1 w-full px-4 py-2 rounded border-solid border-[1.5px] border-[#CFCFCF)]"
            type="text"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
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
            value={phoneNum}
            onChange={(e) => setPhoneNum(e.target.value)}
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
                        {jobSelected.option}
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
                                    selected ? 'font-semibold' : 'font-normal',
                                    'ml-3 block truncate',
                                  )}
                                >
                                  {options.option}
                                </span>
                              </div>

                              {selected ? (
                                <span
                                  className={classNames(
                                    active ? 'text-black' : 'text-[#BFD1FF]',
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
          {/* <div className="mt-1 w-full px-4 py-2 rounded border-solid border-[1.5px] border-[#CFCFCF)]">
            <select className="w-full" onChange={handleJobSelect}>
              <option value="">선택해주세요</option>
              <option value="사무직">사무직</option>
              <option value="현장직">현장직</option>
              <option value="가사노동자">가사노동자</option>
              <option value="학생">학생</option>
              <option value="무직">무직</option>
              <option value="기타">기타 - 직접입력</option>
            </select>
          </div> */}
        </div>

        <div className="mb-2">
          <p className="text-sm text-[#1D1D1D]">방문 경로</p>
          <Listbox value={pathSelected} onChange={setPathSelected}>
            {({ open }) => (
              <>
                <div className="relative z-0">
                  <Listbox.Button className="relative cursor-default mt-1 w-full px-4 py-2 rounded border-solid border-[1.5px] border-[#CFCFCF] text-left focus:outline-none focus:ring-[1.5px] focus:ring-[#2d62ea] sm:leading-6">
                    <span className="flex items-center">
                      <span className="block truncate">
                        {pathSelected.option}
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
                                    selected ? 'font-semibold' : 'font-normal',
                                    'ml-3 block truncate',
                                  )}
                                >
                                  {options.option}
                                </span>
                              </div>

                              {selected ? (
                                <span
                                  className={classNames(
                                    active ? 'text-black' : 'text-[#BFD1FF]',
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
          {/* <div className="mt-1 w-full px-4 py-2 rounded border-solid border-[1.5px] border-[#CFCFCF)]">
            <select className="w-full" onChange={handlePathSelect}>
              <option value="주변 추천">주변 추천</option>
              <option value="오프라인 광고">오프라인 광고(배너, 현수막)</option>
              <option value="SNS 광고">SNS 광고(페이스북, 인스타)</option>
              <option value="네이버 지도">네이버 지도</option>
              <option value="기타">기타 - 직접입력</option>
            </select>
          </div> */}
        </div>

        <button
          className="mt-10 py-3 px-4 rounded disabled:text-[#aeaeae] disabled:bg-[#f4f4f4] enabled:text-white enabled:bg-[#2d62ea]"
          disabled={
            name === '' || birthDate === '' || phoneNum === '' ? true : false
          }
        >
          완료
        </button>
      </form>
    </div>
  );
};

export default CreateMember;
