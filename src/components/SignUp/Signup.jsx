import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase.init";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Signup = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const handleSignUp = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photo = e.target.photo.value;
    const name = e.target.name.value;
    const terms = e.target.terms.checked;

    setErrorMessage("");
    setSuccess(false);

    if (!terms) {
      setErrorMessage("Pleace Accept Terms and Condition.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be 6 character.");
      return;
    }

    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordPattern.test(password)) {
      setErrorMessage(
        "At least one uppercase, one lower case, one number, one special character."
      );
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess(true);

        sendEmailVerification(auth.currentUser).then(() => {
          console.log("Email Verification Send");
        });

        const profile = {
          displayName: name,
          photoURL: photo,
        };

        updateProfile(auth.currentUser, profile)
          .then(() => {
            console.log("User profile updated");
          })
          .catch((error) => {
            console.log(error);
          });
      })

      .catch((error) => {
        console.log("ERROR", error.message);
        setErrorMessage(error.message);
        setSuccess(false);
      });
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl p-5">
          <h1 className="text-5xl font-bold mx-auto">Sign up now!</h1>
          <form onSubmit={handleSignUp} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo</span>
              </label>
              <input
                type="text"
                name="photo"
                placeholder="Photo Url"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
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
              <label className="label ">
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
              <button className="btn btn-primary">Sign Up</button>
            </div>
            <div className="form-control">
              <label className="label justify-start gap-3 cursor-pointer">
                <input type="checkbox" className="checkbox" name="terms" />
                <span className="label-text">Accept terms and condition</span>
              </label>
            </div>
          </form>
          {errorMessage && <p className="text-red-600">{errorMessage}</p>}
          {success && <p className="text-green-500">Sign up successful.</p>}

          <p>
            Already have an account! Please {}
            <Link className="text-blue-600" to="/login">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
