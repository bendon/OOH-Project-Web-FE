import { ClipboardCheck, MapPin } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'
import BillboardUploadHourChart from '../../charts/BillboardUploadHourChart'
import BillboardUploadDailyChart from '../../charts/BillboardUploadDailyCharts'
import BillboardTypesChart from '../../charts/BillboardTypesChart'

export default function BillBoardAnalysis() {
  return (
    <>
      <div className='d-flex justify-content-between'>
        <h4>Billboard Analysis</h4>
        <div>
          <Link to="/billboard-locations" className='btn btn-subtle-secondary me-2' style={{ fontSize: '12px' }}><MapPin size={15} /> Billboard Geolocation</Link>
          <Link to="/manage-boards" className='btn btn-subtle-primary' style={{ fontSize: '12px' }}><ClipboardCheck size={15} /> Billboard Management</Link>
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
          <div className="col-6 col-md-4 col-xxl-2 text-center border-translucent border-start-xxl border-end-xxl pb-md-4 pb-xxl-0 pt-4 pt-xxl-0"><span className="uil fs-5 lh-1 uil-smile text-danger"></span>
            <h1 className="fs-5 pt-3">0</h1>
            <p className="fs-9 mb-0">Impressions</p>
          </div>
        </div>
      </div>

      <div className='row'>

        <div className='col-xxl-6'>
          <BillboardUploadDailyChart />
        </div>
        <div className='col-xxl-6'>
          <BillboardUploadHourChart />
        </div>
        <div className='col-xxl-6'>
          <BillboardTypesChart />
        </div>
        <div className='col-xxl-6'>
          <div className='card '>
            <div className='card-header'>
              <h6>Billboard Prediction Insights</h6>
            </div>
            <div className='card-body'>
              <div className="timeline-vertical timeline-with-details">
                <div className="timeline-item position-relative">
                  <div className="row g-md-3">
                    <div className="col-12 col-md-auto d-flex">
                      <div className="timeline-item-date order-1 order-md-0 me-md-4">
                        <p className="fs-10 fw-semibold text-body-tertiary text-opacity-85 text-end " style={{ width: '100px' }}>Soap and Detergent</p>
                      </div>
                      <div className="timeline-item-bar position-md-relative me-3 me-md-0">
                        <div className="icon-item icon-item-sm rounded-7 shadow-none bg-primary-subtle">
                          <span className="fa-solid fa-star text-primary-dark fs-10"></span> </div><span className="timeline-bar border-end border-dashed"></span>
                      </div>
                    </div>
                    <div className="col">
                      <div className="timeline-item-content ps-6 ps-md-3">
                        <h5 className="fs-9 lh-sm">Target Audience</h5>
                        <p className="fs-9">Broad demographic, but potentially skewing towards households and families.</p>
                        <p className="fs-9 text-body-secondary mb-5"><b>Placement : </b> Near grocery stores, shopping centers, residential areas.</p>
                        <p className="fs-9 text-body-secondary mb-5"><b>Creative : </b> Highlight cleanliness, freshness, or specific product benefits.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="timeline-item position-relative">
                  <div className="row g-md-3">
                    <div className="col-12 col-md-auto d-flex">
                      <div className="timeline-item-date order-1 order-md-0 me-md-4">
                        <p className="fs-10 fw-semibold text-body-tertiary text-opacity-85 text-end" style={{ width: '100px' }}>Burger</p>
                      </div>
                      <div className="timeline-item-bar position-md-relative me-3 me-md-0">
                        <div className="icon-item icon-item-sm rounded-7 shadow-none bg-primary-subtle">
                          <span className="fa-solid fa-star text-primary-dark fs-10"></span> </div><span className="timeline-bar border-end border-dashed"></span>
                      </div>
                    </div>
                    <div className="col">
                      <div className="timeline-item-content ps-6 ps-md-3">
                        <h5 className="fs-9 lh-sm">Target Audience</h5>
                        <p className="fs-9">Wide demographic, but potentially younger audiences or those seeking convenience.</p>
                        <p className="fs-9 text-body-secondary mb-5"><b>Placement: </b> Near fast-food restaurants, entertainment venues, high-traffic areas.</p>
                        <p className="fs-9 text-body-secondary mb-5"><b>Creative: </b> Appealing visuals of the burger, highlighting taste and ingredients.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="timeline-item position-relative">
                  <div className="row g-md-3">
                    <div className="col-12 col-md-auto d-flex">
                      <div className="timeline-item-date order-1 order-md-0 me-md-4">
                        <p className="fs-10 fw-semibold text-body-tertiary text-opacity-85 text-end" style={{ width: '100px' }}>Additional  Considerations</p>
                      </div>
                      <div className="timeline-item-bar position-md-relative me-3 me-md-0">
                        <div className="icon-item icon-item-sm rounded-7 shadow-none bg-primary-subtle">
                          <span className="fa-solid fa-dungeon text-primary-dark fs-10"></span></div>
                      </div>
                    </div>
                    <div className="col">
                      <div className="timeline-item-content ps-6 ps-md-3">
                        <h5 className="fs-9 lh-sm">Seasonality</h5>
                        <p className="fs-9"> Adjust ads based on the time of year (e.g., summer drinks, winter comfort foods).</p>
                        <p className="fs-9 text-body-secondary mb-0">Tie in ads with local events or festivals for relevance. Include a clear call to action (e.g., visit a website, follow on social media, try the product).</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
