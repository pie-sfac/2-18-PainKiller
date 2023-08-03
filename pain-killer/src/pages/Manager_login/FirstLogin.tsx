

export default function FirstLogin(){
  return(
    <>

    <div className="flex  justify-center ">
      <div className=" p-8 ">
        <div className="text-center mb-10">
          {/* 비밀번호 재설정 메시지 */}
          <p className="text-center text-xl font-extrabold text-Gray-800">환영합니다, 김파이님</p>
          <p className="text-center text-xl font-extrabold text-Gray-800">아래의 정보를 확인해 주세요</p>
          
        </div>
        <div className="space-y-2 text-left mb-2">
          
          <label className="block font-medium">이름</label>
          <input
            type="password"
            className="block w-full rounded border px-4 py-3 border-Gray-300 "
          />
          
        </div>
        <div className="space-y-2 text-left mb-52">
          
          <label className="block font-medium">휴대폰 번호</label>
          <input
            type="password"
            className="block w-full rounded border px-4 py-3 border-Gray-300"
            placeholder="010 - 1234 -5678"
          />
        </div>
        {/* 취소와 확인 버튼 */}
        <div className="flex flex-col mt-52">
        <p className="text-center text-Gray-700 text-sm mb-3">정보가 다르신가요? 비밀번호를 변경 후, 마이페이지에서 수정하실 수 있습니다.</p>
          <button className="hover:bg-Pri-500 hover:text-white bg-gray-100  text-Gray-400 py-3 px-4 rounded  w-full">
            확인
          </button>
        </div>
      </div>
      
    </div>

    </>
  )
}