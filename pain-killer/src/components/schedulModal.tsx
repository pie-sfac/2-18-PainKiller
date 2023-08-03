import journalPath from '../assets/svg/journal-path.svg';

export default function SchedulModal({ setSchedule }: PropsType) {
  const closeSchedulModal = () => {
    setSchedule(false);
  };

  return (
    <div className="w-full h-full fixed top-0 left-0 bg-[#000000bc]">
      <div className="w-3/4 px-6 py-5 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-white rounded-[10px]">
        <div className="mb-9 flex">
          <div className="text-left flex-1">
            <p className="font-extrabold text-[#1d1d1d]">일정생성</p>
            <p className="text-xs">일정을 생성해주세요.</p>
          </div>
          <svg
            onClick={closeSchedulModal}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M5.70711 4.29289C5.31658 3.90237 4.68342 3.90237 4.29289 4.29289C3.90237 4.68342 3.90237 5.31658 4.29289 5.70711L10.5858 12L4.29289 18.2929C3.90237 18.6834 3.90237 19.3166 4.29289 19.7071C4.68342 20.0976 5.31658 20.0976 5.70711 19.7071L12 13.4142L18.2929 19.7071C18.6834 20.0976 19.3166 20.0976 19.7071 19.7071C20.0976 19.3166 20.0976 18.6834 19.7071 18.2929L13.4142 12L19.7071 5.70711C20.0976 5.31658 20.0976 4.68342 19.7071 4.29289C19.3166 3.90237 18.6834 3.90237 18.2929 4.29289L12 10.5858L5.70711 4.29289Z"
              fill="black"
            />
          </svg>
        </div>
        <div className="flex flex-col text-left">
          <div className="mb-2 px-4 py-5 rounded-[10px] border-solid border-[1.5px] border-[#6691ff]">
            <p className="text-sm text-bold text-[#6691ff]">개인 수업</p>
            <p className="text-xs text-[#505050]">개인 수업 suppoting msg</p>
            <object className="mt-3 float-right" data={journalPath}></object>
          </div>
          <div className="mb-2 px-4 py-5 rounded-[10px] border-solid border-[1.5px] border-[#cfcfcf]">
            <p className="text-sm text-bold text-[#aeaeae]">그룹 수업</p>
            <p className="text-xs text-[#aeaeae]">그룹 수업 suppoting msg</p>
            <object className="mt-3 float-right" data={journalPath}></object>
          </div>
          <div className="mb-2 px-4 py-5 rounded-[10px] border-solid border-[1.5px] border-[#cfcfcf]">
            <p className="text-sm text-bold text-[#1d1d1d]">상담</p>
            <p className="text-xs text-[#505050]">상담 suppoting msg</p>
            <object className="mt-3 float-right" data={journalPath}></object>
          </div>
        </div>
      </div>
    </div>
  );
}
