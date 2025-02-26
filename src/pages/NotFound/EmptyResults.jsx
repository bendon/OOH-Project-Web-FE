import React from 'react'
import { Link } from 'react-router'

export default function EmptyResults() {
    return (
        <>
            <div className="row flex-center min-vh-50 py-5">
                <div className="col-sm-10 col-md-8 col-lg-5 col-xxl-4">
                    <Link className="d-flex flex-center text-decoration-none mb-4" to="/">
                        <div className="d-flex align-items-center fw-bolder fs-3 d-inline-block">
                            <img src="/project/bbscout.png" alt="phoenix" width="58" />
                        </div>
                    </Link>
                    <div className="px-xxl-5">
                        <div className="text-center mb-6">
                            <h4 className="text-body-highlight">Ooops!!</h4>
                            <p className="text-body-tertiary mb-0">No data found</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
