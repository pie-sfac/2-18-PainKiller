import React, { useState, useEffect } from 'react';
import ManagerFindHeader from '../../components/ManagerFindAccount';

const ContactVerification = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCodeSent, setVerificationCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationCodeConfirmed, setVerificationCodeConfirmed] =
    useState(false);
  const [modalOpen, setModalOpen] = useState(false); // 첫 번째 모달 상태 변수 추가
  const [resendModalOpen, setResendModalOpen] = useState(false); // 두 번째 모달 상태 변수 추가
  const [resendButtonDisabled, setResendButtonDisabled] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [resendCompletedModalOpen, setResendCompletedModalOpen] =
    useState(false); // 인증번호 발송 완료 모달 상태 변수 추가

  useEffect(() => {
    let timer;

    // 1분 동안 재전송 버튼 비활성화
    if (resendButtonDisabled) {
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }

    // 1분 후에 재전송 버튼 활성화
    if (countdown === 0) {
      setResendButtonDisabled(false);
      setCountdown(60);
    }

    return () => clearTimeout(timer);
  }, [resendButtonDisabled, countdown]);

  const handleVerificationCodeRequest = () => {
    setVerificationCodeSent(true);
    setVerificationCodeConfirmed(false);
    // 재전송 버튼 비활성화 및 두 번째 모달 열기
    setResendButtonDisabled(true);

    // 이메일 재전송 모달 열기
    if (countdown === 60) {
      setResendCompletedModalOpen(true);
    } else {
      setResendModalOpen(true);
    }
  };

  const handleResendVerificationCode = () => {
    if (!verificationCodeSent) {
      setVerificationCodeSent(true);
      setVerificationCodeConfirmed(false);
    }

    // 이메일 재전송 모달 열기
    setResendButtonDisabled(true);
    setResendCompletedModalOpen(true);
  };

  const handleVerificationCodeConfirm = () => {
    setVerificationCodeConfirmed(true);
  };

  const handleConfirm = () => {
    console.log(
      `Name: ${name}, Phone Number: ${phoneNumber}, Verification Code: ${verificationCode}`,
    );
    setModalOpen(true);
  };

  return (
    <>
      <ManagerFindHeader />
      <div className="flex flex-col items-center">
        <div className="my-10 font-bold text-xl text-Gray-700">연락처 인증</div>
        <div className="flex flex-col items-start w-96">
          <div className="mb-2 text-bsblack ">이름</div>
          <input
            className="w-full h-8 p-5 border border-Gray-300 rounded"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="mt-4 mb-2 text-bsblack">연락처</div>
          <div className="flex w-full">
            <input
              className="flex-grow h-8 p-5 border border-Gray-300 rounded"
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            {!verificationCodeSent && (
              <button
                className="w-32 h-10 ml-2   flex items-center justify-center bg-bswhite text-bsblack rounded border border-Gray-300"
                onClick={handleVerificationCodeRequest}
              >
                인증번호 받기
              </button>
            )}
            {verificationCodeSent && !verificationCodeConfirmed && (
              <button
                className="w-32 h-10 ml-2   flex items-center justify-center bg-bswhite text-bsblack rounded border border-Gray-300"
                onClick={handleResendVerificationCode}
              >
                재전송
              </button>
            )}
          </div>
          {verificationCodeSent && !verificationCodeConfirmed && (
            <>
              <div className="mt-4 mb-2 flex w-full">
                <div className="flex w-full">
                  <input
                    className="flex-grow h-8 p-5 border border-Gray-300 rounded"
                    type="text"
                    value={verificationCode}
                    placeholder="인증번호 입력"
                    onChange={(e) => setVerificationCode(e.target.value)}
                    readOnly={verificationCodeConfirmed}
                  />
                </div>
                <button
                  className={`w-32 h-10 ml-2   flex items-center justify-center bg-bswhite text-bsblack rounded border border-Gray-300 ${
                    verificationCodeConfirmed
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-Pri-100 hover:border-Pri-500 hover:text-Pri-500'
                  }`}
                  onClick={handleVerificationCodeConfirm}
                  disabled={verificationCodeConfirmed}
                >
                  인증번호 확인
                </button>
              </div>
            </>
          )}
        </div>
        {verificationCodeConfirmed && (
          <div className="text-Gray-400 mt-2 mb-4">인증이 완료되었습니다.</div>
        )}
        <button
          className="w-72 h-10 mt-60 bg-Gray-100 text-Gray-400 hover:bg-Pri-500 hover:text-white rounded"
          onClick={handleConfirm}
        >
          확인
        </button>
      </div>
      {/* 첫 번째 모달: 등록되지 않은 개인정보 */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
          <div className="bg-white rounded-lg p-6 w-80 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setModalOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="text-center">
              <h2 className="text-base font-bold mb-2">
                등록되지 않은 개인정보
              </h2>
              <p className="text-gray-600">입력하신 정보를 확인해주세요.</p>
            </div>
            <button
              className=" w-36 mt-6 bg-Gray-100 text-Gray- font-bold py-2 px-4 rounded hover:bg-Pri-500 hover:text-bswhite"
              onClick={() => setModalOpen(false)}
            >
              확인
            </button>
          </div>
        </div>
      )}
      {/* // 인증번호 발송 완료 모달 */}
      {resendCompletedModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
          <div className="bg-white rounded-lg p-6 w-96 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => {
                setResendCompletedModalOpen(false);
                setResendModalOpen(false); // 추가
                setResendButtonDisabled(false); // 추가
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="text-center">
              <h2 className="text-lg font-bold mb-2">인증번호 재전송 완료</h2>
              {/* <p className="text-Gray-900 text-base">
                인증번호가 이메일로 재발송되었습니다.
              </p> */}
            </div>
            <button
              className="w-36 mt-6 bg-Gray-100  py-2 px-4 rounded hover:bg-Pri-500 hover:text-bswhite"
              onClick={() => {
                setResendCompletedModalOpen(false);
                setResendModalOpen(false); // 추가
                setResendButtonDisabled(false); // 추가
              }}
            >
              확인
            </button>
          </div>
        </div>
      )}
      {/* 두 번째 모달: 인증번호 재발송 */}
      {resendModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
          <div className="bg-white rounded-lg p-6 w-96 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setResendModalOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="text-center">
              <h2 className="text-lg font-bold mb-2">
                인증번호를 이미 발송하였습니다
              </h2>
              <p className="text-Gray-900 text-base">
                통신 환경에 따라 수신에 차이가 있을 수 있습니다.
              </p>
              <p className="text-Gray-900 text-base">
                {countdown}초 후에 재전송이 가능합니다.
              </p>
            </div>
            <button
              className={`w-36 mt-6 bg-Gray-100  py-2 px-4 rounded ${
                resendButtonDisabled
                  ? 'cursor-not-allowed'
                  : 'hover:bg-Pri-500 hover:text-bswhite'
              }`}
              onClick={() => {
                setResendModalOpen(false);
                handleResendVerificationCode(); // 재전송 버튼 클릭과 동일한 동작 수행
              }}
              disabled={resendButtonDisabled}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactVerification;
