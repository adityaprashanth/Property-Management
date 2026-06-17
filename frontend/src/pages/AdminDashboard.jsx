// src/pages/AdminDashboard.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

export default function AdminDashboard() {

  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("dashboard");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="admin-container">

      {/* Sidebar */}
      <div className="admin-sidebar">

        <h2>Admin Panel</h2>

        <button onClick={() => setActiveTab("dashboard")}>
          Dashboard
        </button>

        <button onClick={() => setActiveTab("searchCustomer")}>
          Search Customer
        </button>

        <button onClick={() => setActiveTab("createCustomer")}>
          Create Customer
        </button>

        <button onClick={() => setActiveTab("payments")}>
          View Payments
        </button>

        <button onClick={() => setActiveTab("materials")}>
          Materials
        </button>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>

      </div>

      {/* Main Content */}
      <div className="admin-content">

        {activeTab === "dashboard" && (
          <>
            <h1>Admin Dashboard</h1>

            <div className="cards">

              <div className="card">
                <h3>Total Customers</h3>
                <p>0</p>
              </div>

              <div className="card">
                <h3>Total Payments</h3>
                <p>₹0</p>
              </div>

              <div className="card">
                <h3>Materials</h3>
                <p>0</p>
              </div>

            </div>
          </>
        )}

        {activeTab === "searchCustomer" && (
          <>
            <h1>Search Customer</h1>

            <input
              type="text"
              placeholder="Enter customer name..."
              className="search-box"
            />

            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>1</td>
                  <td>Ravi Kumar</td>
                  <td>9876543210</td>
                  <td>Approved</td>
                </tr>
              </tbody>
            </table>
          </>
        )}

        {activeTab === "createCustomer" && (
          <>
            <h1>Create Customer</h1>

            <form className="customer-form">

              <input
                type="text"
                placeholder="First Name"
              />

              <input
                type="text"
                placeholder="Last Name"
              />

              <input
                type="email"
                placeholder="Email"
              />

              <input
                type="text"
                placeholder="Phone"
              />

              <input
                type="password"
                placeholder="Password"
              />

              <textarea
                placeholder="Address"
              />

              <button type="submit">
                Create Customer
              </button>

            </form>
          </>
        )}

        {activeTab === "payments" && (
          <>
            <h1>Payments</h1>

            <table>
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Type</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Ravi Kumar</td>
                  <td>₹50,000</td>
                  <td>Advance</td>
                  <td>16-06-2026</td>
                </tr>
              </tbody>
            </table>
          </>
        )}

        {activeTab === "materials" && (
          <>
            <h1>Materials</h1>

            <table>
              <thead>
                <tr>
                  <th>Material</th>
                  <th>Unit</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Cement</td>
                  <td>Bags</td>
                </tr>

                <tr>
                  <td>Iron</td>
                  <td>Tons/Kg</td>
                </tr>
              </tbody>
            </table>
          </>
        )}

      </div>

    </div>
  );
}
