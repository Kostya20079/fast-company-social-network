import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/navBar";
import Users from "./components/users";
import Login from "./components/layouts/login";
import Main from "./components/layouts/main";
import Posts from "./components/layouts/posts";
import PageNotFound from "./components/layouts/page-not-found";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/main/*" exact Component={Main} />
        <Route path="/login/*" Component={Login} />
        <Route path="/users/*" Component={Users} />
        <Route path="/posts/:postId?" Component={Posts} />
        <Route path="/404/*" Component={PageNotFound} />
        <Route path="*" element={<Navigate replace to="404" />} />{" "}
        {/*if the way to page is not found*/}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
