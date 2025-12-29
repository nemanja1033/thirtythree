import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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
import Zonex from "./pages/Zonex";
import SignalWorks from "./pages/SignalWorks";
import NoirSupply from "./pages/NoirSupply";
import Pulse from "./pages/Pulse";
import ScrollToTop from "./components/ScrollToTop";
import "./index.css";
import { I18nProvider } from "./i18n/I18nProvider";

function RouteTransitions() {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={
          shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.985 }
        }
        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.99 }}
        transition={{
          duration: shouldReduceMotion ? 0.1 : 0.35,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <Routes location={location}>
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
          <Route path="/portfolio/flatburger" element={<FlatBurger />} />
          <Route path="/portfolio/zonex" element={<Zonex />} />
          <Route path="/portfolio/signal-works" element={<SignalWorks />} />
          <Route path="/portfolio/noir-supply" element={<NoirSupply />} />
          <Route path="/portfolio/pulse" element={<Pulse />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <I18nProvider>
      <BrowserRouter>
        <ScrollToTop />
        <RouteTransitions />
      </BrowserRouter>
    </I18nProvider>
  </React.StrictMode>,
);
