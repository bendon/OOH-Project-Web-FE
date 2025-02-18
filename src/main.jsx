
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
        <Route path="/manage-boards" element={<ManageBillBoardPage />} />
        <Route path="/create-board" element={<CreateBillboardPage />} />
        <Route path="/account" element={<AccountPage />} />
      </Route>

      

    </Routes>
  </BrowserRouter>,
)
