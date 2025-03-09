import React from 'react'
import LoginForm from './LoginForm'

export default function LoginPage() {
  return (
    <div className="row vh-100 g-0">
        <div className="col-lg-6 position-relative d-none d-lg-block">
            <div className="bg-holder" style={{backgroundImage: "url(/project/background-01.png)", backgroundPosition: "center"}}>
            </div>
        </div>
        <div className="col-lg-6">
          
            <LoginForm/>
        </div>
    </div>
  )
}
