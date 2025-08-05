import { useNavigate, useLocation } from "react-router-dom";
import '../styles/page-nav-buttons.css'; // Adjust path to your CSS file

const pageOrder = [
  "/", "/about", "/menu", "/offers", "/events", "/contact", "/book", "/booking-history"
];

export default function PageNavButtons() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const idx = pageOrder.indexOf(pathname);

  // If current path not found in pageOrder, don't render buttons
  if (idx === -1) {
    return null;
  }

  // Calculate previous index with wrap-around
  const prevIndex = idx === 0 ? pageOrder.length - 1 : idx - 1;

  // Calculate next index with wrap-around
  const nextIndex = idx === pageOrder.length - 1 ? 0 : idx + 1;

  return (
    <div className="page-nav-wrapper">
      <button
        className="page-nav-btn"
        onClick={() => navigate(pageOrder[prevIndex])}
        aria-label="Go to previous page"
      >
        &larr; Previous
      </button>
      <button
        className="page-nav-btn"
        onClick={() => navigate(pageOrder[nextIndex])}
        aria-label="Go to next page"
      >
        Next &rarr;
      </button>
    </div>
  );
}
