import { Modal } from '@mui/material'
import { X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { updateRole } from '../../../data/lib'

export default function UpdateRole({ onClose, role }) {
    const [roleUpdateName, setUpdateRoleName] = useState('')
    const [error, setError] = useState(null)
    useEffect(() => {
        if (role) {
            setUpdateRoleName(role.name)
        }
    }, [role])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            name: roleUpdateName,
            roleId: role.id
        }

        const res = await updateRole(payload)
        if (res.status === 200) {
            onClose()
            $('#k_modal_modify_role').modal('hide')
        } else {
            setError(res.error)
        }

    }
    return (
        <>

            <div className="modal fade" footer={null} id="k_modal_modify_role" tabIndex="-1" data-bs-backdrop="static" aria-labelledby="staticBackdropLabel" style={{ display: 'none' }} aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header justify-content-between bg-primary">
                            <h5 className="modal-title text-white dark__text-gray-1100" id="staticBackdropLabel">Modify Role</h5>
                            <button onClick={() => onClose()} className="btn p-1" type="button" data-bs-dismiss="modal" aria-label="Close"><X className='fs-9 text-white dark__text-gray-1100' /></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                { error && <p className='alert alert-danger p-2 border-0' style={{fontSize: '12px', borderRadius: 0}}> {error}</p>}
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="exampleFormControlInput">Role Name <sup className='text-danger'>required</sup></label>
                                    <input className="form-control required" id="exampleFormControlInput" type="text" required placeholder="" value={roleUpdateName} onChange={(e) => setUpdateRoleName(e.target.value)} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-outline-danger" type="button" onClick={() => onClose()} data-bs-dismiss="modal">Cancel</button>
                                <button className="btn btn-primary" type="submit">Update Role</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
