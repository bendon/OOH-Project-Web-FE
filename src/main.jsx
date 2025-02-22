
import { createRoot } from 'react-dom/client'
// import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import AccountPage from './pages/account/AccountPage.jsx'
import PublicLayout from './layout/PublicLayout.jsx'
import LoginPage from './pages/Auth/LoginPage.jsx'
import ProtectedLayout from './layout/ProtectedLayout.jsx'
import DashboardPage from './pages/Dashboard/DashboardPage.jsx'
import SwitchAccountPage from './pages/account/SwitchAccountPage.jsx'
import ProtectedOutDoorLayout from './layout/ProtectedOutDoorLayout.jsx'
import ManageBillBoardPage from './pages/Billboards/ManageBillBoardPage.jsx'
import CreateBillboardPage from './pages/Billboards/CreateBillboardPage.jsx'
import ManageTeam from './pages/Team/ManageTeam.jsx'
import TeamPermission from './pages/Team/TeamPermission.jsx'
import CreateMember from './pages/Team/CreateMember.jsx'
import GeolocationMap from './pages/Billboards/GeolocationMap.jsx'
import BillBoardAnalysis from './pages/Dashboard/BillBoardAnalysis.jsx'
import TeamAnalysis from './pages/Dashboard/TeamAnalysis.jsx'
import UserAccount from './pages/profile/UserAccount.jsx'
import ChangePassword from './pages/profile/ChangePassword.jsx'
import TermPolicy from './pages/administration/TermPolicy.jsx'
import SystemSettings from './pages/administration/SystemSettings.jsx'
import RoleSettings from './pages/administration/RoleSettings.jsx'
import NotFoundPage from './pages/NotFound/NotFoundPage.jsx'
import BillboardHistory from './pages/Billboards/BillboardHistory.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      {/* Public Routes (Login, Signup, etc.) */}
      <Route element={<PublicLayout />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>


      <Route element={<ProtectedOutDoorLayout />}>
        <Route path="/switch/account" element={<SwitchAccountPage />} />
      </Route>

      {/* Protected Routes (Dashboard, Profile, etc.) */}
      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/billboard-analysis" element={<BillBoardAnalysis />} />
        <Route path="/team-analysis" element={<TeamAnalysis />} />

         {/* billboard routes */}
        <Route path="/manage-boards" element={<ManageBillBoardPage />} />
        <Route path="/create-board" element={<CreateBillboardPage />} />
        <Route path="/billboard-locations" element={<GeolocationMap />} />
        <Route path="/billboard/:billboardId/history" element={<BillboardHistory />} />
        <Route path="/account" element={<AccountPage />} />

         {/* team/user  routes */}
        <Route path="/team-management" element={<ManageTeam />} />
        <Route path="/create-team" element={<CreateMember />} />
        <Route path="/team-permission" element={<TeamPermission />} />

        {/* administrator routes */}
        <Route path="/role-settings" element={<RoleSettings />} />
        <Route path="/system-settings" element={<SystemSettings />} />
        <Route path="/term-policy" element={<TermPolicy />} />

        {/* profile */}
        <Route path="/user-account" element={<UserAccount />} />
        <Route path="/change-password" element={<ChangePassword />} />

        {/* Catch-all for 404 */}
      <Route path="*" element={<NotFoundPage />} />
      </Route>


      
    </Routes>
  </BrowserRouter>,
)
