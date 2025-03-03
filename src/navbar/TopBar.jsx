import { Bell, Moon, Sun } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { getUser, postUserLogOut } from '../data/lib'
import { NavLink, useNavigate } from 'react-router'

export default function TopBar() {
        const navigate = useNavigate()
        const [user, setUser] = useState(null)
    const logout = async () => {
       const data =  await postUserLogOut()
       if (data.status === 200) {
           navigate("/login")
        }
    }
    useEffect(()=>{
      const fetchUser = async () => {
            const res = await getUser()
            if (res) {
              setUser(res)
            }
          }
          fetchUser()
    },[])
  return (
    <nav className="navbar navbar-top fixed-top navbar-expand" style={{backgroundColor: '#2B4B9B'}} id="navbarDefault">
        <div className="collapse navbar-collapse justify-content-between">
          <div className="navbar-logo">

            <button className="btn navbar-toggler navbar-toggler-humburger-icon hover-bg-transparent" type="button" data-bs-toggle="collapse" data-bs-target="#navbarVerticalCollapse" aria-controls="navbarVerticalCollapse" aria-expanded="false" aria-label="Toggle Navigation"><span className="navbar-toggle-icon"><span className="toggle-line"></span></span></button>
            <a className="navbar-brand me-1 me-sm-3" href="../index.html">
              <div className="d-flex align-items-center">
                <div className="d-flex align-items-center">
                  <h5 className="logo-text ms-2 d-none text-white d-sm-block">BBscout </h5>
                </div>
              </div>
            </a>
          </div>
         
          <ul className="navbar-nav navbar-nav-icons flex-row">
            <li className="nav-item">
              <div className="theme-control-toggle  px-2">
                <input className="form-check-input ms-0 theme-control-toggle-input" type="checkbox" data-theme-control="phoenixTheme" value="dark" id="themeControlToggle" />
                <label className="mb-0 theme-control-toggle-label theme-control-toggle-light" htmlFor="themeControlToggle" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-title="Switch theme" style={{height:'32px',width:'32px'}}><Moon  size={18} className='icon'/></label>
                <label className="mb-0 theme-control-toggle-label theme-control-toggle-dark" htmlFor="themeControlToggle" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-title="Switch theme" style={{height:'32px',width:'32px'}}><Sun size={18}  className='icon' /></label>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link" href="#" style={{minWidth: '2.25rem'}} role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-bs-auto-close="outside"><span className="d-block" style={{height:'20px', width:'20px'}}>
                <Bell size={20} className='icon text-white' />
                </span></a>

              <div className="dropdown-menu dropdown-menu-end notification-dropdown-menu py-0 shadow border navbar-dropdown-caret" id="navbarDropdownNotfication" aria-labelledby="navbarDropdownNotfication">
                <div className="card position-relative border-0">
                  <div className="card-header p-2">
                    <div className="d-flex justify-content-between">
                      <h5 className="text-body-emphasis mb-0">Notifications</h5>
                      <button className="btn btn-link p-0 fs-9 fw-normal" type="button">Mark all as read</button>
                    </div>
                  </div>
                  <div className="card-body p-0">
                    <div className="scrollbar-overlay" style={{ height: "27rem" }}>
                      {/* notification list hhere */}
                    </div>
                  </div>
                  <div className="card-footer p-0 border-top border-translucent border-0">
                    <div className="my-2 text-center fw-bold fs-10 text-body-tertiary text-opactity-85"><a className="fw-bolder" href="../pages/notifications.html">Notification history</a></div>
                  </div>
                </div>
              </div>
            </li>
            <li className="nav-item dropdown"><a className="nav-link lh-1 pe-0" id="navbarDropdownUser" href="#!" role="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-haspopup="true" aria-expanded="false">
                <div className="avatar avatar-l ">
                  <img className="rounded-circle " src="/project/11.png" alt="" />
                </div>
              </a>
              <div className="dropdown-menu dropdown-menu-end navbar-dropdown-caret py-0 dropdown-profile shadow border" aria-labelledby="navbarDropdownUser">
                <div className="card position-relative border-0">
                  <div className="card-body p-0">
                    <div className="text-center pt-4 pb-3">
                      <div className="avatar avatar-xl ">
                        <img className="rounded-circle " src="/project/11.png" alt="" />

                      </div>
                      <h6 className="mt-2 text-body-emphasis">{user && user.firstName  + ' '+ user.lastName}</h6>
                      <p>{user && user.email}</p>
                    </div>
                  
                  </div>
                  <div className="overflow-auto scrollbar" style={{ height: "10rem" }}>
                    <ul className="nav d-flex flex-column mb-2 pb-1">
                      <li className="nav-item"><NavLink className="nav-link px-3 d-block" to={'/user-account'}> <span className="me-2 text-body align-bottom" data-feather="user"></span><span>Profile</span></NavLink></li>
                      <li className="nav-item"><NavLink className="nav-link px-3 d-block" to={'/'}><span className="me-2 text-body align-bottom" data-feather="pie-chart"></span>Dashboard</NavLink></li>
                      <li className="nav-item"><NavLink className="nav-link px-3 d-block" to={'/change-password'}> <span className="me-2 text-body align-bottom" data-feather="settings"></span>Change Password </NavLink></li>
                    </ul>
                  </div>
                  <div className="card-footer p-0 border-top border-translucent">
                    {/* <ul className="nav d-flex flex-column my-3">
                      <li className="nav-item"><a className="nav-link px-3 d-block" href="#!"> <span className="me-2 text-body align-bottom" data-feather="user-plus"></span>Add another account</a></li>
                    </ul>
                    <hr /> */}
                    <div className="px-3 py-3"> <a className="btn btn-phoenix-secondary d-flex flex-center w-100" href="#!" onClick={()=> logout()}> <span className="me-2" data-feather="log-out"> </span>Sign out</a></div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
  )
}
