import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import Policy from "../pages/Policy/Privacy";
const Layout = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/policy" element={<Policy />}></Route>
    </Routes>
  );
};

export default Layout;
