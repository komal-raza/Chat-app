import React, { useState } from "react";
import { Link } from "react-router-dom";
import useSignin from "../hooks/useSignin";
const Login = () => {
  const [signinForm, setSigninForm] = useState({
    username: "",
    password: "",
  });

  const { signin, isLoading } = useSignin();

  const onSignin = async (e) => {
    e.preventDefault();
    // console.log(signinForm);
    await signin(signinForm);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login <span className="text-purple-900">Chat App</span>
        </h1>

        {/* Form */}

        <form onSubmit={onSignin}>
          <div>
            <label htmlFor="" className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full input input-bordered h-10"
              value={signinForm?.username}
              onChange={(e) =>
                setSigninForm((prev) => ({ ...prev, username: e.target.value }))
              }
            />
          </div>
          <div>
            <label htmlFor="" className="label ">
              <span className="text-base label-text">Passowrd</span>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full input input-bordered h-10"
              value={signinForm?.password}
              onChange={(e) =>
                setSigninForm((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </div>

          <Link
            to="/signup"
            className="text-sm hover:underline hover:text-blue-900 mt-2 inline-block"
          >
            {"Don't"} have an account?
          </Link>

          <div>
            <button
              type="submit"
              className={`btn btn-block btn-sm mt-2 ${
                isLoading && "disabled cursor-not-allowed"
              }`}
            >
              {isLoading ? "Signing in" : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
