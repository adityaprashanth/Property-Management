import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCustomer, updateCustomer } from "../api";
import "./Dashboard.css";

const NAV_ITEMS = [
  { key: "profile",  label: "Profile",  icon: "👤" },
  { key: "photos",   label: "Photos",   icon: "🖼️" },
  { key: "docs",     label: "Documents",icon: "📄" },
  { key: "payment",  label: "Payment",  icon: "💳" },
  { key: "faq",      label: "FAQ",      icon: "❓" },
];

export default function Dashboard() {
  const navigate   = useNavigate();
  const customerId = localStorage.getItem("customerId");
  const firstname  = localStorage.getItem("firstname");

  const [active,   setActive]   = useState("profile");
  const [customer, setCustomer] = useState(null);
  const [editing,  setEditing]  = useState(false);
  const [form,     setForm]     = useState({});
  const [saving,   setSaving]   = useState(false);
  const [toast,    setToast]    = useState("");

  useEffect(() => {
    if (!customerId) { navigate("/"); return; }
    getCustomer(customerId)
      .then(({ data }) => { setCustomer(data); setForm(data); })
      .catch(() => navigate("/"));
  }, [customerId, navigate]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const saveProfile = async () => {
    setSaving(true);
    try {
      const { data } = await updateCustomer(customerId, form);
      setCustomer(data);
      setEditing(false);
      showToast("Profile updated successfully.");
    } catch {
      showToast("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (!customer) {
    return (
      <div className="dash-loading">
        <div className="dash-spinner" />
        <p>Loading your dashboard…</p>
      </div>
    );
  }

  const initials = `${customer.firstname?.[0] || ""}${customer.lastname?.[0] || ""}`.toUpperCase();

  return (
    <div className="dash-root">
      {/* ── Sidebar ─────────────────────────── */}
      <aside className="dash-sidebar">
        {/* Brand */}
        <div className="sidebar-brand">
          <span className="sidebar-brand-icon">⬡</span>
          <span className="sidebar-brand-name">PropMS</span>
        </div>

        {/* Avatar + name */}
        <div className="sidebar-profile-mini">
          <div className="avatar-circle">{initials}</div>
          <div>
            <p className="sidebar-hello">Hello,</p>
            <p className="sidebar-name">{customer.firstname} {customer.lastname}</p>
            {customer.approved
              ? <span className="badge-approved">✓ Approved</span>
              : <span className="badge-pending">⏳ Pending</span>
            }
          </div>
        </div>

        {/* Nav */}
        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              className={`nav-item ${active === item.key ? "active" : ""}`}
              onClick={() => setActive(item.key)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>

        <button className="sidebar-logout" onClick={logout}>
          ⎋ Log out
        </button>
      </aside>

      {/* ── Main content ────────────────────── */}
      <main className="dash-main">
        {/* Toast */}
        {toast && <div className="toast">{toast}</div>}

        {/* Profile section */}
        {active === "profile" && (
          <section className="content-section">
            <div className="section-header">
              <div>
                <h2 className="section-title">My Profile</h2>
                <p className="section-sub">View and update your personal information.</p>
              </div>
              {!editing
                ? <button className="btn-primary" onClick={() => setEditing(true)}>Edit Profile</button>
                : <div className="btn-group">
                    <button className="btn-ghost" onClick={() => { setEditing(false); setForm(customer); }}>Cancel</button>
                    <button className="btn-primary" onClick={saveProfile} disabled={saving}>
                      {saving ? "Saving…" : "Save Changes"}
                    </button>
                  </div>
              }
            </div>

            <div className="profile-grid">
              <ProfileField label="First Name"   name="firstname"  value={form.firstname}  editing={editing} onChange={handleChange} />
              <ProfileField label="Last Name"    name="lastname"   value={form.lastname}   editing={editing} onChange={handleChange} />
              <ProfileField label="Phone Number" name="phoneNo"    value={form.phoneNo}    editing={editing} onChange={handleChange} />
              <ProfileField label="Address"      name="address"    value={form.address}    editing={editing} onChange={handleChange} textarea />

              {/* Read-only financial info */}
              <div className="profile-field">
                <label className="field-label">Advance Paid</label>
                <p className="field-value money">₹ {Number(customer.advance || 0).toLocaleString("en-IN")}</p>
              </div>
              <div className="profile-field">
                <label className="field-label">Total Paid Till Date</label>
                <p className="field-value money">₹ {Number(customer.tillDateMoney || 0).toLocaleString("en-IN")}</p>
              </div>
              <div className="profile-field">
                <label className="field-label">Payment Method</label>
                <p className="field-value">{customer.howPaid || "—"}</p>
              </div>
              <div className="profile-field">
                <label className="field-label">Account Status</label>
                <p className="field-value">
                  {customer.approved
                    ? <span className="badge-approved">Approved</span>
                    : <span className="badge-pending">Pending Approval</span>}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Placeholder sections */}
        {active === "photos" && <ComingSoon title="Photos" icon="🖼️" desc="Construction photos and progress updates will appear here." />}
        {active === "docs"   && <ComingSoon title="Documents" icon="📄" desc="Your uploaded documents and approvals will appear here." />}
        {active === "payment"&& <ComingSoon title="Payment" icon="💳" desc="Your payment history and installment schedule will appear here." />}
        {active === "faq"   && <ComingSoon title="FAQ" icon="❓" desc="Frequently asked questions will appear here." />}
      </main>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────

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
    <section className="content-section">
      <h2 className="section-title">{title}</h2>
      <div className="coming-soon">
        <div className="coming-icon">{icon}</div>
        <p className="coming-text">{desc}</p>
        <p className="coming-sub">This section is under construction.</p>
      </div>
    </section>
  );
}
