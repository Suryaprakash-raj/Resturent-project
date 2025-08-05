import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Alert,
  Modal,
  
} from "react-bootstrap";
import { FaTrash, FaEdit, FaShoppingCart, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../utils/api";
import FoodForm from "../components/FoodForm";
import "../styles/menu.css";

// Example: Map your menu items to their respective images
const MENU_IMAGES = {
  "Butter Chicken": "/images/ButterChicken1.jpg",
  "Chow Mein": "/images/ChowMein1.jpg",
  "Garlic Naan": "/images/GarlicNaan1.jpg",
  biryani: "/images/hyderabadiBiryani1.jpg",
  "Special Curry": "/images/food1.jpg.jpg",
  "Grilled Fish": "/images/food2.jpg",
  // Add more as needed...
};

export default function Menu() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Fetch ALL menu items
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const res = await api.get("/menu");
        // For demo: Mark first two items as popular
        const itemsWithPopular = res.data.map((item, index) => ({
          ...item,
          isPopular: [0, 1].includes(index),
        }));
        setItems(itemsWithPopular);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load menu.");
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  // Add new item
  const handleFoodAdded = (newItem) => {
    setItems([...items, newItem]);
  };

  // Delete item
  const handleDelete = async (id) => {
    try {
      await api.delete(`/foods/${id}`);
      setItems(items.filter((item) => item._id !== id));
      toast.success("Item deleted!");
    } catch (err) {
      toast.error("Failed to delete item.");
    }
  };

  // Handle edit click
  const handleEditClick = (item) => {
    setEditingItem(item);
    setShowEditModal(true);
  };

  // Handle edit save
  const handleEditSave = (updatedItem) => {
    setItems(items.map((item) => (item._id === updatedItem._id ? updatedItem : item)));
    setShowEditModal(false);
  };

  // Add to cart
  const handleAddToCart = (item) => {
    toast.success(`${item.name} added to cart!`);
    // Add your cart logic here
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3 text-muted">Loading menu...</p>
      </div>
    );
  }
  if (error) {
    return <Alert variant="danger" className="text-center">{error}</Alert>;
  }

  return (
    <Container className="my-4">
      {/* --- Title --- */}
      <h2 className="mb-4 text-center">Our Menu</h2>

      {/* --- Admin Food Form (Card) --- */}
      {user?.role === "admin" && (
        <Card className="mb-4 animate-fadeInUp">
          <Card.Header className="fw-bold bg-light">Admin: Add New Dish</Card.Header>
          <Card.Body>
            <FoodForm onAddFood={handleFoodAdded} />
          </Card.Body>
        </Card>
      )}

      {/* --- Menu Cards Grid (Real Food Images) --- */}
      <Row xs={1} sm={2} md={3} lg={4} className="g-4 mt-2">
        {items.map((item) => (
          <Col key={item._id} className="animate-fadeIn">
            <Card className="h-100 shadow-sm border-0 menu-card">
              <div className="menu-card-img-container">
                <Card.Img
                  variant="top"
                  src={MENU_IMAGES[item.name] || `/images/${item.name.replace(/\s+/g, "-")}.jpg`}
                  alt={item.name}
                  className="menu-card-img"
                  onError={(e) => {
                    if (e.target.src.includes("Butter-Chicken")) e.target.src = "/images/food1.jpg";
                    else if (e.target.src.includes("Chow-Mein")) e.target.src = "/images/food2.jpg";
                    else e.target.src = "/images/food1.jpg.jpg";
                  }}
                />
                {item.isPopular && (
                  <div className="popular-badge">
                    <FaStar className="me-1" />
                    Popular
                  </div>
                )}
              </div>
              <Card.Body className="d-flex flex-column">
                <Card.Title className="fs-5 fw-semibold text-truncate mb-2">{item.name}</Card.Title>
                <Card.Text className="text-muted mb-2">
                  {item.description || "Delicious, chef-crafted dish with premium ingredients."}
                </Card.Text>
                <Card.Text className="fs-5 fw-bold text-success mb-2">₹{item.price?.toFixed(2) || "-"}</Card.Text>
                {user?.role === "admin" && (
                  <div className="d-flex gap-2 mt-auto pt-2">
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(item._id)}
                      aria-label="Delete"
                    >
                      <FaTrash />
                    </Button>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleEditClick(item)}
                      aria-label="Edit"
                    >
                      <FaEdit />
                    </Button>
                  </div>
                )}
                <Button variant="primary" className="w-100 mt-2" onClick={() => handleAddToCart(item)}>
                  <FaShoppingCart className="me-2" />
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* --- Edit Modal (Only shown if isAdmin) --- */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Dish</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingItem && (
            <FoodForm
              item={editingItem}
              onSubmit={handleEditSave}
              onCancel={() => setShowEditModal(false)}
            />
          )}
        </Modal.Body>
      </Modal>

      {/* --- Promo Cards Section (with price and rating) --- */}
      <section className="mt-5 pt-4 border-top">
        <h3 className="mb-4 text-center">Featured Experiences</h3>
        <Row className="g-4">
          <Col md={6} className="animate-slideInRight">
            <Card className="h-100">
              <Card.Img
                variant="top"
                src="/images/ButterChicken1.jpg"
                alt="Chef's Butter Chicken"
                className="card-img-scale"
              />
              <Card.Body className="text-center">
                <Card.Title>Butter Chicken</Card.Title>
                <Card.Text className="text-muted mb-2">
                  Savory tandoori chicken in a creamy tomato and butter sauce, best with basmati rice.
                </Card.Text>
                <div className="price-rating">
                  <span className="price fw-bold text-success">₹350</span>
                  <span className="rating text-warning ms-3">
                    <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar className="text-muted" />
                  </span>
                </div>
                <Button variant="outline-primary" className="mt-3">Discover</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="animate-slideInLeft">
            <Card className="h-100">
              <Card.Img
                variant="top"
                src="/images/ChowMein1.jpg"
                alt="Chow Mein Noodles"
                className="card-img-scale"
              />
              <Card.Body className="text-center">
                <Card.Title>Chow Mein</Card.Title>
                <Card.Text className="text-muted mb-2">
                  Stir-fried noodles with fresh vegetables and your choice of chicken, beef, or tofu.
                </Card.Text>
                <div className="price-rating">
                  <span className="price fw-bold text-success">₹250</span>
                  <span className="rating text-warning ms-3">
                    <FaStar /> <FaStar /> <FaStar /> <FaStarHalfAlt /> <FaStar className="text-muted" />
                  </span>
                </div>
                <Button variant="outline-primary" className="mt-3">Order Now</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="g-4 mt-3">
          <Col md={6} className="animate-slideInRight">
            <Card className="h-100">
              <Card.Img
                variant="top"
                src="/images/GarlicNaan1.jpg"
                alt="Garlic Naan"
                className="card-img-scale"
              />
              <Card.Body className="text-center">
                <Card.Title>Garlic Naan</Card.Title>
                <Card.Text className="text-muted mb-2">
                  Freshly baked, buttery flatbread with roasted garlic and herbs. Perfect with curries.
                </Card.Text>
                <div className="price-rating">
                  <span className="price fw-bold text-success">₹80</span>
                  <span className="rating text-warning ms-3">
                    <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
                  </span>
                </div>
                <Button variant="outline-primary" className="mt-3">Add to Meal</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="animate-slideInLeft">
            <Card className="h-100">
              <Card.Img
                variant="top"
                src="/images/hyderabadiBiryani1.jpg"
                alt="Hyderabadi Biryani"
                className="card-img-scale"
              />
              <Card.Body className="text-center">
                <Card.Title>Hyderabadi Biryani</Card.Title>
                <Card.Text className="text-muted mb-2">
                  Fragrant basmati rice, tender meat, and aromatic spices. Served with raita and mirchi ka salan.
                </Card.Text>
                <div className="price-rating">
                  <span className="price fw-bold text-success">₹450</span>
                  <span className="rating text-warning ms-3">
                    <FaStar /> <FaStar /> <FaStar /> <FaStarHalfAlt /> <FaStar className="text-muted" />
                  </span>
                </div>
                <Button variant="outline-primary" className="mt-3">Taste Today</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="animate-slideInLeft">
            <Card className="h-100">
              <Card.Img
                variant="top"
                src="/images/food1.jpg.jpg"
                alt="Dosa"
                className="card-img-scale"
              />
              <Card.Body className="text-center">
                <Card.Title>🥞 Dosa</Card.Title>
                <Card.Text className="text-muted mb-2">
                  A thin, golden-brown crepe made from fermented rice and urad dal batter. Crispy outside and soft inside, often served rolled or folded.
                </Card.Text>
                <div className="price-rating">
                  <span className="price fw-bold text-success">₹120</span>
                  <span className="rating text-warning ms-3">
                    <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
                  </span>
                </div>
                <Button variant="outline-primary" className="mt-3">Order Now</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="animate-slideInLeft">
      <Card className="h-100">
        <Card.Img
          variant="top"
          src="/images/PaneerButterMasala.jpg"  // Ensure this image exists in your public folder
          alt="Paneer Butter Masala"
          className="card-img-scale"
        />
        <Card.Body className="text-center">
          <Card.Title>Paneer Butter Masala</Card.Title>
          <Card.Text className="text-muted mb-2">
            Soft paneer cubes cooked in creamy tomato-based gravy with aromatic spices.
          </Card.Text>
          <div className="price-rating">
            <span className="price fw-bold text-success">₹320</span>
            <span className="rating text-warning ms-3">
              <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
            </span>
          </div>
          <Button variant="outline-primary" className="mt-3">Order Now</Button>
        </Card.Body>
      </Card>
    </Col>
    <Col md={6} className="animate-slideInLeft">
  <Card className="h-100">
    <Card.Img
      variant="top"
      src="/images/veg-thali.jpg"  // Replace with your full meal image path
      alt="Veg Thali Full Meal"
      className="card-img-scale"
    />
    <Card.Body className="text-center">
      <Card.Title>Veg Thali</Card.Title>
      <Card.Text className="text-muted mb-2">
        A wholesome traditional Indian meal with rice, dal, vegetable curry, roti, and salad.
      </Card.Text>
      <div className="price-rating">
        <span className="price fw-bold text-success">₹250</span>
        <span className="rating text-warning ms-3">
          <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
        </span>
      </div>
      <Button variant="outline-primary" className="mt-3">Order Now</Button>
    </Card.Body>
  </Card>
</Col>

        </Row>
      </section>
    </Container>
  );
}
