import { ClipboardCheck, MapPin, SearchIcon, Sheet } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { convertToHumanReadable, getDailyUploadReport } from '../../data/lib';
import { ShimmerTable, ShimmerTableRow, ShimmerText } from 'react-shimmer-effects';
import { exportToExcel } from '../../data/Utilities';

export default function BillboardReport() {
    const tableRef = useRef(null);
    const [report, setReport] = useState(null)
    const [startDate, setStartDate] = useState(new Date().toLocaleDateString("en-CA"))
    const [endDate, setEndDate] = useState(new Date().toLocaleDateString("en-CA"))
    const [size, setSize] = useState(10)
    const [page, setPage] = useState(1)
    const inputRef = useRef(null);
    const inputToRef = useRef(null);
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        if (inputRef.current) {
            flatpickr(inputRef.current, {
                enableTime: false,
                dateFormat: "Y-W",
                altInput: true,
                altFormat: "Y-m-d", // Display as "YYYY Week WW"
                defaultDate: new Date(),
                onChange: (selectedDates) => {
                    if (selectedDates.length > 0) {
                        const selectedDate = selectedDates[0];
                        const formattedDate = selectedDate.toLocaleDateString("en-CA");
                        setStartDate(formattedDate)
                    }
                }
            });
        }
        if (inputToRef.current) {
            flatpickr(inputToRef.current, {
                enableTime: false,
                dateFormat: "Y-W",
                altInput: true,
                altFormat: "Y-m-d", // Display as "YYYY Week WW"
                defaultDate: new Date(),
                onChange: (selectedDates) => {
                    if (selectedDates.length > 0) {
                        const selectedDate = selectedDates[0];

                        const formattedDate = selectedDate.toLocaleDateString("en-CA");
                        setEndDate(formattedDate)

                    }
                }
            });
        }
    }, []);

    const searchUploadReports = async () => {
        setLoading(true)
        const res = await getDailyUploadReport({
            startDate: startDate,
            endDate: endDate,
            size: size,
        })
        if (res.status === 200) {
            setLoading(false)
            setReport(res.data)
        }else {
            setLoading(false)
        }
    }
    return (
        <>
            <div className='d-flex justify-content-between'>
                <h4>Upload Reports</h4>
                <div className='d-flex align-items-center justify-content-end'>
                    <div className='me-2 col-1'>
                        <label className='form-label'>Size</label>
                        <input type="number" className='form-control' placeholder='Enter Year' value={size} onChange={(e) => setSize(e.target.value)} />
                    </div>

                    <div className='me-2'>
                        <label className='form-label'>Date From</label>
                        <input type="text" className='week-picker' placeholder='Enter Year' ref={inputRef} style={{ display: "none" }} />
                    </div>
                    <div className='me-2'>
                        <label className='form-label'>Date To</label>
                        <input type="text" className='week-picker' placeholder='Enter Year' ref={inputToRef} style={{ display: "none" }} />
                    </div>
                    <button className='btn btn-subtle-primary me-1 mb-1' onClick={()=>searchUploadReports()}><SearchIcon size={16} /> Search</button>
                    <button className='btn btn-subtle-success me-1 mb-1' onClick={() => exportToExcel(tableRef, "Upload report " + startDate +' to '+ endDate)}><Sheet size={16} /> Export to Excel</button>
                    <Link to="/manage-boards" className='btn btn-subtle-primary' style={{ fontSize: '12px' }}><ClipboardCheck size={15} /> Billboard Management</Link>
                </div>
            </div>
            <hr />

            <div className='table-responsive card card-body'>
            {loading ? <ShimmerTable row={5} col={5} loadingAnimation="pulse" /> : <>
                <table className='table table-bordered table-hover' ref={tableRef}>
                    <thead>
                        <tr>
                            <th colSpan={17}>
                                <h6>Daily Upload Report as At {startDate === endDate ? startDate : startDate + ' To ' + endDate}</h6>
                            </th>
                        </tr>
                    </thead>
                    <thead>
                        <tr style={{ backgroundColor: "#0088ff", color: "#000" }}>
                            <th style={{ color: '#fff' }}>Code</th>
                            <th style={{ color: '#fff' }}>Date</th>
                            <th style={{ color: '#fff' }}>Media Owner</th>
                            <th style={{ color: '#fff' }}>Owner Contacts</th>
                            <th style={{ color: '#fff' }}>Owner Email</th>
                            <th style={{ color: '#fff' }}>Object Type</th>
                            <th style={{ color: '#fff' }}>Town</th>
                            <th style={{ color: '#fff' }}>Brand</th>
                            <th style={{ color: '#fff' }}>Structure</th>
                            <th style={{ color: '#fff' }}>Material</th>
                            <th style={{ color: '#fff' }}>Size</th>
                            <th style={{ color: '#fff' }}>Visibility</th>
                            <th style={{ color: '#fff' }}>Angle</th>
                            <th style={{ color: '#fff' }}>Latitude</th>
                            <th style={{ color: '#fff' }}>Longitude</th>
                            <th style={{ color: '#fff' }}>CloseUp Photo</th>
                            <th style={{ color: '#fff' }}>Distanced Photo</th>
                        </tr>
                    </thead>
                    <tbody>
                    
                    
                    {report && report.data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.boardCode}</td>
                            <td style={{ textTransform: 'capitalize' }}>{convertToHumanReadable(item.createdAt)}</td>
                            <td>{item.owner}</td>
                            <td>{item.ownerContact && item.ownerContact.map((item, index) => <span key={index}>{item}, </span>)}</td>
                            <td>{item.ownerEmail && item.ownerEmail.map((item, index) => <span key={index}>{item}, </span>)}</td>
                            <td>{item.objectType}</td>
                            <td>{item.city ? item.city : item.location}</td>
                            <td>{item.campaign && item.campaign.campaignBrand}</td>
                            <td>{item.structure}</td>
                            <td>{item.material}</td>
                            <td style={{ textTransform: 'lowercase' }}>{item.height} by {item.width}</td>
                            <td>{item.visibility}</td>
                            <td>{item.angel}</td>
                            <td>{item.latitude}</td>
                            <td>{item.longitude}</td>
                            <td style={{ textTransform: 'lowercase' }}>
                                {item.image && `https://scout.edgetech.co.ke/api/v1/auth/file/${item.image.fileName}`}
                            </td>
                            <td>
                                {item.closeupImage && `https://scout.edgetech.co.ke/api/v1/auth/file/${item.closeupImage.fileName}`}
                            </td>
                        </tr>
                    ))}
                    
                    </tbody>
                </table>
                </>}
            </div>
        </>
    )
}
