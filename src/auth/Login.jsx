import { useState } from "react";
import "./Login.css";
import authService from "../services/authService";
import { Link, useNavigate } from "react-router";
import Button from "../components/buttons/Button";

function Login({ setPage }) {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
const [password, setPassword] = useState("");

const handleUsername = (event) => {
  setUsername(event.target.value);
};

  const handlePassword = (event) => {
  setPassword(event.target.value);
};
  const handleLogin = async (event) => {
    event.preventDefault();

    console.log(username, password);

const result = await authService.login(
  username,
  password
);
if(result.success){

    localStorage.setItem(
        "user",
        JSON.stringify(result.data)
    );
   // alert("Login Successful");
    navigate('/app/dashbord');
}
else{
    alert(result.message);
}

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
            onChange={handleUsername}
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

          <Button buttonText={'LOGIN'} type={'submit'} />

          <p className="signup-link">
            Don't have an account?
            <Link id="one" to="/signup">Sign up</Link>
          </p>

        </form>

      </div>
    </div>
  );
}

export default Login;