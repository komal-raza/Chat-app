import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()
  async function signup(data) {
    const { fullName, email, username, password, confirmPassword, gender } =
      data;

    const success = handleFormError({
      fullName,
      email,
      username,
      password,
      confirmPassword,
      gender,
    });

    if (!success) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/v1/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          username,
          password,
          confirmPassword,
          gender,
        }),
      });


      const result = await res.json();
      // console.log(result,"Sign up success");
      setIsLoading(false);
      navigate("/login")
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  }
  return { signup, isLoading };
};

export default useSignup;

function handleFormError({
  fullName,
  email,
  username,
  password,
  confirmPassword,
  gender,
}) {
  if (
    !fullName ||
    !email ||
    !password ||
    !gender ||
    !confirmPassword ||
    !username
  ) {
    toast.error("Please fill all fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passowrds don't match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Passowrds must be at least 6 characters");
    return false;
  }

  return true;
}
