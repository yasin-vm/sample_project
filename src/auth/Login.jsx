import { useState } from "react";
import "./Login.css";
import authService from "../services/authService";
import { Link, useNavigate } from "react-router";
import Button from "../components/buttons/Button";
import { Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import { toast } from "react-toastify";

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(10, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required'),
});

function Login({ setPage }) {
  const navigate = useNavigate();

  const handleLogin = async (values) => {


    const result = await authService.login(
      values.username,
      values.password
    );
    if (result.success) {

     

      localStorage.setItem(
        "user",
        JSON.stringify(result.data)
      );
      toast.success("Logged in using Enter!");
      navigate('/app/dashbord');

    } else {
      toast.error(result.message);
    }

    
  };

  return (
    <div className="container">
      <div className="login-card">
        <h1>USER LOGIN</h1>
        <Formik
          initialValues={{
            password: '',
            username: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({ errors, touched }) => (
            <Form>
              <Field autoFocus name="username" type="text" placeholder="User Name" />
              {errors.username && touched.username ? (
                <div className="error-message">{errors.username}</div>
              ) : null}

              {/* <Field name="password" type="password" placeholder="Password" /> */}
              <Field
                name="password"
                type="password"
                placeholder="Password"
                
              />
              {errors.password && touched.password ? (
                <div className="error-message">{errors.password}</div>
              ) : null}

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
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Login;