import { Navigate, Outlet } from "react-router-dom";
import auth from '../modules/auth'
import React from 'react'
import { Container } from "rsuite";
import TailwindNavbar from "./Navbar/TailwindNavbar";
import Navbar from "./Navbar/Navbar";

const ProtectedRoutes = () => {
  const [activeKey, setActiveKey] = React.useState(null);

  return auth.isAuthenticated() ?
    <>
      {/* <BootstrapNavbar appearance="subtle" activeKey={activeKey} onSelect={setActiveKey} /> */}
      {/* <TailwindNavbar /> */}
      <div className="xl:w-[1200px] mx-auto">
      <Navbar/>
      <div className="mb-20"></div>
      <br />

        <Outlet />
      </div>
      {/* <MaterialNavbar/> */}
    </>
    :
    <Navigate to="/login" />;
};

export default ProtectedRoutes;