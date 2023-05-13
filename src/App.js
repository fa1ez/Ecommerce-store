import React, { useState, useEffect } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import Menu from "./components/Navbar";
import Home from "./components/Home";
import Product from "./components/Product";
function App() {
  return (
    <div>
      <Menu/>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route exact path="/products/:id" element={<Product/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
