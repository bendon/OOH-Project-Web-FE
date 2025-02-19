import React, { useEffect, useState } from 'react'
import DashboardChart from '../../charts/DashboardChart'
import { Presentation, User } from 'lucide-react'
import GoogleMap from '../../components/GoogleMapComponent'
import GoogleMapComponent from '../../components/GoogleMapComponent'
import { getUserAnalytics } from '../../data/lib'

export default function DashboardPage() {
  const [userAnalytic, setUserAnalytics] = useState(null)

  useEffect(()=>{
      const userAnalytics = async()=>{
        const res = await getUserAnalytics()
        if(res.status === 200){
          if(res.data.length > 0){
            setUserAnalytics(res.data[0])
          }else{
            setUserAnalytics(null)
          }
          
        }
      }
      userAnalytics()
  },[])
  return (
    <>
    <div className="row gy-3 mb-4 justify-content-between">
          <div className="col-xxl-6">
            <h5 className="mb-2 text-body-emphasis">Overview</h5>
            <div className="row g-3 mb-3">
              <div className="col-sm-6 col-md-4 col-xl-3 col-xxl-4">
                <div className="card h-100">
                  <div className="card-body">
                    <div className="d-flex d-sm-block justify-content-between">
                      <div className="border-bottom-sm border-translucent mb-sm-4">
                        <div className="d-flex align-items-center">
                          <div className="d-flex align-items-center icon-wrapper-sm shadow-primary-100" style={{transform: 'rotate(-7.45deg)'}}>
                              <User size={20} className="text-primary text-primary fs-7 z-1 ms-2" />
                            </div>
                          <p className="text-body-tertiary fs-9 mb-0 ms-2 mt-3">Outgoing call</p>
                        </div>
                        <p className="text-primary mt-2 fs-6 fw-bold mb-0 mb-sm-4">{userAnalytic ?  userAnalytic.noOfUsers : 0} <span className="fs-8 text-body lh-lg">Teams</span></p>
                      </div>
                      <div className="d-flex flex-column justify-content-center flex-between-end d-sm-block text-end text-sm-start">
                        <span className="badge badge-phoenix badge-phoenix-success text-lowercase fs-10 mb-2">12 online</span>
                        <p className="mb-0 fs-9 text-body-tertiary">Total Uploaded</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-4 col-xl-3 col-xxl-4">
                <div className="card h-100">
                  <div className="card-body">
                    <div className="d-flex d-sm-block justify-content-between">
                      <div className="border-bottom-sm border-translucent mb-sm-4">
                        <div className="d-flex align-items-center">
                          <div className="d-flex align-items-center icon-wrapper-sm shadow-info-100" style={{transform: 'rotate(-7.45deg)'}}>
                            <Presentation size={20} className="text-info text-info fs-7 z-1 ms-2" />
                            </div>
                          <p className="text-body-tertiary fs-9 mb-0 ms-2 mt-3">Bill boards</p>
                        </div>
                        <p className="text-info mt-2 fs-6 fw-bold mb-0 mb-sm-4">12 <span className="fs-8 text-body lh-lg">Bill Boards</span></p>
                      </div>
                      <div className="d-flex flex-column justify-content-center flex-between-end d-sm-block text-end text-sm-start">
                        <span className="badge badge-phoenix badge-phoenix-success fs-10 mb-2 text-capitalize">+99% Accuracy</span>
                        <p className="mb-0 fs-9 text-body-tertiary">Than last week</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-xl-6 col-xxl-4 gy-5 gy-md-3">
                <div className="border-bottom border-translucent">
                  <h5 className="pb-4 border-bottom border-translucent">Top 5 User Uploads</h5>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item bg-transparent list-group-crm fw-bold text-body fs-9 py-2">
                      <div className="d-flex justify-content-between"><span className="fw-normal fs-9 mx-1"> <span className="fw-bold">1. </span>James Otieno </span><span>(65)</span></div>
                    </li>
                    <li className="list-group-item bg-transparent list-group-crm fw-bold text-body fs-9 py-2">
                      <div className="d-flex justify-content-between"><span className="fw-normal mx-1"><span className="fw-bold">2. </span>Mary Achieng</span><span>(74)</span></div>
                    </li>
                    <li className="list-group-item bg-transparent list-group-crm fw-bold text-body fs-9 py-2">
                      <div className="d-flex justify-content-between"><span className="fw-normal fs-9 mx-1"><span className="fw-bold">3.</span> Joseph Kibet</span><span>(32)</span></div>
                    </li>
                    <li className="list-group-item bg-transparent list-group-crm fw-bold text-body fs-9 py-2">
                      <div className="d-flex justify-content-between"><span className="fw-normal fs-9 mx-1"><span className="fw-bold">4.</span> Martin Luta</span><span>(25)</span></div>
                    </li>
                    <li className="list-group-item bg-transparent list-group-crm fw-bold text-body fs-9 py-2">
                      <div className="d-flex justify-content-between"><span className="fw-normal fs-9 mx-1"> <span className="fw-bold">5.</span> Joel Mkambu</span><span>(23)</span></div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-6 mb-6">
            <div style={{ width: '100%'}} >
              <DashboardChart />
            </div>
          </div>
        </div>
        <div>
            <GoogleMapComponent />
        </div>
    </>
  )
}
