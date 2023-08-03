import ManagerFindHeader from "../../components/ManagerFindAccount";
import Profile from"../../img/Profile_32px.svg";
export default function FindId(){
  return(
    <>
    <ManagerFindHeader/>
    <div className="flex  items-center justify-center ">
      <div className=" p-8 max-w-sm w-full space-y-4">
        {/* 아이디 확인 메시지 */}
        <p className="text-center text-xl font-blod text-Gray-700">아이디확인</p>
        <p className="text-center text-Gray-400 ">가입하신 아이디 정보입니다</p>

        {/* 아이콘 */}
        <div className="flex justify-center items-center mt-10">
        <img
          src={Profile}
          alt="Icon"
          className="mr-2 w-12 h-12 rounded-full"
        />
        <p className="text-center text-Pri-500 font-bold text-2xl">pointlove2022</p>
        </div>
        {/* 비밀번호 재설정 버튼 */}
        <p
          className="block  text-Gray-700 text-sm py-2 px-4 pt-80 "
        >
          비밀번호가 기억나지 않으세요? | 
          <button> 비밀번호 재설정</button>
        </p>
        {/* 로그인 화면으로 버튼 */}
        <button
          className="block w-full bg-Pri-500 text-bswhite  py-2 px-4 rounded focus:outline-none focus:ring focus:ring-gray-200 mt-2"
        >
          로그인 화면으로
        </button>
      </div>
    </div>
    </>
  )
}