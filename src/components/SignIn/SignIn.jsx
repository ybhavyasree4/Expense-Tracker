import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignIn.css"; // Make sure this is imported!

const API_URL = "http://127.0.0.1:8000/";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}api/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim(),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
        localStorage.setItem("username", data.username);
        navigate("/dashboard", { state: { username: data.username } });
      } else {
        const errorData = await response.json();
        console.error("Login failed:", errorData);
        alert("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Unable to connect to the server. Please check your internet connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signInContainer">
      <div className="signInFormContainer glassEffect">
        <div className="signInForm">
          <h2 className="signInTitle">Welcome Back 💜</h2>
          <p className="signInSubtitle">Login to continue</p>
          <input
            className="signInInput"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="signInInput"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button 
            className="signInButton" 
            onClick={handleLogin} 
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
