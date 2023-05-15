import { Navigate, Outlet } from "react-router-dom";
import auth from '../modules/auth'
import React from 'react'
import { Container } from "rsuite";
import TailwindNavbar from "./Navbar/TailwindNavbar";

const ProtectedRoutes = () => {
  const [activeKey, setActiveKey] = React.useState(null);

  return auth.isAuthenticated() ?
    <>
      {/* <BootstrapNavbar appearance="subtle" activeKey={activeKey} onSelect={setActiveKey} /> */}
      <TailwindNavbar />
      <div className="mb-20"></div>
      <br />
      <div className="xl:w-[1200px] mx-auto">

        <Outlet />
      </div>
    </>
    :
    <Navigate to="/login" />;
};

export default ProtectedRoutes;