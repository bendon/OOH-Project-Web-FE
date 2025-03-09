import { Calendar, CheckCheck, House, Phone, ShieldX, User, Users, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { convertToHumanReadable, decryptText, getOrganizationPermisions, getOrganizationStaffPermissions, getStaffById, updateUserPermissions } from '../../data/lib'
import { set } from 'date-fns';

export default function TeamPermissionDetails() {
    const { staffId } = useParams();
    const [permission, setPermission] = useState(null)
    const [staffPermission, setStaffPermission] = useState(null)
    const [granted, setGranted] = useState(false)
    const [staff, setStaff] = useState(null)
    const id = decryptText(staffId)
    const [selectedPermission, setSelectedPermission] = useState([])
    const [updating, setUpdating] = useState(false)
    const [loadingPost, setLoadingPost] = useState(false)
    const [updated, setUpdated] = useState(false)

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

    useEffect(() => {

        const fetchStaffPermission = async () => {

            const res = await getOrganizationStaffPermissions(id)

            if (res.status === 200) {
                setStaffPermission(res.data)
                const permissionArrayId = res.data.map(p => p.id)


                selectedPermission.push(...permissionArrayId)
            }

            if (res.status === 403) {
                setGranted(true)
            }
        }
        fetchStaffPermission()
    }, [permission])

    const isAssigned = (permission) => {
        const granted = staffPermission.find(p => p.name === permission)
        if (granted) {
            return true
        }
        return false
    }


    const setUserPermission = (e) => {
        setUpdating(true)
        const item = e.target.value

        if (selectedPermission.includes(item)) {
            setSelectedPermission(selectedPermission.filter(p => p !== item))
        } else {
            if (selectedPermission.length < 1) {
                setSelectedPermission([item])
            }
            else {
                setSelectedPermission([...selectedPermission, item])
            }
        }
    }

    const updateUserNewPermissions = async () => {
        setLoadingPost(true)
        setUpdating(false)
        const payload = {
            data: {
                permissionIds: selectedPermission
            },
            staffId: id
        }
        const res = await updateUserPermissions(payload)

        if (res.status === 200) {
            setUpdated(true)
            setLoadingPost(false)
            setUpdating(false)
            console.log(res.data);

            setTimeout(() => {
                setUpdated(false)
            }, 3000);
        }else {
            setUpdating(true)
            setUpdated(false)
            setLoadingPost(false)
        }

    }
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
            <div className='p-3 mb-3 mt-3 flex justify-content-between align-items-center'>
                <h5>Update Permission</h5>
                {selectedPermission.length > 0 && updating && <button type="button" onClick={updateUserNewPermissions} className="btn btn-subtle-primary">Save Changess</button>}
            </div>
            {updated && <div className="alert alert-success d-flex align-items-center" role="alert">
                <CheckCheck scale={18} className='me-3' />
                <p className="mb-0 flex-1">A simple primary alert—check it out!</p>
            </div>}
            {loadingPost && <div className="alert alert-subtle-primary d-flex align-items-center me-3" role="alert">
                <div className="spinner-border text-primary me-3" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mb-0 flex-1">Please wait updating user permissions ....</p>
            </div> }

            {granted && <div className="alert alert-subtle-warning" role="alert"><ShieldX size={18} /> Access Denied</div>}
            <div className='row'>
                {permission && Object.entries(permission).map(([indexType, items]) => (
                    <div className=' col-xxl-3 mb-3' key={Math.random()}>
                        <div className='card'>
                            <div className='card-header'>
                                <h6>{indexType}</h6>
                            </div>
                            <div className='card-body' key={Math.random()}>
                                {items.map((item, index) => <>
                                    <div className="form-check mb-2" key={index}>
                                        <input checked={selectedPermission.includes(item.id)} value={item.id} onChange={(e) => setUserPermission(e)} id={item.id} className="form-check-input input-light-success" type="checkbox" />
                                        <label className="form-check-label cursor-pointer" htmlFor={item.id}>{item.name}</label>
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


