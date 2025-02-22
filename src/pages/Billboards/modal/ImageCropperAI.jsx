import { X } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { ShimmerThumbnail } from 'react-shimmer-effects'
import Tesseract from 'tesseract.js';
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import DOMPurify from 'dompurify';

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
            }
        }, 'image/png');
    }, [completedCrop])

    useEffect(() => {
        if (previewUrl) {
            extractText(previewUrl);
          }
        
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
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header justify-content-between ">
                            <h5 className="modal-title  dark__text-gray-1100" id="staticBackdropLabel">Content Extraction</h5>
                            <button className="btn p-1" type="button" data-bs-dismiss="modal" aria-label="Close"><X size={15} /> </button>
                        </div>
                        <div className="modal-body">
                            <ReactCrop crop={crop} onChange={c => setCrop(c)} onComplete={(c) => setCompletedCrop(c)}>
                                {image ? <img ref={imgRef} className='mb-2' src={image} width={'100%'} alt="Custom Marker" /> : <> <ShimmerThumbnail height={200} width={'100%'} /></>}
                            </ReactCrop>

                            <div className='mb-3'>
                                {completedCrop && (
                                    <>
                                        <h6 className="mt-3">Preview:</h6>
                                        <canvas
                                            ref={previewCanvasRef}
                                            style={{
                                                width: completedCrop.width,
                                                height: completedCrop.height,
                                                border: '1px solid #ddd',
                                            }}
                                        />
                                    </>
                                )}
                            </div>
                            <div>
                            {loading && <p className="text-blue-500">Extracting text... {progress}%</p>}
                            <p dangerouslySetInnerHTML={{ __html: text }} />
                            <p>Confidence: <span className='badge text-bg-secondary'>{confidence}</span></p>
                                {/* <textarea
                                    readOnly
                                    value={text}
                                    className="w-full p-2 border rounded-md h-40"
                                /> */}
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
