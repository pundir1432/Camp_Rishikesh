import React, { Suspense } from "react";
import Navbar from "../header/Navbar";
import Footer from "../footer/Footer";
import {  Outlet } from "react-router-dom";


const Loading = () => <div className="d-flex justify-content-center">
  <Loading />
</div>;

const PrivateRoute = () => {
    // return <Navigate to={'/bmg/home'} state={{ from: location }} replace />;
  return (
    <Suspense fallback={<Loading />}>
      <Navbar />
        <Outlet />
      <Footer />
    </Suspense>
  );
};

export default PrivateRoute;
