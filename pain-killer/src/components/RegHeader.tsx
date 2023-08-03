import BackImage from '../img/Back_24px.svg';


export default function RegHeader() {
  return (
    <header className="bg-white border-b border-t-neutral-100">
      <nav className="flex p-5">
        <div className="flex justify-between items-center">
          <img src={BackImage} alt="Back" />
          <p className="text-lg ml-2">직원등록</p>
        </div>
      </nav>
    </header>
  );
}
