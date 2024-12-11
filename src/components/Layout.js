import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";

const Layout = ({ currentUser, setCurrentUser, cartItemCount }) => {
  return (
    <>
      <Nav
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        cartItemCount={cartItemCount}
      />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
