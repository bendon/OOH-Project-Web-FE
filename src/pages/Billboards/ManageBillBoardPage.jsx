import { PlusSquare } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'

export default function ManageBillBoardPage() {
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
        <div className='card-body'>
          <div className='table-responsive'>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Code</th>
                  <th>Coordinates</th>
                  <th>width</th>
                  <th>height</th>
                  <th>material</th>
                  <th>occupied</th>
                  <th>location</th>
                  <th>Action</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
