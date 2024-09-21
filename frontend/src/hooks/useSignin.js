import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setAuthUser, authUser } = useAuthContext();
  const signin = async ({ username, password }) => {
    if (!username || !password) {
      toast.error("Please fill all fields");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch("/api/v1/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();
      setIsLoading(false);

      console.log(result,"Signing in...");
      
      if (result.error) {
        toast.error(result.error);

        throw new Error(result.error);
      } else {
        //   Save user in auth context

        localStorage.setItem("auth-user", JSON.stringify(result));
        toast.success("Logged in");

        setAuthUser(result);
      }
      setIsLoading(false);

      // console.log(result, "Sign in");
    } catch (error) {
      toast.error(error.message);
      console.log(error);
      setIsLoading(false);
    }
  };

  return { signin, isLoading };
};

export default useSignin;
