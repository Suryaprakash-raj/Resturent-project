import { useState } from 'react';
import { Card, Col, Row, Container, Button, Badge } from 'react-bootstrap';

import '../styles/events.css';

// Dummy event data with public folder images
const dummyEvents = [
  {
    id: 1,
    title: "Gourmet Food Festival",
    description: "Join us for a celebration of culinary excellence featuring top chefs from around the world.",
    date: "2023-12-15T19:00:00",
    location: "Central Park, New York",
    seats: 120,
    image: "/images/events/event1.jpg",
    category: "food"
  },
  {
    id: 2,
    title: "Wine Tasting Masterclass",
    description: "Learn about fine wines from our expert sommeliers with samples from top vineyards.",
    date: "2023-11-20T18:30:00",
    location: "Vineyard Estate, Napa Valley",
    seats: 40,
    image: "/images/events/event2.jpg",
    category: "drinks"
  },
  {
    id: 3,
    title: "Mixology Workshop",
    description: "Hands-on cocktail making class with award-winning bartenders.",
    date: "2023-12-05T17:00:00",
    location: "Downtown Lounge, Chicago",
    seats: 25,
    image: "/images/events/event3.jpg",
    category: "drinks"
  },
  {
    id: 4,
    title: "Farm-to-Table Dinner",
    description: "Five-course meal featuring locally sourced, seasonal ingredients.",
    date: "2023-11-25T20:00:00",
    location: "Organic Farms, Vermont",
    seats: 50,
    image: "/images/events/event4.jpg",
    category: "food"
  },
  {
    id: 5,
    title: "Chocolate Making Class",
    description: "Learn the art of chocolate making from bean to bar with master chocolatiers.",
    date: "2023-12-10T15:00:00",
    location: "Sweet Dreams Factory, San Francisco",
    seats: 30,
    image: "/images/events/event5.jpg",
    category: "food"
  },
  {
    id: 6,
    title: "Craft Beer Festival",
    description: "Sample over 100 craft beers from microbreweries across the country.",
    date: "2023-11-18T12:00:00",
    location: "Harbor Front, Boston",
    seats: 200,
    image: "/images/events/event6.jpg",
    category: "drinks"
  },
  {
    id: 7,
    title: "Italian Cooking Class",
    description: "Master authentic Italian recipes with Chef Giovanni in this hands-on workshop.",
    date: "2023-12-03T16:00:00",
    location: "Cucina Italiana, Little Italy",
    seats: 20,
    image: "/images/events/event7.jpg",
    category: "food"
  },
  {
    id: 8,
    title: "Sushi Rolling Workshop",
    description: "Learn the art of sushi making from Japanese master chefs.",
    date: "2023-11-30T18:00:00",
    location: "Tokyo Kitchen, Los Angeles",
    seats: 15,
    image: "/images/events/event8.jpg",
    category: "food"
  },
  {
    id: 9,
    title: "Coffee Brewing Seminar",
    description: "Discover specialty coffee brewing techniques from world champion baristas.",
    date: "2023-12-08T10:00:00",
    location: "Bean There Cafe, Seattle",
    seats: 35,
    image: "/images/events/event9.jpg",
    category: "drinks"
  },
  {
    id: 10,
    title: "Dessert Pairing Night",
    description: "Experience exquisite desserts paired with perfect wines and coffees.",
    date: "2023-12-12T19:30:00",
    location: "Sweet Spot Patisserie, Miami",
    seats: 30,
    image: "/images/events/event10.jpg",
    category: "food"
  }
];

export default function EventsDashboard() {
  const [filter, setFilter] = useState('all');

  const filteredEvents = dummyEvents.filter(event => {
    if (filter === 'food') return event.category === 'food';
    if (filter === 'drinks') return event.category === 'drinks';
    return true;
  });

  const formatDate = (dateString) => {
    const options = { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <Container className="events-container">
      <div className="header-section">
        <h1 className="page-title" id='fg'>Upcoming Culinary Events</h1>
        <p className="page-subtitle">Discover unforgettable food and drink experiences</p>
        
        <div className="filter-buttons">
          <Button 
            variant={filter === 'all' ? 'primary' : 'outline-primary'} 
            onClick={() => setFilter('all')}
          >
            All Events
          </Button>
          <Button 
            variant={filter === 'food' ? 'primary' : 'outline-primary'} 
            onClick={() => setFilter('food')}
            className="mx-2"
          >
            Food Events
          </Button>
          <Button 
            variant={filter === 'drinks' ? 'primary' : 'outline-primary'} 
            onClick={() => setFilter('drinks')}
          >
            Drink Events
          </Button>
        </div>
      </div>

      <Row className="event-cards-row">
        {filteredEvents.map(event => (
          <Col key={event.id} lg={4} md={6} className="mb-4">
            <Card className="event-card h-100">
              <div className="card-image-container">
                <Card.Img variant="top" src={event.image} className="card-image" />
                <Badge bg="light" text="dark" className="event-badge">
                  {event.category === 'food' ? 'Food' : 'Drinks'}
                </Badge>
              </div>
              <Card.Body>
                <Card.Title>{event.title}</Card.Title>
                <Card.Text className="event-description">
                  {event.description}
                </Card.Text>
                
                <div className="event-details">
                  <div className="detail-item">
                    <i className="bi bi-calendar-event"></i>
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="detail-item">
                    <i className="bi bi-geo-alt"></i>
                    <span>{event.location}</span>
                  </div>
                  <div className="detail-item">
                    <i className="bi bi-people"></i>
                    <span>{event.seats} seats available</span>
                  </div>
                </div>
              </Card.Body>
              <Card.Footer className="bg-transparent">
                <Button variant="primary" className="w-100">
                  Book Now
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}