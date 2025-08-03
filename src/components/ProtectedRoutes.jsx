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
      <div className="2xl:container 2xl:mx-auto ">
        <div className='2xl:flex'>
          <Navbar />
          {/* <VerticalBar /> */}
          <div className="w-full p-5 sm:border-b-0 sm:border sm:p-5 mt-10 lg:m-0">
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