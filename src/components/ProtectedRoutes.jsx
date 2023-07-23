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
      <div className="xl:container xl:mx-auto">
        <div className='xl:flex'>
          <Navbar />
          {/* <VerticalBar /> */}
          <div className="w-full sm:border-b-0 sm:border sm:px-4">
            <Outlet />
          </div>
        </div>
      </div>
      {/* <MaterialNavbar/> */}
    </>
    :
    <Navigate to="/login" />;
};

export default ProtectedRoutes;