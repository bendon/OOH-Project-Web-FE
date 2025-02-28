import { Calendar, House, Phone, ShieldX, User, Users } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { convertToHumanReadable, decryptText, getOrganizationPermisions, getStaffById } from '../../data/lib'

export default function TeamPermissionDetails() {
    const { staffId } = useParams();
    const [permission, setPermission] = useState(null)
    const [granted, setGranted] = useState(false)
    const [staff, setStaff] = useState(null)
    const id = decryptText(staffId)

    useEffect(() => {
        const fetchPermission = async () => {
            const res = await getOrganizationPermisions()
            if (res.status === 200) {
                setPermission(res.data)
            }
            if (res.status === 403) {
                setGranted(true)
            }
        }

        const fetchStaff = async () => {
            const res = await getStaffById(id)
            if (res.status === 200) {
                setStaff(res.data)
            }
        }
        fetchStaff()
        fetchPermission()
    }, [])
    return (
        <>
            <div className='d-flex justify-content-between'>
                <h4>User Permissions</h4>
                <div>
                    <Link to="/team-management" className='btn btn-outline-primary' style={{ fontSize: '12px' }}><Users size={15} /> Team Management</Link>
                </div>
            </div>
            <hr />
            {staff && <>

                <div className='card card-body col-xxl-6 mb-3'>
                    <table className="table table-borderless mt-4">
                        <tbody>
                            <tr>
                                <td className=" ps-0">
                                    <div className="d-flex"><Users size={15} className='me-2' />
                                        <h6 className="lh-sm me-4">Name</h6>
                                    </div>
                                </td>
                                <td className="fw-bold lh-sm">:</td>
                                <td className=" ">
                                    <h6 className="lh-sm fw-normal text-body-secondary">{staff.firstName} {staff.middleName} {staff.lastName}</h6>
                                </td>
                            </tr>
                            <tr>
                                <td className=" ps-0">
                                    <div className="d-flex"><House size={15} className='me-2' />
                                        <h6 className="lh-sm me-4">Email</h6>
                                    </div>
                                </td>
                                <td className=" fw-bold lh-sm">:</td>
                                <td className="">
                                    <h6 className="text-body-secondary text-lowercase">{staff.email}</h6>
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 ps-0">
                                    <div className="d-flex"><Phone size={15} className='me-2' />
                                        <h6 className=" me-4">Phone</h6>
                                    </div>
                                </td>
                                <td className=" fw-bold ">:</td>
                                <td className="">
                                    <h5 className="lh-sm fw-normal text-body-secondary">+{staff.phone}</h5>
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 ps-0">
                                    <div className="d-flex"><Calendar size={15} className='me-2' />
                                        <h6 className=" me-4">Joined Date</h6>
                                    </div>
                                </td>
                                <td className=" fw-bold ">:</td>
                                <td className="">
                                    <h5 className="text-body-secondary text-capitalize">{convertToHumanReadable(staff.createdAt)}</h5>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </>}

            {granted && <div className="alert alert-subtle-warning" role="alert"><ShieldX size={18} /> Access Denied</div>}
            <div className='row'>
                {permission && Object.entries(permission).map(([indexType, items]) => (
                    <div className=' col-xxl-3 mb-3' key={indexType}>
                        <div className='card'>
                            <div className='card-header'>
                                <h6>{indexType}</h6>
                            </div>
                            <div className=' card-body'>
                                {items.map((item, index) => <>
                                    <div className="form-check mb-2" >
                                        <input className="form-check-input input-light-success" type="checkbox" />
                                        <label className="form-check-label cursor-pointer">{item.name}</label>
                                    </div>
                                </>)}
                            </div>
                        </div>
                    </div>
                ))}
            </div >
        </>
    )
}

{/* <div className="col-lg-3 mb-3" key={index}>
<div className="card">
    
    <div className="card-body">
        <div className="form-check mb-2" >
            <input className="form-check-input input-light-success" type="checkbox" />
            <label className="form-check-label cursor-pointer">{item.name}</label>
        </div>
    </div>
</div>
</div> */}
