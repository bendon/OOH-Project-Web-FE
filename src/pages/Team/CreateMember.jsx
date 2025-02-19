import { UploadCloud, Users } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'

import PhoneInput from 'react-phone-number-input'
import { createTeamMember } from '../../data/lib'

export default function CreateMember() {
    const [error, setError] = useState(null)
    const [phone, setPhone] = useState('')
    const [firstName,setFirstName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('1')
    const [country, setCountry] = useState('KE')
    const [roleId, setRoleId] = useState("b4c13311-4f28-49ec-a424-9541e54b5626")

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)
        const payload = {
            phone : +phone.replace(/\s+/g, '').replace('+', ''),
            firstName,
            middleName,
            lastName,
            email,
            gender : +gender,
            country,
            roleId
        }
        if (phone.length === 0) {
            setError('Phone number is required')
            setLoading(false)
            return
        }

        const data = await createTeamMember(payload)
        setLoading(false)
        if (data.status === 200) {
            setError(null)
            navigate('/team-management')
        } else {
            setError(data.error)
        }
    }
    return (
        <>
            <div className='d-flex justify-content-between'>
                <h4>New Team Member</h4>
                <div>
                    <Link to="/team-management" className='btn btn-outline-primary' style={{ fontSize: '12px' }}><Users size={15} /> Team Management</Link>
                </div>
            </div>

            <hr />
            <div className='row'>
                <div className='col-md-12 col-xxl-6 m-auto'>
                    <div className='card'>
                        <div className='card-body'>
                        { error && <p className='alert alert-danger p-2 border-0' style={{fontSize: '12px', borderRadius: 0}}> {error}</p>}
                            <form onSubmit={handleSubmit}>

                                <div className='row'>
                                    <div className='col-md-4'>
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="exampleFormControlInput">First Name <sup className='text-danger'>required</sup></label>
                                            <input className="form-control required" id="exampleFormControlInput" type="text" required placeholder=""  value={firstName}   onChange={(e)=>setFirstName(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className='col-md-4'>
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="exampleFormControlInput">Middle Name </label>
                                            <input className="form-control" id="exampleFormControlInput" type="text"  placeholder=""  value={middleName}   onChange={(e)=>setMiddleName(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className='col-md-4'>
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="exampleFormControlInput">Last Name <sup className='text-danger'>required</sup></label>
                                            <input className="form-control" id="exampleFormControlInput" type="text" required placeholder=""  value={lastName}   onChange={(e)=>setLastName(e.target.value)}/>
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="exampleFormControlInput">Email Address <sup className='text-danger'>required</sup></label>
                                            <input className="form-control" id="exampleFormControlInput" type="text" required placeholder="" value={email}   onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="exampleFormControlInput">Phone <sup className='text-danger'>required</sup></label>
                                            <PhoneInput defaultCountry="KE" className='form-control' required placeholder="Enter phone number"  value={phone}   onChange={setPhone}/>
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="exampleFormControlInput">Gender <sup className='text-danger'>required</sup></label>
                                            <select className="form-select" aria-label="Default select example" required value={gender}   onChange={(e) => setGender(e.target.value)}>
                                                <option  value="1">Male</option>
                                                <option value="2">Female</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="exampleFormControlInput">Country <sup className='text-danger'>required</sup></label>
                                            <input className="form-control" id="exampleFormControlInput" required readOnly type="text" placeholder="" value={country}   onChange={(e) => setCountry(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    
                                    <div className='col-md-6'>
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="exampleFormControlInput">Role <sup className='text-danger'>required</sup></label>
                                            <input className="form-control" readOnly id="exampleFormControlInput" required type="text" placeholder=""     value={roleId}   onChange={(e) => setRoleId(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-end'>
                                    <button type='submit' disabled={loading} className='btn btn-primary' ><UploadCloud  size={15}/> 
                                    {loading && <div className="spinner-border text-white me-3" style={{fontSize: '10px', width: '1rem', height: '1rem'}} role="status"><span className="visually-hidden">Loading...</span></div>}
                                    {loading ? 'Loading .... please wait' : 'Create Team Member'}
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
