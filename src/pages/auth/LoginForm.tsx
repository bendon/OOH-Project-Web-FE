

import  { FormEvent } from 'react'
import { authLogin } from '../../data/lib'
import { useNavigate } from 'react-router'
import { GoogleOAuthProvider } from '@react-oauth/google'
import GoogleOAuthButton from './google/GoogleOAuthButton'


export default function LoginForm() {


    const navigate = useNavigate()
    
    async function handleSubmitAuth(event : FormEvent<HTMLFormElement>) {
        event.preventDefault()
 
        const formData = new FormData(event.currentTarget)

        const response = await authLogin(formData)
        console.log(response)

        navigate('/')
        
    }

  return (
    <>
        <div className="row flex-center h-100 g-0 px-4 px-sm-0">
            <div className="col col-sm-6 col-lg-7 col-xl-6">
                <a className="d-flex flex-center text-decoration-none mb-4" href="../../../index.html">
                    <div className="d-flex align-items-center fw-bolder fs-3 d-inline-block">
                        <img src="/project/bbscout.png" alt="phoenix" width="58" />
                    </div>
                </a>
                <div className="text-center mb-7">
                    <h3 className="text-body-highlight">Sign In</h3>
                    <p className="text-body-tertiary">Get access to your account</p>
                </div>
                <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                    <GoogleOAuthButton/>
                </GoogleOAuthProvider>
                <div className="position-relative">
                    <hr className="bg-body-secondary mt-5 mb-4" />
                    <div className="divider-content-center">or use email</div>
                </div>
                <form onSubmit={handleSubmitAuth}>
                    <div className="mb-3 text-start">
                        <label className="form-label" htmlFor="email">Email address</label>
                        <div className="form-icon-container">
                        <input className="form-control form-icon-input" id="email" type="email" placeholder="name@example.com" name='email' required/><span className="fas fa-user text-body fs-9 form-icon"></span>
                        </div>
                    </div>
                    <div className="mb-3 text-start">
                        <label className="form-label" htmlFor="password">Password</label>
                        <div className="form-icon-container" data-password="data-password">
                        <input className="form-control form-icon-input pe-6" id="password" type="password" name='password' placeholder="Password" required data-password-input="data-password-input" /><span className="fas fa-key text-body fs-9 form-icon"></span>
                        <button className="btn px-3 py-0 h-100 position-absolute top-0 end-0 fs-7 text-body-tertiary" data-password-toggle="data-password-toggle"><span className="uil uil-eye show"></span><span className="uil uil-eye-slash hide"></span></button>
                        </div>
                    </div>
                    
                    <button type='submit' className="btn btn-primary w-100 mb-3">Sign In</button>
                </form>
                <div className="row flex-between-center mb-7">
                    <div className="col-auto">
                    <div className="form-check mb-0">
                    </div>
                    </div>
                    <div className="col-auto"><a className="fs-9 fw-semibold" href="../../../pages/authentication/simple/forgot-password.html">Forgot Password?</a></div>
                </div>
            </div>
        </div>
        {/* <GoogleOAuthButton/> */}
    </>
  )
}
