import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Form from "./components/Form";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllPost from "./components/AllPost";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/add" element={<Form />} />
          <Route exact path="/" element={<AllPost />} />
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </BrowserRouter>
    </>
  );
}

export default App;
