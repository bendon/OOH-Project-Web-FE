import { X } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { ShimmerCategoryItem, ShimmerContentBlock, ShimmerPostDetails, ShimmerSocialPost, ShimmerThumbnail } from 'react-shimmer-effects'
import Tesseract from 'tesseract.js';
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import DOMPurify from 'dompurify';
import { postImageDataExtraction } from '../../../data/lib';
import { set } from 'date-fns';

export default function ImageCropperAI({ image }) {
    const [crop, setCrop] = useState()
    const [completedCrop, setCompletedCrop] = useState(null)
    const [previewUrl, setPreviewUrl] = useState(null);
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);

    const [text, setText] = useState('');
    const [confidence, setConfidence] = useState(0);
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(false);
    const [formdata, setFormData] = useState(null)
    const [fileAnalysis, setFileAnalysis] = useState(null)
    const [loadingAnalysis, setLoadingAnalysis] = useState(false)

    useEffect(() => {
        if (!completedCrop || !previewCanvasRef.current) {
            return;
        }
        const image = imgRef.current;
        const canvas = previewCanvasRef.current;
        const crop = completedCrop;

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext('2d');
        const pixelRatio = window.devicePixelRatio;

        canvas.width = crop.width;
        canvas.height = crop.height;
        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );


        canvas.toBlob((blob) => {
            if (blob) {
                setPreviewUrl(URL.createObjectURL(blob));
                const formData = new FormData();
                formData.append("file", blob, "cropped-image.png"); // "file" is the key name
                setFormData(formData);

            }
        }, 'image/png');
    }, [completedCrop])

    useEffect(() => {
        if (previewUrl) {
            // extractText(previewUrl);

        }

        const fetchImageData = async () => {
            if (previewUrl) {
                setLoadingAnalysis(true);
                setFileAnalysis(null)
                try {
                    const response = await postImageDataExtraction(formdata);
                    if (response.status === 200) {
                        console.log(response.data);
                        setFileAnalysis(response.data);
                        setLoadingAnalysis(false);
                    }
                } catch (error) {
                    setLoadingAnalysis(false);
                    console.error('Error extracting text:', error);
                }
            }
        };
        fetchImageData();

    }, [previewUrl])


    const extractText = (imageUrl) => {
        setLoading(true);
        setProgress(0);
        setText('');

        Tesseract.recognize(imageUrl, 'eng', {
            logger: (m) => {
                if (m.status === 'recognizing text') {
                    setProgress(Math.floor(m.progress * 100));
                }
            },
        })
            .then((results) => {
                // console.log(results);
                const sanitizedHtml = DOMPurify.sanitize(results.data.text);
                setText(sanitizedHtml);
                setConfidence(results.data.confidence);
                setLoading(false);
            })
            .catch((err) => {
                console.error('OCR Error:', err);
                setLoading(false);
            });
    };

    return (
        <>
            <div className="modal fade" id="k_modal_image_cropper_ai" tabIndex="-1" data-bs-backdrop="static" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg" style={{minWidth: '80vw'}}>
                    <div className="modal-content">
                        <div className="modal-header justify-content-between ">
                            <h5 className="modal-title  dark__text-gray-1100" id="staticBackdropLabel">Content Extraction</h5>
                            <button className="btn p-1" type="button" data-bs-dismiss="modal" aria-label="Close"><X size={15} /> </button>
                        </div>
                        <div className="modal-body">
                            <div className='row '>
                                <div className='col-xxl-6'>
                                    <ReactCrop crop={crop} onChange={c => setCrop(c)} onComplete={(c) => setCompletedCrop(c)}>
                                        {image ? <img ref={imgRef} className='mb-2' src={image} width={'100%'} alt="Custom Marker" /> : <> <ShimmerThumbnail height={200} width={'100%'} /></>}
                                    </ReactCrop>
                                </div>
                                <div className='col-xxl-6'>
                                {completedCrop && (
                                    <>
                                        <canvas 
                                            ref={previewCanvasRef}
                                            style={{
                                                display: 'none',
                                                width: completedCrop.width,
                                                height: completedCrop.height,
                                                border: '1px solid #ddd',
                                            }}
                                        />
                                    </>
                                )}
                                {loadingAnalysis && <ShimmerCategoryItem  title /> }
                                {fileAnalysis && <>
                                <h6>Campaign Brand</h6>
                                <p>{fileAnalysis.campaign_brand}</p>
                                <h6>Description </h6>
                                <p>{fileAnalysis.campaign_description}</p>
                                {fileAnalysis.location ? <p>Location : {fileAnalysis.location}</p> : ''}
                                <h6>Contacts</h6>
                                <p>Phone : {fileAnalysis.campaign_contacts.campaign_phone.map((item, index)=> <span key={index}>{item}</span>)}</p>
                                <p>Email : {fileAnalysis.campaign_contacts.campaign_email.map((item, index)=> <span key={index}>{item}</span>)}</p>
                                <h6>Target Audience</h6>
                                <p>{fileAnalysis.target_audience}</p>
                                <h6>Additional Insights</h6>
                                <p> {fileAnalysis.additional_notes}</p>
                                <h6>Target Gender</h6>
                                <p> {fileAnalysis.target_gender}</p>
                                <h6>Target Age</h6>
                                <p> {fileAnalysis.target_age}</p>
                                <h6>Billboard Measurements</h6>
                                <p>Height : {fileAnalysis.billboard_measurements.height} {fileAnalysis.billboard_measurements.units}</p>
                                <p>Width : {fileAnalysis.billboard_measurements.width} {fileAnalysis.billboard_measurements.units}</p>
                                <h6>Confidence Percentage</h6>
                                <p> {fileAnalysis.percentage_accuracy}</p>
                                <h6>Owner Details</h6>
                                <p>Name : {fileAnalysis.owner.owner_name}</p>
                                <p>Phone : {fileAnalysis.owner.owner_phone.map((item, index)=> <span key={index}>{item}, </span>)}</p>
                                <p>Email : {fileAnalysis.owner.owner_email.map((item, index)=> <span key={index}>{item}, </span>)}</p>
                                <p>Site : {fileAnalysis.owner.owner_website}</p>
                                </>}
                                </div>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-outline-danger" type="button" data-bs-dismiss="modal"><X size={15} /> Cancel</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
