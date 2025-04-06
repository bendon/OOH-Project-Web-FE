import { ClipboardCheck, SearchIcon, Sheet } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import { exportToExcel } from '../../data/Utilities';
import { Link } from 'react-router';
import { getMonitoringList } from '../../data/lib';

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





    const searchMonitoring = async () => {
        await getMonitoringList({
            startDate: startDate,
            endDate: endDate,
            size: size,
            page: paging.page
        })
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
                    <button className='btn btn-subtle-success me-1 mb-1' onClick={() => exportToExcel(tableRef, "Upload report " + startDate + ' to ' + endDate)}><Sheet size={16} /> Export to Excel</button>
                    <Link to="/manage-boards" className='btn btn-subtle-primary' style={{ fontSize: '12px' }}><ClipboardCheck size={15} /> Billboard Management</Link>
                </div>
            </div>
            <hr />
            <div className='table-responsive'>
                <table className='table table-bordered table-hover' >
                    <thead>
                        <tr>
                            <th colSpan={17}>
                                <h6>As At {startDate === endDate ? startDate : startDate + ' To ' + endDate}</h6>
                            </th>
                        </tr>
                    </thead>
                    <thead>
                        <tr style={{ backgroundColor: "#0088ff", color: "#000" }}>
                            <th style={{ color: '#fff' }}>Code</th>
                            <th style={{ color: '#fff' }}>Date & time</th>
                            <th style={{ color: '#fff' }}>City</th>
                            <th style={{ color: '#fff' }}>Brand</th>
                            <th style={{ color: '#fff' }}>Size</th>
                            <th style={{ color: '#fff' }}>Coordinates</th>
                            <th style={{ color: '#fff' }}>Actions</th>
                        </tr>
                    </thead>
                </table>
            </div>


        </div>
    )
}
