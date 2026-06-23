// // // src/pages/AdminDashboard.jsx

// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { createCustomer, searchCustomer } from "../api";
// // import "./AdminDashboard.css";

// // export default function AdminDashboard() {

// //   const navigate = useNavigate();

// //   const [activeTab, setActiveTab] = useState("dashboard");

// //   const [searchText, setSearchText] = useState("");
// //   const [customers, setCustomers] = useState([]);

// //   const [customerForm, setCustomerForm] = useState({
// //     firstname: "",
// //     lastname: "",
// //     email: "",
// //     phoneNo: "",
// //     password: "",
// //     address: ""
// //   });

// //   const logout = () => {
// //     localStorage.clear();
// //     navigate("/");
// //   };

// //   const handleCustomerChange = (e) => {
// //     setCustomerForm({
// //       ...customerForm,
// //       [e.target.name]: e.target.value
// //     });
// //   };

// //   const handleCreateCustomer = async (e) => {
// //     e.preventDefault();

// //     try {

// //       await createCustomer(customerForm);

// //       alert("Customer created successfully");

// //       setCustomerForm({
// //         firstname: "",
// //         lastname: "",
// //         email: "",
// //         phoneNo: "",
// //         password: "",
// //         address: ""
// //       });

// //     } catch (err) {

// //       console.error(err);

// //       alert(
// //         err.response?.data?.error ||
// //         "Failed to create customer"
// //       );
// //     }
// //   };

// //   const handleSearch = async (e) => {

// //     const value = e.target.value;

// //     setSearchText(value);

// //     if (!value.trim()) {
// //       setCustomers([]);
// //       return;
// //     }

// //     try {

// //       const response = await searchCustomer(value);

// //       setCustomers(response.data);

// //     } catch (err) {

// //       console.error(err);

// //     }
// //   };

// //   return (
// //     <div className="admin-container">

// //       {/* Sidebar */}
// //       <div className="admin-sidebar">

// //         <h2>Admin Panel</h2>

// //         <button onClick={() => setActiveTab("dashboard")}>
// //           Dashboard
// //         </button>

// //         <button onClick={() => setActiveTab("searchCustomer")}>
// //           Search Customer
// //         </button>

// //         <button onClick={() => setActiveTab("createCustomer")}>
// //           Create Customer
// //         </button>

// //         <button onClick={() => setActiveTab("payments")}>
// //           View Payments
// //         </button>

// //         <button onClick={() => setActiveTab("materials")}>
// //           Materials
// //         </button>

// //         <button
// //           className="logout-btn"
// //           onClick={logout}
// //         >
// //           Logout
// //         </button>

// //       </div>

// //       {/* Content */}
// //       <div className="admin-content">

// //         {/* Dashboard */}
// //         {activeTab === "dashboard" && (
// //           <>
// //             <h1>Admin Dashboard</h1>

// //             <div className="cards">

// //               <div className="card">
// //                 <h3>Total Customers</h3>
// //                 <p>0</p>
// //               </div>

// //               <div className="card">
// //                 <h3>Total Payments</h3>
// //                 <p>₹0</p>
// //               </div>

// //               <div className="card">
// //                 <h3>Materials</h3>
// //                 <p>0</p>
// //               </div>

// //             </div>
// //           </>
// //         )}

// //         {/* Search Customer */}
// //         {activeTab === "searchCustomer" && (
// //           <>
// //             <h1>Search Customer</h1>

// //             <input
// //               type="text"
// //               placeholder="Search by first name or last name..."
// //               className="search-box"
// //               value={searchText}
// //               onChange={handleSearch}
// //             />

// //             {searchText && customers.length > 0 && (
// //               <div className="suggestions">

// //                 {customers.map(customer => (

// //                   <div
// //                     key={customer.customerId}
// //                     className="suggestion-item"
// //                   >
// //                     {customer.firstname} {customer.lastname}
// //                   </div>

// //                 ))}

// //               </div>
// //             )}

// //             {customers.length > 0 && (
// //               <table>

// //                 <thead>
// //                   <tr>
// //                     <th>ID</th>
// //                     <th>Name</th>
// //                     <th>Phone</th>
// //                     <th>Status</th>
// //                   </tr>
// //                 </thead>

// //                 <tbody>

// //                   {customers.map(customer => (

// //                     <tr key={customer.customerId}>

// //                       <td>{customer.customerId}</td>

// //                       <td>
// //                         {customer.firstname} {customer.lastname}
// //                       </td>

// //                       <td>{customer.phoneNo}</td>

// //                       <td>
// //                         {customer.approved
// //                           ? "Approved"
// //                           : "Pending"}
// //                       </td>

// //                     </tr>

// //                   ))}

// //                 </tbody>

// //               </table>
// //             )}
// //           </>
// //         )}

// //         {/* Create Customer */}
// //         {activeTab === "createCustomer" && (
// //           <>
// //             <h1>Create Customer</h1>

// //             <form
// //               className="customer-form"
// //               onSubmit={handleCreateCustomer}
// //             >

// //               <input
// //                 type="text"
// //                 name="firstname"
// //                 placeholder="First Name"
// //                 value={customerForm.firstname}
// //                 onChange={handleCustomerChange}
// //                 required
// //               />

// //               <input
// //                 type="text"
// //                 name="lastname"
// //                 placeholder="Last Name"
// //                 value={customerForm.lastname}
// //                 onChange={handleCustomerChange}
// //               />

// //               <input
// //                 type="email"
// //                 name="email"
// //                 placeholder="Email"
// //                 value={customerForm.email}
// //                 onChange={handleCustomerChange}
// //                 required
// //               />

// //               <input
// //                 type="text"
// //                 name="phoneNo"
// //                 placeholder="Phone Number"
// //                 value={customerForm.phoneNo}
// //                 onChange={handleCustomerChange}
// //               />

// //               <input
// //                 type="password"
// //                 name="password"
// //                 placeholder="Password"
// //                 value={customerForm.password}
// //                 onChange={handleCustomerChange}
// //                 required
// //               />

// //               <textarea
// //                 name="address"
// //                 placeholder="Address"
// //                 value={customerForm.address}
// //                 onChange={handleCustomerChange}
// //               />

// //               <button type="submit">
// //                 Create Customer
// //               </button>

// //             </form>
// //           </>
// //         )}

// //         {/* Payments */}
// //         {activeTab === "payments" && (
// //           <>
// //             <h1>Payments</h1>

// //             <table>

// //               <thead>
// //                 <tr>
// //                   <th>Customer</th>
// //                   <th>Amount</th>
// //                   <th>Payment Type</th>
// //                   <th>Date</th>
// //                 </tr>
// //               </thead>

// //               <tbody>
// //                 <tr>
// //                   <td>No payment records yet</td>
// //                   <td>-</td>
// //                   <td>-</td>
// //                   <td>-</td>
// //                 </tr>
// //               </tbody>

// //             </table>
// //           </>
// //         )}

// //         {/* Materials */}
// //         {activeTab === "materials" && (
// //           <>
// //             <h1>Materials</h1>

// //             <table>

// //               <thead>
// //                 <tr>
// //                   <th>Material</th>
// //                   <th>Unit</th>
// //                 </tr>
// //               </thead>

// //               <tbody>

// //                 <tr>
// //                   <td>Cement</td>
// //                   <td>Bags</td>
// //                 </tr>

// //                 <tr>
// //                   <td>Iron</td>
// //                   <td>Kg</td>
// //                 </tr>

// //               </tbody>

// //             </table>
// //           </>
// //         )}

// //       </div>

// //     </div>
// //   );
// // }

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCustomer, searchCustomer, deactivateCustomer, getInactiveCustomers, activateCustomer } from "../api";
import "./theme.css";

import { getPayments } from "../api";
import { useEffect } from "react";

import { getDashboardStats } from "../api";


const NAV = [
  { key: "dashboard",      label: "Dashboard",       icon: "📊" },
  { key: "searchCustomer", label: "Search Customer", icon: "🔍" },
  { key: "createCustomer", label: "Create Customer", icon: "➕" },
  { key: "payments",       label: "View Payments",   icon: "💳" },
  { key: "materials",      label: "Materials",       icon: "🧱" },
  { key: "deleteCustomer", label: "Delete Customer", icon: "🗑️"},
  { key: "activateCustomer", label: "Activate Customer", icon: "♻️"}
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchText, setSearchText] = useState("");
  const [customers, setCustomers] = useState([]);

  const [deleteSearch, setDeleteSearch] =
    useState("");

  const [deleteResults, setDeleteResults] =
    useState([]);
  
  const [stats, setStats] = useState({totalCustomers: 0, totalPayments: 0, projectsRunning: 0});

  const [inactiveCustomers, setInactiveCustomers] = useState([]);

  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [customerForm, setCustomerForm] = useState({
    firstname: "", lastname: "", email: "",
    phoneNo: "", password: "", address: ""
  });

  const logout = () => { localStorage.clear(); navigate("/"); };

  const [payments, setPayments] = useState([]);

  const handleCustomerChange = (e) =>
    setCustomerForm({ ...customerForm, [e.target.name]: e.target.value });

  const handleCreateCustomer = async (e) => {
    e.preventDefault();
    try {
      await createCustomer(customerForm);
      alert("Customer created successfully");
      setCustomerForm({ firstname: "", lastname: "", email: "", phoneNo: "", password: "", address: "" });
    } catch (err) {
      alert(err.response?.data?.error || "Failed to create customer");
    }
  };

  const searchDeleteCustomer = async () => {
    if (!deleteSearch.trim()) return;
    const res =
      await searchCustomer(deleteSearch);
    setDeleteResults(res.data);
  };

  const deleteCustomer = async (
    customerId
  ) => {

    if (
      !window.confirm(
        "Deactivate this customer?"
      )
    ) {
      return;
    }

    await deactivateCustomer(
      customerId
    );

    alert(
      "Customer deactivated successfully"
    );

    setDeleteResults(
      deleteResults.filter(
        c =>
          c.customerId !== customerId
      )
    );
  };

  const loadInactiveCustomers = async () => {
    try {
      const response =
        await getInactiveCustomers();
      setInactiveCustomers(
        response.data
      );
    } catch (err) {
      console.error(err);
    }
  };

  const activateSelectedCustomer = async (
    customerId
  ) => {
    await activateCustomer(customerId);
    alert("Customer activated");
    loadInactiveCustomers();
  };

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchText(value);
    // setSelectedCustomer(null);
    if (!value.trim()) { setCustomers([]); return; }
    try {
      const response = await searchCustomer(value);
      setCustomers(response.data);
    } catch (err) { /* silent */ }
  };

  useEffect(() => {

    loadPayments();

    getDashboardStats()
      .then(res => {
        setStats(res.data);
      })
      .catch(console.error);

  }, []);

  useEffect(() => {
    if (
      activeTab === "activateCustomer"
    ) {
      loadInactiveCustomers();
    }
  }, [activeTab]);

  const loadPayments = async () => {

    try {

      const response =
        await getPayments();

      setPayments(response.data);

    } catch (err) {

      console.error(err);

    }
  };

  return (
    <div className="admin-root">

      {/* ── Sidebar ── */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <div className="admin-brand-square">P</div>
          <div className="admin-brand-text">
            <div className="admin-brand-name">Property Mgmt</div>
            <div className="admin-brand-sub">Admin Panel</div>
          </div>
        </div>

        <nav className="admin-nav">
          {NAV.map((item) => (
            <button key={item.key}
              className={`admin-nav-item ${activeTab === item.key ? "active" : ""}`}
              onClick={() => setActiveTab(item.key)}>
              <span className="admin-nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <button className="admin-logout" onClick={logout}>⎋ Logout</button>
      </aside>

      {/* ── Content ── */}
      <main className="admin-main">

        {activeTab === "dashboard" && (
          <>
            <div className="header-row">
              <div>
                <h1 className="admin-page-title">Admin Dashboard</h1>
                <p className="admin-page-sub">Overview of customers, payments, and materials.</p>
              </div>
            </div>

            {/* <div className="cards">
              <div className="card"><h3>Total Customers</h3><p>0</p></div>
              <div className="card"><h3>Total Payments</h3><p>₹0</p></div>
              <div className="card"><h3>Materials</h3><p>0</p></div>
            </div> */}
            <div className="cards">

              <div className="card">
                <h3>Total Customers</h3>
                <p>{stats.totalCustomers}</p>
              </div>

              <div className="card">
                <h3>Total Payments</h3>
                <p>
                  ₹{Number(
                    stats.totalPayments
                  ).toLocaleString("en-IN")}
                </p>
              </div>

              <div className="card">
                <h3>Projects Running</h3>
                <p>{stats.projectsRunning}</p>
              </div>

            </div>
          </>
        )}

        {activeTab === "searchCustomer" && (
          <>
            <div className="header-row">
              <div>
                <h1 className="admin-page-title">Search Customer</h1>
                <p className="admin-page-sub">Find a customer by first or last name.</p>
              </div>
            </div>

            <input
              type="text"
              placeholder="Search by first name or last name…"
              className="search-box"
              value={searchText}
              onChange={handleSearch}
            />

            {searchText && customers.length > 0 && (
              <div className="suggestions">
                {customers.map((customer) => (
                  // <div key={customer.customerId} className="suggestion-item">
                  //   {customer.firstname} {customer.lastname}
                  // </div>

                  <div
                    key={customer.customerId}
                    className="suggestion-item"
                    onClick={() =>
                      navigate(
                        `/admin/customer/${customer.customerId}`
                      )
                    }
                  >
                    {customer.firstname}
                    {" "}
                    {customer.lastname}
                  </div>
                  
                  // <div
                  //   key={customer.customerId}
                  //   className="suggestion-item"
                  //   onClick={() => {
                  //     setSelectedCustomer(customer);
                  //     setSearchText(
                  //       `${customer.firstname} ${customer.lastname}`
                  //     );
                  //     setCustomers([]);
                  //   }}
                  // >
                  //   {customer.firstname} {customer.lastname}
                  // </div>

                ))}
              </div>
            )}

            {customers.length > 0 ? (
              <table>
                <thead>
                  <tr><th>ID</th><th>Name</th><th>Phone</th><th>Role</th></tr>
                </thead>

                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.customerId}>
                      <td>#{customer.customerId}</td>
                      {/* <td>{customer.firstname} {customer.lastname}</td> */}

                      <td>
                        <span
                          style={{
                            color: "#2563eb",
                            cursor: "pointer",
                            textDecoration: "underline"
                          }}
                          onClick={() =>
                            navigate(`/customer/${customer.customerId}`)
                          }
                        >
                          {customer.firstname} {customer.lastname}
                        </span>
                      </td>

                      <td>{customer.phoneNo || "—"}</td>
                      {/* <td>
                        {customer.approved
                          ? <span className="status-approved">Approved</span>
                          : <span className="status-pending">Pending</span>}
                      </td> */}
                      <td>Customer</td>
                    </tr>
                  ))}
                </tbody>

                {/* <tbody>

                  {selectedCustomer && (
                    <tr>
                      <td>{selectedCustomer.customerId}</td>
                      <td>
                        {selectedCustomer.firstname}
                        {" "}
                        {selectedCustomer.lastname}
                      </td>
                      <td>{selectedCustomer.phoneNo}</td>
                      <td>
                        {selectedCustomer.approved
                          ? "Approved"
                          : "Pending"}
                      </td>
                    </tr>
                  )}
                </tbody> */}
                
              </table>
            ) : searchText ? (
              <div className="empty-state">
                <div className="empty-icon">🔍</div>
                <p className="empty-text">No customers found</p>
                <p className="empty-sub">Try a different name.</p>
              </div>
            ) : null}
          </>
        )}

        {activeTab === "createCustomer" && (
          <>
            <div className="header-row">
              <div>
                <h1 className="admin-page-title">Create Customer</h1>
                <p className="admin-page-sub">Add a new customer record to the system.</p>
              </div>
              <button type="submit" form="create-customer-form" className="btn-primary">
                Create Customer
              </button>
            </div>

            <form id="create-customer-form" className="customer-form" onSubmit={handleCreateCustomer}>
              <input type="text" name="firstname" placeholder="First Name"
                value={customerForm.firstname} onChange={handleCustomerChange} required />
              <input type="text" name="lastname" placeholder="Last Name"
                value={customerForm.lastname} onChange={handleCustomerChange} />
              <input type="email" name="email" placeholder="Email"
                value={customerForm.email} onChange={handleCustomerChange} required />
              <input type="text" name="phoneNo" placeholder="Phone Number"
                value={customerForm.phoneNo} onChange={handleCustomerChange} />
              <input type="password" name="password" placeholder="Password"
                value={customerForm.password} onChange={handleCustomerChange} required />
              <textarea name="address" placeholder="Address" rows={3}
                value={customerForm.address} onChange={handleCustomerChange} />
            </form>
          </>
        )}

        {activeTab === "payments" && (
          <>
            <div className="header-row">
              <div>
                <h1 className="admin-page-title">
                  Payments
                </h1>

                <p className="admin-page-sub">
                  All recorded customer payments.
                </p>
              </div>
            </div>

            {payments.length > 0 ? (

              <table>

                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Type</th>
                    <th>Way</th>
                    <th>Date</th>
                  </tr>
                </thead>

                <tbody>
                  {payments.map(payment => (
                    <tr key={payment.paymentId}>
                      <td>
                        {payment.customer?.firstname}
                        {" "}
                        {payment.customer?.lastname}
                      </td>
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
                        {payment.paymentDate
                          ? new Date(payment.paymentDate)
                            .toLocaleDateString()
                          : "-"
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">
                  💳
                </div>
                <p className="empty-text">
                  No payment records yet
                </p>
                <p className="empty-sub">
                  Payments will appear here once recorded.
                </p>
              </div>
            )}
          </>
        )}

        {activeTab === "materials" && (
          <>
            <div className="header-row">
              <div>
                <h1 className="admin-page-title">Materials</h1>
                <p className="admin-page-sub">Units of measure used across construction materials.</p>
              </div>
            </div>

            <table>
              <thead><tr><th>Material</th><th>Unit</th></tr></thead>
              <tbody>
                <tr><td>Cement</td><td>Bags</td></tr>
                <tr><td>Iron</td><td>Kg</td></tr>
              </tbody>
            </table>
          </>
        )}

        {activeTab === "deleteCustomer" && (
          <>
            <div className="header-row">
              <div>
                <h1 className="admin-page-title">
                  Delete Customer
                </h1>

                <p className="admin-page-sub">
                  Search and deactivate customers.
                </p>
              </div>
            </div>

            <input
              type="text"
              placeholder="Search customer..."
              className="search-box"
              value={deleteSearch}
              onChange={(e) =>
                setDeleteSearch(e.target.value)
              }
            />

            <button
              className="btn-primary"
              onClick={searchDeleteCustomer}
              style={{ marginTop: "10px" }}
            >
              Search
            </button>

            {deleteResults.length > 0 && (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {deleteResults.map(customer => (
                    <tr key={customer.customerId}>
                      <td>
                        {customer.customerId}
                      </td>

                      <td>
                        {customer.firstname}
                        {" "}
                        {customer.lastname}
                      </td>

                      <td>
                        {customer.phoneNo}
                      </td>

                      <td>
                        {customer.status}
                      </td>

                      <td>
                        <button
                          className="btn-danger"
                          onClick={() =>
                            deleteCustomer(
                              customer.customerId
                            )
                          }
                        >
                          Deactivate
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}

        {activeTab === "activateCustomer" && (
          <>
            <div className="header-row">
              <div>
                <h1 className="admin-page-title">
                  Activate Customer
                </h1>
                <p className="admin-page-sub">
                  View and restore inactive customers.
                </p>
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {inactiveCustomers.map(customer => (
                  <tr key={customer.customerId}>
                    <td>
                      {customer.customerId}
                    </td>
                    <td>
                      {customer.firstname}
                      {" "}
                      {customer.lastname}
                    </td>
                    <td>
                      {customer.phoneNo}
                    </td>
                    <td>
                      <button
                        className="btn-primary"
                        onClick={() =>
                          activateSelectedCustomer(
                            customer.customerId
                          )
                        }
                      >
                        Activate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

      </main>
    </div>
  );
}
