import { useState } from "react";
import "./Login.css";
import authService from "../services/authService";

function Login({ setPage }) {

  const [name, setName] = useState("");
  const [pass, setPass] = useState("");

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handlePassword = (event) => {
    setPass(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    console.log(name, pass);

    const result = await authService.login(
      name,
      pass
    );

    console.log(result);
  };

  return (
    <div className="container">
      <div className="login-card">

        <h1>User Login</h1>

        <form onSubmit={handleLogin}>

          <input
            type="text"
            placeholder="User Name"
            onChange={handleName}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={handlePassword}
          />

          <div className="options">
            <label>
              <input type="checkbox" />
              Remember me
            </label>

            <a href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWfTVS_UnPbH8QyW68cmSFSupC3lgy2DwDUA&s">
              Forgot Password?
            </a>
          </div>

          <button type="submit">
            LOGIN
          </button>

          <p className="signup-link">
            Don't have an account?
            <span onClick={() => setPage("signup")}>
              Sign Up
            </span>
          </p>

        </form>

      </div>
    </div>
  );
}

export default Login;