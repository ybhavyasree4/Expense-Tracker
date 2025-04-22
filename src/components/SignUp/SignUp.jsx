import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const API_URL = "http://127.0.0.1:8000/api/signup/";

const SignUp = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!form.name || !form.phone || !form.password) {
      alert("All fields are required!");
      return;
    }

    const data = {
      username: form.name,
      mobile_number: form.phone, // ✅ Correct key for Django backend
      password: form.password,
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("User signed up successfully:", result);
        alert("Signup successful!");
        navigate("/signin");
      } else {
        console.error("Signup failed:", result);
        alert(`Signup failed: ${result.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Unable to connect to the server. Please try again later.");
    }
  };

  return (
    <div className="signupContainer">
      <div className="signupFormContainer">
        <h2 className="signupTitle">Sign Up</h2>
        <form className="signupForm" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="signupInput"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone number"
            value={form.phone}
            onChange={handleChange}
            required
            className="signupInput"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="signupInput"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            className="signupInput"
          />
          <button type="submit" className="submitButton">
            Submit
          </button>
        </form>

        <p className="signinText">
          Already have an account?{" "}
          <span
            style={{ cursor: "pointer", color: "#8000a3" }}
            onClick={() => navigate("/signin")}
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
