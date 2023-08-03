import InviteHeader from '../../components/InviteHeader';
import { useState } from 'react';

function InviteReg() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState(false);

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
    setPhoneNumberError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 휴대폰 번호 유효성 검사 (예시: 숫자로만 이루어진 11자리 번호)
    const phoneNumberPattern = /^\d{11}$/;

    if (!phoneNumberPattern.test(phoneNumber)) {
      setPhoneNumberError(true);
      return;
    }

    // 유효한 휴대폰 번호일 때 실행할 로직 추가
    // ...
  };

  return (
    <>
      <InviteHeader />
      <div className="flex justify-center items-center">
        <div className="rounded-lg bg-white p-8">
          <div className="p-4">
            <p className="text-center font-extrabold text-2xl">환자 관리의 첫걸음,</p>
            <p className="text-center font-extrabold text-2xl">포인티로 초대합니다</p>
          </div>
          <div className="rounded-md bg-blue-50 px-16 pt-10 mt-4">
            <div className="w-96 h-80 border-t-2 border-x-2 border-Gray-400 text-bsblack rounded-t-2xl bg-white mt-10 mx-auto px-7 py-6">
              <p className="text-left">'센터이름'에서 000님을 초대하셨습니다</p>
              <p className="text-left">센터 내 비치된 테블릿을 이용해서</p>
              <p className="text-left">로그인을 진행해주세요</p>
              <div className=" mt-8"></div>
              <p className="text-left">센터코드: 456676</p>
              <p className="text-left">아이디: pie20150214</p>
              <p className="text-left">
                임시비밀번호: <span className="text-Pri-500">보안상 직접 전달해주세요.</span>
              </p>
            </div>
          </div>
          <div className="mt-5">
            <p className="text-center font-extrabold text-lg">위의 메시지를 받으실 직원의 연락처를 확인해주세요</p>
          </div>
          <div className="mt-4">
            <form className="flex flex-col items-start" onSubmit={handleSubmit}>
              <input
                type="tel"
                placeholder="000 - 0000 - 0000"
                className={`w-full border ${
                  phoneNumberError ? 'border-red-500' : 'border-gray-300'
                } rounded px-4 py-2 mr-2 mb-2`}
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
              />
              {phoneNumberError && (
                <p className="text-error text- font-normal">
                  올바른 휴대폰 번호를 입력해주세요.
                </p>
              )}
              <button
                type="submit"
                className="bg-Gray-100 text-bsblack px-4 py-3 rounded w-full hover:bg-Pri-500 hover:text-white mt-14"
              >
                전송
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default InviteReg;
