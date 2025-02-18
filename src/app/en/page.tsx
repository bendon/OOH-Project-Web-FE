"use client"
import { getUserAccount, postSwitchAccount } from '@/lib'
import { LucideHouse, SquareUser } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

interface Organization {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: number;
  updatedAt: number;
}

interface UserRecord {
  id: string;
  userId: string;
  active: boolean;
  isLocked: boolean;
  organization: Organization;
  createdAt: number;
  updatedAt: number;
}

// The main array that contains user records
type UserAccounts = UserRecord[];


export default function page() {
  const [account, setAccount] = useState<UserAccounts>([])
  const [error, setError] = useState<string>('')
  const router = useRouter()
  useEffect(() => {
    const setAccounts = async () => {
      const response = await getUserAccount()
      setAccount(response.data)
    }
    setAccounts()
  }, [])

  const checkOutAccount = async () =>{
    const formData =  new FormData()
    formData.append('accountId', account[0].id)
    const data= await postSwitchAccount(formData)
    if (data.status === 200) {
      router.push("/en/dashboard")
    }else{
      setError(data.error.message)
    }
  }

  // if the account has data and  the lenghth is 1
  if (account.length === 1) {
    checkOutAccount()
  }



  return (
    <>

      <div className="container">
        <div className="row flex-center min-vh-100 py-5">
          <div className="col-sm-10 col-md-8 col-lg-5 col-xl-5 col-xxl-3"><a className="d-flex flex-center text-decoration-none mb-4" href="../../../index.html">
            <div className="d-flex align-items-center fw-bolder fs-3 d-inline-block"><img src="/project/bbscout.png" alt="phoenix" width="58" />
            </div>
          </a>
            <div className="text-center mb-7">
              <h3 className="text-body-highlight">User Accounts</h3>
              <p className="text-body-tertiary">Get access to your account</p>
            </div>
            { error && <p className='alert alert-danger p-2 border-0' style={{fontSize: '12px', borderRadius: 0}}> {error}</p>}
            {
              account.length === 0 ?
                <div className='d-flex  justify-content-center align-items-center'>
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className='ms-3'>Loading .....</p>
                </div>
                : <>
                  {account.length === 1 ?

                    <div>
                      <div className='d-flex  justify-content-center align-items-center'>
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className='ms-3 pt-3'>Preparing account ... please wait .</p>
                      </div>
                    </div>

                    : <>
                      {account.map((account) => {
                        return (
                          <div key={account.id}>
                            <button className="btn btn-phoenix-secondary w-100 mb-3  text-uppercase d-flex align-items-center ">
                              <SquareUser className='me-2  fs-9' size={18} />{account.organization.name}</button>
                          </div>
                        )
                      })}
                    </>

                  }

                </>
            }

          </div>
        </div>
      </div>


    </>
  )
}
