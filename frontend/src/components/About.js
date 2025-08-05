import { Row, Col, Card } from "react-bootstrap";
import "../styles/about.css";

// Team images (keep filenames exactly as shown)
import chef1 from "../assets/team/chef 1.jpg";
import chef2 from "../assets/team/chef 2.jpg";
import chef3 from "../assets/team/chef 3.jpg";
import chef4 from "../assets/team/chef 4.jpg";

// Photo gallery images (corrected filenames: removed double extensions)
import gallery1 from "../assets/gallery/gallery1.jpg.jpg";
import gallery2 from "../assets/gallery/gallery2.jpg.jpg";
import gallery3 from "../assets/gallery/gallery3.jpg.jpg";
import gallery4 from "../assets/gallery/gallery4.jpg.jpg";
import gallery5 from "../assets/gallery/gallery5.jpg.jpg";
import gallery6 from "../assets/gallery/gallery6.jpg.jpg";

export default function About() {
  return (
    <div className="container mt-4 mb-5">
      <h2 className="text-center mb-4 stylish-heading" id="hello">
        About Us
      </h2>

      <div className="bg-light rounded p-4 mb-4 about-intro">
        <p>
          Welcome to <span className="fw-bold">Restaurant Name</span>! Here you can savor
          delicious dishes, enjoy seasonal offers, book tables, and join our vibrant
          events. We are dedicated to delivering an exceptional dining experience with fresh,
          locally-sourced ingredients and warm hospitality.
        </p>
      </div>

      {/* Info Cards Section */}
      <Row className="g-4 mb-5">
        <Col md={6} lg={4}>
          <Card className="h-100 about-card">
            <Card.Body>
              <Card.Title className="text-center fw-bold mb-3">Our Story</Card.Title>
              <Card.Text>
                Founded in 2020, our restaurant has quickly become a favorite among food lovers.
                Our journey began with a passion for authentic cuisine and a love for sharing
                memorable moments with friends, family, and guests.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={4}>
          <Card className="h-100 about-card">
            <Card.Body>
              <Card.Title className="text-center fw-bold mb-3">Our Mission</Card.Title>
              <Card.Text>
                We strive to create a welcoming atmosphere, serve high-quality food, and always
                put our guests first. Every dish is crafted with care, and every visit is designed
                to feel special.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={4}>
          <Card className="h-100 about-card">
            <Card.Body>
              <Card.Title className="text-center fw-bold mb-3">Our Values</Card.Title>
              <ul>
                <li>Quality ingredients, cooked to perfection</li>
                <li>Exceptional customer service</li>
                <li>Warm, inviting atmosphere</li>
                <li>Sustainable and community-focused</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Meet Our Team & Gallery Section */}
      <Row className="g-4 mb-5">
        {/* Meet Our Team */}
        <Col md={6}>
          <Card className="h-100 about-card">
            <Card.Body>
              <Card.Title className="text-center fw-bold mb-3">Meet Our Team</Card.Title>
              <div className="d-flex flex-wrap justify-content-center gap-4 py-3">
                {[ 
                  { img: chef1, alt: "Chef Joël Robuchon", name: "Chef Joël Robuchon", title: "Head Chef", specialty: "Modern French Cuisine" },
                  { img: chef2, alt: "Chef Gordon Ramsay", name: "Chef Gordon Ramsay", title: "Culinary Advisor", specialty: "World French Classics" },
                  { img: chef3, alt: "Julia Child", name: "Julia Child", title: "Guest Partner", specialty: "British & Fusion Cuisine" },
                  { img: chef4, alt: "Chef Thomas Keller", name: "Chef Thomas Keller", title: "Inspiration", specialty: "French & Educational" }
                ].map((member, i) => (
                  <div className="team-member text-center" key={i}>
                    <div
                      className="team-avatar rounded-circle overflow-hidden mx-auto mb-2"
                      style={{
                        width: "100px",
                        height: "100px",
                        border: "3px solid #fff",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                      }}
                    >
                      <img
                        src={member.img}
                        alt={member.alt}
                        className="img-fluid w-100 h-100"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <h6 className="fw-bold">{member.name}</h6>
                    <p className="text-muted mb-0">{member.title}</p>
                    <small className="text-muted">{member.specialty}</small>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Photo Gallery */}
        <Col md={6}>
          <Card className="h-100 about-card">
            <Card.Body>
              <Card.Title className="text-center fw-bold mb-3">Photo Gallery</Card.Title>
              <div className="gallery-grid">
                {[gallery1, gallery2, gallery3, gallery4, gallery5, gallery6].map((imgSrc, idx) => (
                  <div className="gallery-item" key={idx}>
                    <img src={imgSrc} alt={`Gallery ${idx + 1}`} className="gallery-img" />
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Customer Testimonials */}
      <Row className="g-4 mb-5">
        <Col>
          <Card className="about-card p-4">
            <Card.Title className="text-center fw-bold mb-4">What Our Customers Say</Card.Title>
            <Row className="g-4">
              {[
                {name: "Anjali K.", feedback: "Amazing food and the best ambiance in town! Highly recommend.", rating: 5},
                {name: "Ravi S.", feedback: "Excellent customer service and the chef's specials are a must-try.", rating: 4},
                {name: "Meena P.", feedback: "The seasonal offers are great value. Love the cozy environment.", rating: 5},
              ].map((testimonial, i) => (
                <Col md={4} key={i}>
                  <Card className="shadow-sm h-100">
                    <Card.Body>
                      <Card.Text>"{testimonial.feedback}"</Card.Text>
                      <p className="fw-bold mb-0">{testimonial.name}</p>
                      <p className="text-warning mb-0">
                        {'⭐️'.repeat(testimonial.rating)}{'☆'.repeat(5 - testimonial.rating)}
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Awards & Recognitions */}
      <Row className="g-4 mb-5">
        <Col>
          <Card className="about-card p-4 text-center">
            <Card.Title className="fw-bold mb-4">Awards & Recognitions</Card.Title>
            <p>
              🏆 Best Restaurant Award 2023 - Foodie Awards <br/>
              🍽️ Excellence in Culinary Arts - National Food Council <br/>
              🌿 Sustainable Business Award 2024 - Green Eats Association
            </p>
          </Card>
        </Col>
      </Row>

      {/* Opening Hours */}
      <Row className="g-4 mb-5">
        <Col md={6} className="mx-auto">
          <Card className="about-card p-4 text-center">
            <Card.Title className="fw-bold mb-4">Opening Hours</Card.Title>
            <table className="table table-borderless mb-0">
              <tbody>
                <tr><td>Monday - Friday</td><td>11:00 AM - 10:00 PM</td></tr>
                <tr><td>Saturday</td><td>12:00 PM - 11:00 PM</td></tr>
                <tr><td>Sunday</td><td>Closed</td></tr>
              </tbody>
            </table>
          </Card>
        </Col>
      </Row>

      {/* Contact Us Section */}
      
    </div>
  );
}
