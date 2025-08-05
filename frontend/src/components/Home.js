import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import placeholderImage from '../assets/placeholder-food.jpg';
import '../styles/home.css';

export default function Home() {
  // Video carousel setup
  const videoFiles = ['video1.mp4', 'video2.mp4', 'video3.mp4'];
  const carouselRef = useRef(null);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-slide carousel logic
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videoFiles.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, videoFiles.length]);

  // Update carousel position
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${currentVideo * 100}%)`;
    }
  }, [currentVideo]);

  // Manual controls
  const prev = () => {
    setIsPaused(true);
    setCurrentVideo((p) => Math.max(0, p - 1));
    setTimeout(() => setIsPaused(false), 6000);
  };
  const next = () => {
    setIsPaused(true);
    setCurrentVideo((p) => (p + 1) % videoFiles.length);
    setTimeout(() => setIsPaused(false), 6000);
  };
  const goToSlide = (index) => {
    setIsPaused(true);
    setCurrentVideo(index);
    setTimeout(() => setIsPaused(false), 6000);
  };

  return (
    <div className="home-page">
      {/* Video Carousel (Edge-to-Edge, Static Overlay) */}
      <div className="video-carousel-container mb-0">
        <div className="video-carousel" ref={carouselRef}>
          {videoFiles.map((video, i) => {
            // Assign button label and link based on slide index
            let btnLabel = "Explore Menu";
            let btnLink = "/menu";
            if (i === 1) {
              btnLabel = "Reserve Now";
              btnLink = "/book";
            } else if (i === 2) {
              btnLabel = "View Specials";
              btnLink = "/offers";
            }
            return (
              <div key={i} className="video-carousel-item position-relative">
                <video
                  src={`/videos/${video}`}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-100"
                />
                {/* Static overlay (non-hover, always visible) */}
                <div className="video-overlay d-flex flex-column justify-content-center align-items-center text-center w-100 h-100 position-absolute top-0 left-0 p-3">
                  <h3 className="display-6 fw-bold" id="hi">
                    {i === 0
                      ? "Premium Dining Experience"
                      : i === 1
                      ? "Chef's Special Creations"
                      : "Seasonal Offerings"}
                  </h3>
                  <p className="lead mb-3" id="hi">
                    {i === 0
                      ? "Elevate your culinary journey with us"
                      : i === 1
                      ? "Artfully crafted by our award-winning chefs"
                      : "Discover our limited-time delicacies"}
                  </p>
                  <Button
                    variant="light"
                    size="lg"
                    className="btn-shadow px-4"
                    onClick={() => (window.location.href = btnLink)}
                  >
                    {btnLabel}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="carousel-controls">
          <button className="carousel-control" onClick={prev}>
            &lt;
          </button>
          <button className="carousel-control" onClick={next}>
            &gt;
          </button>
        </div>
        <div className="carousel-indicators">
          {videoFiles.map((_, i) => (
            <button
              key={i}
              className={currentVideo === i ? 'active' : ''}
              onClick={() => goToSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Culinary Philosophy Section */}
      <section className="philosophy-section py-5 mb-5 bg-light">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <img
                src="/images/chef-philosophy.jpg"
                alt="Chef preparing food"
                className="img-fluid rounded-4 shadow"
                style={{ maxHeight: '400px', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.src = placeholderImage;
                }}
              />
            </Col>
            <Col lg={6} id="gk">
              <h2 className="fw-bold mb-4">Our Culinary Philosophy</h2>
              <p className="lead mb-4">
                At our core, we believe in the transformative power of exceptional ingredients,
                masterful technique, and passionate service.
              </p>
              <div className="d-flex mb-4">
                <div className="me-4">
                  <h4 className="fw-bold">Seasonal</h4>
                  <p className="text-muted">
                    Our menus evolve with the seasons to showcase ingredients at their peak
                  </p>
                </div>
                <div>
                  <h4 className="fw-bold">Sustainable</h4>
                  <p className="text-muted">
                    We partner with local farmers and ethical suppliers committed to responsible practices
                  </p>
                </div>
              </div>
              <Button
                onClick={() => (window.location.href = '/about')}
                variant="outline-dark"
                size="lg"
                className="px-4"
              >
                Learn About Our Approach
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Private Dining Section */}
      <section className="private-dining py-5 mb-5 bg-white">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold" id="gk">
              Private Dining & Events
            </h2>
            <p className="lead text-muted mx-auto" style={{ maxWidth: '700px' }}>
              Host your next special occasion in our elegant private dining spaces
            </p>
          </div>
          <Row className="g-4">
            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Img variant="top" src="/images/private-1.jpg" />
                <Card.Body>
                  <Card.Title className="fw-bold">Intimate Gatherings</Card.Title>
                  <Card.Text>
                    Perfect for birthdays, anniversaries, or small celebrations (up to 12 guests)
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="bg-transparent border-0">
                  <Button
                    variant="primary"
                    onClick={() => (window.location.href = '/events')}
                  >
                    Inquire Now
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Img variant="top" src="/images/private-2.jpg" />
                <Card.Body>
                  <Card.Title className="fw-bold">Corporate Events</Card.Title>
                  <Card.Text>
                    Host business dinners, client meetings, or team celebrations (up to 40 guests)
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="bg-transparent border-0">
                  <Button
                    variant="primary"
                    onClick={() => (window.location.href = '/events')}
                  >
                    Plan Your Event
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Img variant="top" src="/images/private-3.jpg" />
                <Card.Body>
                  <Card.Title className="fw-bold">Chef's Table Experience</Card.Title>
                  <Card.Text>
                    An exclusive culinary journey with personalized menu and wine pairings (up to 8 guests)
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="bg-transparent border-0">
                  <Button
                    variant="primary"
                    onClick={() => (window.location.href = '/events')}
                  >
                    Reserve Chef's Table
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials py-5 mb-5 bg-light">
        <Container>
          <h2 className="text-center fw-bold mb-5" id="gk">
            What Our Guests Say
          </h2>
          <Row className="g-4">
            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm p-4">
                <div className="d-flex align-items-center mb-3">
                  <img
                    src="/images/testimonial-1.jpg"
                    alt="Guest"
                    className="rounded-circle me-3"
                    width="60"
                    height="60"
                  />
                  <div>
                    <h5 className="mb-0 fw-bold">Sarah Johnson</h5>
                    <small className="text-muted">Food Critic</small>
                  </div>
                </div>
                <p className="mb-0">
                  "The tasting menu was a revelation - each course more surprising and delightful than the last.
                  The wine pairings were impeccable."
                </p>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm p-4">
                <div className="d-flex align-items-center mb-3">
                  <img
                    src="/images/testimonial-2.jpg"
                    alt="Guest"
                    className="rounded-circle me-3"
                    width="60"
                    height="60"
                  />
                  <div>
                    <h5 className="mb-0 fw-bold">Michael Chen</h5>
                    <small className="text-muted">Regular Guest</small>
                  </div>
                </div>
                <p className="mb-0">
                  "I've dined here over a dozen times and each visit surpasses the last.
                  The service team remembers our preferences, making us feel like family."
                </p>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm p-4">
                <div className="d-flex align-items-center mb-3">
                  <img
                    src="/images/testimonial-3.jpg"
                    alt="Guest"
                    className="rounded-circle me-3"
                    width="60"
                    height="60"
                  />
                  <div>
                    <h5 className="mb-0 fw-bold">David & Emily Rodriguez</h5>
                    <small className="text-muted">Wedding Anniversary</small>
                  </div>
                </div>
                <p className="mb-0">
                  "Celebrated our 10th anniversary in the private dining room.
                  The team created a custom menu that incorporated elements from our first date."
                </p>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Promotional Section */}
      <section className="promo-section bg-dark text-white py-5 mb-5 overflow-hidden">
        <Container>
          <Row className="align-items-center">
            <Col lg={5}>
              <h2 className="fw-bold mb-4">Wine Pairing Dinners</h2>
              <p className="mb-4">
                Join us for our monthly wine pairing series, where our chefs collaborate
                with renowned winemakers to create unforgettable flavor symphonies.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Button
                  onClick={() => (window.location.href = '/events')}
                  variant="light"
                  size="lg"
                  className="px-4"
                >
                  View Schedule
                </Button>
                <Button
                  onClick={() => (window.location.href = '/contact')}
                  variant="outline-light"
                  size="lg"
                  className="px-4"
                >
                  Contact Sommelier
                </Button>
              </div>
            </Col>
            <Col lg={7} className="mt-4 mt-lg-0">
              <div className="position-relative rounded overflow-hidden promo-img-container">
                <img
                  src="/images/food1.jpg.jpg"
                  alt="Wine pairing dinner"
                  className="img-fluid w-100 rounded-4 bg-primary"
                  style={{ transform: 'rotate(-2deg)' }}
                  onError={(e) => {
                    e.target.src = placeholderImage;
                  }}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* About Us */}
      <section className="about-us bg-light py-5 mb-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="pr-lg-5">
              <h3 className="fw-bold text-primary mb-3">Our Story</h3>
              <h4 className="mb-3" id="gk">A Legacy of Culinary Excellence</h4>
              <p className="text-muted">
                Founded in 2005 by Chef Elena Vasquez, our restaurant began as a small bistro
                with a big dream. Today, we've grown into a destination dining experience,
                recognized with multiple Michelin stars and James Beard awards.
              </p>
              <p className="text-muted">
                What hasn't changed is our commitment to treating every guest like family
                and every ingredient with respect. Our team of 50+ culinary professionals
                works tirelessly to maintain this standard of excellence.
              </p>
              <div className="d-flex gap-3 mt-4">
                <Button
                  onClick={() => (window.location.href = '/about')}
                  variant="primary"
                  size="lg"
                  className="px-4"
                >
                  Our History
                </Button>
                <Button
                  onClick={() => (window.location.href = '/careers')}
                  variant="outline-primary"
                  size="lg"
                  className="px-4"
                >
                  Join Our Team
                </Button>
              </div>
            </Col>
            <Col lg={6} className="mt-4 mt-lg-0">
              <img
                src="/images/restaurant-interior.jpg"
                alt="Restaurant Interior"
                className="img-fluid rounded-4 shadow"
                style={{ maxHeight: '400px', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.src = placeholderImage;
                }}
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Buttons */}
      <Container className="text-center my-5">
        <Button
          onClick={() => (window.location.href = '/contact')}
          variant="success"
          size="lg"
          className="px-5 me-3 btn-shadow"
        >
          📞 Contact Us
        </Button>
        <Button
          onClick={() => (window.location.href = '/gift-cards')}
          variant="outline-primary"
          size="lg"
          className="px-5"
        >
          🎁 Gift Cards
        </Button>
      </Container>
    </div>
  );
}
