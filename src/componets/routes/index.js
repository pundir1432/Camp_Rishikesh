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
const Campground = React.lazy(() => import("../pages/campground/Campground"));
const BookCamp = React.lazy(() => import("../pages/campground/BookNow"));
const Events = React.lazy(() => import("../pages/event/Events"));
const EventBook = React.lazy(() => import("../pages/event/BookEvent"));
const NearMe = React.lazy(() => import("../pages/NearMe"));
const Gallery = React.lazy(() => import("../pages/Gallery"));
const Contact = React.lazy(() => import("../pages/Contact"));
const UserDashboard = React.lazy(() => import("../user/UserDashboard"));
const FAQ = React.lazy(() => import("../pages/FAQ"));
const NotFound = React.lazy(() => import("./Not Found/ErrorBoundary"));
const AllBooking = React.lazy(() => import("../pages/allbooking/AllBooking"));
const Vehicle = React.lazy(() => import("../pages/campground/Vehicle"));
const Rafting = React.lazy(() => import("../pages/campground/Rafting"));
const NoInternet = React.lazy(() => import("../../componets/helper/network/NoInternet"));
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
        { path: "book-event", element: <LoadComponent component={EventBook} /> },
        { path: "nearme", element: <LoadComponent component={NearMe} /> },
        { path: "gallery", element: <LoadComponent component={Gallery} /> },
        { path: "contactus", element: <LoadComponent component={Contact} /> },
        { path: "book-now", element: <LoadComponent component={BookCamp} /> },
        { path: "user-dashboard", element: <LoadComponent component={UserDashboard} /> },
        { path: "all-booking", element: <LoadComponent component={AllBooking} /> },
        { path: "vehicle", element: <LoadComponent component={Vehicle} /> },
        { path: "rafting", element: <LoadComponent component={Rafting} /> },
        { path: "faq", element: <LoadComponent component={FAQ} /> },
        { path: "no-internet", element: <LoadComponent component={NoInternet} /> },
        { path: "*", element: <LoadComponent component={NotFound} /> },
      ],
    },
    { path: "login", element: <LoadComponent component={LoginPage} /> },
    { path: "account/login", element: <LoadComponent component={LoginPage} /> },
  ]);
};

export { AllRoutes };

