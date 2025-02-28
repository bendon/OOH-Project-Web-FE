import React, { useEffect, useState } from 'react'
import { convertToHumanReadable, encryptText, getStaffs } from '../../data/lib'
import { FileKey, UserPlus2 } from 'lucide-react'
import { Link } from 'react-router'

export default function ManageTeam() {
    const [staffs, setStaffs] = useState(null)

    useEffect(() => {

        const fetchData = async () => {
            const res = await getStaffs({})
            if (res.status === 200) {
                setStaffs(res.data)
            }
        }

        fetchData()

    }, [])

    const searchTeam = async(search) => {
        const res = await getStaffs({
            search: search
        })
        if (res.status === 200) {
            setStaffs(res.data)
        }
    }
    return (
        <>
            <div className='d-flex justify-content-between'>
                <h4>Manage Team</h4>
                <div>
                    <button className='btn btn-primary' style={{fontSize:'12px'}}><UserPlus2 size={15} /> Add New</button>
                </div>
            </div>
            <hr />
            <div className='card'>
                <div className='card-header'>
                    <div className='d-flex justify-content-between'>
                        <div>
                            <input type="text" className="form-control" placeholder="Search"  onChange={(e)=> searchTeam(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className='card-body'>
                    <div className='table-responsive' style={{position: 'relative', height: '70vh', overflowY: 'scroll'}}>
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Country</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Verified</th>
                                    <th scope="col">Role</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                { staffs &&
                                    staffs.data.map((staff, index) => (
                                        <tr key={index}>
                                            <td className='text-center' scope="row">{index + 1}</td>
                                            <td>{staff.firstName} {staff.lastName}</td>
                                            <td>{staff.email}</td>
                                            <td>{staff.country}</td>
                                            <td>{staff.phone}</td>
                                            <td>
                                                {staff.verified && <span className='badge bg-success'>Verified</span>}
                                                {!staff.verified && <span className='badge bg-danger'>Not Verified</span>}

                                            </td>
                                            <td>{staff.roleName}</td>
                                            <td>
                                                {staff.active && <span className='badge bg-success'>Active</span>}
                                                {!staff.active && <span className='badge bg-danger'>Inactive</span>}
                                            </td>
                                            <td>{convertToHumanReadable(staff.createdAt)}</td>
                                            <td>
                                                <Link to={`/manage-team/${encryptText(staff.userId)}/permissions`} className='btn btn-primary btn-sm p-1'><FileKey size={15} className='me-2'/> permissions</Link>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        <p style={{fontSize:'12px'}}>page : {staffs ? staffs.page : 0}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
