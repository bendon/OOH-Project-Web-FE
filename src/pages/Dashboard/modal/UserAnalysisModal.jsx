import React, { use, useEffect, useState } from 'react'
import { convertToHumanReadable, getUserMonthlyReport } from '../../../data/lib'
import { getISOWeek, getYear, getMonth,subMonths } from "date-fns";
import YearlyUserReport from './YearlyUserReport';
import RadarWeeklyUserReport from './RadarWeeklyUserReport';

export default function UserAnalysisModal({ user }) {
    const userInfo = user
    

    const today = new Date();
    const lastMonthDate = subMonths(today, 1);
    const [dateFilter, setDateFilter] = useState([getYear(today), getMonth(today) + 1, getISOWeek(today)]);
    const [lastMonthDetails, setLastMonth] = useState([
        getYear(lastMonthDate), 
        getMonth(lastMonthDate) + 1, // getMonth returns 0-based month, so add 1
        getISOWeek(lastMonthDate)
      ]);
    const [monthReport, setMonthReport] = useState(null)
    const [lastMonthReport, setLastMonthReport] = useState(null)

    useEffect(() => {

        const fetchUserMonthReport = async () => {
            if (userInfo && userInfo.userId) {
                setMonthReport(null)
                const res = await getUserMonthlyReport({
                    year: dateFilter[0],
                    month: dateFilter[1],
                    userId: userInfo.userId
                })

                

                if (res.status === 200) {
                    setMonthReport(res.data)
                }
            }
        }
        fetchUserMonthReport()
        const fetchUserLastMonthReport = async () => {
            if (userInfo && userInfo.userId) {
                setLastMonthReport(null)
                const res = await getUserMonthlyReport({
                    year: lastMonthDetails[0],
                    month: lastMonthDetails[1],
                    userId: userInfo.userId
                })
                if (res.status === 200) {
                    setLastMonthReport(res.data)
                }
            }
        }
        fetchUserLastMonthReport()
    }, [user])

    return (
        <>
            <div className="modal fade" id="k_modal_user_analysis" tabIndex="-1" data-bs-backdrop="static" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg" style={{ maxWidth: '95vw' }}>
                    <div className="modal-content">
                        <div className="modal-header justify-content-between bg-primary">
                            {userInfo && <h5 className="modal-title text-white dark__text-gray-1100" id="staticBackdropLabel">{userInfo.firstName} {userInfo.lastName}</h5>}
                            <button className="btn p-1" type="button" data-bs-dismiss="modal" aria-label="Close"><span className="fas fa-times fs-9 text-white dark__text-gray-1100"></span></button>
                        </div>
                        <div className="modal-body">
                            {userInfo ?
                                <>
                                    <div className='row'>
                                        <div className='col-md-4 mb-3'>
                                            <div className='card card-body'>
                                                <h5>User Details</h5>
                                                <hr />
                                                <p style={{ fontSize: '12px' }}><b>Name</b> : {userInfo.firstName} {userInfo.lastName} </p>
                                                <p style={{ fontSize: '12px' }}><b>Email</b> : {userInfo.email}</p>
                                                <p style={{ fontSize: '12px' }}><b>Phone</b> : {userInfo.phone}</p>
                                                <p style={{ fontSize: '12px' }}><b>Gender</b> : {userInfo.gender}</p>
                                                <p style={{ fontSize: '12px' }}><b>Joined Date </b> : {convertToHumanReadable(userInfo.createdAt)}</p>
                                            </div>
                                        </div>
                                        <div className='col-md-4'>
                                            <div className='card card-body  bg-warning text-white mb-2'>
                                                <h5>This Month Uploads</h5>
                                                <hr />
                                                <h5 >{monthReport ? monthReport.billboardCount : 0}</h5>
                                            </div>
                                            <div className='card card-body bg-primary mb-2'>
                                                <h5>Last Month</h5>
                                                <hr />
                                                <h5 >{lastMonthReport ? lastMonthReport.billboardCount : 0}</h5>
                                            </div>
                                        </div>
                                        <div className='col-md-4'>
                                            {userInfo && <RadarWeeklyUserReport user={userInfo} />}
                                        </div>
                                        <div className='col-md-12'>
                                            {userInfo && <YearlyUserReport user={userInfo} />}
                                        </div>
                                    </div>
                                </>
                                :
                                <> bad </>
                            }
                        </div>
                        {/* <div className="modal-footer">
                            <button className="btn btn-primary" type="button">Okay</button>
                            <button className="btn btn-outline-primary" type="button" data-bs-dismiss="modal">Cancel</button>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}
