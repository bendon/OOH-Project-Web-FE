import { CheckCheck, Lock } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { postResetForgotPassword, postUserLogOut } from '../../data/lib';

export default function ResetPasswordForm() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleUpdatePassword = async (event) => {
        event.preventDefault()
        setLoading(true)
        setError(null)
        const formData = new FormData(event.currentTarget)

        //check if password and confirm password are the same
        if (formData.get('password') !== formData.get('confirm_password')) {
            setError('Password and Confirm Password must be the same')
            setLoading(false)
            return
        }

        const payload = {
            password: formData.get('password'),
        }

        const res = await postResetForgotPassword(payload)

        if (res.status === 200) {
            setLoading(false)
            setSuccess(true)
            const data = await postUserLogOut()
            if (data.status === 200) {
                navigate("/login")
            }
        } else {
            setError(response.error)
            setLoading(false)
        }

    }
    return (
        <>
            <div className="row flex-center h-100 g-0 px-4 px-sm-0">
                <div className="col col-sm-6 col-lg-7 col-xl-6">
                    <a className="d-flex flex-center text-decoration-none mb-4" href="/">
                        <div className="d-flex align-items-center fw-bolder fs-3 d-inline-block">
                            <img src="/project/bbscout.png" alt="phoenix" width="50" />
                        </div>
                    </a>
                    <div className="text-center mb-7">
                        <h3 className="text-body-highlight">Reset Password</h3>
                        <p className="text-body-tertiary">Reset account credentials</p>
                    </div>


                    {success && <p className='alert alert-success p-2 border-0' style={{ fontSize: '12px', borderRadius: 0 }}> <CheckCheck size={18} /> Check your email for a reset password instructions. </p>}

                    {!success && <>
                        <div className="position-relative">
                            <hr className="bg-body-secondary mt-5 mb-4" />
                            <div className="divider-content-center">Enter new password</div>
                        </div>
                        {error && <p className='alert alert-danger p-2 border-0' style={{ fontSize: '12px', borderRadius: 0 }}> {error}</p>}
                        <form onSubmit={handleUpdatePassword}>
                            <div className="mb-3 text-start">
                                <label className="form-label" htmlFor="password">Password</label>
                                <div className="form-icon-container" data-password="data-password">
                                    <input className="form-control form-icon-input pe-6" id="password" type="password" name='password' placeholder="Password" required data-password-input="data-password-input" /><span className="fas fa-key text-body fs-9 form-icon"></span>
                                    <button className="btn px-3 py-0 h-100 position-absolute top-0 end-0 fs-7 text-body-tertiary" data-password-toggle="data-password-toggle"><span className="uil uil-eye-slash hide"></span></button>
                                </div>
                            </div>
                            <div className="mb-3 text-start">
                                <label className="form-label" htmlFor="password">Confirm Password</label>
                                <div className="form-icon-container" data-password="data-password">
                                    <input className="form-control form-icon-input pe-6" id="confirm_password" type="password" name='confirm_password' placeholder="Confirm Password" required data-password-input="data-password-input" /><span className="fas fa-key text-body fs-9 form-icon"></span>
                                    <button className="btn px-3 py-0 h-100 position-absolute top-0 end-0 fs-7 text-body-tertiary" data-password-toggle="data-password-toggle"><span className="uil uil-eye-slash hide"></span></button>
                                </div>
                            </div>
                            <button type='submit' disabled={loading} className="btn btn-primary w-100 mb-3 d-flex align-items-center justify-content-center">
                                {loading && <div className="spinner-border text-white me-3" style={{ fontSize: '10px', width: '1rem', height: '1rem' }} role="status"><span className="visually-hidden">Loading...</span></div>}
                                {loading ? 'Loading .... please wait' : 'Update Password'}</button>
                        </form>
                    </>}
                    <div className="row flex-between-center mb-7">
                        <div className="col-auto">
                            <div className="form-check mb-0">
                            </div>
                        </div>
                        <div className="col-auto"><a className="fs-9 fw-semibold text-danger text-decoration-none" href="#"><Lock size={18} /> Logout </a></div>
                    </div>
                </div>
            </div>
        </>
    )
}

{/* <span className="uil uil-eye show"></span> */ }
