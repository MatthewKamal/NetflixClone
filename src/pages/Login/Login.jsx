import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Login.css";
import logo from "../../assets/logo.png";

const Login = () => {
  const [signState, setSignState] = useState("Sign In");

  const formik = useFormik({
    initialValues: {
      Name: "",
      Email: "",
      Password: "",
    },
    validationSchema: Yup.object({
      Name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      Email: Yup.string().email("Invalid email address").required("Required"),
      Password: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required!"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div className="login">
      <img src={logo} className="login-logo" alt="" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form onSubmit={formik.handleSubmit}>
          {signState === "Sign Up" ? (
            <>
              <label htmlFor="Name">Name</label>
              <input
                id="Name"
                name="Name"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Name}
                placeholder="Your Name"
              />
              {formik.touched.Name && formik.errors.Name ? (
                <div>{formik.errors.Name}</div>
              ) : null}
            </>
          ) : (
            <></>
          )}

          <label htmlFor="Email">Email Address</label>
          <input
            id="Email"
            name="Email"
            type="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Email}
            placeholder="Email"
          />
          {formik.touched.Email && formik.errors.Email ? (
            <div>{formik.errors.Email}</div>
          ) : null}

          <label htmlFor="Password">Password</label>
          <input
            id="Password"
            name="Password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Password}
            placeholder="Password"
          />
          {formik.touched.Password && formik.errors.Password ? (
            <div>{formik.errors.Password}</div>
          ) : null}

          <button>{signState}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="">Remember Me</label>
            </div>
            <p>Need Help</p>
          </div>
        </form>
        <div className="form-switch">
          {signState === "Sign In" ? (
            <p>
              New to Netflix?
              <span onClick={() => setSignState("Sign Up")}>Sign Up Now</span>
            </p>
          ) : (
            <p>
              Already have account?
              <span onClick={() => setSignState("Sign In")}>Sign In Now</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
export default Login;
