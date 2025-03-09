import React, { useEffect, useRef, useState } from 'react'
import { getFilesGallery } from '../../../data/lib'
import { bytesToMB, getJoinedTime } from '../../../data/Utilities'
import { Eye, Repeat, SearchIcon } from 'lucide-react'
import { set } from 'date-fns'

export default function BillboardGallery() {
    const [files, setFiles] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [startDate, setStartDate] = useState(new Date().toLocaleDateString("en-CA"))
    const [endDate, setEndDate] = useState(new Date().toLocaleDateString("en-CA"))
    const inputRef = useRef(null);
    const inputToRef = useRef(null);
    const [loadingMore, setLoadingMore] = useState(false)

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

    const [page, setPage] = useState({
        page: 1,
        size: 12,
        total_page: 0,
        total: 0
    })

    useEffect(() => {
        const fetchFiles = async () => {
            setLoading(true)
            const res = await getFilesGallery({
                startDate: startDate,
                endDate: endDate,
                page: page.page,
                size: page.size
            })
            if (res.status === 200) {
                setFiles(res.data)
                setLoading(false)

                // set pages
                setPage({
                    page: res.data.page,
                    size: res.data.page_size,
                    total_page: res.data.total_pages,
                    total: res.data.total
                })
            } else {
                setError(res.error)
                setLoading(false)
            }
        }
        fetchFiles()
    }, [])

    const searchUploadGallery = async () => {
        setLoading(true)
        setFiles(null)
        const res = await getFilesGallery({
            startDate: startDate,
            endDate: endDate,
            size: page.size,
            page: page.page,
        })
        if (res.status === 200) {
            setLoading(false)
            setFiles(res.data)
            setSuccess(res.message)
            setPage({
                page: res.data.page,
                size: res.data.page_size,
                total_page: res.data.total_pages,
                total: res.data.total
            })
        } else {
            setLoading(false)
            setError(res.error)
        }

    }

    const loadMoreFiles = async () => {
        setLoadingMore(true)
        const res = await getFilesGallery({
            startDate: startDate,
            endDate: endDate,
            size: page.size,
            page: page.page + 1,
        })
        if (res.status === 200) {
            setLoadingMore(false)
            //update files.data
            setFiles((previous) => {
                return {
                    ...previous,
                    data: [...previous.data, ...res.data.data]
                }
            })
            setPage((previous) => {
                return {
                    ...previous,
                    page: res.data.page
                }
            })

            
        } else {
            setLoadingMore(false)
        }
    }
    return (
        <>
            <div className='alert ps-0 rounded-0 pt-0 mb-3 border-bottom mb-5 d-flex justify-content-between align-items-center' >
                <h6 style={{ fontWeight: '800px', fontSize: '18px' }}>Billboards Gallery</h6>
                <div className='d-flex'>
                    <div className='me-2'>
                        <label className='form-label'>Date From</label>
                        <input type="text" className='week-picker' placeholder='Enter Year' ref={inputRef} style={{ display: "none" }} />
                    </div>
                    <div className='me-2'>
                        <label className='form-label'>Date To</label>
                        <input type="text" className='week-picker' placeholder='Enter Year' ref={inputToRef} style={{ display: "none" }} />
                    </div>
                    <div className='me-2'>
                        <label className='form-label'>Filter</label><br></br>
                        <button className='btn btn-subtle-primary me-1 mb-1' onClick={() => searchUploadGallery()}><SearchIcon size={16} /> Search</button>
                    </div>
                </div>
            </div>
            <div className='card mt-3'>
                <div className='card-body'>
                    <h4 className='mb-3'>Uploaded Files</h4>
                    <div className="row g-3">
                        {loading && <div className="alert alert-subtle-primary d-flex align-items-center me-3" role="alert">
                            <div className="spinner-border text-primary me-3" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <p className="mb-0 flex-1">Please wait updating user permissions ....</p>
                        </div>}
                        {files && files.data.length > 0 && files.data.map((file, index) => (
                            <div className="col-sm-6 col-xl-6 col-xxl-3" key={index}>
                                <div className="position-relative">
                                    <div className="img-zoom-hover mask-image-none overflow-hidden border rounded-3">
                                        <div className="position-relative">
                                            <div className="mask-image-recent-file overflow-hidden">
                                                <div className="ratio ratio-16x9">
                                                    <img className="w-100 h-100 object-fit-cover" src={`https://scout.edgetech.co.ke/api/v1/auth/file/${file.file_url}`} alt="" />
                                                </div>
                                                <span className="badge badge-phoenix fs-10 position-absolute top-0 start-0 mt-3 ms-3 badge-phoenix-info"> {file.billboard ? file.billboard.boardCode : ''}</span>
                                            </div>
                                        </div>
                                        <div className="bg-body p-3 pe-2 d-flex justify-content-between align-items-start rounded-bottom-3">
                                            <div className="w-75"><a className="text-body-highlight fw-bold mb-2 stretched-link d-block text-truncate" href="#" data-gallery="recent-file" data-width="" data-height="">{file.file_name}</a>
                                                <h6 className="mb-0 fw-semibold text-body-tertiary">{bytesToMB(file.file_size)} <span style={{ fontSize: '12px' }}>Upload {getJoinedTime(file.created_at)}</span></h6>
                                            </div>
                                            <div className="dropdown position-static z-5">
                                                <button className="btn btn-square-sm mt-n1" type="button" ><Eye size={18} />  </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {files && files.data.length === 0 && <div className='text-center'>No Files Uploaded</div>}
                        {!loading && page.page !== page.total_page && <button type='button' onClick={loadMoreFiles} disabled={loadingMore} className='btn btn-subtle-primary'>
                            {loadingMore === true ?
                                <>
                                    <div className='d-flex align-items-center justify-content-center'>
                                        <div className="spinner-border text-primary me-3" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div> <span>loading more ....</span>
                                    </div>
                                </> :
                                <>
                                    <Repeat size={15} /> Load more
                                </>}
                        </button>}
                    </div>
                </div>
            </div>
        </>
    )
}
