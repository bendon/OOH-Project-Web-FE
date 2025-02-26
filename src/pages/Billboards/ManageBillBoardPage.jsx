import { CopyX, Edit, ListCollapse, PlusSquare } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { getBillBoards } from '../../data/lib'
import { ShimmerTable, ShimmerTableRow } from 'react-shimmer-effects'

export default function ManageBillBoardPage() {
  const [billboards, setBillboards] = useState(null)
  const [loadingTable, setLoadingTable] = useState(true)

  useEffect(() => {
    const fetchBillboards = async () => {
      setLoadingTable(true)
      const res = await getBillBoards()
      if (res.status === 200) {
        setLoadingTable(false)
        setBillboards(res.data)
      }else{
        setLoadingTable(false)
      }
    }
    fetchBillboards()
  }, [])

  const searchBillBoard = async(search) => {
          const res = await getBillBoards({
              search: search
          })
          if (res.status === 200) {
            setBillboards(res.data)
          }
      }
  return (
    <>
      <div className='d-flex justify-content-between'>
        <h4>Manage Billboards</h4>
        <div>
          <Link to="/create-board" className='btn btn-outline-primary' style={{ fontSize: '12px' }}><PlusSquare size={15} /> New Billboard</Link>
        </div>
      </div>
      <hr />
      <div className="px-3 mb-5">
        <div className="row justify-content-between">
          <div className="col-6 col-md-4 col-xxl-2 text-center border-translucent border-start-xxl border-end-xxl-0 border-bottom-xxl-0 border-end border-bottom pb-4 pb-xxl-0 "><span className="uil fs-5 lh-1 uil-clapper-board text-primary"></span>
            <h1 className="fs-5 pt-3">0</h1>
            <p className="fs-9 mb-0">Total Billboards</p>
          </div>
          <div className="col-6 col-md-4 col-xxl-2 text-center border-translucent border-start-xxl border-end-xxl-0 border-bottom-xxl-0 border-end-md border-bottom pb-4 pb-xxl-0"><span className="uil fs-5 lh-1 uil-clapper-board text-info"></span>
            <h1 className="fs-5 pt-3">0</h1>
            <p className="fs-9 mb-0">Total Occupied</p>
          </div>
          <div className="col-6 col-md-4 col-xxl-2 text-center border-translucent border-start-xxl border-bottom-xxl-0 border-bottom border-end border-end-md-0 pb-4 pb-xxl-0 pt-4 pt-md-0"><span className="uil fs-5 lh-1 uil-clapper-board text-primary"></span>
            <h1 className="fs-5 pt-3">0</h1>
            <p className="fs-9 mb-0">Total Vacancy</p>
          </div>
          <div className="col-6 col-md-4 col-xxl-2 text-center border-translucent border-start-xxl border-end-md border-end-xxl-0 border-bottom border-bottom-md-0 pb-4 pb-xxl-0 pt-4 pt-xxl-0"><span className="uil fs-5 lh-1 uil-clapper-board text-info"></span>
            <h1 className="fs-5 pt-3">0</h1>
            <p className="fs-9 mb-0">Uploaded Today</p>
          </div>
          <div className="col-6 col-md-4 col-xxl-2 text-center border-translucent border-start-xxl border-end border-end-xxl-0 pb-md-4 pb-xxl-0 pt-4 pt-xxl-0"><span className="uil fs-5 lh-1 uil-clapper-board text-success"></span>
            <h1 className="fs-5 pt-3">0</h1>
            <p className="fs-9 mb-0">Locations</p>
          </div>
          <div className="col-6 col-md-4 col-xxl-2 text-center border-translucent border-start-xxl border-end-xxl pb-md-4 pb-xxl-0 pt-4 pt-xxl-0"><span className="uil fs-5 lh-1 uil-clapper-board text-danger"></span>
            <h1 className="fs-5 pt-3">0</h1>
            <p className="fs-9 mb-0">Materials</p>
          </div>
        </div>
      </div>

      <div className='card'>
        <div className='card-header'>
          <div className='d-flex justify-content-between'>
            <div>
              <input type="text" className="form-control" placeholder="Search by code" onChange={(e) => searchBillBoard(e.target.value)} />
            </div>
          </div>
        </div>
        <div className='card-body'>
          {loadingTable ? <ShimmerTable    row={5} col={5} loadingAnimation="pulse" /> : <>
          <div className='table-responsive'>
            <table className="table  table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Code</th>
                  <th>Coordinates</th>
                  <th>width</th>
                  <th>height</th>
                  <th>Measurement</th>
                  <th>material</th>
                  <th>price</th>
                  <th>Status</th>
                  <th>location</th>
                  <th className='text-end'>Action</th>
                </tr>
              </thead>
              <tbody>
                {billboards && billboards.data.map((billboard, index) => (
                  <tr key={billboard.id}>
                    <td>{index + 1}</td>
                    <td>{billboard.boardCode}</td>
                    <td>{billboard.latitude}, {billboard.longitude}</td>
                    <td>{billboard.width}</td>
                    <td>{billboard.height}</td>
                    <td>{billboard.unit}</td>
                    <td>{billboard.type}</td>
                    <td>{billboard.price}</td>
                    <td>{billboard.active ? <span className='badge text-bg-success'>active</span> : <span className='badge text-bg-danger'>inactive</span>}</td>
                    <td>{billboard.location}</td>
                    <td className='text-end'>
                      <Link to={`/billboard/${billboard.id}`} className='btn btn-subtle-primary me-1 mb-1 d-inline  p-1 global-size' ><Edit className='me-3' size={12} /> Edit</Link>
                      <Link to={`/billboard/${billboard.id}`} className='btn btn-subtle-secondary me-1 mb-1 d-inline  p-1 global-size' ><ListCollapse className='me-3' size={12} /> manage</Link>
                      <Link to={`/billboard/${billboard.id}`} className='btn btn-subtle-danger me-1 mb-2 d-inline  p-1 global-size' ><CopyX className='me-3' size={12} /> Delete</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </>}
        </div>
      </div>
    </>
  )
}
