
import { X } from 'lucide-react'
import React, {  useState } from 'react'
import { createRole } from '../../../data/lib'

export default function NewRole({onClose}) {
    const [roleName, setRoleName] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)


    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const payload = {
            name: roleName,
        }

        const res = await createRole(payload)
        if (res.status === 200) {
            setLoading(false)
            onClose()
            $('#k_modal_create_role').modal('hide')
        } else {
            setLoading(false)
            setError(res.error)
        }

    }
    return (
        <>

            <div className="modal fade" footer={null} id="k_modal_create_role" tabIndex="-1" data-bs-backdrop="static" aria-labelledby="staticBackdropLabel" style={{ display: 'none' }} aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header justify-content-between bg-primary">
                            <h5 className="modal-title text-white dark__text-gray-1100" id="staticBackdropLabel">New Role</h5>
                            <button onClick={() => onClose()} className="btn p-1" type="button" data-bs-dismiss="modal" aria-label="Close"><X className='fs-9 text-white dark__text-gray-1100' /></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                { error && <p className='alert alert-danger p-2 border-0' style={{fontSize: '12px', borderRadius: 0}}> {error}</p>}
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="exampleFormControlInput">Role Name <sup className='text-danger'>required</sup></label>
                                    <input className="form-control required" id="exampleFormControlInput" type="text" required placeholder="" value={roleName} onChange={(e) => setRoleName(e.target.value)} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-outline-danger" disabled={loading} type="button" onClick={() => onClose()} data-bs-dismiss="modal">Cancel</button>
                                <button className="btn btn-primary" disabled={loading} type="submit">
                                {loading && <div className="spinner-border text-white me-3" style={{fontSize: '10px', width: '1rem', height: '1rem'}} role="status"><span className="visually-hidden">Loading...</span></div>}
                                {loading ? 'Loading .... please wait' : 'Create Role'}
                               </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
