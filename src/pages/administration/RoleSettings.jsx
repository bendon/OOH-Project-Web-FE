import { Edit, Plus, X } from 'lucide-react'
import React, { use, useEffect, useState } from 'react'
import { convertToHumanReadable, getRoles } from '../../data/lib'
import UpdateRole from './modal/UpdateRole'
import NewRole from './modal/NewRole'

export default function RoleSettings() {
  const [roles, setRoles] = useState(null)
  const [role, setRole] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const res = await getRoles()
      if (res.status === 200) {
        setRoles(res.data)
      }
    }
    fetchData()
  }, [])

  const setRoleObject = (role) => {
    setRole(role)
  }
  const handleCloseModal = () => {
    setRole(null); 
    fetchRolesUPdate()
  };

  const fetchRolesUPdate = async () => {
    const res = await getRoles()
    if (res.status === 200) {
      setRoles(res.data)
    }
  }

  return (
    <>
      <div className='d-flex justify-content-between'>
        <h4>Role Settings</h4>
        <div>
          <button type='button' data-bs-toggle="modal" data-bs-target="#k_modal_create_role" className='btn btn-sm btn-subtle-info'><Plus size={15} /> Add Role</button>
        </div>
      </div>
      <hr />
      <div className='card'>
        <div className='card-header'>
          <div className='d-flex justify-content-between'>
            <h5>Roles</h5>
          </div>
        </div>
        <div className='card-body'>
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Role</th>
                <th>Created At</th>
                <th>Modify</th>
              </tr>
            </thead>
            <tbody>
              {roles && roles.map((role, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{role.name}</td>
                  <td>{convertToHumanReadable(role.createdAt)}</td>
                  <td>
                    <button type='button' onClick={() => setRoleObject(role)} data-bs-toggle="modal" data-bs-target="#k_modal_modify_role" className='btn btn-sm py-1 btn-subtle-primary'> <Edit size={15} /> rename</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

       <UpdateRole  onClose={handleCloseModal} role={role} />
       <NewRole  onClose={handleCloseModal} />

    </>
  )
}
