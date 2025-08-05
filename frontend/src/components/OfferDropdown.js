import { useState, useEffect } from 'react';
import {
  Card, Dropdown, Button, Alert, Spinner, Badge, Modal, Form
} from 'react-bootstrap';
import '../styles/offer-dropdown.css';

// Sample offers with images
const sampleOffers = [
  {
    id: 1,
    title: "Monsoon Magic Combo",
    description: "Starter + Main Course + Dessert + Drink for ₹999 (Save 30%)",
    code: "MONSOON999",
    discount: 30,
    validTill: "2025-09-30",
    type: "combo",
    image: "/images/offers/monsoon-combo.jpg"
  },
  // ... (you can include the other 9 offers exactly as you had in your array)
  {
    id: 2,
    title: "Family Feast Bundle",
    description: "4 Mains, 2 Starters, 4 Drinks, 2 Desserts for ₹1999",
    code: "FAMILY1999",
    discount: 35,
    validTill: "2025-12-31",
    type: "combo",
    image: "/images/offers/family-feast.jpg"
  },
  {
    id: 3,
    title: "Weekend Brunch Special",
    description: "Unlimited brunch combo - 1 Starter, 1 Main, 1 Dessert + Bottomless drinks",
    code: "BRUNCH1299",
    discount: 25,
    validTill: "2025-11-30",
    type: "combo",
    image: "/images/offers/brunch.jpg"
  },
  {
    id: 4,
    title: "Date Night Package",
    description: "2 Starters, 2 Mains, 1 Dessert + 2 glasses of wine for ₹1599",
    code: "DATE1599",
    discount: 20,
    validTill: "2025-10-31",
    type: "combo",
    image: "/images/offers/date-night.jpg"
  },
  {
    id: 5,
    title: "Quick Lunch Combo",
    description: "1 Soup/Salad + 1 Main + 1 Drink for just ₹499 (11AM-3PM weekdays)",
    code: "LUNCH499",
    discount: 15,
    validTill: "2025-12-31",
    type: "combo",
    image: "/images/offers/lunch-combo.jpg"
  },
  {
    id: 6,
    title: "Happy Hour Deal",
    description: "40% off beverages and appetizers from 4PM-7PM (Mon-Fri)",
    code: "HAPPY40",
    discount: 40,
    validTill: "2025-08-15",
    type: "happyhour",
    image: "/images/offers/happy-hour.jpg"
  },
  {
    id: 7,
    title: "Student Special",
    description: "15% off all combos with valid student ID",
    code: "STUDENT15",
    discount: 15,
    validTill: "2025-12-31",
    type: "discount",
    image: "/images/offers/student.jpg"
  },
  {
    id: 8,
    title: "Birthday Freebie",
    description: "Free dessert for birthday person with any combo order",
    code: "BDAYFREE",
    discount: 0,
    validTill: "2025-12-31",
    type: "freebie",
    image: "/images/offers/birthday.jpg"
  },
  {
    id: 9,
    title: "Early Bird Dinner",
    description: "20% off all combos ordered before 7PM (Sun-Thu)",
    code: "EARLY20",
    discount: 20,
    validTill: "2025-11-30",
    type: "discount",
    image: "/images/offers/early-bird.jpg"
  },
  {
    id: 10,
    title: "Festive Season Combo",
    description: "5-course festive meal for ₹1499 per person",
    code: "FESTIVE1499",
    discount: 25,
    validTill: "2025-11-15",
    type: "combo",
    image: "/images/offers/festive.jpg"
  }
];

export default function OffersDropdown() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState('');
  const [selectedOffer, setSelectedOffer] = useState(null);

  // Modal and booking states
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', contact: '' });
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    // Simulate API fetch
    setOffers(sampleOffers);
    setSelectedOffer(sampleOffers[0]);
    setLoading(false);
  }, []);

  const getBadgeVariant = (offerType) => {
    switch (offerType) {
      case 'combo': return 'success';
      case 'happyhour': return 'warning';
      case 'freebie': return 'info';
      default: return 'primary';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Apply button handler
  const handleApplyClick = () => {
    setFormData({ name: '', contact: '' });
    setBookingSuccess(false);
    setShowApplyModal(true);
  };

  const handleFormChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    // Simulate backend booking
    setTimeout(() => {
      setFormLoading(false);
      setBookingSuccess(true);
      setTimeout(() => setShowApplyModal(false), 1800);
    }, 1200);
  };

  return (
    <div className="offers-dropdown-container" id='fg'>
      <h2 className="text-center mb-4">Current Offers</h2>
      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2 text-muted">Loading offers...</p>
        </div>
      ) : error ? (
        <Alert variant="danger" className="shadow-sm text-center">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {error}
        </Alert>
      ) : (
        <>
          {/* Offer selector dropdown */}
          <div className="offer-selector mb-4">
            <Dropdown>
              <Dropdown.Toggle variant="primary" className="w-100">
                {selectedOffer?.title || "Select an offer"}
              </Dropdown.Toggle>
              <Dropdown.Menu className="w-100">
                {offers.map(offer => (
                  <Dropdown.Item
                    key={offer.id}
                    onClick={() => setSelectedOffer(offer)}
                    active={selectedOffer?.id === offer.id}
                  >
                    {offer.title}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          {/* Offer card display */}
          {selectedOffer && (
            <Card className="offer-card shadow-sm">
              {selectedOffer.image && (
                <Card.Img
                  variant="top"
                  src={selectedOffer.image}
                  alt={selectedOffer.title}
                  className="offer-card-img"
                  style={{
                    maxHeight: '220px',
                    objectFit: 'cover',
                    borderTopLeftRadius: '0.5rem',
                    borderTopRightRadius: '0.5rem'
                  }}
                  onError={e => { e.target.style.display = 'none'; }}
                />
              )}
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <Card.Title className="mb-0">{selectedOffer.title}</Card.Title>
                  <Badge pill bg={getBadgeVariant(selectedOffer.type)}>
                    {selectedOffer.type.toUpperCase()}
                  </Badge>
                </div>
                <Card.Text className="text-muted mb-4">
                  {selectedOffer.description}
                </Card.Text>
                <div className="offer-details">
                  {selectedOffer.code && (
                    <div className="detail-item">
                      <span className="detail-label">Promo Code:</span>
                      <span className="detail-value font-monospace">{selectedOffer.code}</span>
                    </div>
                  )}
                  {selectedOffer.discount > 0 && (
                    <div className="detail-item">
                      <span className="detail-label">Discount:</span>
                      <span className="detail-value">{selectedOffer.discount}% OFF</span>
                    </div>
                  )}
                  <div className="detail-item">
                    <span className="detail-label">Valid Until:</span>
                    <span className="detail-value">{formatDate(selectedOffer.validTill)}</span>
                  </div>
                </div>
              </Card.Body>
              <Card.Footer className="bg-transparent text-center">
                <Button
                  variant="primary"
                  className="w-100"
                  onClick={handleApplyClick}
                >
                  Apply This Offer
                </Button>
              </Card.Footer>
            </Card>
          )}

          {/* Apply offer modal */}
          <Modal
            show={showApplyModal}
            onHide={() => setShowApplyModal(false)}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Apply Offer: {selectedOffer?.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {bookingSuccess ? (
                <Alert variant="success" className="text-center fw-bold">
                  🎉 Your offer is booked!
                </Alert>
              ) : (
                <Form onSubmit={handleFormSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      name="name"
                      value={formData.name}
                      required
                      placeholder="Your Name"
                      onChange={handleFormChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Contact (Mobile or Email)</Form.Label>
                    <Form.Control
                      name="contact"
                      value={formData.contact}
                      required
                      placeholder="Mobile or email"
                      onChange={handleFormChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Offer Code</Form.Label>
                    <Form.Control
                      value={selectedOffer?.code}
                      readOnly
                      plaintext
                    />
                  </Form.Group>
                  <div className="d-grid">
                    <Button type="submit" variant="success" disabled={formLoading}>
                      {formLoading ? "Booking..." : "Book this offer"}
                    </Button>
                  </div>
                </Form>
              )}
            </Modal.Body>
          </Modal>
        </>
      )}
    </div>
  );
}
