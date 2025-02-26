import { ClipboardCheck, Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import ImageUploader from '../../components/ImageUploader'
import { getBoardTypes, postCreateBillboard } from '../../data/lib';

export default function CreateBillboardPage() {

  const navigate = useNavigate();
  const [fileId, setFileId] = useState(null);
  const [title, setTitle] = useState('Kenya Billboard');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [height, setHeight] = useState('');
  const [width, setWidth] = useState('');
  const [units, setUnits] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [error, setError] = useState(null);
  const [accuracy, setAccuracy] = useState(0);
  const [parentBoardCode, setParentBoardCode] = useState(null);
  const [loading, setLoading] = useState(false);

  const [boardTypes,setParentBoardTypes] = useState([])

  useEffect(() => {
    const fetchParentBoardTypes = async () => {
      const res = await getBoardTypes()
      if (res.status === 200) {
        setParentBoardTypes(res.data)
      }
    }
    fetchParentBoardTypes()
  }, [])

  const handleImageName = (data) => {
    const uploadedId = data.id;
    setFileId(uploadedId);

  };

  const handleCreateBillboard = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (fileId.length === 0) {
      setError('Please upload an image');
      return;
    }

    const payload = {
      accuracy: accuracy,
      description: description,
      location:location,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      width: parseFloat(width),
      height: parseFloat(height),
      unit: units, // allowed :  centimeters, meters, feet , inches
      type: type,  // allowed : 'digital','static','LED','traditional'
      price: parseFloat(price),
      imageId: fileId,
      parentBoardCode: parentBoardCode
    }


    const res = await postCreateBillboard(payload);
    if (res.status === 200 || res.status === 201) {
     
      setError(null);
      setTitle('');
      setLocation('');
      setPrice('')
      setLongitude('');
      setLatitude('');
      setHeight('');
      setWidth('');
      setUnits('');
      setDescription('');
      setType('');
      setLoading(false);
      navigate('/manage-boards');

     }else {
      setLoading(false);
      setError(res.error);
    }
    

  }
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
        { error && <p className='alert alert-success p-2 mb-2 border-0' style={{fontSize: '12px', borderRadius: 0}}>{error}</p>}
          <div className='row'>
            <div className='col-lg-4'>
              <ImageUploader onImageNameChange={handleImageName} />
            </div>
            <div className='col-lg-8'>
              <form onSubmit={handleCreateBillboard}>
                <div className='row'>
                  <div className='col-md-12 col-xxl-6'>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="title">Location <sup className='text-danger'>required</sup></label>
                      <input className="form-control " id="title" type="text" required placeholder="nairobi,kenya ..." value={location} onChange={(e) => setLocation(e.target.value)} />
                    </div>
                  </div>
                  <div className='col-md-12 col-xxl-6'>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="exampleFormControlInput">Price <sup className='text-danger'>required</sup></label>
                      <input className="form-control required" id="exampleFormControlInput" type="number" step="any" required placeholder="0.0" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </div>
                  </div>
                </div>
                <div className='row'>
                <div className='col-md-12 col-xxl-6'>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="exampleFormControlInput">Latitude <sup className='text-danger'>required</sup></label>
                      <input className="form-control required" id="exampleFormControlInput" type="number" step="any" required placeholder="-1.286389" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
                    </div>
                  </div>
                  <div className='col-md-12 col-xxl-6'>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="title">Longitude <sup className='text-danger'>required</sup></label>
                      <input className="form-control " id="title" type="text" required placeholder=" 36.817223" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
                    </div>
                  </div>
                  
                </div>
                <div className='row'>
                  <div className='col-md-12 col-xxl-6'>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="title">Height <sup className='text-danger'>required</sup></label>
                      <input className="form-control " id="title" type="text" required placeholder="0" value={height} onChange={(e) => setHeight(e.target.value)} />
                    </div>
                  </div>
                  <div className='col-md-12 col-xxl-6'>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="exampleFormControlInput">Width <sup className='text-danger'>required</sup></label>
                      <input className="form-control required" id="exampleFormControlInput" type="number" step="any" required placeholder="0" value={width} onChange={(e) => setWidth(e.target.value)} />
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-12 col-xxl-6'>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="title">Measurement Units <sup className='text-danger'>required</sup></label>
                      <select className="form-select form-control" aria-label="Default select example" value={units} onChange={(e) => setUnits(e.target.value)}>
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
                      <select className="form-select form-control" aria-label="Default select example" value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="">Select Type</option>
                        {boardTypes.map((type, index) => (
                          <option key={index} value={type.name}>{type.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-12 col-xxl-12'>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="title">Description <sup className='text-danger'>required</sup></label>
                      <textarea className="form-control " id="title" type="text" required placeholder="describe here ..." value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                  </div>
                </div>
                <div className='d-flex justify-content-end'>
                  <button type="submit" disabled={fileId === null || loading === true} className="btn btn-primary"><Plus size={15} /> Create Bill Board</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
