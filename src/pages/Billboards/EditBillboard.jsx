import React, { use, useEffect, useState } from 'react'
import { decryptText, getBoardById, getBoardTypes, putUpdateBoardById } from '../../data/lib'
import { Link, useNavigate, useParams } from 'react-router';
import ImageUploader from '../../components/ImageUploader';
import { ClipboardCheck, Save } from 'lucide-react';
import GooglePlacesAutocomplete from '../../components/SearchLocation';
import PhoneInput from 'react-phone-number-input'

export default function EditBillboard() {
    const navigate = useNavigate()
    const { billboardId } = useParams();
    const id = decryptText(billboardId)

    const [fileId, setFileId] = useState(null);
    const [fileDistanceId, setFileDistanceId] = useState(null);
    const [location, setLocation] = useState('');
    const [city, setCity] = useState('');
    const [price, setPrice] = useState('');
    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');
    const [height, setHeight] = useState('');
    const [width, setWidth] = useState('');
    const [units, setUnits] = useState('');
    const [ownerName, setOwnerName] = useState('');
    const [ownerContact, setOwnerContact] = useState('');
    const [ownerContact2, setOwnerContact2] = useState('');
    const [ownerEmail, setOwnerEmail] = useState('');
    const [objectType, setObjectType] = useState('');
    const [structure, setStructure] = useState('');
    const [material, setMaterial] = useState('');
    const [visibility, setVisibility] = useState('excellent');
    const [angle, setAngle] = useState('head-on');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [error, setError] = useState(null);
    const [accuracy, setAccuracy] = useState(0);
    const [illumination, setIllumination] = useState('none');
    const [parentBoardCode, setParentBoardCode] = useState(null);

    const [boardDetails, setBoardDetails] = useState([])
    const [boardTypes, setParentBoardTypes] = useState([])
    const [closeUpFile, setCloseUpImage] = useState(null)
    const [distanceFile, setDistanceImage] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchParentBoardTypes = async () => {
            const res = await getBoardTypes()
            if (res.status === 200) {
                setParentBoardTypes(res.data)
            }
        }
        fetchParentBoardTypes()
    }, [])

    useEffect(() => {
        const fetchStructureById = async () => {
            const res = await getBoardById(id)
            if (res.status === 200) {
                setBoardDetails(res.data)
                console.log(res.data);
                setAccuracy(res.data.accuracy)
                setAngle(res.data.angle ?? '')
                setHeight(res.data.height)
                setWidth(res.data.width)
                setUnits(res.data.unit ?? '')
                setObjectType(res.data.objectType ?? '')
                setStructure(res.data.structure ?? '')
                setOwnerName(res.data.owner ?? '')
                setLatitude(res.data.latitude)
                setLongitude(res.data.longitude)
                setMaterial(res.data.material ?? '')
                setVisibility(res.data.visibility ?? 'poor')
                setPrice(res.data.price ?? 0)
                setDescription(res.data.description ?? '')
                setLocation(res.data.location ?? '')
                setCity(res.data.city ?? res.data.location)
                setIllumination(res.data.illumination ?? 'none')
                setType(res.data.type ?? '')
                setParentBoardCode(res.data.parentBoardCode ?? '')
                setOwnerContact(res.data.ownerContacts ? res.data.ownerContacts.join(",") : '')
                setFileDistanceId(res.data.imageId)
                setFileId(res.data.closeUpImageId ?? res.data.imageId)
                setOwnerEmail(res.data.ownerEmails ? res.data.ownerEmails.join(","): '')

                if (res.data.image) {
                    setCloseUpImage(res.data.image)

                }

                if (res.data.closeUpImage) {
                    setDistanceImage(res.data.closeUpImage)

                }



            }
        }
        fetchStructureById()
    }, [id])


    const handleImageName = (data) => {
        const uploadedId = data.id;
        setFileId(uploadedId);
    };

    const handleDistanceImageName = (data) => {
        const uploadedId = data.id;
        setFileDistanceId(uploadedId);
    };

    const handleSelectedPlace = (place) => {


        setLocation(place.name)
        // setLatitude(place.latitude)
        // setLongitude(place.longitude)
        setCity(place.name)

    }

    const handleStructureUpdate = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            let phone1 = []
            if (ownerContact !== '') {
                let temp = ownerContact.replace(/\s+/g, '').replace('+', '')
                temp = temp.split(",")
                temp = temp.map(num => parseInt(num));

                phone1 = temp
            }


            if (ownerContact2 !== '') {
                let temp = ownerContact2.replace(/\s+/g, '').replace('+', '')
                temp = temp.split(",")
                temp = temp.map(num => parseInt(num));

                phone1.push(...temp)
            }


            const payload = {
                billboardId: id,
                body: {
                    accuracy: accuracy,
                    description: description,
                    location: location,
                    latitude: parseFloat(latitude),
                    longitude: parseFloat(longitude),
                    width: parseFloat(width),
                    height: parseFloat(height),
                    unit: units, // allowed :  centimeters, meters, feet , inches
                    type: type,  // allowed : "Static Billboard", "Digital Billboard", "Banner Ads", "Wallscapes", "Mobile Billboards","Lamp Posts","Interactive Billboards"
                    price: parseFloat(price) ?? 0,
                    imageId: fileDistanceId ?? null,
                    parentBoardCode: parentBoardCode ?? null,
                    objectType: objectType ?? null,
                    owner: ownerName ?? null,
                    occupied: true,
                    ownerContacts: phone1,
                    ownerEmail: ownerEmail !== '' ? ownerEmail.split(",") : [],
                    city: city ?? null,
                    closeUpImageId: fileId ?? null,
                    structure: structure ?? null, //Bridge,digital, free standing, Gantry,hoarding,Hooding,Right,Sky, sky sign, wall wrap or null.
                    material: material ?? null, // backlit,digital,flex,LED,Vinyl,Sticker, Metal,Mesh or null
                    angle: angle ?? null, // double decker, Head On,Left,Right or null.
                    visibility: visibility ?? null, //  Average, Excellent,Good,Poor.
                    illumination: illumination ?? null // front or none
                }
            }

            const res = await putUpdateBoardById(payload)

            if (res.status === 200 || res.status === 201) {
                setLoading(false)
                navigate('/manage-boards')
            } else {
                window.scrollTo(0, 0);
                setLoading(false)
                setError("Failed to update billboard/ structure details. " + res.error)
            }
        } catch (error) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
              });
            setLoading(false)
        }



    }


    return (
        <>
            <div className='d-flex justify-content-between'>
                <h4>Edit Billboard</h4>
                <div>
                    <Link to="/manage-boards" className='btn btn-outline-primary' style={{ fontSize: '12px' }}><ClipboardCheck size={15} /> Billboard Management</Link>
                </div>
            </div>
            <hr />
            {error && <p className='alert alert-danger p-2 mb-2 border-0' style={{ fontSize: '12px', borderRadius: 0 }}>{error}</p>}
            <div className='card card-body'>
                <div className='row'>
                    <div className='col-xxl-4'>
                        <div>
                            <h5>Close up Image</h5>
                            <ImageUploader onImageNameChange={handleImageName} file={closeUpFile ?? null} />
                        </div>
                        <div>
                            <h5>Distanced Image</h5>
                            <ImageUploader onImageNameChange={handleDistanceImageName} file={distanceFile} />
                        </div>
                    </div>
                    <div className='col-xxl-8'>
                        <h4>Structure Information</h4>
                        <hr />
                       
                        <form onSubmit={handleStructureUpdate}>
                            <div className='row'>
                                <div className='col-xxl-12 bg-gray-100 d-flex align-items-center p-2 mb-3' >
                                    Location Details
                                </div>
                                <div className='col-md-12 col-xxl-6'>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="title">Location <sup className='text-danger'>required</sup></label>
                                        <GooglePlacesAutocomplete onPlaceSelected={(place) => { handleSelectedPlace(place) }} />
                                    </div>
                                </div>
                                <div className='col-md-12 col-xxl-6'>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="title">Illumination </label>
                                        <select className='form-select form-control' value={illumination} onChange={setIllumination}>
                                            <option value="front">Front</option>
                                            <option value="none">None</option>
                                        </select>
                                    </div>

                                </div>
                                <div className='col-md-12 col-xxl-6'>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="title">City </label>
                                        <input className="form-control required" id="exampleFormControlInput" type="text" required placeholder="city" value={city} onChange={(e) => setCity(e.target.value)} />
                                    </div>
                                </div>
                                <div className='col-md-12 col-xxl-6'>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="exampleFormControlInput">Accuracy</label>
                                        <input className="form-control required" id="exampleFormControlInput" type="number" step="any" required placeholder="0.0" value={accuracy} onChange={(e) => setAccuracy(e.target.value)} />
                                    </div>
                                </div>

                            </div>
                            <div className='row'>
                                <div className='col-md-12 col-xxl-6'>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="exampleFormControlInput">Latitude <sup className='text-danger'>required</sup></label>
                                        <input className="form-control required" id="exampleFormControlInput" type="number" step="any" required placeholder="0.0" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
                                    </div>
                                </div>
                                <div className='col-md-12 col-xxl-6'>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="title">Longitude <sup className='text-danger'>required</sup></label>
                                        <input className="form-control " id="title" type="number" step="any" required placeholder="0.0" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                            <div className='col-xxl-12 bg-gray-100 d-flex align-items-center p-2 mb-3' >
                                Other Information
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
                                            <option value="Static Billboard">Static Billboard</option>
                                            <option value="Digital Billboard">Digital Billboard</option>
                                            <option value="Banner Ads">Banner Ads</option>
                                            <option value="Wallscapes">Wallscapes</option>
                                            <option value="Mobile Billboards">Mobile Billboards</option>
                                            <option value="Lamp Posts">Lamp Posts</option>
                                            <option value="Interactive Billboards">Interactive Billboards</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-12 col-xxl-6'>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="exampleFormControlInput">Angle <sup className='text-danger'>required</sup></label>
                                        <select className='form-select form-control' value={angle} onChange={(e) => setAngle(e.target.value)}>
                                            <option value="">Choose angle...</option>
                                            <option value="double-decker">Double Decker</option>
                                            <option value="head-on">Head On</option>
                                            <option value="left">Left</option>
                                            <option value="right">Right</option>

                                        </select>
                                    </div>
                                </div>
                                <div className='col-md-12 col-xxl-6'>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="title">Visibility <sup className='text-danger'>required</sup></label>
                                        <select className='form-select form-control' value={visibility} onChange={(e) => setVisibility(e.target.value)}>
                                            <option value="average">Average</option>
                                            <option value="excellent">Excellent</option>
                                            <option value="good">Good</option>
                                            <option value="poor">Poor</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-12 col-xxl-6'>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="exampleFormControlInput">Material </label>
                                        <select className='form-select form-control' value={material} onChange={(e) => setMaterial(e.target.value)}>
                                            <option value="">Choose material</option>
                                            <option value="backlit">Backlit</option>
                                            <option value="digital">Digital</option>
                                            <option value="flex">Flex</option>
                                            <option value="led">LED</option>
                                            <option value="vinyl">Vinyl</option>
                                            <option value="sticker">Sticker</option>
                                            <option value="metal">Metal</option>
                                            <option value="mesh">Mesh</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='col-md-12 col-xxl-6'>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="title">Structure </label>
                                        <select className='form-select form-control' value={structure} onChange={(e) => setStructure(e.target.value)}>
                                            <option value="">Choose Structure ...</option>
                                            <option value="bridge">Bridge</option>
                                            <option value="digital">Digital</option>
                                            <option value="free-standing">Free Standing</option>
                                            <option value="gantry">Gantry</option>
                                            <option value="hoarding">Hoarding</option>
                                            <option value="hooding">Hooding</option>
                                            <option value="right">Right</option>
                                            <option value="sky">Sky</option>
                                            <option value="sky-sign">Sky Sign</option>
                                            <option value="wall-wrap">Wall Wrap</option>
                                        </select>
                                    </div>
                                </div>


                            </div>
                            <div className='row'>
                                <div className='col-md-12 col-xxl-6'>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="exampleFormControlInput">Object Type <sup className='text-danger'>required</sup></label>
                                        <select className='form-select form-control' value={objectType} onChange={(e) => setObjectType(e.target.value)}>
                                            <option value=''>choose object...</option>
                                            <option value='billboard' >Billboard</option>
                                            <option value='Signage' >Signage</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='col-md-12 col-xxl-6'>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="exampleFormControlInput">Price <sup className='text-danger'>required</sup></label>
                                        <input className="form-control required" id="exampleFormControlInput" type="number" step="any" required placeholder="0.0" value={price} onChange={(e) => setPrice(e.target.value)} />
                                    </div>
                                </div>
                            </div>

                            <div className='col-xxl-12 bg-gray-100 d-flex align-items-center p-2 mb-3' >
                                Owner Information
                            </div>
                            <div className='row'>

                                <div className='col-md-12 col-xxl-6'>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="title">Owner Name</label>
                                        <input className="form-control " id="title" type="text" placeholder="abc media" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} />
                                    </div>
                                </div>
                                <div className='col-md-12 col-xxl-6'>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="title">Owner Contact 1</label>
                                        <PhoneInput defaultCountry="KE" className='form-control' placeholder="Enter phone number" value={ownerContact} onChange={setOwnerContact} />
                                    </div>
                                </div>
                                <div className='col-md-12 col-xxl-6'>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="title">Owner Contact 2</label>
                                        <PhoneInput defaultCountry="KE" className='form-control' placeholder="Enter phone number" value={ownerContact2} onChange={setOwnerContact2} />
                                    </div>
                                </div>
                            </div>
                            <div className='mb-3 text-end'>
                                <button type='submit' disabled={loading} className="btn btn-primary w-100 mb-3 d-flex align-items-center justify-content-center">
                                    {loading && <div className="spinner-border text-white me-3" style={{ fontSize: '10px', width: '1rem', height: '1rem' }} role="status"><span className="visually-hidden">Loading...</span></div>}
                                    {loading ? 'Loading .... please wait' : (<><Save size={15} className='me-2' /> Update Structure Info</>)}</button>
                            </div>
                        </form>
                    </div>
                </div >
            </div >
        </>
    )
}
