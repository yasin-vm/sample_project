import { useState } from "react";
import "./Signup.css";
import authService from "../services/authService";

function Signup({ setPage }) {

  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (event) => {
    event.preventDefault();

    const result = await authService.signup(
      name,
      dob,
      email,
      username,
      password
    );

    console.log(result);
  };

  return (
    <div className="container">
      <div className="signup-card">

        <h1>Create Account</h1>

        <form onSubmit={handleSignup}>

          <input
            type="text"
            placeholder="Full Name"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="date"
            onChange={(e) => setDob(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">
            SIGN UP
          </button>

          <p className="login-link">
            Already have an account?
            <span onClick={() => setPage("login")}>
              Login
            </span>
          </p>

        </form>

      </div>
    </div>
  );
}

export default Signup;