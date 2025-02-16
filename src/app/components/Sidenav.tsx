import { ArrowLeft, ArrowRight, BetweenHorizonalStart, ChartBar, ChartColumnStacked, ChartNoAxesCombined, ChevronRight, FolderKanban, Grid, LayoutDashboard, MapPinHouse, PieChart, SquarePlus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Sidenav() {
  return (
    <nav className="navbar navbar-vertical navbar-expand-lg">
        <div className="collapse navbar-collapse" id="navbarVerticalCollapse">
          <div className="navbar-vertical-content">
            <ul className="navbar-nav flex-column" id="navbarVerticalNav">
                 {/* <div className="nav-item-wrapper"><a className="nav-link dropdown-indicator label-1" href="#nv-home" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-home">
                    <div className="d-flex align-items-center">
                      <div className="dropdown-indicator-icon-wrapper">
                        <ChevronRight size={18} className='dropdown-indicator-icon'/>
                        </div>
                        <span className="nav-link-icon">
                          <PieChart size={18} className='icon'/>
                        </span>
                        <span className="nav-link-text">Home </span>
                    </div>
                  </a>
                  <div className="parent-wrapper label-1">
                    <ul className="nav collapse parent" data-bs-parent="#navbarVerticalCollapse" id="nv-home">
                      <li className="collapsed-nav-item-title d-none">Home
                      </li>
                      <li className="nav-item"><a className="nav-link" href="../index.html">
                          <div className="d-flex align-items-center"><span className="nav-link-text">E commerce</span>
                          </div>
                        </a>
                      </li>
                      <li className="nav-item"><a className="nav-link" href="../dashboard/project-management.html">
                          <div className="d-flex align-items-center"><span className="nav-link-text">Project management</span>
                          </div>
                        </a>
                      </li>
                      <li className="nav-item"><a className="nav-link" href="../dashboard/crm.html">
                          <div className="d-flex align-items-center"><span className="nav-link-text">CRM</span>
                          </div>
                        </a>
                      </li>
                      <li className="nav-item"><a className="nav-link" href="../dashboard/travel-agency.html">
                          <div className="d-flex align-items-center"><span className="nav-link-text">Travel agency</span>
                          </div>
                        </a>
                      </li>
                      <li className="nav-item"><a className="nav-link" href="../apps/social/feed.html">
                          <div className="d-flex align-items-center"><span className="nav-link-text">Social feed</span>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div> */}
              <li className="nav-item">
                <p className="navbar-vertical-label">Dashboard </p>
                <hr className="navbar-vertical-line" />

                <div className="nav-item-wrapper">
                    <Link  className="nav-link label-1" href="/" role="button" data-bs-toggle="" aria-expanded="false">
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
                    <Link className="nav-link label-1" href="/manage-boards" role="button" data-bs-toggle="" aria-expanded="false">
                        <div className="d-flex align-items-center">
                            <span className="nav-link-icon"> <FolderKanban size={18} className='icon'/> </span>
                            <span className="nav-link-text-wrapper"><span className="nav-link-text">Manage Boards</span></span>
                        </div>
                    </Link>
                </div>
                <div className="nav-item-wrapper">
                    <Link className="nav-link label-1" href="manage-boards/create" role="button" data-bs-toggle="" aria-expanded="false">
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
