// import React from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import AuthPage from "./pages/AuthPage";
// import Dashboard from "./pages/Dashboard";

// function PrivateRoute({ children }) {
//   return localStorage.getItem("token") ? children : <Navigate to="/" replace />;
// }

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/"          element={<AuthPage />} />
//         <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
//         <Route path="*"          element={<Navigate to="/" replace />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CustomerDetails from "./pages/CustomerDetails";

function PrivateRoute({ children }) {
  return localStorage.getItem("token") ? children : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"          element={<AuthPage />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="*"          element={<Navigate to="/" replace />} />
        <Route path="/admin"     element={<AdminDashboard />} />
        {/* <Route path="/admin/customer/:id"   element={<CustomerDetails />}/> */}
        <Route path="/customer/:id"  element={<CustomerDetails />}/>
      </Routes>
    </BrowserRouter>
  );
}
