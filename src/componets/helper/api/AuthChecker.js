import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthCheck = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("camp_booking");
    if (!token) {
      setTimeout(() => navigate("/bmg/home"), 0);
    }
  }, [navigate]);
  return null;
};

export default AuthCheck;
