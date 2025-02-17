
import { isAuthenticated } from './middleware/routeAuth'
import Sidebar from './navbar/Sidebar'
import Topbar from './navbar/Topbar'
import { Navigate, Outlet } from 'react-router'

function AppLayout() {

  return isAuthenticated() ? (
    <>
      <Sidebar/>
      <Topbar/>
      <div className="content">
        <Outlet/>
      </div>
    </> 
  ) : <Navigate to="/auth" />
}

export default AppLayout
