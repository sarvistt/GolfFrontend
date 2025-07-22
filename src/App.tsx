import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import {LandingPage} from "./pages/LandingPage"
import {Search} from "./pages/Search"

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
  path="/"
  element={
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <LandingPage />
    </motion.div>
  }
/>
<Route
  path="/search"
  element={
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Search />
    </motion.div>
  }
/>
      </Routes>
    </AnimatePresence>
  );
}


export default function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}