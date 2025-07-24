import React, { Suspense, useState } from "react";
import { useRoutes, Navigate } from "react-router-dom";
import DefaultLayout from "../helper/Default";
import PrivateRoute from "./PrivateRoute";
import { Loading } from "../helper/loading/Loading";

// Lazy-loaded authentication pages
const LoginPage = React.lazy(() => import("../auth/SignIn"));
// const ForgotPassword = React.lazy(() => import("../components/Auth/ForgetPassword"));
// const VerifyCode = React.lazy(() => import("../components/Auth/VerifyCode"));
// const SetPassword = React.lazy(() => import("../components/Auth/SetUserPassword"));
// Lazy-loaded dashboard pages
const Home = React.lazy(() => import("../pages/Home"));
const About = React.lazy(() => import("../pages/About"));
const NotFound = React.lazy(() => import("./Not Found/ErrorBoundary"));

const loading = <div className="loading-spinner w-100 d-flex justify-content-center aling-items-center"><Loading /></div>;
const AllRoutes = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const LoadComponent = ({ component: Component }) => (
    <Suspense fallback={loading}>
      <Component />
    </Suspense>
  );
  return useRoutes([
    { path: "/", element: <Navigate to="/camp/home" replace /> },
    {
      path: "camp",
      element: <PrivateRoute component={Home} />,
      children: [
        { path: "home", element: <LoadComponent component={Home} /> },
        { path: "about", element: <LoadComponent component={About} /> },
        { path: "*", element: <LoadComponent component={NotFound} /> },
      ],
    },
    {
      path: "account",
      element: <DefaultLayout />,
      children: [
        { path: "login", element: <LoginPage show={!isLoggedIn}  setIsLoggedIn={setIsLoggedIn} /> },
        // { path: "forget-password", element: <ForgotPassword /> },
        // { path: "verify-code", element: <VerifyCode /> },
      ],
    },
  ]);
};

export { AllRoutes };

