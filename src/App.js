import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import SignUp from "./pages/SignUp";
import CreatePost from "./pages/CreatePost";
import { AuthProvider } from "./contexts/AuthContext";
import { AnimatePresence } from "framer-motion";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AnimatePresence>
          <div className="bg-light-white font-work-sans">
            <Navbar />
            <Routes  >
              <Route index element={<Home />}  />
              <Route path="SignUp" element={<SignUp />} />
              <Route path="Post" element={<CreatePost />} />
            </Routes>
            <Footer />
          </div>
        </AnimatePresence>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
