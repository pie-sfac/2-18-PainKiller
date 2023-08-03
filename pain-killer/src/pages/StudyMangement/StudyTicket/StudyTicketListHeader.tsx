import Close from '../../../img/Close_24px.svg';
import { Link } from 'react-router-dom';

export default function StudyTicketListHeader() {
  return (
    <header className="bg-white border-b border-t-neutral-100">
      <nav className="flex p-5 justify-between">
        <div className="flex justify-between">
          <p className="text-lg ml-2">수강권부여</p>
        </div> 
          <img src={Close} alt="Back" />
      </nav>
    </header>
  );
}
