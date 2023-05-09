import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Form from "./components/Form";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllPost from "./components/AllPost";
import Model from "./components/Model";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/add" element={<Form />} />
          <Route exact path="/" element={<AllPost />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
