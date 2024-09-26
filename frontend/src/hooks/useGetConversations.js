import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);
  const location = useLocation();
  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);

      try {
        const res = await fetch(`/api/v1/users`);

        // Check if the status is 401 or 403 (expired or unauthorized)
        if (res.status == 403 || res.status == 401) {
          localStorage.removeItem("auth-user");

          navigate("/login"); // Redirect to login
          return; // Stop further execution;
          // <Navigate to="/login" state={{ from: location }} replace />
        }

        // Check if response is OK (status code 200)
        if (res.ok) {
          const data = await res.json();
          
          if (data.error) {
            throw new Error(data.error);
          }

          setConversations(data);
        } else {
          throw new Error('Failed to fetch conversations');
        }
      } catch (error) {
        toast.error(error.message); // Show error message via toast
      } finally {
        setLoading(false); // Ensure loading is turned off
      }
    };

    getConversations();
  }, [navigate]); // Add 'navigate' to the dependency array

  return { loading, conversations };
};

export default useGetConversations;

