import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../api/axios_interceptors";
import EmpImg from '../../img/Graphic_Employee_registered.svg';
import BackImage from '../../img/Back_24px.svg'

 // 역할 리스트
 const roleList = [
  {id : 'info', name : '인포 직원', desc : '직원 관리, 수업/수강권 관리, 일정 관리 권한을 소유하고 있습니다.', role_value : 7},
  {id : 'manager', name : '총괄', desc : '모든 권한을 소유하고 있습니다.', role_value : 8}
];

const CreateEmp = () => {

    const [step, setStep] = useState(1);
    const [isRegistrationComplete, setIsRegistrationComplete] = useState(false);

    const navigate = useNavigate();
   
    // 이름, 연락처, 아이디, 비밀번호
    const [empName, setEmpName] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [empId, setEmpId] = useState("");
    const [pwd, setPwd] = useState("");
    
    const onEmpIdChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setEmpId(event.target.value)
    }
    const onPwdChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setPwd(event.target.value);
    }
    const onPhoneNumChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNum(event.target.value);

       
    }
    const onEmpNameChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setEmpName(event.target.value);
    }

    // 한 가지 이상의 역할을 담을 체크리스트 
    const [checkList, setCheckList] = useState<number[]>([]);
    // 체크여부
    const [isChecked, setIsChecked] = useState(false);


    // 체크박스 처리 로직
    const checkedRoleHandler = (value:number, isChecked: boolean) => {
        if(isChecked){
            setCheckList((prev) => [...prev, value])

            return;
        }

        if(!isChecked && checkList?.includes(value)){
            setCheckList(checkList?.filter((role) => role !== value));

            return;
        }

        return;
    };
    const oncheckHandler = (e : React.ChangeEvent<HTMLInputElement>, value : number) => {
        setIsChecked(!isChecked);
        checkedRoleHandler(value, e.target.checked);
    }


    // 연락처 중복 검증
    const onPhoneCheck = async () =>{
        console.log('연락처 중복확인');
        try {
          const res = await instance.post(`/staffs/validate/phone`, {
            phone : phoneNum,
          });
          const isValidate = res.data.available;
          
          console.log(res);

         return isValidate;

      } catch (error : any) {
        alert(error);
      }
    }
    // 아이디 중복 검증
    const onIdCheck = async () => {
        console.log('아이디 중복확인');

        try {
          const res = await instance.post(`/staffs/validate/id`, {
            id : empId,
          });
        
          const isValidate = res.data.available;
          
          console.log(res);

         return isValidate;

      } catch (error : any) {
        alert(error);
      }
    }

    // 직원 생성
    const onSubmit = async (e : React.FormEvent) =>{
        e.preventDefault();
        
        try {
            const res = await instance.post(`/staffs`, {

              loginId: empId,
              password: pwd,
              name: empName,
              phone : phoneNum,
              roles: checkList

            });
          
            console.log(res);

            setIsRegistrationComplete(true)

        } catch (error : any) {
          alert(error);
        }
        

        console.log(empId, pwd, phoneNum, checkList, empName)
    }

    const onCenterInfo = () => {
      navigate('/centerInfo');
    }

    const onValidateFirst = async() => {

      const result = await onPhoneCheck();

      if(result === false){
        alert('휴대폰 번호 중복입니다.')
      }else{
        setStep(2)
      }
    }

    const onValidateLast = async() => {
      const result = await onIdCheck();

      if(result === false){
        alert('아이디 중복입니다.')
      }else{
        setStep(3)
      }
      
    }

    return(
      <div className="p-15">
        {isRegistrationComplete ?
          <>
            <div className="flex flex-col items-center justify-center mt-20">
              <h2 className="text-3xl mb-4 font-bold text-center">
                직원 등록 완료
              </h2>
              <p className="text-center">직원 등록이 완료되었습니다.</p>
              <img
                src={EmpImg}
                alt="직원 아이디 전달 이미지"
                className="mt-4 w-80 h-80"
              />
              <div className="flex justify-center mt-4">
                <button className="w-80 h-12 bg-Pri-500 hover:bg-Pri-700 text-white py-3 px-3 rounded" onClick={onCenterInfo}>
                  홈으로
                </button>
              </div>
            </div>
          </>

          :

          <div>
           <header className="bg-white border-b border-t-neutral-100">
                <nav className="flex p-5">
                    <div className="flex justify-between items-center cursor-pointer" onClick={onCenterInfo}>
                      <img src={BackImage} alt="Back" />
                      <p className="text-lg ml-2">직원 등록</p>
                    </div>
                </nav>
          </header>
          {/* 상단 숫자 표시 */}
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
              

            {/* step값에 따른 화면 구성 */}
            {step === 1 && (
              <>
                <h2 className="text-xl mb-4 font-bold text-center">직원 등록</h2>

                <form>
                  <div className="mb-10">
                    <label className="block mb-2 text-left" htmlFor="name">
                      이름
                      <span className="text-Pri-500 font-normal">*</span>
                    </label>
                    <input
                      className="w-full px-3 py-2 border border-Gray-300 rounded"
                      type="text"
                      id="name"
                      value={empName}
                      onChange={onEmpNameChange}
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
                      value={phoneNum}
                      onChange={onPhoneNumChange}
                      name="phone"
                      placeholder="000- 0000 - 0000"
                      required
                    />
                   
                  </div>

                  <div className="flex justify-center">
                    <button
                      className="w-80 bg-Gray-100 hover:bg-Pri-500 hover:text-white text-Gray-400  py-3 px-4 rounded"
                      type="button"
                      onClick={onValidateFirst}
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

                <form>
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
                      value={empId}
                      onChange={onEmpIdChange}
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
                      비밀번호(PIN)
                      <span className="text-Pri-500 font-normal">*</span>
                    </label>
                    <input
                      className="w-full px-3 py-2 border border-Gray-300 rounded"
                      type="password"
                      id="temp-password"
                      value={pwd}
                      onChange={onPwdChange}
                      name="temp-password"
                      placeholder="비밀번호를 입력해 주세요"
                      required
                    />
                    <label className="block mt-2 text-xs text-Gray-400 text-left">
                      4~6자리의 숫자로 구성해 주세요.
                    </label>
                  </div>

                  <div className="flex justify-center mt-40">
                    <button
                      className="w-36 text-bsblack py-3 px-4 rounded border border-Gray-300 mr-4"
                      type="button"
                      onClick={() => setStep(1)}
                    >
                      뒤로
                    </button>
                    <button
                      className="w-36 bg-Gray-100 hover:bg-Pri-500 hover:text-white text-Gray-400  py-3 px-4 rounded "
                      type="button"
                      onClick={onValidateLast}
                    >
                      다음
                    </button>
                  </div>
                </form>
              </>
            )}

            {step === 3 && (
            <div className='flex flex-col gap-5 p-2'>
             <span className='text-[20px] font-bold p-2'>역할 설정</span>

              <div className='text-left text-[15px]'>
                  <div>역할 설정(중복 선택 가능)</div>
                  <div>센터에서 설정한 역할을 등록하려는 직원에게 부여합니다.</div>
              </div>

              <form className='flex flex-col gap-5'>
                  <div>
                      
                      <input type="checkbox" id="basic" className="hidden peer" checked readOnly/>
                      <label htmlFor="basic" 
                              className="
                              flex
                              items-center
                              justify-left 
                              p-3  
                              border
                              rounded 
                              cursor-pointer 
                              peer-checked:border-[#2D62EA]
                              peer-checked:bg-[#EBF1FF] 
                              ">                           
                          <div className="flex flex-col">
                              <div className='font-bold text-left'>일반직원(기본)</div>
                              <div className='text-left text-[13px]'>가장 기존적인 권한만 소유하고 있습니다.</div>
                          </div>
                      </label>
                      
                  </div>
                  {roleList.map((role) => (
                      <div key={role.id}>
                          <input
                              className='hidden peer'
                              id = {role.id}
                              type="checkbox"
                              value={role.role_value}
                              onChange={(e) => oncheckHandler(e, role.role_value)}
                              />
                          <label htmlFor={role.id} 
                              className="
                              flex
                              items-center
                              justify-left 
                              p-3  
                              border
                              rounded 
                              cursor-pointer 
                              peer-checked:border-[#2D62EA]
                              peer-checked:bg-[#EBF1FF] 
                              ">                           
                          <div className="flex flex-col">
                              <div className='font-bold text-left'>{role.name}</div>
                              <div className='text-left text-[13px]'>{role.desc}</div>
                          </div>
                      </label>
                      </div>
                      ))
                  }
                 
              
                  <div className="flex justify-center mt-40">
                      <button
                        className="w-36 text-bsblack py-3 px-4 rounded border border-Gray-300 mr-4"
                        type="button"
                        onClick={() => setStep(2)}
                      >
                          뒤로
                      </button>
                      <button
                        className="w-36 bg-Gray-100 hover:bg-Pri-500 hover:text-white text-Gray-400  py-3 px-4 rounded "
                        type="button"
                        onClick={onSubmit}
                      >
                        완료
                      </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
        }
        
      </div>
    )

}

export default CreateEmp;