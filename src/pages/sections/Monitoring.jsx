import { ClipboardCheck, SearchIcon, Sheet } from 'lucide-react';
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { exportToExcel } from '../../data/Utilities';
import { Link } from 'react-router';
import { convertToHumanReadable, getMonitoringList } from '../../data/lib';
import { ShimmerTable } from 'react-shimmer-effects';

export default function Monitoring() {
    const tableRef = useRef(null);
    const [monitoring, setMonitoring] = useState(null)
    const [startDate, setStartDate] = useState(new Date().toLocaleDateString("en-CA"))
    const [endDate, setEndDate] = useState(new Date().toLocaleDateString("en-CA"))
    const [size, setSize] = useState(10)
    const [paging, setPaging] = useState({
        page: 1,
        size: 10,
        total_pages: 0,
        total: 0
    })
    const inputRef = useRef(null);
    const inputToRef = useRef(null);
    const [loading, setLoading] = useState(false)

    const [expandedRows, setExpandedRows] = useState(new Set());

    useEffect(async () => {

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

        const res = await getMonitoringList({
            startDate: "2025-01-01",
            endDate: "2025-12-01",
            size: size,
            page: 1
        })
        if (res.status === 200) {
            setMonitoring(res.data)
            setPaging({
                page: res.data.page,
                size: res.data.page_size,
                total_pages: res.data.total_pages,
                total: res.data.total
            })
        }
    }, []);





    const searchMonitoring = async () => {
        setLoading(true)
        const res = await getMonitoringList({
            startDate: startDate,
            endDate: endDate,
            size: size,
            page: paging.page
        })
        if (res.status === 200) {
            setLoading(false)
            setMonitoring(res.data)
            setPaging((previous) => {
                return {
                    ...previous,
                    page: res.data.page
                }
            })
        } else {
            setLoading(false)
        }
    }
    return (
        <div>
            <div className='d-flex justify-content-between'>
                <h4>Auditing</h4>
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
                    <button className='btn btn-subtle-primary me-1 mb-1' onClick={() => searchMonitoring()}><SearchIcon size={16} /> Search</button>
                    <button className='btn btn-subtle-success me-1 mb-1' onClick={() => exportToExcel(tableRef, "Monitoring Report " + startDate + ' to ' + endDate)}><Sheet size={16} /> Export to Excel</button>
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
                                    <h6>As At {startDate === endDate ? startDate : startDate + ' To ' + endDate}</h6>
                                </th>
                            </tr>
                        </thead>
                        <thead>
                            <tr style={{ backgroundColor: "#0088ff", color: "#000" }}>
                                <th style={{ color: '#fff' }}>Date & time</th>
                                <th style={{ color: '#fff' }}>City</th>
                                <th style={{ color: '#fff' }}>Street</th>
                                <th style={{ color: '#fff' }}>Location</th>
                                <th style={{ color: '#fff' }}>Building</th>
                                <th style={{ color: '#fff' }}>Photos</th>
                                <th style={{ color: '#fff' }}>Media Owner</th>
                                <th style={{ color: '#fff' }}>Brand</th>
                                <th style={{ color: '#fff' }}>Compaign</th>
                                <th style={{ color: '#fff' }}>Size</th>
                                <th style={{ color: '#fff' }}>Angle</th>
                                <th style={{ color: '#fff' }}>Environment</th>
                                <th style={{ color: '#fff' }}>Illumination</th>
                                <th style={{ color: '#fff' }}>Material</th>
                                <th style={{ color: '#fff' }}>C. of Structure</th>
                                <th style={{ color: '#fff' }}>C. of Material</th>
                                <th style={{ color: '#fff' }}>Comment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {monitoring && monitoring.data.map((item, index) => (
                                <Fragment key={index}>
                                    <tr key={index}>
                                        <td style={{ textTransform: 'capitalize' }}>{convertToHumanReadable(item.createdAt)}</td>
                                        <td>{item.location}</td>
                                        <td>{item.street}</td>
                                        <td>{item.location}</td>
                                        <td>{item.building}</td>
                                        <td>
                                            <a href={item.longShotImage && `https://scout.edgetech.co.ke/api/v1/auth/file/${item.longShotImage.fileName}`} target="_blank" rel="noopener noreferrer">Long Short</a> <br/>
                                            <a href={item.closeUpImage && `https://scout.edgetech.co.ke/api/v1/auth/file/${item.closeUpImage.fileName}`} target="_blank" rel="noopener noreferrer">Close Up</a>
                                        </td>
                                        <td>{item.Owner}</td>
                                        <td>{item.brand}</td>
                                        <td>{item.campain}</td>
                                        <td>{item.width} by {item.height} {item.unit}</td>
                                        <td>{item.angle}</td>
                                        <td>{item.environment}</td>
                                        <td>{item.material}</td>
                                        <td>{item.conditionOfMaterial}</td>
                                        <td>{item.conditionOfStructure}</td>
                                        <td>{item.comment}</td>
                                    </tr>
                                </Fragment>
                            ))}
                        </tbody>
                    </table>
                </>}
            </div>


        </div>
    )
}
