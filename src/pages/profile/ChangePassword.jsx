import React, { useEffect, useState } from 'react'
import { convertToHumanReadable, getUserProfile, updateUserPassword } from '../../data/lib'
import { Key, MailCheck } from 'lucide-react'
import { Link } from 'react-router'
import { getJoinedTime } from '../../data/Utilities'
import { ShimmerCategoryItem } from 'react-shimmer-effects'
import EmptyResults from '../NotFound/EmptyResults'

export default function ChangePassword() {
  const [profile, setProfile] = useState(null)
  const [pageLoading, setPageLoading] = useState(false)
  const [error, setError] = useState(null)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [errPassword, setErrPassword] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)
  useEffect(() => {
    const fetchUserProfile = async () => {
      setPageLoading(true)
      const res = await getUserProfile()
      if (res.status === 200) {
        setPageLoading(false)
        setProfile(res.data)
      }else{
        setPageLoading(false)
        setError(res.data.message)
      }
    }
    fetchUserProfile()
  }, [])

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    // confirm if the password is the same as the confirm password
    if (password !== confirmPassword) {
      setError('Password and confirm password do not match')
      setLoading(false)
      return
    }

    const payload = {
      oldPassword: oldPassword,
      newPassword: password
    }

    console.log(password);
    const res = await updateUserPassword(payload)
    if (res.status === 200) {
      setSuccess('Password updated successfully')
      setPassword('')
      setConfirmPassword('')
      setOldPassword('')
      setLoading(false)
    } else {
      setLoading(false)
      setError(res.error)
    }

  }
  //bbscout-password

  useEffect(() => {
    if (password !== confirmPassword) {
      setErrPassword('Password and confirm password do not match')
    }else{
      setErrPassword(null)
    }
  },[confirmPassword])
  return (
    <>
    <div className="row align-items-center justify-content-between g-3 mb-4">
        <div className="col-auto">
          <h3 className="mb-0">Change Password</h3>
        </div>
        <div className="col-auto">
          <div className="row g-2 g-sm-3">
            <div className="col-auto">
              {/* <button className="btn btn-phoenix-danger"><span className="fas fa-trash-alt me-2"></span>Delete customer</button> */}
            </div>
            <div className="col-auto">
              <Link to="/user-account" className="btn btn-phoenix-secondary"><span className="fas fa-user me-2"></span>My Account</Link>
            </div>
          </div>
        </div>
      </div>
    {pageLoading ? <ShimmerCategoryItem  rounded={1} items={1} itemsGap={30} thumbnailHeight={400} thumbnailWidth={600} thumbnailRounded={1} contentDetailsPosition="start" contentDetailTextLines={8} /> :
    <>
      {profile? <>
      <div className="row g-3 mb-6">
        <div className="col-12 col-lg-8">
        {success && <p className='alert alert-success p-2 border-0' style={{ fontSize: '12px', borderRadius: 0 }}> {success}</p>}
          <div className="card h-100">
            <div className="card-body">
              <div className="border-bottom border-dashed pb-4">
                <div className="row align-items-center g-3 g-sm-5 text-center text-sm-start">
                  <div className="col-12 col-sm-auto">
                    {/* <input className="d-none" id="avatarFile" type="file" /> */}
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
            <div className="card-footer bg-light py-3">
              <p className='text-warning'><strong>Note:</strong> The updated password will take effect the next time you log in.</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <div className="card h-100">
            <div className="card-body">
              <div className="border-bottom border-dashed">
                <h4 className="mb-3">Change Password
                  <button className="btn btn-link p-0" type="button"> <span className="fas fa-edit fs-9 ms-3 text-body-quaternary"></span></button>
                </h4>
              </div>
              <form onSubmit={handlePasswordSubmit}>
                <div className="pt-4 mb-3 mb-lg-4 mb-xl-3">
                  <div className="row justify-content-between">
                    {error && <p className='alert alert-danger p-2 border-0' style={{ fontSize: '12px', borderRadius: 0 }}> {error}</p>}
                    <div className="mb-3">
                      <label className="form-label" htmlFor="oldPassword">Old Password <sup className='text-danger'>required</sup></label>
                      <input className="form-control required" id="oldPassword" type="password" required placeholder="" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="newPassword">New Password <sup className='text-danger'>required</sup></label>
                      <input className="form-control required" id="newPassword" type="password" required placeholder="" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="confirmPassword">Confirm Password <sup className='text-danger'>required</sup></label>
                      <input className="form-control required mb-2" id="confirmPassword" type="password" required placeholder="" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                      {errPassword && <p className='alert alert-danger p-2 border-0' style={{ fontSize: '12px', borderRadius: 0 }}> {errPassword}</p>}
                    </div>
                  </div>
                </div>
                <div className="border-top border-dashed pt-4">
                  <button type='submit' disabled={loading} className='btn btn-primary'><Key size={15} className='me-2' /> 
                  {loading && <div className="spinner-border text-white me-3" style={{fontSize: '10px', width: '1rem', height: '1rem'}} role="status"><span className="visually-hidden">Loading...</span></div>}
                    {loading ? 'Loading .... please wait' : 'Update Password'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      </>: <EmptyResults />}
      </>
}

    </>
  )
}
