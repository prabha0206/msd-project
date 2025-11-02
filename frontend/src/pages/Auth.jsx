import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from '../config/api';

const Auth = () => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Validate form data
  const validateForm = () => {
    if (isRegister && !formData.name.trim()) {
      setError("Name is required");
      return false;
    }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }
    if (!/[A-Z]/.test(formData.password)) {
      setError("Password must contain at least one uppercase letter");
      return false;
    }
    if (!/[a-z]/.test(formData.password)) {
      setError("Password must contain at least one lowercase letter");
      return false;
    }
    if (!/[0-9]/.test(formData.password)) {
      setError("Password must contain at least one number");
      return false;
    }
    return true;
  };

  // handle form input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const url = isRegister
        ? `${API_BASE_URL}/auth/register`
        : `${API_BASE_URL}/auth/login`;

      const res = await axios.post(url, formData);
      const data = res.data;
      setSuccess(data.message || (isRegister ? 'Registered successfully' : 'Logged in successfully'));

      // Store auth data in localStorage
      const authInfo = {
        user: data.user || {
          _id: data._id,
          name: data.name,
          email: data.email,
          role: data.role
        },
        tokens: data.tokens || {
          accessToken: data.accessToken,
          refreshToken: data.refreshToken
        }
      };
      
      localStorage.setItem("userInfo", JSON.stringify(authInfo));

      // Dispatch login event for other components
      window.dispatchEvent(new Event('userLogin'));

      // Redirect based on role
      setTimeout(() => {
        if (authInfo.user.role === 'admin') {
          navigate('/admin');
        } else if (authInfo.user.role === 'coach') {
          navigate('/coach');
        } else {
          navigate('/');
        }
      }, 1500); // Short delay to show success message

    } catch (err) {
      // Log server response body for easier debugging in dev
      console.error('Request error:', err.response?.data || err.message || err);
      if (err.response?.status === 429) {
        setError(err.response.data.message || "Too many attempts. Please try again later.");
      } else if (err.response?.status === 400) {
        // prefer server-provided message for 400 responses
        setError(err.response.data.message || "Bad request. Please check your input.");
      } else {
        setError(err.response?.data?.message || "Network error. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formBox}>
        <h2>{isRegister ? "Register" : "Login"}</h2>
  {error && <div style={styles.error}>{error}</div>}
  {success && <div style={{...styles.error, backgroundColor: '#e6ffed', color: '#006600'}}>{success}</div>}
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <input
              style={styles.input}
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}
          <input
            style={styles.input}
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            style={styles.input}
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button style={styles.button} type="submit" disabled={loading}>
            {loading ? "Please wait..." : (isRegister ? "Register" : "Login")}
          </button>
        </form>
        <p style={{ marginTop: "10px" }}>
          {isRegister ? (
            <>
              Already have an account?{" "}
              <button
                style={styles.switch}
                onClick={() => setIsRegister(false)}
              >
                Login
              </button>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <button
                style={styles.switch}
                onClick={() => setIsRegister(true)}
              >
                Register
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh",
  },
  formBox: {
    width: "350px",
    background: "#edf2f4",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.2)",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#2b2d42",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  switch: {
    border: "none",
    background: "none",
    color: "#2b2d42",
    textDecoration: "underline",
    cursor: "pointer",
    "&:disabled": {
      backgroundColor: "#cccccc",
      cursor: "not-allowed",
    },
  },
  error: {
    color: "#ff0033",
    margin: "10px 0",
    padding: "10px",
    backgroundColor: "#ffe6e6",
    borderRadius: "5px",
    fontSize: "14px",
  }
};

export default Auth;
