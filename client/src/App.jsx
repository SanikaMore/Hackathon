import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Roadmap from "./Pages/Roadmap";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Response from "./Pages/Response";
import HomePage from "./Pages/HomePage";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
// import CreatePost from "./components/CreatePost";
import Recommendations from './Pages/Recommendations';

import { AppContext } from "./context/AppContext";
import { useSelector } from "react-redux";

import Sidebar from "./components/Sidebar";

import "./App.css";
import DisplayProfile from "./components/DisplayProfile";
import DisplayFavourites from "./components/DisplayFavourites";
import Discuss from "./Pages/Discuss";
import EditProfile from "./components/EditProfile";
import DisplayDoubt from "./Pages/DisplayDoubt";
import RepoDiscussion from "./Pages/RepoDiscussion"
function App() {
  const user = useSelector((state) => state?.user);
  const [status, setStatus] = useState(false);

  return (
    <AppContext.Provider value={{ user, status, setStatus }}>
      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route path="/" element={<HomePage />} />

          {!user && <Route path="/signup" element={<Signup />} />}
          {user && <Route path="/signup" element={<HomePage />} />}

          {!user && <Route path="/login" element={<Login />} />}
          {user && <Route path="/login" element={<HomePage />} />}

          {/* {!user && <Route path="/create/file" element={<Login />} />}
          {user && <Route path="/create/file" element={<CreatePost />} />} */}

          {user && <Route path="/account" element={<DisplayProfile />} />}
          {!user && <Route path="/account" element={<Login />} />}

          {user && <Route path="/starred" element={<DisplayFavourites />} />}
          {!user && <Route path="/account" element={<Login />} />}

          {user && <Route path="/edit/profile" element={<EditProfile />} />}
          {!user && <Route path="/edit/profile" element={<Login />} />}

          <Route path="/discuss" element={<Discuss />} />
          <Route path="/doubt" element={<DisplayDoubt />} />
          <Route path="/repo/:owner/:repo" element={<RepoDiscussion />} />
          <Route path="/roadmap" element={<Roadmap />} />

          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/new/password" element={<ResetPassword />} />
          <Route path="/recommendations/:userId" element={<Recommendations />} />

          <Route path="/response" element={<Response />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;