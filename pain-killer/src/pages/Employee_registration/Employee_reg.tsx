import React, { useState } from 'react';
import RegHeader from '../../components/RegHeader';
import RegOutHeader from '../../components/RegOutHeader';
import VisibilityOff from '../../img/Visibility_off_24px.svg';
import EmployeeImg from '../../img/Graphic_Employee_registered.svg';
import PrevIcon from '../../img/Back_24px.svg';

function EmployeeRegistration() {
  const [step, setStep] = useState(1);
  const [roles, setRoles] = useState([]);
  const [isRegistrationComplete, setIsRegistrationComplete] = useState(false);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleRoleSelection = (role) => {
    const updatedRoles = [...roles];

    if (updatedRoles.includes(role)) {
      updatedRoles.splice(updatedRoles.indexOf(role), 1);
    } else {
      updatedRoles.push(role);
    }

    setRoles(updatedRoles);
  };

  const handleRegistrationComplete = () => {
    setIsRegistrationComplete(true);
  };

  return (
    <>
      {isRegistrationComplete ? (
        <>
          <RegOutHeader />

          <div className="flex flex-col items-center justify-center">
            <h2 className="text-3xl mb-4 font-bold text-center">
              직원 등록 완료
            </h2>
            <p className="text-center">직원 등록이 완료되었습니다.</p>
            <p className="text-center">직원에게 아이디를 전달하시겠습니까?</p>
            <img
              src={EmployeeImg}
              alt="직원 아이디 전달 이미지"
              className="mt-4 w-80 h-80"
            />
            <div className="flex justify-center mt-4">
              <button className="w-80 h-12 bg-Gray-100 hover:bg-Pri-500 hover:text-white text-bsblack py-3 px-3 rounded mr-4">
                나중에 할래요
              </button>
              <button className="w-80 h-12 bg-Pri-500 hover:bg-Pri-700 text-white py-3 px-3 rounded">
                연락처로 전달하기
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          {step === 1 && <RegHeader />}
          {step !== 1 && (
            <RegHeader
            onClick={handlePreviousStep}>
            </RegHeader>
          )}

          <div className="flex flex-col items-center justify-center">
            <div className="flex my-6">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step === 1
                    ? 'bg-Pri-300 text-white'
                    : 'bg-Gray-100 text-Gray-400'
                } mr-2`}
                onClick={() => setStep(1)}
              >
                1
              </div>
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step === 2
                    ? 'bg-Pri-300 text-white'
                    : 'bg-Gray-100 text-Gray-400'
                } mr-2`}
                onClick={() => setStep(2)}
              >
                2
              </div>
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step === 3
                    ? 'bg-Pri-300 text-white'
                    : 'bg-Gray-100 text-Gray-400'
                } mr-2`}
                onClick={() => setStep(3)}
              >
                3
              </div>
            </div>

            {step === 1 && (
              <>
                <h2 className="text-xl mb-4 font-bold text-center">직원 등록</h2>

                <form className="w-96">
                  <div className="mb-10">
                    <label className="block mb-2 text-left" htmlFor="name">
                      이름
                      <span className="text-Pri-500 font-normal">*</span>
                    </label>
                    <input
                      className="w-full px-3 py-2 border border-Gray-300 rounded"
                      type="text"
                      id="name"
                      name="name"
                      placeholder="이름을 입력해 주세요"
                      required
                    />
                  </div>

                  <div className="mb-48">
                    <label className="block mb-2 text-left" htmlFor="phone">
                      휴대폰 번호
                      <span className="text-Pri-500 font-normal">*</span>
                    </label>
                    <input
                      className="w-full px-3 py-2 border border-Gray-300 rounded"
                      type="text"
                      id="phone"
                      name="phone"
                      placeholder="000- 0000 - 0000"
                      required
                    />
                  </div>

                  <div className="flex justify-center">
                    <button
                      className="w-80 bg-Gray-100 hover:bg-Pri-500 hover:text-white text-Gray-400  py-3 px-4 rounded"
                      type="button"
                      onClick={handleNextStep}
                    >
                      다음
                    </button>
                  </div>
                </form>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="text-xl mb-4 font-bold text-center">
                  직원 계정 생성
                </h2>

                <form className="w-96">
                  <div className="mb-10">
                    <label
                      className="block mb-2 text-left"
                      htmlFor="username"
                    >
                      아이디
                      <span className="text-Pri-500 font-normal">*</span>
                    </label>
                    <input
                      className="w-full px-3 py-2 border border-Gray-300 rounded"
                      type="text"
                      id="username"
                      name="username"
                      placeholder="아이디를 입력해 주세요"
                      required
                    />
                    <label className="block mt-2 text-xs text-Gray-400 text-left">
                      3~15자의 영문, 숫자를 사용한 아이디를 입력해 주세요.
                    </label>
                  </div>

                  <div className="mb-4 relative">
                    <label
                      className="block mb-2 text-left"
                      htmlFor="temp-password"
                    >
                      임시 비밀번호(PIN)
                      <span className="text-Pri-500 font-normal">*</span>
                    </label>
                    <input
                      className="w-full px-3 py-2 border border-Gray-300 rounded"
                      type="password"
                      id="temp-password"
                      name="temp-password"
                      placeholder="임시 비밀번호를 입력해 주세요"
                      required
                    />
                    <img
                      src={VisibilityOff}
                      alt="icon"
                      className="absolute top-10 right-4 w-6 h-6"
                    />
                    <label className="block mt-2 text-xs text-Gray-400 text-left">
                      4~6자리의 숫자로 구성해 주세요.
                    </label>
                  </div>

                  <div className="flex justify-center mt-48">
                    <button
                      className="w-36 text-bsblack py-3 px-4 rounded border border-Gray-300 mr-4"
                      type="button"
                      onClick={handlePreviousStep}
                    >
                      뒤로
                    </button>
                    <button
                      className="w-36 bg-Gray-100 hover:bg-Pri-500 hover:text-white text-Gray-400  py-3 px-4 rounded "
                      type="button"
                      onClick={handleNextStep}
                    >
                      다음
                    </button>
                  </div>
                </form>
              </>
            )}

            {step === 3 && (
              <div className="w-96">
                <h2 className="text-xl mb-4 font-bold text-center">역할 설정</h2>

                <div className="flex-col justify-start ">
                  <p className="mb-1 text-left font-bold">
                    역할 선택(중복선택 가능)
                  </p>
                  <p className="mb-4 text-left text-sm">
                    센터에서 설정한 역할을 등록하려는 직원에게 부여합니다.
                  </p>
                </div>

                <div className="flex-col justify-center mb-4">
                  <div
                    className={`flex flex-col items-start justify-center w-full h-16 rounded-lg border border-Gray-300 mb-2 px-5 py-3 ${
                      roles.includes('일반직원')
                        ? 'bg-Pri-50 border-Pri-500 text-bsblack'
                        : 'bg-white'
                    } `}
                    onClick={() => handleRoleSelection('일반직원')}
                  >
                    <p
                      className={`text-sm font-bold ${
                        roles.includes('일반직원')
                          ? 'text-bsblack'
                          : 'text-bsblack'
                      }`}
                    >
                      일반직원 (기본)
                    </p>
                    <p className="text-xs">
                      가장 기본적인 권한만 소유하고 있습니다.
                    </p>
                  </div>
                  <div
                    className={`flex flex-col items-start justify-center w-full h-16 rounded-lg border border-Gray-300 mb-2 px-5 py-3  ${
                      roles.includes('인포직원')
                        ? 'bg-Pri-50 border-Pri-500 text-bsblack'
                        : 'bg-white'
                    } `}
                    onClick={() => handleRoleSelection('인포직원')}
                  >
                    <p
                      className={`text-sm font-bold ${
                        roles.includes('인포직원')
                          ? 'text-bsblack'
                          : 'text-bsblack'
                      }`}
                    >
                      인포직원
                    </p>
                    <p className="text-xs">
                      직원 관리, 수업/수강권 관리, 일정 관리 권한을 소유하고
                      있습니다.
                    </p>
                  </div>
                  <div
                    className={`flex flex-col items-start justify-center w-full h-16 rounded-lg border border-Gray-300 mb-2 px-5 py-3 ${
                      roles.includes('총괄매니저')
                        ? 'bg-Pri-50 border-Pri-500 text-bsblack'
                        : 'bg-white'
                    } `}
                    onClick={() => handleRoleSelection('총괄매니저')}
                  >
                    <p
                      className={`text-sm font-bold ${
                        roles.includes('총괄매니저')
                          ? 'text-bsblack'
                          : 'text-bsblack'
                      }`}
                    >
                      총괄 매니저
                    </p>
                    <p className="text-xs">모든 권한을 소유하고 있습니다.</p>
                  </div>
                </div>

                <div className="flex justify-center mt-48">
                  <button
                    className="w-36 text-bsblack py-3 px-4 rounded border border-Gray-300 mr-4"
                    type="button"
                    onClick={handlePreviousStep}
                  >
                    뒤로
                  </button>
                  <button
                    className="w-36 bg-Gray-100 hover:bg-Pri-500 hover:text-white text-Gray-400  py-3 px-4 rounded"
                    type="button"
                    onClick={handleRegistrationComplete}
                  >
                    완료
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default EmployeeRegistration;
