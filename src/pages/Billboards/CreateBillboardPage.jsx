import { ClipboardCheck, Plus } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router'
import ImageUploader from '../../components/ImageUploader'

export default function CreateBillboardPage() {
  const [imageName, setImageName] = useState("");

  const handleImageName = (name) => {
    setImageName(name);
  };
  return (
    <>
      <div className='d-flex justify-content-between'>
        <h4>New Billboard</h4>
        <div>
          <Link to="/manage-boards" className='btn btn-outline-primary' style={{ fontSize: '12px' }}><ClipboardCheck size={15} /> Billboard Management</Link>
        </div>
      </div>
      <hr />
      <div className='card'>
        <div className='card-body'>
          <div className='row'>
            <div className='col-lg-4'>
              <ImageUploader onImageNameChange={handleImageName} />
            </div>
            <div className='col-lg-8'>
              <div className='row'>
                <div className='col-md-12 col-xxl-6'>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="title">Title <sup className='text-danger'>required</sup></label>
                    <input className="form-control " id="title" type="text" required placeholder="title ..." />
                  </div>
                </div>
                <div className='col-md-12 col-xxl-6'>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="exampleFormControlInput">File Name <sup className='text-danger'>required</sup></label>
                    <input className="form-control required" id="exampleFormControlInput" readOnly type="text" required placeholder="" value={imageName} />
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-md-12 col-xxl-6'>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="title">Location <sup className='text-danger'>required</sup></label>
                    <input className="form-control " id="title" type="text" required placeholder="nairobi,kenya ..." />
                  </div>
                </div>
                <div className='col-md-12 col-xxl-6'>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="exampleFormControlInput">Price <sup className='text-danger'>required</sup></label>
                    <input className="form-control required" id="exampleFormControlInput"  type="number"  step="any" required placeholder="0.0" />
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-md-12 col-xxl-6'>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="title">Longitude <sup className='text-danger'>required</sup></label>
                    <input className="form-control " id="title" type="text" required placeholder="-1.286389" />
                  </div>
                </div>
                <div className='col-md-12 col-xxl-6'>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="exampleFormControlInput">Latitude <sup className='text-danger'>required</sup></label>
                    <input className="form-control required" id="exampleFormControlInput"  type="number"  step="any" required placeholder=" 36.817223" />
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-md-12 col-xxl-6'>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="title">Height <sup className='text-danger'>required</sup></label>
                    <input className="form-control " id="title" type="text" required placeholder="0" />
                  </div>
                </div>
                <div className='col-md-12 col-xxl-6'>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="exampleFormControlInput">Width <sup className='text-danger'>required</sup></label>
                    <input className="form-control required" id="exampleFormControlInput"  type="number"  step="any" required placeholder="0" />
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-md-12 col-xxl-6'>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="title">Measurement Units <sup className='text-danger'>required</sup></label>
                    <select className="form-select form-control" aria-label="Default select example">
                      <option value="">Select Measurement Units</option>
                      <option value="centimeters">centimeters</option>
                      <option value="meters">meters</option>
                      <option value="feet">feet</option>
                      <option value="inches">inches</option>
                    </select>
                  </div>
                </div>
                <div className='col-md-12 col-xxl-6'>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="exampleFormControlInput">Type <sup className='text-danger'>required</sup></label>
                    <select className="form-select form-control" aria-label="Default select example">
                      <option value="">Select Type</option>
                      <option value="digital">Digital</option>
                      <option value="static">Static</option>
                      <option value="LED">LED</option>
                      <option value="traditional">Traditional</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-md-12 col-xxl-12'>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="title">Description <sup className='text-danger'>required</sup></label>
                    <textarea className="form-control " id="title" type="text" required placeholder="0" />
                  </div>
                </div>
              </div>
              <div className='d-flex justify-content-end'>
                <button type="submit" disabled className="btn btn-primary"><Plus size={15} /> Create Bill Board</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
