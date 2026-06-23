import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
    getCustomer,
    updateCustomer,
    getCustomerPayments,
    getDocuments,
    getCustomerStage,
    getCustomerPhotos,
    getCustomerMaterials,
    downloadDocument
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

        getCustomerStage(id)
            .then(res => setStage(res.data));

        getCustomerMaterials(id)
            .then(res => setMaterials(res.data));

    }, [id]);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const saveCustomer = async () => {

        try {

            const res = await updateCustomer(
                customer.customerId,
                form
            );

            setCustomer(res.data);
            setForm(res.data);
            setEditing(false);

            alert("Customer updated successfully");

        } catch (err) {

            console.error(err);

            alert("Failed to update customer");
        }
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
                            onClick={() => {
                                setEditing(false);
                                setForm(customer);
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

                </div>

            </div>

            {/* PAYMENTS */}

            <div className="card">

                <h3>Payment History</h3>

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

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

            {/* DOCUMENTS */}

            <div className="card">

                <h3>Documents</h3>

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

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

            {/* PHOTOS */}

            <div className="card">

                <h3>Recent Photos</h3>

                {/* {photos.map(photo => (
                    <div key={photo.phid}>
                        📷 {photo.type}
                    </div>
                ))} */}

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
                                {/* <img
                                    src={`${API_BASE}/uploads/${photo.photoPath}`}
                                    alt={photo.type}
                                    width="240"
                                    height="180"
                                    style={{
                                        objectFit: "cover",
                                        borderRadius: "8px"
                                    }}
                                    onError={(e) => {
                                        e.target.src =
                                            "https://via.placeholder.com/240x180?text=No+Image";
                                    }}
                                /> */}
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
            </div>
            

            {/* STAGE */}

            <div className="card">

                <h3>Current Stage</h3>

                <p>
                    {stage?.stage?.stageName ||
                        "Not Assigned"}
                </p>

            </div>

            {/* MATERIALS */}

            <div className="card">

                <h3>Materials Used</h3>

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

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

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
