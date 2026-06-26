import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { uploadDocuments } from "../api";

import {
    getCustomer,
    updateCustomer,
    getCustomerPayments,
    getDocuments,
    getCustomerStage,
    getCustomerPhotos,
    getCustomerMaterials,
    downloadDocument,
    updateStage,
    deleteDocument as deleteDocumentApi,
    uploadPhotos,
    deletePhoto as deletePhotoApi,
    // deletePhoto,
    // deletePhotoApi
    addMaterial,
    updateMaterial,
    deleteMaterialApi,
    getStages,
    addPayment,
    deletePaymentApi,
    updatePayment
} from "../api";

import "./theme.css";

export const API_BASE =
    "http://192.168.0.65:8080";

export default function CustomerDetails() {

    const { id } = useParams();

    const [customer, setCustomer] = useState(null);
    const [form, setForm] = useState({});
    const [editing, setEditing] = useState(false);

    const [payments, setPayments] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [stage, setStage] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [documentFiles, setDocumentFiles] = useState([]);
    const [selectedStage, setSelectedStage] = useState("");
    const [documentsToDelete, setDocumentsToDelete] = useState([]);
    const [newDocumentFiles, setNewDocumentFiles] = useState([]);
    const [photosToDelete, setPhotosToDelete] = useState([]);
    const [newPhotos, setNewPhotos] = useState([]);
    const [materialsToDelete, setMaterialsToDelete] = useState([]);
    const [newMaterials, setNewMaterials] = useState([]);
    const [stages, setStages] = useState([]);
    const [newPayments, setNewPayments] = useState([]);
    const [paymentsToDelete, setPaymentsToDelete] = useState([]);

    useEffect(() => {

        getCustomer(id)
            .then(res => {
                setCustomer(res.data);
                setForm(res.data);
            });

        getCustomerPayments(id)
            .then(res => setPayments(res.data));

        getDocuments(id)
            .then(res => setDocuments(res.data));

        getCustomerPhotos(id)
            .then(res => setPhotos(res.data));

        // getCustomerStage(id)
        //     .then(res => setStage(res.data));

        getCustomerStage(id)
            .then(res => {
                setStage(res.data);

                if (res.data?.stage?.stageId) {
                    setSelectedStage(
                        String(res.data.stage.stageId)
                    );
                }
            });

        getCustomerMaterials(id)
            .then(res => setMaterials(res.data));

        getStages()
            .then(res => setStages(res.data));

    }, [id]);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    // const saveCustomer = async () => {

    //     try {

    //         const res = await updateCustomer(
    //             customer.customerId,
    //             form
    //         );

    //         setCustomer(res.data);
    //         setForm(res.data);
    //         setEditing(false);

    //         alert("Customer updated successfully");

    //     } catch (err) {

    //         console.error(err);

    //         alert("Failed to update customer");
    //     }
    // };

    // const saveCustomer = async () => {

    //     try {

    //         const customerResponse =
    //             await updateCustomer(
    //                 customer.customerId,
    //                 form
    //             );

    //         await updateStage(
    //             customer.customerId,
    //             Number(selectedStage)
    //         );

    //         setCustomer(
    //             customerResponse.data
    //         );

    //         setEditing(false);

    //         alert(
    //             "Customer updated successfully"
    //         );

    //     } catch (err) {

    //         console.error(err);

    //         alert(
    //             "Failed to update customer"
    //         );
    //     }
    // };
    const saveCustomer = async () => {

        try {
            const customerResponse =
                await updateCustomer(
                    customer.customerId,
                    form
                );
            await updateStage(
                customer.customerId,
                Number(selectedStage)
            );

            const updatedStage =
                await getCustomerStage(
                    customer.customerId
                );
            setStage(updatedStage.data);

            for (const photoId of photosToDelete) {
                await deletePhotoApi(photoId);
                //await deletePhoto(photoId);
            }

            if (newPhotos.length > 0) {
                await uploadPhotos(
                    customer.customerId,
                    newPhotos
                );
            }

            const photoResponse =
                await getCustomerPhotos(
                    customer.customerId
                );
            setPhotos(
                photoResponse.data
            );

            // Reset temporary arrays
            setPhotosToDelete([]);
            setNewPhotos([]);

            // delete docs
            for (
                const documentId
                of documentsToDelete
            ) {
                await deleteDocumentApi(
                    documentId
                );
            }

            // upload docs
            if (
                newDocumentFiles.length > 0
            ) {
                await uploadDocuments(
                    customer.customerId,
                    newDocumentFiles
                );
            }
            const docs =
                await getDocuments(
                    customer.customerId
                );

            setDocuments(
                docs.data
            );

            // Materials
            for (const materialId of materialsToDelete) {

                await deleteMaterialApi(
                    materialId
                );
            }

            setDocumentsToDelete([]);
            setNewDocumentFiles([]);

            setCustomer(customerResponse.data);
            setForm(customerResponse.data);

            for (const id of paymentsToDelete) {
                await deletePaymentApi(id);
            }

            for (const payment of newPayments) {
                await addPayment({
                    ...payment,
                    customer: {
                        customerId:
                            customer.customerId
                    }
                });
            }

            setEditing(false);

            alert(
                "Customer updated successfully"
            );

        } catch (err) {

            console.error(err);

            alert(
                "Failed to update customer"
            );

        }

        await loadCustomerData();
    };

    const editPayment = (payment) => {
        console.log("Edit payment", payment);
    };

    // const deletePayment = async (paymentId) => {
    //     console.log("Delete payment", paymentId);
    // };
    const deletePayment = (paymentId) => {
        setPayments(
            payments.filter(
                p => p.paymentId !== paymentId
            )
        );
        setPaymentsToDelete([
            ...paymentsToDelete,
            paymentId
        ]);
    };

    const editDocument = (doc) => {
        console.log("Edit document", doc);
    };

    // const deleteDocument = async (documentId) => {
    //     console.log("Delete document", documentId);
    // };
    const deleteDocument = (
        documentId
    ) => {
        setDocumentsToDelete([
            ...documentsToDelete,
            documentId
        ]);
        setDocuments(
            documents.filter(
                doc =>
                    doc.documentId !==
                    documentId
            )
        );
    };

    const handlePhotoUpload = async (e) => {

        const file = e.target.files[0];

        if (!file) return;

        console.log("Upload photo", file);
    };

    // const deletePhoto = async (photoId) => {
    //     console.log("Delete photo", photoId);
    // };
    const deletePhoto = (
        photoId
    ) => {
        setPhotosToDelete([
            ...photosToDelete,
            photoId
        ]);
        setPhotos(
            photos.filter(
                p => p.phid !== photoId
            )
        );
    };

    const editMaterial = (material) => {
        console.log("Edit material", material);
    };

    // const deleteMaterial = async (materialId) => {
    //     console.log("Delete material", materialId);
    // };
    const deleteMaterial = (materialId) => {
        setMaterials(
            materials.filter(
                m => m.id !== materialId
            )
        );
        setMaterialsToDelete([
            ...materialsToDelete,
            materialId
        ]);
    };

    const handleDocumentUpload = (e) => {
        setDocumentFiles(
            e.target.files
        );
    };

    const [selectedFiles,
        setSelectedFiles] =
        useState([]);

    const saveStage = async () => {

        try {

            await updateStage(
                id,
                Number(selectedStage)
            );

            const stageRes =
                await getCustomerStage(
                    customer.customerId
                );
            setStage(
                stageRes.data
            );

            const res =
                await getCustomerStage(id);

            setStage(res.data);

            alert("Stage updated");

        } catch (err) {

            console.error(err);

            alert("Failed to update stage");

        }
    };

    const loadCustomerData = async () => {

        const customerRes =
            await getCustomer(id);

        setCustomer(customerRes.data);
        setForm(customerRes.data);

        const paymentsRes =
            await getCustomerPayments(id);

        setPayments(paymentsRes.data);

        const docsRes =
            await getDocuments(id);

        setDocuments(docsRes.data);

        const photosRes =
            await getCustomerPhotos(id);

        setPhotos(photosRes.data);

        const stageRes =
            await getCustomerStage(id);

        setStage(stageRes.data);

        setSelectedStage(
            String(stageRes.data.stage.stageId)
        );

        const materialRes =
            await getCustomerMaterials(id);

        setMaterials(materialRes.data);
    };

    if (!customer) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className="admin-main">

            <div className="header-row">

                <h1 className="admin-page-title">
                    Customer Details
                </h1>

                {!editing ? (
                    <button
                        className="btn-primary"
                        onClick={() => setEditing(true)}
                    >
                        Edit Customer
                    </button>
                ) : (
                    <div>
                        <button
                            className="btn-primary"
                            onClick={saveCustomer}
                        >
                            Save
                        </button>

                        <button
                            // className="btn-secondary"
                            className="btn-primary"
                            // onClick={() => {
                            //     setEditing(false);
                            //     setForm(customer);
                            // }}
                                onClick={() => {
                                    setEditing(false);
                                    setForm(customer);
                                    setSelectedStage(
                                        String(stage.stage.stageId)
                                    );
                                }}
                        >
                            Cancel
                        </button>
                    </div>
                )}

            </div>

            {/* CUSTOMER DETAILS */}

            <div className="card">

                <h2>Customer Information</h2>

                <div className="profile-grid">

                    <Field
                        label="First Name"
                        name="firstname"
                        value={form.firstname}
                        editing={editing}
                        onChange={handleChange}
                    />

                    <Field
                        label="Last Name"
                        name="lastname"
                        value={form.lastname}
                        editing={editing}
                        onChange={handleChange}
                    />

                    <Field
                        label="Phone Number"
                        name="phoneNo"
                        value={form.phoneNo}
                        editing={editing}
                        onChange={handleChange}
                    />

                    <Field
                        label="Address"
                        name="address"
                        value={form.address}
                        editing={editing}
                        onChange={handleChange}
                    />

                    <Field
                        label="Facing"
                        name="facing"
                        value={form.facing}
                        editing={editing}
                        onChange={handleChange}
                    />

                    <Field
                        label="Constructed Area"
                        name="constructedArea"
                        value={form.constructedArea}
                        editing={editing}
                        onChange={handleChange}
                    />

                    <Field
                        label="Approved Area"
                        name="approvedArea"
                        value={form.approvedArea}
                        editing={editing}
                        onChange={handleChange}
                    />

                    <Field
                        label="Site Area"
                        name="siteArea"
                        value={form.siteArea}
                        editing={editing}
                        onChange={handleChange}
                    />

                    <div className="profile-field">
                        <label>Status</label>

                        {editing ? (

                            <select
                                name="status"
                                value={form.status || "ACTIVE"}
                                onChange={handleChange}
                            >
                                <option value="ACTIVE">
                                    ACTIVE
                                </option>

                                <option value="INACTIVE">
                                    INACTIVE
                                </option>
                            </select>

                        ) : (

                            <p>{customer.status}</p>

                        )}
                    </div>

                    <div className="profile-field">
                        <label>Current Stage</label>
                        {editing ? (
                            <select
                                value={selectedStage}
                                onChange={(e) =>
                                    setSelectedStage(
                                        e.target.value
                                    )
                                }
                            >
                                {/* <option value="1">
                                    Foundation
                                </option>

                                <option value="2">
                                    Framing
                                </option>

                                <option value="3">
                                    Roofing
                                </option>

                                <option value="4">
                                    Interior Finishing
                                </option>

                                <option value="5">
                                    Final Inspection
                                </option> */}
                                {stages.map(stage => (
                                    <option
                                        key={stage.stageId}
                                        value={stage.stageId}
                                    >
                                        {stage.stageName}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <p>
                                {stage?.stage?.stageName || "-"}
                            </p>
                        )}
                    </div>

                </div>

                {editing && (
                    <div
                        style={{
                            marginTop: "20px"
                        }}
                    >
                        <h3>Documents</h3>
                        <input
                            type="file"
                            multiple
                            onChange={(e) =>
                                setNewDocumentFiles(
                                    Array.from(
                                        e.target.files
                                    )
                                )
                            }
                        />
                    </div>
                )}
                <div
                    style={{
                        marginTop: "20px"
                    }}
                >
                    <h3>Existing Documents</h3>
                    {documents.map(doc => (
                        <div
                            key={doc.documentId}
                            style={{
                                display: "flex",
                                justifyContent:
                                    "space-between",
                                marginBottom: "10px"
                            }}
                        >
                            <a
                                href={downloadDocument(
                                    doc.documentId
                                )}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {doc.documentName}
                            </a>
                            {editing && (
                                <button
                                    className="btn-primary"
                                    onClick={() =>
                                        deleteDocument(
                                            doc.documentId
                                        )
                                    }
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                <h3>Photos</h3>
                <div
                    style={{
                        display: "flex",
                        gap: "15px",
                        flexWrap: "wrap"
                    }}
                >
                    {photos.map(photo => (
                        <div
                            key={photo.phid}
                            style={{
                                width: "200px"
                            }}
                        >
                            {/* <img
                                src={`${API_BASE}/uploads/${photo.photoPath}`}
                                alt=""
                                width="180"
                            /> */}
                            <img
                                src={`${API_BASE}/uploads/${photo.photoPath}`}
                                alt=""
                                width="180"
                                style={{
                                    cursor: "pointer",
                                    borderRadius: "8px",
                                    objectFit: "cover"
                                }}
                                onClick={() =>
                                    setSelectedImage(
                                        `${API_BASE}/uploads/${photo.photoPath}`
                                    )
                                }
                            />
                            {editing && (
                                <button
                                    className="btn-primary"
                                    onClick={() =>
                                        deletePhoto(
                                            photo.phid
                                        )
                                    }
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                    ))}

                    {selectedImage && (
                        <div
                            onClick={() =>
                                setSelectedImage(null)
                            }
                            style={{
                                position: "fixed",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                background: "rgba(0,0,0,0.85)",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                zIndex: 9999,
                                cursor: "pointer"
                            }}
                        >
                            <img
                                src={selectedImage}
                                alt="Preview"
                                style={{
                                    maxWidth: "90%",
                                    maxHeight: "90%",
                                    borderRadius: "10px",
                                    boxShadow:
                                        "0 0 20px rgba(255,255,255,0.3)"
                                }}
                                onClick={(e) =>
                                    e.stopPropagation()
                                }
                            />
                        </div>
                    )}

                </div>
                {editing && (
                    <div
                        style={{
                            marginTop: "20px"
                        }}
                    >
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) =>
                                setNewPhotos(
                                    Array.from(
                                        e.target.files
                                    )
                                )
                            }
                        />
                    </div>
                )}

                <div
                    style={{
                        marginTop: "30px"
                    }}
                >
                    <h3>Materials Used</h3>
                    {materials.map((material, index) => (
                        <div
                            key={material.id}
                            style={{
                                display: "flex",
                                gap: "10px",
                                marginBottom: "10px",
                                alignItems: "center"
                            }}
                        >
                            {editing ? (
                                <>
                                    <input
                                        value={material.materialName || ""}
                                        onChange={(e) => {
                                            const updated =
                                                [...materials];
                                            updated[index].materialName =
                                                e.target.value;
                                            setMaterials(updated);
                                        }}
                                    />
                                    <input
                                        type="number"
                                        value={material.quantity || ""}
                                        onChange={(e) => {
                                            const updated =
                                                [...materials];
                                            updated[index].quantity =
                                                e.target.value;

                                            setMaterials(updated);
                                        }}
                                    />
                                    <input
                                        value={material.unit || ""}
                                        onChange={(e) => {
                                            const updated =
                                                [...materials];
                                            updated[index].unit =
                                                e.target.value;

                                            setMaterials(updated);
                                        }}
                                    />
                                </>
                            ) : (
                                <>
                                    <span>{material.materialName}</span>
                                    <span>{material.quantity}</span>
                                    <span>{material.unit}</span>
                                </>
                            )}
                            {editing && (
                                <button
                                    className="btn-primary"
                                    onClick={() =>
                                        deleteMaterial(
                                            material.id
                                        )
                                    }
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                <div
                    style={{
                        marginTop: "30px"
                    }}
                >
                    <h3>Payment History</h3>
                    {payments.map(payment => (
                        <div
                            key={payment.paymentId}
                            style={{
                                display: "flex",
                                gap: "15px",
                                alignItems: "center",
                                marginBottom: "10px"
                            }}
                        >
                            <span>
                                ₹{payment.amount}
                            </span>
                            <span>
                                {payment.type}
                            </span>
                            <span>
                                {payment.way}
                            </span>
                            <span>
                                {new Date(
                                    payment.paymentDate
                                ).toLocaleDateString()}
                            </span>
                            {editing && (
                                <button
                                    className="btn-primary"
                                    onClick={() =>
                                        deletePayment(
                                            payment.paymentId
                                        )
                                    }
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                {editing && (
                    <div
                        style={{
                            marginTop: "20px"
                        }}
                    >
                        <button
                            className="btn-primary"
                            onClick={() =>
                                setNewPayments([
                                    ...newPayments,
                                    {
                                        amount: "",
                                        type: "INSTALLMENT",
                                        way: "CASH",
                                        paymentDate:
                                            new Date()
                                                .toISOString()
                                                .substring(0, 10)
                                    }
                                ])
                            }
                        >
                            Add Payment
                        </button>
                    </div>
                )}

                {newPayments.map((payment, index) => (
                    <div
                        key={index}
                        style={{
                            display: "flex",
                            gap: "10px",
                            marginBottom: "10px"
                        }}
                    >
                        <input
                            placeholder="Amount"
                            value={payment.amount}
                            onChange={(e) => {
                                const temp = [...newPayments];
                                temp[index].amount = e.target.value;
                                setNewPayments(temp);
                            }}
                        />
                        <select
                            value={payment.type}
                            onChange={(e) => {
                                const temp = [...newPayments];
                                temp[index].type = e.target.value;
                                setNewPayments(temp);
                            }}
                        >
                            <option>INSTALLMENT</option>
                            <option>ADVANCE</option>
                            <option>FULL</option>
                        </select>
                        <select
                            value={payment.way}
                            onChange={(e) => {
                                const temp = [...newPayments];
                                temp[index].way = e.target.value;
                                setNewPayments(temp);
                            }}
                        >
                            <option>CASH</option>
                            <option>BANK</option>
                            <option>CHEQUE</option>
                            <option>UPI</option>
                        </select>
                        <input
                            type="date"
                            value={payment.paymentDate}
                            onChange={(e) => {
                                const temp = [...newPayments];
                                temp[index].paymentDate = e.target.value;
                                setNewPayments(temp);
                            }}
                        />
                    </div>
                ))}

            </div>

            {/* PAYMENTS */}

            {/* <div className="card">

                <h3>Payment History</h3>

                <th>Actions</th>

                <table className="admin-table">

                    <thead>
                        <tr>
                            <th>Amount</th>
                            <th>Type</th>
                            <th>Method</th>
                            <th>Date</th>
                        </tr>
                    </thead>

                    <tbody>

                        {payments.map(payment => (

                            <tr key={payment.paymentId}>

                                <td>
                                    ₹{payment.amount}
                                </td>

                                <td>
                                    {payment.type}
                                </td>

                                <td>
                                    {payment.way}
                                </td>

                                <td>
                                    {new Date(
                                        payment.paymentDate
                                    ).toLocaleDateString()}
                                </td>

                                <td>

                                    <button
                                        onClick={() =>
                                            editPayment(payment)
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            deletePayment(
                                                payment.paymentId
                                            )
                                        }
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div> */}

            {/* DOCUMENTS */}

            {/* <div className="card">

                <h3>Documents</h3>

                <th>Actions</th>

                <table className="admin-table">

                    <thead>
                        <tr>
                            <th>Document Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>

                        {documents.map(doc => (

                            <tr key={doc.documentId}>

                                <td>
                                    {doc.documentName}
                                </td>

                                <td>

                                    <a
                                        href={downloadDocument(
                                            doc.documentId
                                        )}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="btn-primary"
                                    >
                                        Download
                                    </a>

                                </td>

                                <td>

                                    <a
                                        href={downloadDocument(
                                            doc.documentId
                                        )}
                                    >
                                        Download
                                    </a>

                                    <button
                                        onClick={() =>
                                            deleteDocument(
                                                doc.documentId
                                            )
                                        }
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div> */}

            {/* PHOTOS */}

            {/* {editing && (

                <div>

                    <input
                        type="file"
                        onChange={handlePhotoUpload}
                    />

                </div>

            )}

            <div className="card">

                <h3>Recent Photos</h3>
                <div
                    style={{
                        display: "flex",
                        gap: "20px",
                        flexWrap: "wrap"
                    }}
                >
                    {photos
                        .filter(photo => photo.photoPath)
                        .map(photo => (
                            <div
                                key={photo.phid}
                                style={{
                                    border: "1px solid #ddd",
                                    padding: "10px",
                                    borderRadius: "8px",
                                    width: "260px"
                                }}
                            >
                                <img
                                    src={`${API_BASE}/uploads/${photo.photoPath}`}
                                    alt={photo.type}
                                    width="240"
                                    height="180"
                                    style={{
                                        objectFit: "cover",
                                        borderRadius: "8px",
                                        cursor: "pointer"
                                    }}
                                    onClick={() =>
                                        setSelectedImage(
                                            `${API_BASE}/uploads/${photo.photoPath}`
                                        )
                                    }
                                    onError={(e) => {
                                        e.target.src =
                                            "https://via.placeholder.com/240x180?text=No+Image";
                                    }}
                                />
                                <p
                                    style={{
                                        marginTop: "10px",
                                        textAlign: "center"
                                    }}
                                >
                                    {photo.type}
                                </p>

                                <button
                                    onClick={() =>
                                        deletePhoto(photo.phid)
                                    }
                                >
                                    Delete
                                </button>
                                
                            </div>
                        ))}
                </div>

                {selectedImage && (
                    <div
                        onClick={() =>
                            setSelectedImage(null)
                        }
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            background:
                                "rgba(0,0,0,0.85)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: 9999
                        }}
                    >
                        <img
                            src={selectedImage}
                            alt="Preview"
                            style={{
                                maxWidth: "90%",
                                maxHeight: "90%",
                                borderRadius: "10px"
                            }}
                        />
                    </div>
                )}
            </div> */}
            

            {/* STAGE */}

            {/* <div className="card">

                <h3>Current Stage</h3>

                {editing && (
                    <div style={{ marginBottom: "20px" }}>

                        <select
                            value={selectedStage}
                            onChange={(e) =>
                                setSelectedStage(
                                    e.target.value
                                )
                            }
                        >
                            <option value="1">
                                Foundation
                            </option>

                            <option value="2">
                                Framing
                            </option>

                            <option value="3">
                                Roofing
                            </option>

                            <option value="4">
                                Interior Finishing
                            </option>

                            <option value="5">
                                Final Inspection
                            </option>

                        </select>

                        <button
                            className="btn-primary"
                            onClick={saveStage}
                        >
                            Save Stage
                        </button>

                    </div>
                )}

            </div> */}

            {/* MATERIALS */}

            {/* <div className="card">

                <h3>Materials Used</h3>

                <th>Actions</th>

                <table className="admin-table">

                    <thead>
                        <tr>
                            <th>Material</th>
                            <th>Quantity</th>
                            <th>Unit</th>
                        </tr>
                    </thead>

                    <tbody>

                        {materials.map(material => (

                            <tr key={material.id}>

                                <td>
                                    {material.materialName}
                                </td>

                                <td>
                                    {material.quantity}
                                </td>

                                <td>
                                    {material.unit}
                                </td>

                                <td>

                                    <button
                                        onClick={() =>
                                            editMaterial(material)
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            deleteMaterial(
                                                material.id
                                            )
                                        }
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>
                            

                        ))}

                    </tbody>

                </table>

            </div> */}

        </div>
    );
}

function Field({
    label,
    name,
    value,
    editing,
    onChange
}) {
    return (
        <div className="profile-field">
            <label>{label}</label>
            {editing ? (
                <input
                    className="field-input"
                    name={name}
                    value={value || ""}
                    onChange={onChange}
                />
            ) : (
                <p>{value || "-"}</p>
            )}
        </div>
    );
}
