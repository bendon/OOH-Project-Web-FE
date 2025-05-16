import { ClipboardCheck, MapPin, SearchIcon, Sheet } from 'lucide-react'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { convertToHumanReadable, getDailyUploadReport } from '../../data/lib';
import { ShimmerTable, ShimmerTableRow, ShimmerText } from 'react-shimmer-effects';
import { exportToExcel } from '../../data/Utilities';

export default function Auditing() {
    const tableRef = useRef(null);
    const [report, setReport] = useState(null)
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

    const toggleRow = (id) => {
        const newExpandedRows = new Set(expandedRows);
        if (expandedRows.has(id)) {
            newExpandedRows.delete(id);
        } else {
            newExpandedRows.add(id);
        }
        setExpandedRows(newExpandedRows);
    };

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

        const res = await getDailyUploadReport({
            startDate: "2025-01-01",
            endDate: "2025-12-01",
            size: size,
        })
        if (res.status === 200) {
            setReport(res.data)
            setPaging({
                page: res.data.page,
                size: res.data.page_size,
                total_pages: res.data.total_pages,
                total: res.data.total
              })
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
            setPaging({
                page: res.data.page,
                size: res.data.page_size,
                total_pages: res.data.total_pages,
                total: res.data.total
              })
        } else {
            setLoading(false)
        }
    }

    const fetchNextCurrentPage = async (page) => {
        setReport(null)
        setLoading(true)
        const res = await getDailyUploadReport({
            startDate: startDate,
            endDate: endDate,
          size: size,
          page: page,
          
        })
        if (res.status === 200) {
            setLoading(false)
          setReport(res.data)
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
        <>
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
                    <button className='btn btn-subtle-primary me-1 mb-1' onClick={() => searchUploadReports()}><SearchIcon size={16} /> Search</button>
                    <button className='btn btn-subtle-success me-1 mb-1' onClick={() => exportToExcel(tableRef, "Auditing Report " + startDate + ' to ' + endDate)}><Sheet size={16} /> Export to Excel</button>
                    <Link to="/manage-boards" className='btn btn-subtle-primary' style={{ fontSize: '12px' }}><ClipboardCheck size={15} /> Billboard Management</Link>
                </div>
            </div>
            <hr />

            <div className='table-responsive card card-body'>
                {loading ? <ShimmerTable row={5} col={5} loadingAnimation="pulse" /> : <>
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
                        <tbody>


                            {report && report.data.map((item, index) => (
                                <Fragment key={index}>
                                    <tr key={index}>
                                        <td>
                                            <h6>{item.boardCode}</h6>
                                            <p>{item.location}</p>
                                        </td>
                                        <td style={{ textTransform: 'capitalize' }}>{convertToHumanReadable(item.createdAt)}</td>
                                        <td>{item.city ? item.city : item.location}</td>
                                        <td>{item.campaign && item.campaign.campaignBrand}</td>
                                        <td style={{ textTransform: 'lowercase' }}>{item.height} by {item.width}</td>
                                        <td>{item.latitude},{item.longitude}</td>
                                        <td>
                                            <button className='btn btn-subtle-primary' onClick={() => toggleRow(item.billboardId)}>more details</button>
                                        </td>
                                    </tr>
                                    {expandedRows.has(item.billboardId) && (
                                        <tr className="bg-gray-50">
                                            <td colSpan={7} className="px-6 py-4">
                                                <div className="row text-sm">
                                                    <div className='col-md-3'>
                                                        <h6 style={{ fontSize: '11px' }} className="mb-2">Photos</h6>
                                                        <h6 style={{ fontSize: '11px' }} className='mb-2'>Closeup Image</h6><br />
                                                        <a target="_blank" href={item.closeupImage && `https://scout.edgetech.co.ke/api/v1/auth/file/${item.closeupImage.fileName}`} className="text-gray-900 text-lowercase mb-3">{item.closeupImage && `https://scout.edgetech.co.ke/api/v1/auth/file/${item.closeupImage.fileName}`}</a>
                                                        <h6 style={{ fontSize: '11px', marginTop: '1rem' }} className=''>Distance Photo</h6><br />
                                                        <a target="_blank" href={item.image && `https://scout.edgetech.co.ke/api/v1/auth/file/${item.image.fileName}`} className="text-gray-900 text-lowercase">{item.image && `https://scout.edgetech.co.ke/api/v1/auth/file/${item.image.fileName}`}</a>
                                                    </div>
                                                    <div className='col-md-3'>
                                                        <p style={{ fontSize: '11px' }} className=" text-gray-400"><b>Visibility</b> : {item.visibility}</p>
                                                        <p style={{ fontSize: '11px' }} className=" text-gray-400"><b>Angle : </b> {item.angel}</p>
                                                        <p style={{ fontSize: '11px' }} className=" text-gray-400"><b>Material : </b>{item.material}</p>
                                                        <p style={{ fontSize: '11px' }} className=" text-gray-400"><b>Structure : </b>{item.structure}</p>
                                                    </div>
                                                    <div className='col-md-3'>
                                                        <p style={{ fontSize: '11px' }} className="font-medium text-gray-500"><b>Object Type : </b>{item.objectType}</p>
                                                    </div>
                                                    <div className='col-md-3'>
                                                        <b style={{ fontSize: '11px' }}>Owner Details</b>
                                                        <p style={{ fontSize: '11px' }}>{item.owner}</p>
                                                        <p style={{ fontSize: '11px' }}>{item.ownerContact && item.ownerContact.map((item, index) => <span key={index}>{item}, </span>)}</p>
                                                        <p style={{ fontSize: '11px' }}>{item.ownerEmail && item.ownerEmail.map((item, index) => <span key={index}>{item}, </span>)}</p>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </Fragment>
                            ))}

                        </tbody>
                    </table>
                </>}
                <nav aria-label="Page navigation example">
                    <ul className="pagination mb-0">
                        <li className="page-item">
                            <a className="page-link" href="#">
                                <span className="fas fa-chevron-left"> </span>
                            </a>
                        </li>
                        {paging && Array.from({ length: paging.total_pages }, (_, index) => {
                            const pageNumber = index + 1;
                            return (
                                <li
                                    key={pageNumber}
                                    className={`page-item ${paging.page === pageNumber ? "active" : ""}`}
                                    onClick={() => fetchNextCurrentPage(pageNumber)}
                                >
                                    <a className="page-link" href="#">
                                        {pageNumber}
                                    </a>
                                </li>
                            );
                        })}

                        <li class="page-item">
                            <a class="page-link" href="#"> <span class="fas fa-chevron-right"></span></a>
                        </li>
                    </ul>
                </nav>

                <div className='d-none'>
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
                                    <Fragment key={index}>
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
                                            <td>
                                                <button className='btn btn-subtle-primary' onClick={() => toggleRow(item.id)}>more details</button>
                                            </td>
                                        </tr>
                                    </Fragment>
                                ))}

                            </tbody>
                        </table>
                    </>}
                </div>
            </div>
        </>
    )
}
