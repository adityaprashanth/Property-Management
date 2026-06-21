// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { login, signup } from "../api";
// // import "./Auth.css";

// // export default function AuthPage() {
// //   const [mode, setMode]       = useState("login");   // "login" | "signup"
// //   const [form, setForm]       = useState({});
// //   const [error, setError]     = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const navigate              = useNavigate();

// //   const handle = (e) =>
// //     setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

// //   const validatePassword = (pw) => {
// //     if (pw.length < 8)              return "Password must be at least 8 characters.";
// //     if (!/[A-Z]/.test(pw))         return "Password must include an uppercase letter.";
// //     if (!/[0-9]/.test(pw))         return "Password must include a number.";
// //     if (!/[^A-Za-z0-9]/.test(pw)) return "Password must include a special character.";
// //     return null;
// //   };
  
// //   const submit = async (e) => {
// //   e.preventDefault();
// //   setError("");

// //   if (mode === "signup") {
// //     const pwErr = validatePassword(form.password || "");
// //     if (pwErr) { setError(pwErr); return; }
// //     if (form.password !== form.confirmPassword) {
// //       setError("Passwords do not match."); return;
// //     }
// //   }

// //   setLoading(true);
// //   try {
// //     const fn = mode === "login" ? login : signup;
// //     const { data } = await fn(form);

// //     console.log("Response received:", data); // debug line

// //     if (!data.token) {
// //       setError("Login failed — no token received.");
// //       return;
// //     }

// //     localStorage.setItem("token",      data.token);
// //     localStorage.setItem("customerId", data.customerId);
// //     localStorage.setItem("firstname",  data.firstname);
// //     localStorage.setItem("role",       data.role);

// //     console.log("Navigating to dashboard..."); // debug line
// //     // navigate("/dashboard");
// //     if (data.role === "ADMIN") {
// //       navigate("/admin");
// //     } else {
// //       navigate("/dashboard");
// //     }

// //   } catch (err) {
// //     console.error("Full error:", err);
// //     setError(err.response?.data?.error || "Something went wrong.");
// //   } finally {
// //     setLoading(false);
// //   }
// // };

// //   return (
// //     <div className="auth-root">
// //       {/* Left panel – brand */}
// //       <div className="auth-brand">
// //         <div className="brand-inner">
// //           <div className="brand-icon">⬡</div>
// //           <h1 className="brand-name">PropMS</h1>
// //           <p className="brand-tagline">Your property journey,<br />managed end to end.</p>
// //           <ul className="brand-features">
// //             <li>Track construction stages</li>
// //             <li>Manage payments & docs</li>
// //             <li>Stay updated with photos</li>
// //           </ul>
// //         </div>
// //       </div>

// //       {/* Right panel – form */}
// //       <div className="auth-form-panel">
// //         <div className="auth-card">
// //           <div className="auth-tabs">
// //             <button
// //               className={`auth-tab ${mode === "login" ? "active" : ""}`}
// //               onClick={() => { setMode("login"); setError(""); }}
// //             >
// //               Log in
// //             </button>
// //             <button
// //               className={`auth-tab ${mode === "signup" ? "active" : ""}`}
// //               onClick={() => { setMode("signup"); setError(""); }}
// //             >
// //               Sign up
// //             </button>
// //           </div>

// //           <form onSubmit={submit} className="auth-form">
// //             {mode === "signup" && (
// //               <>
// //                 <div className="form-row">
// //                   <div className="form-group">
// //                     <label>First name</label>
// //                     <input name="firstname" required onChange={handle} placeholder="Ravi" />
// //                   </div>
// //                   <div className="form-group">
// //                     <label>Last name</label>
// //                     <input name="lastname" onChange={handle} placeholder="Kumar" />
// //                   </div>
// //                 </div>
// //                 <div className="form-group">
// //                   <label>Phone number</label>
// //                   <input name="phoneNo" onChange={handle} placeholder="9876543210" maxLength={15} />
// //                 </div>
// //                 <div className="form-group">
// //                   <label>Address</label>
// //                   <textarea name="address" onChange={handle} placeholder="123 MG Road, Bengaluru" rows={2} />
// //                 </div>
// //               </>
// //             )}

// //             <div className="form-group">
// //               <label>Email</label>
// //               <input name="email" type="email" required onChange={handle} placeholder="you@email.com" />
// //             </div>

// //             <div className="form-group">
// //               <label>Password</label>
// //               <input name="password" type="password" required onChange={handle} placeholder="Min 8 chars, 1 uppercase, 1 number, 1 symbol" />
// //             </div>

// //             {mode === "signup" && (
// //               <div className="form-group">
// //                 <label>Confirm password</label>
// //                 <input name="confirmPassword" type="password" required onChange={handle} placeholder="Re-enter password" />
// //               </div>
// //             )}

// //             {error && <p className="auth-error">{error}</p>}

// //             <button type="submit" className="auth-submit" disabled={loading}>
// //               {loading ? "Please wait…" : mode === "login" ? "Log in" : "Create account"}
// //             </button>
// //           </form>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, signup } from "../api";
import "./theme.css";

export default function AuthPage() {
  const [mode, setMode]       = useState("login");   // "login" | "signup"
  const [form, setForm]       = useState({});
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);
  const navigate              = useNavigate();

  const handle = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const validatePassword = (pw) => {
    if (pw.length < 8)              return "Password must be at least 8 characters.";
    if (!/[A-Z]/.test(pw))         return "Password must include an uppercase letter.";
    if (!/[0-9]/.test(pw))         return "Password must include a number.";
    if (!/[^A-Za-z0-9]/.test(pw)) return "Password must include a special character.";
    return null;
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (mode === "signup") {
      const pwErr = validatePassword(form.password || "");
      if (pwErr) { setError(pwErr); return; }
      if (form.password !== form.confirmPassword) {
        setError("Passwords do not match."); return;
      }
    }

    setLoading(true);
    try {
      const fn = mode === "login" ? login : signup;
      const { data } = await fn(form);

      if (!data.token) {
        setError("Login failed — no token received.");
        return;
      }

      localStorage.setItem("token",      data.token);
      localStorage.setItem("customerId", data.customerId);
      localStorage.setItem("firstname",  data.firstname);
      localStorage.setItem("role",       data.role);

      if (data.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

    // } catch (err) {
    //   setError(err.response?.data?.error || "Something went wrong.");
    } catch (err) {
      console.log(err);
      console.log(err.response);
      console.log(err.response?.data);

      alert(
        JSON.stringify(
          err.response?.data || err.message
        )
      );
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-root">
      {/* Left panel – brand */}
      <div className="auth-brand">
        <div className="brand-inner">
          {/* <div className="brand-logo">
            <div className="brand-logo-square">P</div>
            <div className="brand-logo-text">
              <div className="brand-logo-name">Property Management</div>
              <div className="brand-logo-sub">System</div>
            </div>
          </div> */}
          <h1 className="brand-name">Property Management</h1>
          <p className="brand-tagline">Your property journey,<br />managed end to end.</p>
          <ul className="brand-features">
            <li>Track construction stages</li>
            <li>Manage payments &amp; docs</li>
            <li>Stay updated with photos</li>
          </ul>
        </div>
      </div>

      {/* Right panel – form */}
      <div className="auth-form-panel">
        
        <div className="auth-card">
          <div className="auth-tabs">
            <button
              className={`auth-tab ${mode === "login" ? "active" : ""}`}
              onClick={() => { setMode("login"); setError(""); }}
            >
              Log in
            </button>
            <button
              className={`auth-tab ${mode === "signup" ? "active" : ""}`}
              onClick={() => { setMode("signup"); setError(""); }}
            >
              Sign up
            </button>
          </div>

          <form onSubmit={submit} className="auth-form">
            {mode === "signup" && (
              <>
                <div className="form-row">
                  <div className="form-group">
                    <label>First name</label>
                    <input name="firstname" required onChange={handle} placeholder="Ravi" />
                  </div>
                  <div className="form-group">
                    <label>Last name</label>
                    <input name="lastname" onChange={handle} placeholder="Kumar" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Phone number</label>
                  <input name="phoneNo" onChange={handle} placeholder="9876543210" maxLength={15} />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <textarea name="address" onChange={handle} placeholder="123 MG Road, Bengaluru" rows={2} />
                </div>
              </>
            )}

            <div className="form-group">
              <label>Email</label>
              <input name="email" type="email" required onChange={handle} placeholder="you@email.com" />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input name="password" type="password" required onChange={handle} placeholder="Min 8 chars, 1 uppercase, 1 number, 1 symbol" />
            </div>

            {mode === "signup" && (
              <div className="form-group">
                <label>Confirm password</label>
                <input name="confirmPassword" type="password" required onChange={handle} placeholder="Re-enter password" />
              </div>
            )}

            {error && <p className="auth-error">{error}</p>}

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? "Please wait…" : mode === "login" ? "Log in" : "Create account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
