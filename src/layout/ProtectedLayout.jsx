import React, { useEffect, useState } from 'react'
import { getSession } from '../data/lib'
import { Navigate, Outlet } from 'react-router';
import SideBar from '../navbar/SideBar';
import TopBar from '../navbar/TopBar';

export default function ProtectedLayout() {
    const [currentSession, setSession] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const activeSession = async () => {
            const session = await getSession()
            
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
              {currentSession && currentSession.account ?
                <>
                  <SideBar />
                  <TopBar />
                  <div className="content">
                    <Outlet />
                  </div>
                </>
                : <>
                {!loading &&  currentSession === null ? <Navigate to="/login" /> : 
                <>
                  {!loading && currentSession.token && currentSession.account ?  <Outlet /> : 
                  <>
                  {!loading && currentSession.token  ? <Navigate to="/switch/account" /> :  <Navigate to="/login" /> }
                </>
                  
                  }
                </>
                
                }
                </>}
            </>
    
          }
        </>
      ) 
}
