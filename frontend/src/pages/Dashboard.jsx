// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { getCustomer, updateCustomer } from "../api";

// const STYLES = `
//   @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
//   * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }

//   .admin-root { display: flex; min-height: 100vh; background: #f4f6f9; }

//   /* ── Sidebar ── */
//   .admin-sidebar {
//     width: 240px; min-height: 100vh;
//     background: #1a2332;
//     display: flex; flex-direction: column;
//     position: fixed; top: 0; left: 0; bottom: 0; z-index: 100;
//   }

//   .admin-brand {
//     display: flex; align-items: center; gap: 12px;
//     padding: 22px 20px; border-bottom: 1px solid rgba(255,255,255,0.08);
//   }
//   .admin-brand-square {
//     width: 38px; height: 38px; background: #f6ad55; border-radius: 10px;
//     display: flex; align-items: center; justify-content: center;
//     font-size: 19px; font-weight: 900; color: #1a2332; flex-shrink: 0;
//   }
//   .admin-brand-text { line-height: 1.2; }
//   .admin-brand-name { font-size: 13px; font-weight: 800; color: #fff; }
//   .admin-brand-sub { font-size: 9px; font-weight: 700; color: #f6ad55; text-transform: uppercase; letter-spacing: 1.4px; }

//   .admin-nav { display: flex; flex-direction: column; gap: 3px; padding: 18px 12px; flex: 1; }
//   .admin-nav-item {
//     display: flex; align-items: center; gap: 11px;
//     padding: 11px 13px; border: none; background: transparent;
//     border-radius: 10px; cursor: pointer; color: #8fa3b8;
//     font-size: 13.5px; font-weight: 500; text-align: left; width: 100%;
//     transition: all 0.15s;
//   }
//   .admin-nav-item:hover { background: rgba(246,173,85,0.08); color: #f6ad55; }
//   .admin-nav-item.active { background: rgba(246,173,85,0.16); color: #f6ad55; font-weight: 700; }
//   .admin-nav-icon { font-size: 16px; }

//   .admin-logout {
//     margin: 8px 12px 20px; padding: 11px 13px;
//     border: 1px solid rgba(255,255,255,0.1); background: transparent;
//     border-radius: 10px; color: #7a8fa6; font-size: 13px;
//     cursor: pointer; text-align: left; transition: all 0.15s;
//   }
//   .admin-logout:hover { background: rgba(239,68,68,0.1); color: #fc8181; border-color: rgba(252,129,129,0.3); }

//   /* ── Main ── */
//   .admin-main { margin-left: 240px; flex: 1; padding: 40px; min-height: 100vh; }

//   .admin-page-title { font-size: 25px; font-weight: 800; color: #1a2332; margin-bottom: 6px; }
//   .admin-page-sub { font-size: 14px; color: #7a8fa6; margin-bottom: 26px; }

//   .header-row {
//     display: flex; align-items: flex-start; justify-content: space-between;
//     flex-wrap: wrap; gap: 12px; margin-bottom: 26px;
//   }
//   .header-row .admin-page-title, .header-row .admin-page-sub { margin-bottom: 0; }
//   .header-row > div:first-child .admin-page-title { margin-bottom: 6px; }

//   /* Stat / status cards (same recipe as admin's .card) */
//   .cards { display: flex; gap: 18px; margin-bottom: 30px; flex-wrap: wrap; }
//   .card {
//     background: #fff; padding: 22px 24px; min-width: 220px; flex: 1;
//     border-radius: 16px; box-shadow: 0 1px 4px rgba(26,35,50,0.05);
//     border-top: 3px solid #f6ad55;
//   }
//   .card h3 { font-size: 12px; font-weight: 700; color: #9aabbc; text-transform: uppercase; letter-spacing: 0.6px; margin-bottom: 8px; }
//   .card p { font-size: 28px; font-weight: 800; color: #1a2332; }

//   /* Buttons (same recipe as admin's form button) */
//   .btn-primary {
//     background: #1a2332; color: #fff; border: none; border-radius: 10px;
//     padding: 12px 22px; font-size: 14px; font-weight: 700; cursor: pointer;
//     transition: all 0.15s; font-family: 'Inter', sans-serif;
//   }
//   .btn-primary:hover:not(:disabled) { background: #f6ad55; color: #1a2332; }
//   .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }

//   .btn-ghost {
//     background: transparent; color: #5a6b7d; border: 1.5px solid #e3e8ee;
//     border-radius: 10px; padding: 12px 22px; font-size: 14px; font-weight: 600;
//     cursor: pointer; transition: all 0.15s; font-family: 'Inter', sans-serif;
//   }
//   .btn-ghost:hover { border-color: #1a2332; color: #1a2332; }
//   .btn-group { display: flex; gap: 8px; }

//   /* Profile fields styled like admin table cells / form inputs */
//   .profile-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }

//   .profile-field {
//     background: #fff; padding: 18px 20px; border-radius: 16px;
//     box-shadow: 0 1px 4px rgba(26,35,50,0.05);
//     display: flex; flex-direction: column; gap: 7px;
//   }
//   .field-label { font-size: 11px; font-weight: 700; color: #9aabbc; text-transform: uppercase; letter-spacing: 0.6px; }
//   .field-value { font-size: 15px; color: #1a2332; font-weight: 600; }
//   .field-value.money { font-size: 21px; font-weight: 800; color: #1a2332; }

//   .field-input {
//     padding: 11px 14px; border: 1.5px solid #e3e8ee; border-radius: 10px;
//     font-size: 14px; outline: none; font-family: 'Inter', sans-serif; resize: none;
//     transition: border 0.15s, box-shadow 0.15s; width: 100%;
//   }
//   .field-input:focus { border-color: #f6ad55; box-shadow: 0 0 0 3px rgba(246,173,85,0.15); }

//   /* Status pills — same recipe as admin's status-approved / status-pending */
//   .status-approved { background: #dcfce7; color: #15803d; font-size: 11px; font-weight: 700; padding: 3px 9px; border-radius: 20px; }
//   .status-pending  { background: #fef9c3; color: #a16207; font-size: 11px; font-weight: 700; padding: 3px 9px; border-radius: 20px; }

//   /* Coming soon panel, styled like an admin empty table row blown up */
//   .coming-soon {
//     display: flex; flex-direction: column; align-items: center; justify-content: center;
//     background: #fff; border-radius: 16px; padding: 70px 40px; text-align: center;
//     box-shadow: 0 1px 4px rgba(26,35,50,0.05);
//   }
//   .coming-icon { font-size: 46px; margin-bottom: 14px; }
//   .coming-text { font-size: 15px; color: #374151; font-weight: 600; margin-bottom: 6px; }
//   .coming-sub  { font-size: 13px; color: #9aabbc; }

//   .toast {
//     position: fixed; top: 24px; right: 32px; background: #1a2332; color: #fff;
//     padding: 12px 20px; border-radius: 10px; font-size: 14px; font-weight: 600;
//     box-shadow: 0 4px 16px rgba(0,0,0,0.2); z-index: 999;
//   }

//   .admin-loading {
//     display: flex; flex-direction: column; align-items: center; justify-content: center;
//     height: 100vh; gap: 16px; color: #7a8fa6;
//   }
//   .admin-spinner {
//     width: 36px; height: 36px; border: 3px solid #e3e8ee; border-top-color: #f6ad55;
//     border-radius: 50%; animation: spin 0.7s linear infinite;
//   }
//   @keyframes spin { to { transform: rotate(360deg); } }

//   @media (max-width: 900px) {
//     .admin-sidebar { width: 200px; }
//     .admin-main { margin-left: 200px; padding: 24px; }
//   }
//   @media (max-width: 640px) {
//     .admin-sidebar { display: none; }
//     .admin-main { margin-left: 0; padding: 16px; }
//     .profile-grid { grid-template-columns: 1fr; }
//     .cards { flex-direction: column; }
//   }
// `;

// const NAV_ITEMS = [
//   { key: "profile", label: "Profile",   icon: "👤" },
//   { key: "photos",  label: "Photos",    icon: "🖼️" },
//   { key: "docs",    label: "Documents", icon: "📄" },
//   { key: "payment", label: "Payment",   icon: "💳" },
//   { key: "faq",     label: "FAQ",       icon: "❓" },
// ];

// export default function Dashboard() {
//   const navigate   = useNavigate();
//   const customerId = localStorage.getItem("customerId");

//   const [active,   setActive]   = useState("profile");
//   const [customer, setCustomer] = useState(null);
//   const [editing,  setEditing]  = useState(false);
//   const [form,     setForm]     = useState({});
//   const [saving,   setSaving]   = useState(false);
//   const [toast,    setToast]    = useState("");

//   useEffect(() => {
//     if (!customerId) { navigate("/"); return; }
//     getCustomer(customerId)
//       .then(({ data }) => { setCustomer(data); setForm(data); })
//       .catch(() => navigate("/"));
//   }, [customerId, navigate]);

//   const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 3000); };
//   const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

//   const saveProfile = async () => {
//     setSaving(true);
//     try {
//       const { data } = await updateCustomer(customerId, form);
//       setCustomer(data);
//       setEditing(false);
//       showToast("Profile updated successfully.");
//     } catch {
//       showToast("Failed to save. Please try again.");
//     } finally { setSaving(false); }
//   };

//   const logout = () => { localStorage.clear(); navigate("/"); };

//   if (!customer) {
//     return (
//       <>
//         <style>{STYLES}</style>
//         <div className="admin-loading">
//           <div className="admin-spinner" />
//           <p>Loading your dashboard…</p>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <style>{STYLES}</style>
//       <div className="admin-root">

//         {/* ── Sidebar (same shell as Admin) ── */}
//         <aside className="admin-sidebar">
//           <div className="admin-brand">
//             <div className="admin-brand-square">P</div>
//             <div className="admin-brand-text">
//               <div className="admin-brand-name">Property Mgmt</div>
//               <div className="admin-brand-sub">Customer Panel</div>
//             </div>
//           </div>

//           <nav className="admin-nav">
//             {NAV_ITEMS.map((item) => (
//               <button key={item.key}
//                 className={`admin-nav-item ${active === item.key ? "active" : ""}`}
//                 onClick={() => setActive(item.key)}>
//                 <span className="admin-nav-icon">{item.icon}</span>
//                 <span>{item.label}</span>
//               </button>
//             ))}
//           </nav>

//           <button className="admin-logout" onClick={logout}>⎋ Logout</button>
//         </aside>

//         {/* ── Content ── */}
//         <main className="admin-main">
//           {toast && <div className="toast">{toast}</div>}

//           {active === "profile" && (
//             <>
//               <div className="header-row">
//                 <div>
//                   <h1 className="admin-page-title">My Profile</h1>
//                   <p className="admin-page-sub">View and update your personal information.</p>
//                 </div>
//                 {!editing
//                   ? <button className="btn-primary" onClick={() => setEditing(true)}>Edit Profile</button>
//                   : <div className="btn-group">
//                       <button className="btn-ghost" onClick={() => { setEditing(false); setForm(customer); }}>Cancel</button>
//                       <button className="btn-primary" onClick={saveProfile} disabled={saving}>
//                         {saving ? "Saving…" : "Save Changes"}
//                       </button>
//                     </div>}
//               </div>

//               {/* Status cards, same recipe as Admin's .cards/.card */}
//               <div className="cards">
//                 <div className="card">
//                   <h3>Advance Paid</h3>
//                   <p>₹{Number(customer.advance || 0).toLocaleString("en-IN")}</p>
//                 </div>
//                 <div className="card">
//                   <h3>Total Paid Till Date</h3>
//                   <p>₹{Number(customer.tillDateMoney || 0).toLocaleString("en-IN")}</p>
//                 </div>
//                 <div className="card">
//                   <h3>Account Status</h3>
//                   <p>
//                     {customer.approved
//                       ? <span className="status-approved">Approved</span>
//                       : <span className="status-pending">Pending</span>}
//                   </p>
//                 </div>
//               </div>

//               <div className="profile-grid">
//                 <ProfileField label="First Name"   name="firstname" value={form.firstname} editing={editing} onChange={handleChange} />
//                 <ProfileField label="Last Name"    name="lastname"  value={form.lastname}  editing={editing} onChange={handleChange} />
//                 <ProfileField label="Phone Number" name="phoneNo"   value={form.phoneNo}   editing={editing} onChange={handleChange} />
//                 <ProfileField label="Address"      name="address"   value={form.address}   editing={editing} onChange={handleChange} textarea />
//                 <div className="profile-field">
//                   <label className="field-label">Payment Method</label>
//                   <p className="field-value">{customer.howPaid || "—"}</p>
//                 </div>
//               </div>
//             </>
//           )}

//           {active === "photos"  && <ComingSoon title="Photos"    icon="🖼️" desc="Construction photos and progress updates will appear here." />}
//           {active === "docs"    && <ComingSoon title="Documents" icon="📄" desc="Your uploaded documents and approvals will appear here." />}
//           {active === "payment" && <ComingSoon title="Payment"   icon="💳" desc="Your payment history and installment schedule will appear here." />}
//           {active === "faq"     && <ComingSoon title="FAQ"       icon="❓" desc="Frequently asked questions will appear here." />}
//         </main>
//       </div>
//     </>
//   );
// }

// function ProfileField({ label, name, value, editing, onChange, textarea }) {
//   return (
//     <div className="profile-field">
//       <label className="field-label">{label}</label>
//       {editing ? (
//         textarea
//           ? <textarea className="field-input" name={name} value={value || ""} onChange={onChange} rows={2} />
//           : <input    className="field-input" name={name} value={value || ""} onChange={onChange} />
//       ) : (
//         <p className="field-value">{value || "—"}</p>
//       )}
//     </div>
//   );
// }

// function ComingSoon({ title, icon, desc }) {
//   return (
//     <>
//       <h1 className="admin-page-title">{title}</h1>
//       <p className="admin-page-sub">&nbsp;</p>
//       <div className="coming-soon">
//         <div className="coming-icon">{icon}</div>
//         <p className="coming-text">{desc}</p>
//         <p className="coming-sub">This section is under construction.</p>
//       </div>
//     </>
//   );
// }

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { getCustomer, updateCustomer } from "../api";
import "./theme.css";

import {
  getCustomer,
  updateCustomer,
  getCustomerPayments,
  uploadDocuments,
  getDocuments,
  deleteDocument
} from "../api";

const NAV_ITEMS = [
  { key: "profile", label: "Profile",   icon: "👤" },
  { key: "photos",  label: "Photos",    icon: "🖼️" },
  { key: "docs",    label: "Documents", icon: "📄" },
  { key: "payment", label: "Payment",   icon: "💳" },
  { key: "faq",     label: "FAQ",       icon: "❓" },
];

export default function Dashboard() {
  const navigate   = useNavigate();
  const customerId = localStorage.getItem("customerId");

  const [active,   setActive]   = useState("profile");
  const [customer, setCustomer] = useState(null);
  const [editing,  setEditing]  = useState(false);
  const [form,     setForm]     = useState({});
  const [saving,   setSaving]   = useState(false);
  const [toast,    setToast]    = useState("");

  const [payments, setPayments] = useState([]);

  // const [selectedFile, setSelectedFile] = useState(null);

  const [files, setFiles] = useState([]);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    if (!customerId) { navigate("/"); return; }
    // getCustomer(customerId)
    //   .then(({ data }) => { setCustomer(data); setForm(data); })
    //   .catch(() => navigate("/"));

    getCustomer(customerId)
      .then(({ data }) => {
        setCustomer(data);
        setForm(data);
      });

    getCustomerPayments(customerId)
      .then(({ data }) => {
        setPayments(data);
      })
      .catch(console.error);

    getDocuments(customerId)
      .then(({ data }) => {
        setDocuments(data);
      })
      .catch(console.error);

  }, [customerId, navigate]);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 3000); };
  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const saveProfile = async () => {
    setSaving(true);
    try {
      const { data } = await updateCustomer(customerId, form);
      setCustomer(data);
      setEditing(false);
      showToast("Profile updated successfully.");
    } catch {
      showToast("Failed to save. Please try again.");
    } finally { setSaving(false); }
  };

  // const handleUpload = async () => {

  //   if (!selectedFile) {
  //     alert("Select a file");
  //     return;
  //   }

  //   try {

  //     await uploadDocument(
  //       customerId,
  //       selectedFile
  //     );

  //     alert(
  //       "Document uploaded successfully"
  //     );

  //     const response =
  //       await getCustomer(customerId);

  //     setCustomer(response.data);

  //   } catch (err) {

  //     console.error(err);

  //     alert("Upload failed");

  //   }
  // };

  const handleDocumentUpload =
    async () => {

      if (files.length === 0) {
        alert("Select files");
        return;
      }

      try {

        await uploadDocuments(
          customerId,
          files
        );

        const response =
          await getDocuments(
            customerId
          );

        setDocuments(
          response.data
        );

        alert(
          "Documents uploaded"
        );

      } catch (err) {

        console.error(err);

      }
    };

  const handleDeleteDocument =
    async (documentId) => {

      try {

        await deleteDocument(
          documentId
        );

        setDocuments(prev =>
          prev.filter(
            doc =>
              doc.documentId !==
              documentId
          )
        );

      } catch (err) {

        console.error(err);

      }
    };

  const logout = () => { localStorage.clear(); navigate("/"); };

  if (!customer) {
    return (
      <div className="admin-loading">
        <div className="admin-spinner" />
        <p>Loading your dashboard…</p>
      </div>
    );
  }

  return (
    <div className="admin-root">

      {/* ── Sidebar ── */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <div className="admin-brand-square">P</div>
          <div className="admin-brand-text">
            <div className="admin-brand-name">Property Mgmt</div>
            <div className="admin-brand-sub">Customer Panel</div>
          </div>
        </div>

        <nav className="admin-nav">
          {NAV_ITEMS.map((item) => (
            <button key={item.key}
              className={`admin-nav-item ${active === item.key ? "active" : ""}`}
              onClick={() => setActive(item.key)}>
              <span className="admin-nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <button className="admin-logout" onClick={logout}>⎋ Logout</button>
      </aside>

      {/* ── Content ── */}
      <main className="admin-main">
        {toast && <div className="toast">{toast}</div>}

        {active === "profile" && (
          <>
            <div className="header-row">
              <div>
                <h1 className="admin-page-title">My Profile</h1>
                <p className="admin-page-sub">View and update your personal information.</p>
              </div>
              {!editing
                ? <button className="btn-primary" onClick={() => setEditing(true)}>Edit Profile</button>
                : <div className="btn-group">
                    <button className="btn-ghost" onClick={() => { setEditing(false); setForm(customer); }}>Cancel</button>
                    <button className="btn-primary" onClick={saveProfile} disabled={saving}>
                      {saving ? "Saving…" : "Save Changes"}
                    </button>
                  </div>}
            </div>

            <div className="cards">
              <div className="card">
                <h3>Advance Paid</h3>
                <p>₹{Number(customer.advance || 0).toLocaleString("en-IN")}</p>
              </div>
              <div className="card">
                <h3>Total Paid Till Date</h3>
                <p>₹{Number(customer.tillDateMoney || 0).toLocaleString("en-IN")}</p>
              </div>
              {/* <div className="card">
                <h3>Account Status</h3>
                <p>
                  {customer.approved
                    ? <span className="status-approved">Approved</span>
                    : <span className="status-pending">Pending</span>}
                </p>
              </div> */}
            </div>

            <div className="profile-grid">
              <ProfileField label="First Name"   name="firstname" value={form.firstname} editing={editing} onChange={handleChange} />
              <ProfileField label="Last Name"    name="lastname"  value={form.lastname}  editing={editing} onChange={handleChange} />
              <ProfileField label="Phone Number" name="phoneNo"   value={form.phoneNo}   editing={editing} onChange={handleChange} />
              <ProfileField label="Address"      name="address"   value={form.address}   editing={editing} onChange={handleChange} textarea />
              {/* <div className="profile-field">
                <label className="field-label">Payment Method</label>
                <p className="field-value">{customer.howPaid || "—"}</p>
              </div> */}
            </div>
          </>
        )}

        {active === "photos"  && <ComingSoon title="Photos"    icon="🖼️" desc="Construction photos and progress updates will appear here." />}
        {/* {active === "docs"    && <ComingSoon title="Documents" icon="📄" desc="Your uploaded documents and approvals will appear here." />} */}

        {/* {active === "docs" && (
          <>
            <h1 className="admin-page-title">
              Documents
            </h1>
            <p className="admin-page-sub">
              Upload your documents here.
            </p>
            <div className="card">
              <input
                type="file"
                onChange={(e) =>
                  setSelectedFile(
                    e.target.files[0]
                  )
                }
              />
              <button
                className="btn-primary"
                onClick={handleUpload}
              >
                Upload
              </button>
              {customer.docs && (
                <div
                  style={{
                    marginTop: "20px"
                  }}
                >
                  <strong>
                    Uploaded Document:
                  </strong>
                  <br />
                  <a
                    href={`http://localhost:8080/uploads/${customer.docs}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Document
                  </a>
                </div>
              )}
            </div>
          </>
        )} */}

        {active === "docs" && (

          <>
            <h1 className="admin-page-title">
              Documents
            </h1>

            <p className="admin-page-sub">
              Upload and manage documents.
            </p>

            <input
              type="file"
              multiple
              onChange={(e) =>
                setFiles(e.target.files)
              }
            />

            <button
              className="btn-primary"
              onClick={
                handleDocumentUpload
              }
            >
              Upload
            </button>

            <br /><br />

            {documents.map(doc => (

              <div
                key={doc.documentId}
                className="card"
                style={{
                  marginBottom: "10px"
                }}
              >

                <strong>
                  {doc.documentName}
                </strong>

                <br />

                <a
                  href={`http://localhost:8080/uploads/${doc.filePath}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Document
                </a>

                <br /><br />

                <button
                  className="btn-ghost"
                  onClick={() =>
                    handleDeleteDocument(
                      doc.documentId
                    )
                  }
                >
                  Delete
                </button>

              </div>

            ))}

          </>

        )}

        {/* {active === "payment" && <ComingSoon title="Payment"   icon="💳" desc="Your payment history and installment schedule will appear here." />} */}
        
        {active === "payment" && (
          <>
            <div className="header-row">
              <div>
                <h1 className="admin-page-title">
                  Payment History
                </h1>
                <p className="admin-page-sub">
                  All payments recorded for your account.
                </p>
              </div>
            </div>
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
                {payments.length > 0 ? (
                  payments.map(payment => (
                    <tr key={payment.paymentId}>
                      <td>
                        ₹{Number(payment.amount)
                          .toLocaleString("en-IN")}
                      </td>
                      <td>{payment.type}</td>
                      <td>{payment.way}</td>
                      <td>
                        {payment.paymentDate
                          ? new Date(
                            payment.paymentDate
                          ).toLocaleDateString()
                          : "-"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">
                      No payment records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        )}

        {active === "faq"     && <ComingSoon title="FAQ"       icon="❓" desc="Frequently asked questions will appear here." />}
      </main>
    </div>
  );
}

function ProfileField({ label, name, value, editing, onChange, textarea }) {
  return (
    <div className="profile-field">
      <label className="field-label">{label}</label>
      {editing ? (
        textarea
          ? <textarea className="field-input" name={name} value={value || ""} onChange={onChange} rows={2} />
          : <input    className="field-input" name={name} value={value || ""} onChange={onChange} />
      ) : (
        <p className="field-value">{value || "—"}</p>
      )}
    </div>
  );
}

function ComingSoon({ title, icon, desc }) {
  return (
    <>
      <h1 className="admin-page-title">{title}</h1>
      <p className="admin-page-sub">&nbsp;</p>
      <div className="coming-soon">
        <div className="coming-icon">{icon}</div>
        <p className="coming-text">{desc}</p>
        <p className="coming-sub">This section is under construction.</p>
      </div>
    </>
  );
}
