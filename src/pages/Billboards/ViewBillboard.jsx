import { Link, useParams } from "react-router";
import { convertToHumanReadable, decryptText, encryptText, getBoardById, getBoardSummaryByCode } from "../../data/lib";
import { ClipboardCheck, Eye, ListChecks } from "lucide-react";
import { useEffect, useState } from "react";


export default function ViewBillboard() {
    const { billboardId } = useParams();
    const id = decryptText(billboardId)
    const [billboard, setBillboard] = useState(null)
    const [summary, setSummary] = useState(null)

    useEffect(() => {
        const fetchBillboardById = async () => {
            setBillboard(null)
            const res = await getBoardById(id)
            if (res.status === 200) {


                setBillboard(res.data)
            }
        }
        fetchBillboardById()
    }, [id])

    useEffect(() => {
        const fetchSummary = async () => {
            setSummary(null)
            if (billboard !== null) {
                const res = await getBoardSummaryByCode(billboard.boardCode)
                if (res.status === 200) {
                    setSummary(res.data)
                }
            }
        }
        fetchSummary()

    }, [billboard])
    return (
        <>
            <div className='d-flex justify-content-between'>
                <h4>Billboard Details</h4>
                <div>
                    <Link to="/manage-boards" className='btn btn-outline-danger' style={{ fontSize: '12px' }}><ClipboardCheck size={15} /> Close</Link>
                </div>
            </div>
            <hr></hr>
            {billboard !== null &&
                <>
                    <div className="row">
                        <div className="col-xxl-8">
                            <div className="card ">
                                <div className="card-header">
                                    <h5>ID : {billboard.boardCode}</h5>
                                </div>
                                <div className="card-body">
                                    <div className="row mb-3">
                                        <div className="col-xxl-6">

                                            <ul class="list-group list-group-flush">
                                                <li class="list-group-item d-flex justify-content-between align-items-center">Coordinates<span class="badge badge-phoenix badge-phoenix-secondary rounded-pill">{billboard.latitude}, {billboard.longitude}</span></li>
                                                <li class="list-group-item d-flex justify-content-between align-items-center">Location<span class="badge badge-phoenix badge-phoenix-primary rounded-pill">{billboard.location}</span></li>
                                                <li class="list-group-item d-flex justify-content-between align-items-center">City<span class="badge badge-phoenix badge-phoenix-primary rounded-pill">{billboard.city}</span></li>
                                                <li class="list-group-item d-flex justify-content-between align-items-center">Measurements<span class="">{billboard.width} * {billboard.height} {billboard.unit}</span></li>
                                                <li class="list-group-item d-flex justify-content-between align-items-center">Angle<span class="">{billboard.angle} </span></li>
                                            </ul>

                                        </div>
                                        <div className="col-xxl-6">

                                            <ul class="list-group list-group-flush">
                                                <li class="list-group-item d-flex justify-content-between align-items-center">Type<span class="badge badge-phoenix badge-phoenix-secondary rounded-pill">{billboard.type}, {billboard.longitude}</span></li>
                                                <li class="list-group-item d-flex justify-content-between align-items-center">Visibility<span class="badge badge-phoenix badge-phoenix-primary rounded-pill">{billboard.visibility}</span></li>
                                                <li class="list-group-item d-flex justify-content-between align-items-center">Structure<span class="badge badge-phoenix badge-phoenix-primary rounded-pill">{billboard.structure}</span></li>
                                                <li class="list-group-item d-flex justify-content-between align-items-center">Material<span class="">{billboard.material}</span></li>
                                                <li class="list-group-item d-flex justify-content-between align-items-center">Illumination<span class="">{billboard.illumination}</span></li>
                                            </ul>
                                        </div>
                                        {billboard.closeUpImage &&
                                        <div className="col-xxl-6">
                                            <div>
                                                {billboard.closeUpImage && <>
                                                    <h6>Closeup Image</h6>
                                                    <img
                                                        src={`https://scout.edgetech.co.ke/api/v1/auth/file/${billboard.closeUpImage.fileUrl}`}
                                                        alt="Uploaded Preview"
                                                        className=" rounded-lg shadow mb-3"
                                                        style={{ maxWidth: "100%", maxHeight: "300px" }}
                                                    />
                                                    <p>
                                                        <a href={`https://scout.edgetech.co.ke/api/v1/auth/file/${billboard.closeUpImage.fileUrl}`} target="_blank"> {`https://scout.edgetech.co.ke/api/v1/auth/file/${billboard.closeUpImage.fileUrl}`}</a>
                                                    </p>

                                                </>}
                                            </div>
                                        </div>
                                    }
                                    {billboard.image &&
                                        <div className="col-xxl-6">
                                            <div>
                                                {billboard.image && <>
                                                    <h6>Distance Image</h6>
                                                    <img
                                                        src={`https://scout.edgetech.co.ke/api/v1/auth/file/${billboard.image.fileUrl}`}
                                                        alt="Uploaded Preview"
                                                        className=" rounded-lg shadow mb-3"
                                                        style={{ maxWidth: "100%", maxHeight: "300px" }}
                                                    />
                                                    <p>
                                                        <a href={`https://scout.edgetech.co.ke/api/v1/auth/file/${billboard.image.fileUrl}`} target="_blank"> {`https://scout.edgetech.co.ke/api/v1/auth/file/${billboard.image.fileUrl}`}</a>
                                                    </p>

                                                </>}
                                            </div>
                                        </div>}
                                    </div>
                                    
                                    <div className='col-xxl-12 bg-gray-100 d-flex align-items-center p-2 mb-3' >
                                        <h5>Owner Details</h5>
                                    </div>
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item d-flex justify-content-between align-items-center">Owner<span class="badge badge-phoenix badge-phoenix-secondary rounded-pill">{billboard.Owner}</span></li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center">Email<span class="badge badge-phoenix badge-phoenix-primary rounded-pill">{billboard.ownerEmails && billboard.ownerEmails.map((item, index) => (<span key={index}>{item},</span>))}</span></li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center">Contact<span class="badge badge-phoenix badge-phoenix-primary rounded-pill">{billboard.ownerContacts && billboard.ownerContacts.map((item, index) => (<span key={index}>{item},</span>))}</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-4">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Other Sides</h5>
                                </div>
                                <div className="card-body">

                                    {summary && summary.children.map((item, index) => (
                                        <div className="mb-3" key={index}>
                                            <h5>ID : {item.boardCode}</h5>
                                            <div className="text-center">
                                                {item.closeupImage && <>
                                                    <img
                                                        src={`https://scout.edgetech.co.ke/api/v1/auth/file/${item.closeupImage.fileUrl}`}
                                                        alt="Uploaded Preview"
                                                        className=" rounded-lg shadow mb-3"
                                                        style={{ maxWidth: "100%", maxHeight: "300px" }}
                                                    />

                                                </>}
                                            </div>
                                            {item.campaign && item.campaign.campaignBrand && <p style={{ fontSize: 12 }}>Campaign : {item.campaign.campaignBrand}</p>}
                                            <p style={{ fontSize: 12 }}>Uploaded date : {convertToHumanReadable(item.createdAt)}</p>
                                            <Link to={`/show/billboard/${encryptText(item.billboardId)}/details`} className="btn btn-primary form-control" ><ListChecks size={12} /> View Details</Link>
                                            <hr></hr>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </>}
        </>
    )
}
