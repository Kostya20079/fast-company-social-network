import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/navBar";
import Users from "./components/layouts/users";
import Login from "./components/layouts/login";
import Main from "./components/layouts/main";
import PageNotFound from "./components/page-not-found";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/*" exact Component={Main} />
        <Route path="login/*" Component={Login} />
        <Route path="users/:userId?" Component={Users} />
        <Route path="404/*" Component={PageNotFound} />
        <Route path="*" element={<Navigate replace to="404" />} />
        {/*if the way to page is not found*/}
      </Routes>
    </>
  );
}

export default App;
