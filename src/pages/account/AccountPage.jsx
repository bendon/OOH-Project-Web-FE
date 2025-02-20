import React from 'react'

export default function AccountPage() {
  return (
    <>
      <div className="row align-items-center justify-content-between g-3 mb-4">
        <div className="col-auto">
          <h2 className="mb-0">Profile</h2>
        </div>
        <div className="col-auto">
          <div className="row g-2 g-sm-3">
            <div className="col-auto">
              <button className="btn btn-phoenix-danger"><span className="fas fa-trash-alt me-2"></span>Delete customer</button>
            </div>
            <div className="col-auto">
              <button className="btn btn-phoenix-secondary"><span className="fas fa-key me-2"></span>Reset password</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
