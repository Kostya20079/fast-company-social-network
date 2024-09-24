import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Users from "./components/layouts/users";
import Login from "./components/layouts/login";
import Main from "./components/layouts/main";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/*" exact Component={Main} />
        <Route path="login/:type?" Component={Login} />
        <Route path="users/:userId?/:edit?" Component={Users} />
      </Routes>
    </>
  );
}

export default App;
