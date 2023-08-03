import BackImage from '../../img/Back_24px.svg';


const MyInfoEdit = () => {


    return(
        <>
        <header className="bg-white border-b border-t-neutral-100">
            <nav className="flex p-5">
                <div className="flex justify-between items-center">
                <img src={BackImage} alt="Back" />
                <p className="text-lg ml-2">내 정보 수정</p>
                </div>
            </nav>
        </header>
        <div className='mt-10 mb-10 flex flex-col'>
            <p className='font-bold text-2xl'>정보 확인</p>
            <p>정보를 안전하게 보호하기 위해 </p>
            <p>비밀번호를 다시 한번 입력해 주세요.</p>
        </div>
        <form className='flex flex-col items-start'>
            <label >아이디</label>
            <input 
                type='text'
                className="w-full px-3 py-2 border border-Gray-300 rounded text-gray-400"
                value="pie086"
                disabled
                />
            <label>비밀번호</label>
            <input 
                type='password'
                className="w-full px-3 py-2 border border-Gray-300 rounded"
                value="123456"
                />
            <button className='bg-Pri-500 text-white text-center w-full mt-20 px-3 py-4'>
                <span>확인</span>
            </button>
        </form>
        </>
    )
}

export default MyInfoEdit;