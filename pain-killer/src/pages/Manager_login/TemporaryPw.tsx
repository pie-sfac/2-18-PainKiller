

export default function TemporaryPw(){
  return(
    <>

    <div className="flex justify-center ">
      <div className=" p-8 ">
        <div className="text-center mb-10">

          <p className="text-center text-xl font-extrabold text-Gray-800">임시비밀번호 변경</p>
         
        </div>
        <div className=" text-left mb-2">
          {/* 왼쪽 정렬된 새로운 비밀번호 */}
          <label className="block font-medium">아이디</label>
          <input
            type="text"
            className="block w-96 rounded border px-4 pb-6 border-Gray-300  mb-8 "
          />
          <label className="block font-medium">변경할 비밀번호(pin)</label>
          <input
            type="password"
            className="block w-full rounded border px-4 py-3 border-Gray-300 "
          />
          <p className='text-xs text-Gray-400'>4~6자리 숫자로 구성해주세요.</p>
        </div>
        <div className="space-y-2 text-left mb-52">
          {/* 왼쪽 정렬된 비밀번호 확인 */}
          <label className="block font-medium">변경할 비밀번호 재확인(pin)</label>
          <input
            type="password"
            className="block w-full rounded border px-4 py-3 border-Gray-300"
            placeholder="비밀번호를 다시 입력하세요."
          />
        </div>
        {/* 취소와 확인 버튼 */}
        <div className="flex justify-between mt-52">
          
          <button className="hover:bg-Pri-500 hover:text-white bg-gray-100  text-Gray-400 py-3 px-4 rounded  w-full">
            확인
          </button>
        </div>
      </div>
      
    </div>

    </>
  )
}