import { ArrowLeft, CheckCheck } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { postForgotPassword } from '../../data/lib';

export default function ForgotForm() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleForgotPassword = async (event) => {
        event.preventDefault()
        setLoading(true)
        setError(null)

        const formData = new FormData(event.currentTarget)

        const payload = {
            email: formData.get('email'),
        }
        const res = await postForgotPassword(payload)
        if (res.status === 200) {
            setLoading(false)
            setSuccess(true)
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
                        <h3 className="text-body-highlight">Forgot Password</h3>
                        <p className="text-body-tertiary">Get access to your account by reseting your password</p>
                    </div>


                    {success && <p className='alert alert-success p-2 border-0' style={{ fontSize: '12px', borderRadius: 0 }}> <CheckCheck size={18} /> Check your email for a reset password instructions. </p>}

                    {!success && <>
                        <div className="position-relative">
                            <hr className="bg-body-secondary mt-5 mb-4" />
                            <div className="divider-content-center">Enter your email</div>
                        </div>
                        {error && <p className='alert alert-danger p-2 border-0' style={{ fontSize: '12px', borderRadius: 0 }}> {error}</p>}
                        <form onSubmit={handleForgotPassword}>
                            <div className="mb-3 text-start">
                                <label className="form-label" htmlFor="email">Email address</label>
                                <div className="form-icon-container">
                                    <input className="form-control form-icon-input" id="email" type="email" placeholder="name@example.com" name='email' required /><span className="fas fa-user text-body fs-9 form-icon"></span>
                                </div>
                            </div>
                            <button type='submit' disabled={loading} className="btn btn-primary w-100 mb-3 d-flex align-items-center justify-content-center">
                                {loading && <div className="spinner-border text-white me-3" style={{ fontSize: '10px', width: '1rem', height: '1rem' }} role="status"><span className="visually-hidden">Loading...</span></div>}
                                {loading ? 'Loading .... please wait' : 'Reset Password'}</button>
                        </form>
                    </>}
                    <div className="row flex-between-center mb-7">
                        <div className="col-auto">
                            <div className="form-check mb-0">
                            </div>
                        </div>
                        <div className="col-auto"><Link to={'/login'} className="fs-9 fw-semibold" href="/"><ArrowLeft size={18} /> Back to login </Link></div>
                    </div>
                </div>
            </div>
        </>
    )
}
