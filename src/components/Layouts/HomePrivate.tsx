import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Nav from "../Nav/Nav";
import { useAuth } from "../../context/AuthContext";

export const HomePrivate = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      console.log("No user found");
      const error: string = "You must be logged in to access this page";
      navigate("/login", { state: { error } });
    }
  }, [user, navigate]);

  // Still return some JSX
  if (!user) {
    return null;
  }

  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};
