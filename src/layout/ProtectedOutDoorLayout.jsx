import React, { useEffect, useState } from 'react'
import { getSession } from '../data/lib'
import { Outlet } from 'react-router'

export default function ProtectedOutDoorLayout() {
        const [currentSession, setSession] = useState(null)
        const [loading, setLoading] = useState(true)
    
        useEffect(()=>{
            const activeSession = async () => {
                const session = await getSession()
                console.log(session);
                
                setSession(session)
                setLoading(false)
              }
              activeSession()
        },[])
  return (
    <>
    {loading && currentSession === null ?
            <div className='d-flex  justify-content-center align-items-center'>
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className='ms-3 pt-3'>Loading .....</p>
            </div>
            : 
            <>
            {!loading && currentSession.token ? <Outlet /> : <Navigate to="/login" />}
            
            </>

    }
    </>
  )
}
