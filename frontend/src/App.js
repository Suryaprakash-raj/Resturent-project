import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Menu from "./components/Menu";
import Contact from "./components/Contact";
import BookTable from "./components/BookTable";
import OfferDropdown from "./components/OfferDropdown";
import EventsDashboard from "./components/EventsDashboard";
import ProfileDashboard from "./components/ProfileDashboard";
import FoodForm from "./components/FoodForm";
import Register from "./components/Register";
import Login from "./components/Login";
import BookingHistory from "./components/BookingHistory";
import Footer from "./components/Footer";
import MenuItemList from "./components/MenuItemList";
import MenuManager from "./components/MenuManager";
import "./styles/background.css"; // Your starry night CSS
import ScrollToTop from './components/ScrollToTop';
import PageNavButtons from "./components/PageNavButtons";
function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* 🌌 Starry Night — Behind all content, only once */}
      <div className="night">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="shooting_star"></div>
        ))}
      </div>

      {/* 🚀 Your real app content */}
      <Router>
        <Navbar />
        <main className="flex-grow-1">
          <ScrollToTop />
           <PageNavButtons />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/menu-manager" element={<MenuManager />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/book" element={<BookTable />} />
            <Route path="/offers" element={<OfferDropdown />} />
            <Route path="/events" element={<EventsDashboard />} />
            <Route path="/profile" element={<ProfileDashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/booking-history" element={<BookingHistory />} />
            <Route path="/food/add" element={<FoodForm />} />
            <Route path="/menuitemlist" element={<MenuItemList />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer />
      </Router>
    </div>
  );
}

export default App;
