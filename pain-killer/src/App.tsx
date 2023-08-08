import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/Manager_login/login';
import Home from './pages/home/home';
import Layout from './components/layout/Layout';
import CalendarManager from './pages/schedule/calendar-manager';
//import CalendarEmployee from './pages/schedule/calendar-employee';
import MemberManage from './pages/member/MemberManage';
import Mypage from './pages/mypage/mypage';
import CenterManage from './pages/center/CenterManage';
import StudyList from './pages/StudyMangement/StudyList';
import CreateStudy from './pages/StudyMangement/CreateStudy';
import StudyDetails from './pages/StudyMangement/StudyDetails';

import TestCalendar from './components/calendar/month-calendar';
import EmpDetail from './pages/center/EmpDetail';
import CreateEmp from './pages/center/CreateEmp';
import ChangePassword from './components/changePassword';
import LoginTsx from './components/Login';
import SearchResult from './components/searchResult';
import ModEmpInfo from './pages/center/ModEmpInfo';
import ModRole from './pages/center/ModRole';
import ChangePwd from './pages/Manager_login/ChangePwd';
import EditTicketPage from './pages/Member_Management/editTicket';
import MemberManagementPage from './pages/Member_Management/memberManage';
import TicketAllocationPage from './pages/Member_Management/ticketAllocation';
import TicketDetailPage from './pages/Member_Management/ticketDetail';
import TicketPage from './pages/Member_Management/ticketPage';
import MyPage from './pages/mypage/myPage1';
import SimpleLoginPage from './pages/simple_login/simpleLogin';
import UserDetailPage from './pages/simple_login/userDetail';
import CreateMember from './pages/member/CrearteMember';
import CenterInfo from './pages/center/CenterInfo';
import MemDetail from './pages/member/MemDetail';
import CreateStudyTicket from './pages/StudyMangement/StudyTicket/CreateStudyTicket';
import StudyTicket from './pages/StudyMangement/StudyTicket/StudyTicket';
import StudyTicketList from './pages/StudyMangement/StudyTicket/StudyTicketList';
import SearchPrivateCharge from './pages/StudyMangement/StudyTicket/SearchPrivateCharge';
import ModMemInfo from './pages/member/ModMemInfo';
import PwReset from './pages/Manager_login/ContactPwReset';
import MemberTickets from './pages/member/MemberTickets';

import CenterTickets from './pages/member/CenterTickets';
import GrantTicket from './pages/member/GrantTicket';
import MemberTicketsFix from './pages/member/MemberTicketsFix';
import GrantList from './pages/StudyMangement/GrantList';
import DetailMemberTickets from './pages/member/MemberTicketsDetail';
import ScheduleCheck from './pages/schedule/ScheduleCheck';
import CreateCounceling from './pages/schedule/CreateCounceling';

function App() {
  return (
    // 계속 불러올 컴포넌트는 components 폴더에
    // 페이지 내용에 해당하는 컴포넌트는 pages 폴더에

    //  375px~400px

    <div className="max-w-[396px] mx-auto relative">
      <Router>
        <Routes>
          {/*nav, footer 포함하는 컴포넌트는 여기 */}
          <Route element={<Layout />}>
            <Route path="/scheduleInfo" element={<CalendarManager />} />
            <Route path="/memberInfo" element={<MemberManage />} />
            <Route path="/centerInfo" element={<CenterManage />} />
            <Route path="/centreInforma" element={<CenterInfo />} />
            <Route path="/myPage" element={<Mypage />} />
            <Route path="/studylist" element={<StudyList />} />
            <Route path="/create" element={<CreateStudy />} />
          </Route>

          {/*nav, footer 포함하지 않는 컴포넌트는 여기 */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/centerInfo/:userId" element={<EmpDetail />} />
          <Route path="/addemp" element={<CreateEmp />} />
          <Route path="/studydetails/:ticketId" element={<StudyDetails />} />
          <Route path="/centerInfo/:userId" element={<EmpDetail />} />
          <Route path="/modemp/:userId" element={<ModEmpInfo />} />
          <Route path="/modmem/:userId" element={<ModMemInfo />} />
          <Route path="/memberInfo/:useData" element={<MemDetail />} />
          <Route path="/addemp" element={<CreateEmp />} />
          <Route path="/changepwd" element={<ChangePwd />} />
          <Route
            path="/createstudyticket/:ticketId"
            element={<CreateStudyTicket />}
          />
          <Route path="/studyticket" element={<StudyTicket />} />
          <Route path="/studyticketlist" element={<StudyTicketList />} />
          <Route
            path="/searchprivatecharge/:ticketId"
            element={<SearchPrivateCharge />}
          />
          {/* calenar test */}
          <Route path="/calendar" element={<TestCalendar />} />

          {/* 직원 역할 수정 페이지*/}
          <Route path="/modrole/:userId" element={<ModRole />} />
          {/*회원 등록 페이지*/}
          <Route path="/addmember" element={<CreateMember />} />

          <Route path="/search" element={<SearchResult />} />

          {/* 회원 수강권 조회 */}
          <Route path="/memtickets/:memberId" element={<MemberTickets />} />
          {/* 회원 수강권 상세 */}
          <Route path="dtickets/:ticketId" element={<DetailMemberTickets />} />
          {/* 수강권 부여 내역 */}
          <Route path="/grant-list/:ticketId" element={<GrantList />} />
          {/* 회원에게 수강권 부여 전 판매중인 센터 티겟 목록 */}
          <Route path="/centerticket" element={<CenterTickets />} />
          {/* 회원 수강권 부여 페이지*/}
          <Route path="/grantticket/:ticketId" element={<GrantTicket />} />

          {/* 회원 수강권 수정 */}
          <Route
            path="/issued-tickets/:issuedTicketId"
            element={<MemberTicketsFix />}
          />

          <Route path="/councelingedit" element={<CreateCounceling />} />
          <Route path="/councelingcheck" element={<ScheduleCheck />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
