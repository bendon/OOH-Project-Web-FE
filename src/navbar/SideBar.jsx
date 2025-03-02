import { ArrowLeft, ArrowRight, ChartColumnStacked, ChartNoAxesCombined, FolderKanban, Key, LayoutDashboard, Lock, MapPinHouse, MonitorCog, ReceiptText, Shield, ShieldCheck, SquarePlus, UserPlus, UserRoundCog, Users } from 'lucide-react'
import React from 'react'
import { NavLink, useNavigate } from 'react-router'
import { postUserLogOut } from '../data/lib'

export default function SideBar() {
    const navigate = useNavigate()
    const logoutUser =  async () => {
        const res = await postUserLogOut()
     
        if (res.status === 200) {
            navigate('/login')
        } else {
            console.log(res.error)
        }
    }
  return (
    <nav className="navbar navbar-vertical navbar-expand-lg">
        <div className="collapse navbar-collapse" id="navbarVerticalCollapse">
          <div className="navbar-vertical-content">
            <ul className="navbar-nav flex-column" id="navbarVerticalNav">
              <li className="nav-item">
                <p className="navbar-vertical-label">Dashboard </p>
                <hr className="navbar-vertical-line" />

                <div className="nav-item-wrapper">
                    <NavLink  className="nav-link label-1" to="/" role="button" data-bs-toggle="" aria-expanded="false">
                        <div className="d-flex align-items-center">
                            <span className="nav-link-icon"> <LayoutDashboard size={18} className='icon'/> </span>
                            <span className="nav-link-text-wrapper"><span className="nav-link-text">Analytics</span></span>
                        </div>
                    </NavLink>
                </div>
                <div className="nav-item-wrapper">
                    <NavLink className="nav-link label-1" to="/billboard-analysis" role="button" data-bs-toggle="" aria-expanded="false">
                        <div className="d-flex align-items-center">
                            <span className="nav-link-icon"> <ChartNoAxesCombined size={18} className='icon'/> </span>
                            <span className="nav-link-text-wrapper"><span className="nav-link-text">Billboards Analysis</span></span>
                        </div>
                    </NavLink>
                </div>
                <div className="nav-item-wrapper">
                    <NavLink className="nav-link label-1" to="/team-analysis" role="button" data-bs-toggle="" aria-expanded="false">
                        <div className="d-flex align-items-center">
                            <span className="nav-link-icon"> <ChartColumnStacked size={18} className='icon'/> </span>
                            <span className="nav-link-text-wrapper"><span className="nav-link-text">Team Analysis</span></span>
                        </div>
                    </NavLink>
                </div>
              </li>
              <li className="nav-item">
                <p className="navbar-vertical-label">Bill Boards </p>
                <hr className="navbar-vertical-line" />

                <div className="nav-item-wrapper">
                    <NavLink className="nav-link label-1" to="/manage-boards" role="button" data-bs-toggle="" aria-expanded="false">
                        <div className="d-flex align-items-center">
                            <span className="nav-link-icon"> <FolderKanban size={18} className='icon'/> </span>
                            <span className="nav-link-text-wrapper"><span className="nav-link-text">Manage Boards</span></span>
                        </div>
                    </NavLink>
                </div>
                <div className="nav-item-wrapper">
                    <NavLink className="nav-link label-1" to="/create-board" role="button" data-bs-toggle="" aria-expanded="false">
                        <div className="d-flex align-items-center">
                            <span className="nav-link-icon"> <SquarePlus size={18} className='icon'/> </span>
                            <span className="nav-link-text-wrapper"><span className="nav-link-text">Create Bill Board</span></span>
                        </div>
                    </NavLink>
                </div>
                <div className="nav-item-wrapper">
                    <NavLink className="nav-link label-1" to="/billboard-locations" role="button" data-bs-toggle="" aria-expanded="false">
                        <div className="d-flex align-items-center">
                            <span className="nav-link-icon"> <MapPinHouse size={18} className='icon'/> </span>
                            <span className="nav-link-text-wrapper"><span className="nav-link-text">Geolocations</span></span>
                        </div>
                    </NavLink>
                </div>
              </li>
              <li className="nav-item">
                <p className="navbar-vertical-label">Team Management</p>
                <hr className="navbar-vertical-line" />

                <div className="nav-item-wrapper">
                    <NavLink className="nav-link label-1" to="/team-management" role="button" data-bs-toggle="" aria-expanded="false">
                        <div className="d-flex align-items-center">
                            <span className="nav-link-icon"> <Users size={18} className='icon'/> </span>
                            <span className="nav-link-text-wrapper"><span className="nav-link-text">Manage Team</span></span>
                        </div>
                    </NavLink>
                </div>
                <div className="nav-item-wrapper">
                    <NavLink className="nav-link label-1" to="/create-team" role="button" data-bs-toggle="" aria-expanded="false">
                        <div className="d-flex align-items-center">
                            <span className="nav-link-icon"> <UserPlus size={18} className='icon'/> </span>
                            <span className="nav-link-text-wrapper"><span className="nav-link-text">Create Member</span></span>
                        </div>
                    </NavLink>
                </div>
              </li>
              <li className="nav-item">
                <p className="navbar-vertical-label">Administration</p>
                <hr className="navbar-vertical-line" />

                <div className="nav-item-wrapper">
                    <NavLink className="nav-link label-1" to="/role-settings" role="button" data-bs-toggle="" aria-expanded="false">
                        <div className="d-flex align-items-center">
                            <span className="nav-link-icon"> <ShieldCheck size={18} className='icon'/> </span>
                            <span className="nav-link-text-wrapper"><span className="nav-link-text">Role settings</span></span>
                        </div>
                    </NavLink>
                </div>
                <div className="nav-item-wrapper">
                    <NavLink className="nav-link label-1" to="/term-policy" role="button" data-bs-toggle="" aria-expanded="false">
                        <div className="d-flex align-items-center">
                            <span className="nav-link-icon"> <ReceiptText size={18} className='icon'/> </span>
                            <span className="nav-link-text-wrapper"><span className="nav-link-text">Terms & policy</span></span>
                        </div>
                    </NavLink>
                </div>
              </li>
              <li className="nav-item">
                <p className="navbar-vertical-label">User Profile</p>
                <hr className="navbar-vertical-line" />

                <div className="nav-item-wrapper">
                    <NavLink className="nav-link label-1" to="/user-account" role="button" data-bs-toggle="" aria-expanded="false">
                        <div className="d-flex align-items-center">
                            <span className="nav-link-icon"> <UserRoundCog size={18} className='icon'/> </span>
                            <span className="nav-link-text-wrapper"><span className="nav-link-text">Account</span></span>
                        </div>
                    </NavLink>
                </div>
                <div className="nav-item-wrapper">
                    <NavLink className="nav-link label-1" to="/change-password" role="button" data-bs-toggle="" aria-expanded="false">
                        <div className="d-flex align-items-center">
                            <span className="nav-link-icon"> <Key size={18} className='icon'/> </span>
                            <span className="nav-link-text-wrapper"><span className="nav-link-text">Change Password</span></span>
                        </div>
                    </NavLink>
                </div>
                <div className="nav-item-wrapper"> 
                    <a className="nav-link label-1" href="#" onClick={logoutUser} role="button" data-bs-toggle="" aria-expanded="false">
                        <div className="d-flex align-items-center">
                            <span className="nav-link-icon"> <Lock size={18} className='icon'/> </span>
                            <span className="nav-link-text-wrapper"><span className="nav-link-text">Logout</span></span>
                        </div>
                    </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-vertical-footer">
          <button className="btn navbar-vertical-toggle border-0 fw-semibold w-100 white-space-nowrap d-flex align-items-center">
            <ArrowRight size={18} className='fs-8 uil-arrow-from-right'/>
            <ArrowLeft size={18} className='fs-8 uil-left-arrow-to-left'/>
            <span className="navbar-vertical-footer-text ms-2">Collapsed View</span>
            </button>
        </div>
      </nav>
  )
}
