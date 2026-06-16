import { useState } from "react";
import "./Signup.css";
import authService from "../services/authService";
import { Link, useNavigate } from "react-router";
import Button from "../components/buttons/Button";

function Signup() {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();

    const result = await authService.signup(
      name,
      dob,
      phone,
      email,
      username,
      password
    );

    console.log(result);
    if(result.success){
    alert("Account Created Successfully");
    navigate('/');
    }
    else{
    alert(result.message);
    }
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
           type="text"
           placeholder="Phone Number"
            onChange={(e) => setPhone(e.target.value)}
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

          <Button buttonText={'SIGNUP'} type={'submit'} />

          <p className="login-link">
            Already have an account?
           
            <Link id="one"  to={'/login'}>Login</Link>
          </p>

        </form>

      </div>
    </div>
  );
}

export default Signup;