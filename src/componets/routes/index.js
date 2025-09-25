import React, { Suspense, useState } from "react";
import { useRoutes, Navigate } from "react-router-dom";
// import DefaultLayout from "../helper/Default";
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
const Campground = React.lazy(() => import("../pages/Campground"));
const Events = React.lazy(() => import("../pages/Events"));
const NearMe = React.lazy(() => import("../pages/NearMe"));
const Gallery = React.lazy(() => import("../pages/Gallery"));
const Contact = React.lazy(() => import("../pages/Contact"));
const NotFound = React.lazy(() => import("./Not Found/ErrorBoundary"));

const loading = <div className="loading-spinner w-100 d-flex justify-content-center align-items-center"><Loading /></div>;
const AllRoutes = () => {
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
        { path: "campground", element: <LoadComponent component={Campground} /> },
        { path: "events", element: <LoadComponent component={Events} /> },
        { path: "nearme", element: <LoadComponent component={NearMe} /> },
        { path: "gallery", element: <LoadComponent component={Gallery} /> },
        { path: "contactus", element: <LoadComponent component={Contact} /> },
        { path: "*", element: <LoadComponent component={NotFound} /> },
      ],
    },
    { path: "login", element: <LoadComponent component={LoginPage} /> },
    { path: "account/login", element: <LoadComponent component={LoginPage} /> },
  ]);
};

export { AllRoutes };

