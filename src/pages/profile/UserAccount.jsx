import React, { useEffect, useState } from 'react'
import { convertToHumanReadable, getUserAccount, getUserProfile } from '../../data/lib'
import { getJoinedTime, userGender } from '../../data/Utilities'
import { MailCheck, Repeat, University, UserSquare } from 'lucide-react'
import { Link } from 'react-router'

export default function UserAccount() {
  const [profile, setProfile] = useState(null)
  const [accounts, setAccounts] = useState(null)
  useEffect(() => {
    const fetchUserProfile = async () => {
      const res = await getUserProfile()
      if (res.status === 200) {
        setProfile(res.data)
      }

      const res2 = await getUserAccount()
      if (res2.status === 200) {
        setAccounts(res2.data)
      }
    }
    fetchUserProfile()
  }, [])
  return (
    <>
      <div className="row align-items-center justify-content-between g-3 mb-4">
        <div className="col-auto">
          <h2 className="mb-0">Profile</h2>
        </div>
        <div className="col-auto">
          <div className="row g-2 g-sm-3">
            <div className="col-auto">
              {/* <button className="btn btn-phoenix-danger"><span className="fas fa-trash-alt me-2"></span>Delete customer</button> */}
            </div>
            <div className="col-auto">
              <Link to="/change-password" className="btn btn-subtle-secondary me-1 mb-1"><span className="fas fa-key me-2"></span>Reset password</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row g-3 mb-6">
        <div className="col-12 col-lg-8">
          <div className="card h-100">
            <div className="card-body">
              <div className="border-bottom border-dashed pb-4">
                <div className="row align-items-center g-3 g-sm-5 text-center text-sm-start">
                  <div className="col-12 col-sm-auto">
                    <input className="d-none" id="avatarFile" type="file" />
                    <label className="cursor-pointer avatar avatar-5xl" htmlFor="avatarFile"><img className="rounded-circle" src="/project/11.png" alt="" /></label>
                  </div>
                  <div className="col-12 col-sm-auto flex-1">
                    <h3>{profile && profile.firstName + ' ' + profile.middleName + ' ' + profile.lastName}</h3>
                    <p className="text-body-secondary" style={{ fontSize: '12px' }}>{profile && getJoinedTime(profile.createdAt)}</p>
                    <div>
                      <a href="#!" className='text-decoration-none text-secondary' style={{ fontSize: '12px' }}><MailCheck size={15} className='text-body-quaternary text-opacity-75 text-primary-hover me-2' />{profile && profile.email}</a></div>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-between-center pt-4">
                <div>
                  <h6 className="mb-2 text-body-secondary">Joined date </h6>
                  <h4 className=" text-body-highlight mb-0" style={{ fontSize: '12px' }}>{profile && convertToHumanReadable(profile.createdAt)}</h4>
                </div>
                <div className="text-end">
                  <h6 className="mb-2 text-body-secondary">Verified</h6>
                  {profile && profile.verified ? <span className='badge badge-phoenix badge-phoenix-success mb-0'>verified</span> : <span className='badge badge-phoenix badge-phoenix-danger mb-0'>unverified</span>}
                </div>
                <div className="text-end">
                  <h6 className="mb-2 text-body-secondary">Active</h6>
                  {profile && profile.active ? <span className='badge badge-phoenix badge-phoenix-success mb-0'>active</span> : <span className='badge badge-phoenix badge-phoenix-danger mb-0'>inactive</span>}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <div className="card h-100">
            <div className="card-body">
              <div className="border-bottom border-dashed">
                <h4 className="mb-3">Personal Information
                  <button className="btn btn-link p-0" type="button"> <span className="fas fa-edit fs-9 ms-3 text-body-quaternary"></span></button>
                </h4>
              </div>
              <div className="pt-4 mb-7 mb-lg-4 mb-xl-7">
                <div className="row justify-content-between">
                  <div className="col-auto">
                    <h5 className="text-body-highlight" style={{ fontSize: '12px' }}>Country</h5>
                  </div>
                  <div className="col-auto">
                    <p className="text-body-secondary" style={{ fontSize: '12px' }}>{profile && profile.country}</p>
                  </div>
                </div>
                <div className="row justify-content-between">
                  <div className="col-auto">
                    <h5 className="text-body-highlight" style={{ fontSize: '12px' }}>Gender</h5>
                  </div>
                  <div className="col-auto">
                    <p className="text-body-secondary" style={{ fontSize: '12px' }}>{profile && userGender(profile.gender)}</p>
                  </div>
                </div>
              </div>
              <div className="border-top border-dashed pt-4">
                <div className="row flex-between-center mb-2">
                  <div className="col-auto">
                    <h5 className="text-body-highlight mb-0" style={{ fontSize: '12px' }}>Email</h5>
                  </div>
                  <div className="col-auto" style={{ fontSize: '12px' }}>{profile && <a className="lh-1" href={'mailto:' + profile.email}> {profile.email}</a>}</div>
                </div>
                <div className="row flex-between-center">
                  <div className="col-auto">
                    <h5 className="text-body-highlight mb-0" style={{ fontSize: '12px' }}>Phone</h5>
                  </div>
                  <div className="col-auto" style={{ fontSize: '12px' }}>{profile && <a href={'tel:+' + profile.phone}>+{profile.phone}</a>}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 col-lg-8">
        <h2 className="mb-4" id="scrollspyAttachments">Accounts</h2>
        <div className="card mb-3
        ">
          <div className='card-body'>
            {accounts && accounts.map((account, index) => (
              <div key={index} className="border-bottom border-dashed pb-2 ">
                <div className="d-flex justify-content-between align-items-center py-3">
                  <div>
                    <div className="d-flex align-items-center mb-0"> {account.organization ? <University size={18} className='me-2 fs-9 text-body-tertiary' /> : <UserSquare size={18} className='me-2 fs-9 text-body-tertiary' />}
                      <p className="text-body-highlight mb-0 lh-1">{account.organization ? account.organization.name : "Personal Account"}</p>
                    </div>
                    <p className="fs-9 text-body-tertiary mb-0"><span className="text-nowrap">{convertToHumanReadable(account.createdAt)}</span></p>
                  </div>
                  <div className="">
                    <span className="badge text-bg-success">active</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-auto">
          <button className="btn btn-phoenix-danger form-control"><span className="fas fa-lock me-2"></span>Sign out</button>
        </div>
      </div>
    </>
  )
}
