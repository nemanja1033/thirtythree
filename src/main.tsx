import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import BookCall from "./pages/BookCall";
import Discover from "./pages/Discover";
import Design from "./pages/Design";
import Develop from "./pages/Develop";
import Grow from "./pages/Grow";
import BrandBuilding from "./pages/BrandBuilding";
import WebDevelopment from "./pages/WebDevelopment";
import GrowthStrategy from "./pages/GrowthStrategy";
import FAQ from "./pages/FAQ";
import Portfolio from "./pages/Portfolio";
import FlatBurger from "./pages/FlatBurger";
import "./index.css";
import { I18nProvider } from "./i18n/I18nProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <I18nProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/book" element={<BookCall />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/design" element={<Design />} />
          <Route path="/develop" element={<Develop />} />
          <Route path="/grow" element={<Grow />} />
          <Route path="/services/brand" element={<BrandBuilding />} />
          <Route path="/services/web" element={<WebDevelopment />} />
          <Route path="/services/growth" element={<GrowthStrategy />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/flat-burger" element={<FlatBurger />} />
        </Routes>
      </BrowserRouter>
    </I18nProvider>
  </React.StrictMode>,
);
