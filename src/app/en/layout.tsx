"use client"

import React, { useEffect, useState } from 'react'
import Sidenav from '../components/Sidenav'
import Topnav from '../components/Topnav'
import { getSession } from '@/lib'
import { SessionObject } from '@/types/sessionTypes'




export default function PageLayout({ children }: { children: React.ReactNode }) {

  const [currentSession, setSession] = useState<SessionObject>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {

    const activeSession = async () => {
      const session = await getSession()
      
      setSession(session)
      setLoading(false)
    }
    activeSession()
  }, [])
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
              <Sidenav />
              <Topnav />
              <div className="content">
                {children}
              </div>
            </>
            : <>
            {!loading && {children}}
            </>}
        </>

      }
    </>
  )
}
