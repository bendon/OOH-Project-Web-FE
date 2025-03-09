import { SquareUser } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { getSession, getUserAccount, postSwitchAccount } from '../../data/lib'

export default function SwitchAccountPage() {
    const [account, setAccount] = useState([])
    const [error, setError] = useState('')
    const [currentSession, setSession] = useState(null)

    useEffect(() => {
        const activeSession = async () => {
            const session = await getSession()

            if(session.user.isChange) {
                navigate('/reset-password')
                return
            }
            
            setSession(session)
        }
        activeSession()
    }, [])

    const navigate = useNavigate()
    useEffect(() => {
        const setAccounts = async () => {
            const response = await getUserAccount()

            setAccount(response.data)
        }
        setAccounts()
    }, [currentSession])

    const checkOutAccount = async () => {
        const formData = new FormData()
        formData.append('accountId', account[0].id)
        const data = await postSwitchAccount(formData)
        if (data.status === 200) {
            navigate("/")
        } else {
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
                        {error && <p className='alert alert-danger p-2 border-0' style={{ fontSize: '12px', borderRadius: 0 }}> {error}</p>}
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
