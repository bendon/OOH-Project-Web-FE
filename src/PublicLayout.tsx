
import { Navigate, Outlet } from 'react-router'
import { isAuthenticated } from './middleware/routeAuth'

export default function PublicLayout() {
  return isAuthenticated() ? <Navigate to="/" /> : (
    <>
        <Outlet/>    
    </>
  )
}
