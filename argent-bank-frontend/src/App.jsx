import React from "react";
import { Route, Routes, Navigate, BrowserRouter as Router } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import  store  from "./redux/Reduxstore.js";

import Header from "./layouts/Header/Header.jsx";
import Footer from "./layouts/Footer/Footer.jsx";
import Home from "./pages/Home/Home.jsx";
import SignIn from "./pages/SignIn/SignIn.jsx";
import User from "./pages/User/User.jsx";
import Error from "./pages/Error/Error.jsx";
import "./App.css";

function MainRoutes() {
  const token = useSelector((state) => state.auth.token);
  const isConnected = !!token;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route
        path="/user"
        element={isConnected ? <User /> : <Navigate to="/signin" />}
      />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <MainRoutes />
        <Footer />
      </Router>
    </Provider>
  );
}


