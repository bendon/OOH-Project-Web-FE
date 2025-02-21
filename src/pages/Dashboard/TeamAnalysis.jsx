import React, { use, useEffect, useState } from 'react'
import UserGenderChart from '../../charts/UserGenderChart'
import { convertToHumanReadable, getStaffs, getUserAnalytics } from '../../data/lib'
import UserRegistrationChart from '../../charts/UserRegistrationChart'

export default function TeamAnalysis() {
  const [gender, setGender] = useState([48, 35, 0])
  const [userAnalytic, setUserAnalytics] = useState(null)
  const [staffs, setStaffs] = useState(null)

  useEffect(() => {
    const userAnalytics = async () => {
      const res = await getUserAnalytics()
      if (res.status === 200) {
        if (res.data.length > 0) {
          setUserAnalytics(res.data[0])
          setGender([res.data[0].maleCount, res.data[0].femaleCount, res.data[0].transgenderCount])
        } else {
          setUserAnalytics(null)
        }

      }
    }
    const fetchData = async () => {
      const res = await getStaffs({})
      if (res.status === 200) {
        setStaffs(res.data)
      }
    }

    fetchData()
    userAnalytics()
  }, [])

  return (
    <>
      <div className='row gy-3 mb-4'>
        <div className="col-12 col-xxl-6 mb-3 mb-sm-0">
          <div className="row">
            <div className="col-sm-7 col-md-8 col-xxl-8 mb-md-3 mb-lg-0">
              <h3>Team Analysis</h3>
              <div className="row g-0">
                <div className="col-6 col-xl-4">
                  <div className="d-flex flex-column flex-center align-items-sm-start flex-md-row justify-content-md-between flex-xxl-column p-3 ps-sm-3 ps-md-4 p-md-3 h-100 border-1 border-bottom border-end border-translucent">
                    <div className="d-flex align-items-center mb-1"><span className="fa-solid fa-square fs-11 me-2 text-primary" data-fa-transform="up-2"></span><span className="mb-0 fs-9 text-body">Users</span></div>
                    <h3 className="fw-semibold ms-xl-3 ms-xxl-0 pe-md-2 pe-xxl-0 mb-0 mb-sm-3">{userAnalytic ? userAnalytic.noOfUsers : 0}</h3>
                  </div>
                </div>
                <div className="col-6 col-xl-4">
                  <div className="d-flex flex-column flex-center align-items-sm-start flex-md-row justify-content-md-between flex-xxl-column p-3 ps-sm-3 ps-md-4 p-md-3 h-100 border-1 border-bottom border-end-md-0 border-end-xl border-translucent">
                    <div className="d-flex align-items-center mb-1"><span className="fa-solid fa-square fs-11 me-2 text-success" data-fa-transform="up-2"></span><span className="mb-0 fs-9 text-body">Joined This Month</span></div>
                    <h3 className="fw-semibold ms-xl-3 ms-xxl-0 pe-md-2 pe-xxl-0 mb-0 mb-sm-3">{userAnalytic ? userAnalytic.joinedThisMonth : 0}</h3>
                  </div>
                </div>
                <div className="col-6 col-xl-4">
                  <div className="d-flex flex-column flex-center align-items-sm-start flex-md-row justify-content-md-between flex-xxl-column p-3 ps-sm-3 ps-md-4 p-md-3 h-100 border-1 border-bottom border-end border-end-md border-end-xl-0 border-translucent">
                    <div className="d-flex align-items-center mb-1"><span className="fa-solid fa-square fs-11 me-2 text-info" data-fa-transform="up-2"></span><span className="mb-0 fs-9 text-body">Roles</span></div>
                    <h3 className="fw-semibold ms-xl-3 ms-xxl-0 pe-md-2 pe-xxl-0 mb-0 mb-sm-3">{userAnalytic ? userAnalytic.noOfRoles : 0}</h3>
                  </div>
                </div>
                <div className="col-6 col-xl-4">
                  <div className="d-flex flex-column flex-center align-items-sm-start flex-md-row justify-content-md-between flex-xxl-column p-3 ps-sm-3 ps-md-4 p-md-3 h-100 border-1 border-end-xl border-bottom border-bottom-xl-0 border-translucent">
                    <div className="d-flex align-items-center mb-1"><span className="fa-solid fa-square fs-11 me-2 text-info-light" data-fa-transform="up-2"></span><span className="mb-0 fs-9 text-body">Active Users</span></div>
                    <h3 className="fw-semibold ms-xl-3 ms-xxl-0 pe-md-2 pe-xxl-0 mb-0 mb-sm-3">{userAnalytic ? userAnalytic.activeUsers : 0}</h3>
                  </div>
                </div>
                <div className="col-6 col-xl-4">
                  <div className="d-flex flex-column flex-center align-items-sm-start flex-md-row justify-content-md-between flex-xxl-column p-3 ps-sm-3 ps-md-4 p-md-3 h-100 border-1 border-end border-translucent">
                    <div className="d-flex align-items-center mb-1"><span className="fa-solid fa-square fs-11 me-2 text-danger-lighter" data-fa-transform="up-2"></span><span className="mb-0 fs-9 text-body">Verified Users</span></div>
                    <h3 className="fw-semibold ms-xl-3 ms-xxl-0 pe-md-2 pe-xxl-0 mb-0 mb-sm-3">{userAnalytic ? userAnalytic.verifiedUsers : 0}</h3>
                  </div>
                </div>
                <div className="col-6 col-xl-4">
                  <div className="d-flex flex-column flex-center align-items-sm-start flex-md-row justify-content-md-between flex-xxl-column p-3 ps-sm-3 ps-md-4 p-md-3 h-100">
                    <div className="d-flex align-items-center mb-1"><span className="fa-solid fa-square fs-11 me-2 text-warning-light" data-fa-transform="up-2"></span><span className="mb-0 fs-9 text-body">Last User Joined</span></div>
                    <h3 className="fw-semibold ms-xl-3 ms-xxl-0 pe-md-2 pe-xxl-0 mb-0 mb-sm-3" style={{ fontSize: '12px' }}>{userAnalytic ? convertToHumanReadable(userAnalytic.lastUserJoinedAt) : 0}</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-5 col-md-4 col-xxl-4 my-3 my-sm-0">
              <div className="position-relative d-flex flex-center mb-sm-4 mb-xl-0 echart-contact-by-source-container mt-sm-7 mt-lg-4 mt-xl-0">
                {/* <div className="echart-contact-by-source" style={{minHeight:'245px',width:'100%'}}></div> */}
                <UserGenderChart data={gender} />
                {/* <div className="position-absolute rounded-circle bg-primary-subtle top-50 start-50 translate-middle d-flex flex-center" style={{height:'100px' ,width:'100px'}}>
                  <h3 className="mb-0 text-primary-dark fw-bolder" data-label="data-label"></h3>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-xxl-6 mb-3 mb-sm-0">
          <UserRegistrationChart />
        </div>
      </div>
      <div className='card'>
        <div className='card-body'>
          <div className='table-responsive'>
            <table className="table  table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Country</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Verified</th>
                  <th scope="col">Role</th>
                  <th scope="col">Status</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {staffs &&
                  staffs.data.map((staff, index) => (
                    <tr key={index}>
                      <td className='text-center' scope="row">{index + 1}</td>
                      <td>{staff.firstName} {staff.lastName}</td>
                      <td>{staff.email}</td>
                      <td>{staff.country}</td>
                      <td>{staff.phone}</td>
                      <td>
                        {staff.verified && <span className='badge bg-success'>Verified</span>}
                        {!staff.verified && <span className='badge bg-danger'>Not Verified</span>}

                      </td>
                      <td>{staff.roleName}</td>
                      <td>
                        {staff.active && <span className='badge bg-success'>Active</span>}
                        {!staff.active && <span className='badge bg-danger'>Inactive</span>}
                      </td>
                      <td>{convertToHumanReadable(staff.createdAt)}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </>
  )
}
