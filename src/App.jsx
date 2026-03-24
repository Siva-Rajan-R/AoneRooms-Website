import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./LandingPage";
import Rooms from "./components/Rooms";
import Footer from "./components/Footer";
import FAQ from "./components/FAQ";
import Philosophy from "./components/Philosophy";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        {/* Home */}
        <Route path="/" element={<LandingPage />} />

        {/* Other pages */}
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/contact" element={<Footer />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/philosophy" element={<Philosophy />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;