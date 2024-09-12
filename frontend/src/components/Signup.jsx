import React, { useState } from "react";
import GenderCheckbox from "./GenderCheckbox";
import { Link } from "react-router-dom";
import useSignup from "../hooks/useSignup";

const Signup = () => {
  const [signupForm, setSignupForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const { signup, isLoading } = useSignup();
  // Function to handle Gender Checkbox

  function handleGenderCheckbox(gender) {
    setSignupForm((prev) => ({ ...prev, gender: gender }));
  }

  // Send Sign up Form

  async function onSignUp(e) {
    e.preventDefault();
    console.log(signupForm);
    await signup(signupForm);
    setSignupForm({
      fullName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "",
    });


    toast.success("Sign up successfully!")
  }
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-200 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign Up<span className="text-purple-900">Chat App</span>
        </h1>

        <form onSubmit={onSignUp}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              className="w-full input input-bordered h-10"
              value={signupForm?.fullName}
              onChange={(e) =>
                setSignupForm((prev) => ({ ...prev, fullName: e.target.value }))
              }
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full input input-bordered h-10"
              value={signupForm?.username}
              onChange={(e) =>
                setSignupForm((prev) => ({ ...prev, username: e.target.value }))
              }
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full input input-bordered h-10"
              value={signupForm?.email}
              onChange={(e) =>
                setSignupForm((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full input input-bordered h-10"
              value={signupForm?.password}
              onChange={(e) =>
                setSignupForm((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm password"
              className="w-full input input-bordered h-10"
              value={signupForm?.confirmPassword}
              onChange={(e) =>
                setSignupForm((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
            />
          </div>

          <GenderCheckbox
            onChange={handleGenderCheckbox}
            selectedGender={signupForm.gender}
          />

          <Link
            to="/login"
            className="text-sm hover:underline hover:text-blue-900 mt-4 inline-block"
          >
            {"Already"} have an account?
          </Link>

          <div>
            <button
              type="submit"
              className={`btn btn-block btn-sm mt-2 ${
                isLoading && "disabled cursor-not-allowed"
              }`}
            >
              {" "}
              {isLoading ? "Signing up" : "Sign Up"}
            </button>
          </div>
        </form>
      </div>{" "}
    </div>
  );
};

export default Signup;
