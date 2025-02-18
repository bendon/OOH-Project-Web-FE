import { ArrowLeft, ArrowRight, ChartColumnStacked, ChartNoAxesCombined, FolderKanban, LayoutDashboard, MapPinHouse, SquarePlus } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'

export default function SideBar() {
  return (
    <nav className="navbar navbar-vertical navbar-expand-lg">
        <div className="collapse navbar-collapse" id="navbarVerticalCollapse">
          <div className="navbar-vertical-content">
            <ul className="navbar-nav flex-column" id="navbarVerticalNav">
              <li className="nav-item">
                <p className="navbar-vertical-label">Dashboard </p>
                <hr className="navbar-vertical-line" />

                <div className="nav-item-wrapper">
                    <Link  className="nav-link label-1" to="/" role="button" data-bs-toggle="" aria-expanded="false">
                        <div className="d-flex align-items-center">
                            <span className="nav-link-icon"> <LayoutDashboard size={18} className='icon'/> </span>
                            <span className="nav-link-text-wrapper"><span className="nav-link-text">Analytics</span></span>
                        </div>
                    </Link>
                </div>
                <div className="nav-item-wrapper">
                    <Link className="nav-link label-1" href="/bill-board-analysis" role="button" data-bs-toggle="" aria-expanded="false">
                        <div className="d-flex align-items-center">
                            <span className="nav-link-icon"> <ChartNoAxesCombined size={18} className='icon'/> </span>
                            <span className="nav-link-text-wrapper"><span className="nav-link-text">Billboards Analysis</span></span>
                        </div>
                    </Link>
                </div>
                <div className="nav-item-wrapper">
                    <Link className="nav-link label-1" href="/team-analysis" role="button" data-bs-toggle="" aria-expanded="false">
                        <div className="d-flex align-items-center">
                            <span className="nav-link-icon"> <ChartColumnStacked size={18} className='icon'/> </span>
                            <span className="nav-link-text-wrapper"><span className="nav-link-text">Team Analysis</span></span>
                        </div>
                    </Link>
                </div>
              </li>
              <li className="nav-item">
                <p className="navbar-vertical-label">Bill Boards </p>
                <hr className="navbar-vertical-line" />

                <div className="nav-item-wrapper">
                    <Link className="nav-link label-1" to="/manage-boards" role="button" data-bs-toggle="" aria-expanded="false">
                        <div className="d-flex align-items-center">
                            <span className="nav-link-icon"> <FolderKanban size={18} className='icon'/> </span>
                            <span className="nav-link-text-wrapper"><span className="nav-link-text">Manage Boards</span></span>
                        </div>
                    </Link>
                </div>
                <div className="nav-item-wrapper">
                    <Link className="nav-link label-1" to="/create-board" role="button" data-bs-toggle="" aria-expanded="false">
                        <div className="d-flex align-items-center">
                            <span className="nav-link-icon"> <SquarePlus size={18} className='icon'/> </span>
                            <span className="nav-link-text-wrapper"><span className="nav-link-text">Create Bill Board</span></span>
                        </div>
                    </Link>
                </div>
                <div className="nav-item-wrapper">
                    <Link className="nav-link label-1" href="/manage-boards/map-location" role="button" data-bs-toggle="" aria-expanded="false">
                        <div className="d-flex align-items-center">
                            <span className="nav-link-icon"> <MapPinHouse size={18} className='icon'/> </span>
                            <span className="nav-link-text-wrapper"><span className="nav-link-text">Geolocations</span></span>
                        </div>
                    </Link>
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
