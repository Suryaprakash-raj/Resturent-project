import { useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import api from '../utils/api';

export default function MenuItemList({ items, onDelete, isAdmin, onUpdate }) {
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    image: '',
  });

  const handleCloseEdit = () => setEditingItem(null);

  const handleEditClick = (item) => {
    setEditingItem(item._id);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      image: item.image,
    });
  };

  const handleEditChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async () => {
    try {
      const res = await api.put(`/foods/${editingItem}`, formData);
      toast.success('Food updated!');
      onUpdate(res.data);
      handleCloseEdit();
    } catch (err) {
      toast.error('Failed to update food.');
    }
  };

  return (
    <>
      <Row xs={1} md={2} lg={3} className="g-4">
        {items.map((item) => (
          <Col key={item._id}>
            <Card className="h-100">
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
                <Card.Text>{item.price}</Card.Text>
                <Card.Text>{item.category}</Card.Text>
                {isAdmin && (
                  <>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => onDelete(item._id)}
                      className="me-2"
                    >
                      Delete
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleEditClick(item)}
                    >
                      Edit
                    </Button>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={editingItem !== null} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Food Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleEditChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleEditChange}
                step="0.01"
                min="0"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={formData.category}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={formData.image}
                onChange={handleEditChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>Cancel</Button>
          <Button variant="primary" onClick={handleEditSubmit}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

MenuItemList.propTypes = {
  items: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool,
  onUpdate: PropTypes.func,
};
