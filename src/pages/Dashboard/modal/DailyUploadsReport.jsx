import React, { useEffect, useRef, useState } from 'react'
import { convertToHumanReadable, getDailyUploadReport } from '../../../data/lib'
import { exportToExcel } from '../../../data/Utilities'
import { Sheet } from 'lucide-react'

export default function DailyUploadsReport({ dayDate }) {
    const [report, setReport] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const tableRef = useRef(null);
    
    useEffect(() => {
        const fetchDailyReport = async () => {
            setLoading(true)
            try {
                const res = await getDailyUploadReport({
                    startDate: dayDate,
                    page: 1,
                    size: 1000,
                    code : null,
                    endDate: dayDate
                })
                if (res.status === 200) {
                    setReport(res.data)
                }
            } catch (error) {
                setError(error)
            }
        }
        fetchDailyReport()
    },[dayDate])
    return (
        <>
            <div className="modal fade" id="k_modal_daily_report_uploads" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog " style={{ minWidth: "90vw" }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <button className='btn btn-subtle-success me-1 mb-1' onClick={() => exportToExcel(tableRef,"Daily Uploads")}><Sheet size={16} /> Export to Excel</button>
                            <button className="btn btn-close p-1" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body  ">
                            <div className='table-responsive'>
                                <table className='table table-bordered table-hover' ref={tableRef}>
                                    <thead>
                                        <tr>
                                            <th colSpan={17}>
                                                <h6>Daily Upload Report as At {dayDate}</h6>
                                            </th>
                                        </tr>
                                    </thead>
                                    <thead>
                                        <tr style={{ backgroundColor: "#0088ff",color:"#000" }}>
                                            <th style={{color: '#fff'}}>Code</th>
                                            <th style={{color: '#fff'}}>Date</th>
                                            <th style={{color: '#fff'}}>Media Owner</th>
                                            <th style={{color: '#fff'}}>Owner Contacts</th>
                                            <th style={{color: '#fff'}}>Owner Email</th>
                                            <th style={{color: '#fff'}}>Object Type</th>
                                            <th style={{color: '#fff'}}>Town</th>
                                            <th style={{color: '#fff'}}>Brand</th>
                                            <th style={{color: '#fff'}}>Structure</th>
                                            <th style={{color: '#fff'}}>Material</th>
                                            <th style={{color: '#fff'}}>Size</th>
                                            <th style={{color: '#fff'}}>Visibility</th>
                                            <th style={{color: '#fff'}}>Angle</th>
                                            <th style={{color: '#fff'}}>Latitude</th>
                                            <th style={{color: '#fff'}}>Longitude</th>
                                            <th style={{color: '#fff'}}>CloseUp Photo</th>
                                            <th style={{color: '#fff'}}>Distanced Photo</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {report && report.data.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.boardCode}</td>
                                                <td style={{textTransform: 'capitalize'}}>{convertToHumanReadable(item.createdAt)}</td>
                                                <td>{item.owner}</td>
                                                <td>{item.ownerContact && item.ownerContact.map((item, index)=> <span key={index}>{item}, </span>)}</td>
                                                <td>{item.ownerEmail && item.ownerEmail.map((item, index)=> <span key={index}>{item}, </span>)}</td>
                                                <td>{item.objectType}</td>
                                                <td>{item.city ? item.city :item.location}</td>
                                                <td>{item.campaign && item.campaign.campaignBrand}</td>
                                                <td>{item.structure}</td>
                                                <td>{item.material}</td>
                                                <td>{item.height} * {item.width}</td>
                                                <td>{item.visibility}</td>
                                                <td>{item.angel}</td>
                                                <td>{item.latitude}</td>
                                                <td>{item.longitude}</td>
                                                <td style={{textTransform: 'lowercase'}}>
                                                    {item.image && `https://scout.edgetech.co.ke/api/v1/auth/file/${item.image.fileName}`} 
                                                </td>
                                                <td>
                                                {item.closeupImage && `https://scout.edgetech.co.ke/api/v1/auth/file/${item.closeupImage.fileName}`} 
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
