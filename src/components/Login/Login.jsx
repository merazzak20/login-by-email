import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useRef, useState } from "react";
import { auth } from "../firebase.init";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  const [success, setSuccess] = useState(false);
  const [errorM, setErrorM] = useState(null);
  const [showPass, setShowPass] = useState(false);
  const emailRef = useRef();
  const handleLigin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setSuccess(false);
    setErrorM(null);

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result);
        if (!result.user.emailVerified) {
          setErrorM("Please Verify your mail.");
        } else {
          setSuccess(true);
        }
      })
      .catch((error) => {
        console.log(error);
        setErrorM(error.message);
      });
  };

  const handleForgotPass = () => {
    const email = emailRef.current.value;
    if (!email) {
      alert("Please provide a valid Email.");
    } else {
      sendPasswordResetEmail(auth, email).then(() => {
        alert("Password reset email was sent, please check the email.");
      });
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleLigin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                ref={emailRef}
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={showPass ? "text" : "password"}
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label onClick={handleForgotPass} className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
                <button
                  className="absolute right-3 bottom-12"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <FaEyeSlash /> : <FaEye />}
                </button>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
            {success && <p className="text-green-500">Successfully Sign in.</p>}
            {errorM && <p className="text-red-500">{errorM}</p>}

            <p>
              New in this website! Please {}
              <Link className="text-blue-600" to="/signup">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
