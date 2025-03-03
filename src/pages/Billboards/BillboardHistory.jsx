import React, { useEffect, useState } from 'react'
import { convertToHumanReadable, decryptText, getBillboardHistory, getBoardById, getFileStream } from '../../data/lib';
import { Link, useParams } from 'react-router';
import { ClipboardCheck, MapPin } from 'lucide-react';
import { ShimmerContentBlock, ShimmerThumbnail } from 'react-shimmer-effects';
import ImageCropperAI from './modal/ImageCropperAI';

export default function BillboardHistory() {
  const { billboardId } = useParams();
  const id = decryptText(billboardId)
  const [billboard, setBillboard] = useState(null)
  const [loading, setLoading] = useState(true)
  const [history, setHistory] = useState(null)

  useEffect(() => {

    const fetchBillboard = async () => {
      setLoading(true)
      const res = await getBoardById(id)
      if (res.status === 200) {
        setBillboard(res.data)
      }
      setLoading(false)
    }
    fetchBillboard()

    const fetchHistory = async () => {
      setHistory(null)
      const res = await getBillboardHistory(id)
      if (res.status === 200) {
        setHistory(res.data)
      }
    }
    fetchHistory()

  }, [id])

  useEffect(() => {
    const fetchBillboardImage = async () => {

      if (billboard !== null && !billboard.preview) {
        const res = await getFileStream(billboard.image.fileName)
        if (res.status === 200) {
          setBillboard({ ...billboard, preview: res.data })
        }
      }
    }
    fetchBillboardImage()
  }, [billboard])
  return (
    <>
      <div className='d-flex justify-content-between'>
        <h4>{billboard ? billboard.boardCode : 'Getting board code ...'}</h4>
        <div>
          <Link to="/billboard-locations" className='btn btn-subtle-secondary me-2' style={{ fontSize: '12px' }}><MapPin size={15} /> Billboard Geolocation</Link>
          <Link to="/manage-boards" className='btn btn-subtle-primary' style={{ fontSize: '12px' }}><ClipboardCheck size={15} /> Billboard Management</Link>
        </div>
      </div>

      <hr />
      {loading ?
        <ShimmerContentBlock mode="light" rounded={1} items={1} itemsGap={20} thumbnailHeight={300} thumbnailWidth={300} thumbnailRounded={1} contentDetailsPosition="start" contentDetailTextLines={8} />
        : <div className='row g-3'>
          <div className='col-md-12 col-sm-6 col-xxl-4'>
            <div className='card'>
              <div className='card-header'>
                <div className='d-flex justify-content-between'>
                  <h6 className='card-title'>Billboard Details</h6>
                  <div>
                    <img data-bs-toggle="modal" data-bs-target="#k_modal_image_cropper_ai" src='/project/ai-logo.png' className='cursor-pointer' width={20} />
                  </div>
                </div>
              </div>
              <div className='card-body'>
                <h6>{billboard && billboard.boardCode}</h6>
                {billboard.preview ? <img className='mb-2' src={billboard.preview} width={'100%'} alt="Custom Marker" /> : <> <ShimmerThumbnail height={200} width={'100%'} /></>}
                <p className="text-sm text-gray-600" style={{ lineHeight: '5px', fontSize: '12px' }}>
                  {/* <strong>Occupied:</strong> <span className="badge text-bg-danger">Not Occupied</span> */}
                </p>
                <p className="text-sm text-gray-600" style={{ lineHeight: '5px', fontSize: '12px' }}>
                  <strong>Active:</strong> {billboard.active ? <span className="badge text-bg-success">Active</span> : <span className="badge text-bg-danger">Inactive</span>}
                </p>
                <p className="text-sm text-gray-600" style={{ lineHeight: '5px', fontSize: '12px' }}>
                  <strong>Location:</strong> {billboard.location}
                </p>
                <p className="text-sm text-gray-600" style={{ lineHeight: '5px', fontSize: '12px' }}>
                  <strong>Coordinates:</strong> {billboard.latitude}, {billboard.longitude}
                </p>
                <p className="text-sm text-gray-600" style={{ lineHeight: '5px', fontSize: '12px' }}>
                  <strong>Created Date:</strong> {convertToHumanReadable(billboard.createdAt)}
                </p>
              </div>
              <div className='card-footer'>
                <h6>Description</h6>
                <p>{billboard.description}</p>
              </div>
            </div>
          </div>
          <div className='col-md-12 col-sm-6 col-xxl-8'>
            <h5> History</h5>
            {history ?  history.data.map((item, index) => (
              <div className='card mb-3' key={index}>
                <div className='card-body'>
                  <h6>Brand : {item.campaignBrand}</h6>
                  <h6>Description </h6>
                  <p>{item.campaignDescription}</p>

                  {item.location && <p className="text-sm "><b>Location : </b>{item.location}</p>}
                  {item.clientFirstName && <p className="text-sm "><b>Client : </b> {item.clientFirstName} {item.clientLastName}</p>}
                  <p className="text-sm text-gray-600" style={{ lineHeight: '5px', fontSize: '12px' }}>
                    <strong>Date:</strong> {convertToHumanReadable(item.createdAt)}
                  </p>
                  
                </div>
              </div>
            )) : ''}
          </div>
        </div>}
       
        <ImageCropperAI image={billboard ? billboard.preview : null} />

    </>
  )
}
