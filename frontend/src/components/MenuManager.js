import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Container, Row, Col, Button, Spinner, Alert, Card } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/api';
import { toast } from 'react-toastify';
import { Modal, Form } from 'react-bootstrap';
import SearchBar from '../components/SearchBar';

export default function MenuManager() {
  const { isAuthenticated } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  // Fetch menu items (and re-fetch on search change)
  const fetchMenuItems = useCallback(async () => {
    setLoading(true);
    try {
      const endpoint = searchQuery ? `/menu/search?name=${searchQuery}` : '/menu';
      const res = await api.get(endpoint);
      setItems(res.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load menu items');
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    fetchMenuItems();
  }, [fetchMenuItems]);

  // Handle image file selection + preview
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  // Handle food item added/updated via form
 const handleFormSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const imageFile = fileInputRef.current?.files[0];

  try {
    // Prepare data for API
    const data = new FormData();
    data.append('name', formData.get('name'));
    data.append('price', formData.get('price'));
    data.append('description', formData.get('description'));
    data.append('category', formData.get('category'));
    if (imageFile) data.append('image', imageFile);

    const res = await api.post('/foods', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    toast.success('Food added successfully!', res.data);
    setItems([...items, res.data]);
    handleCloseModal();
  } catch (err) {
    toast.error('Failed to add food', err.response?.data?.error || err.message);
    console.error('Failed to add food:', err.response?.data);
  }
};

  // Delete item
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      await api.delete(`/foods/${id}`);
      setItems(items.filter(item => item._id !== id));
      toast.success('Food deleted');
    } catch {
      toast.error('Failed to delete food');
    }
  };

  // Close modal and reset form state
  const handleCloseModal = () => {
    setShowForm(false);
    setEditingItem(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  if (loading) return <Container className="mt-4 text-center"><Spinner animation="border" /></Container>;
  if (error) return <Container className="mt-4"><Alert variant="danger">{error}</Alert></Container>;

  return (
    <Container className="mt-4">
      <Row className="mb-3 align-items-center">
        <Col xs={12} md={8}>
          <h2>Menu Manager</h2>
        </Col>
        <Col xs={12} md={4} className="text-md-end mt-2 mt-md-0">
          {isAuthenticated && (
            <Button onClick={() => { setEditingItem(null); setShowForm(true); }}>
              + Add New Food
            </Button>
          )}
        </Col>
      </Row>

      <SearchBar
        placeholder="Search menu items..."
        onSearch={setSearchQuery}
        initialValue={searchQuery}
      />

      <Row>
        {items.map((item) => (
          <Col key={item._id} md={4} sm={6} xs={12} className="mb-4">
            <Card>
              <Card.Img variant="top" src={item.image || '/placeholder.jpg'} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
                <Card.Text className="fw-bold">₹{item.price}</Card.Text>
                {isAuthenticated && (
                  <div className="mt-2">
                    <Button
                      variant="success"
                      size="sm"
                      className="me-2"
                      onClick={() => {
                        setEditingItem(item);
                        setImagePreview(item.image && item.image.startsWith('http') ? item.image : null);
                        setShowForm(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Add/Edit Food Form Modal */}
      <Modal show={showForm} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editingItem ? 'Edit Food Item' : 'Add New Food Item'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" defaultValue={editingItem?.name} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price (₹)</Form.Label>
              <Form.Control
                type="number"
                name="price"
                min="1"
                defaultValue={editingItem?.price}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                defaultValue={editingItem?.description}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control name="category" defaultValue={editingItem?.category} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image (optional)</Form.Label>
              {/* File input for image upload */}
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
              />
              {/* Image preview */}
              {(imagePreview || editingItem?.image) && (
                <img
                  src={
                    imagePreview ||
                    (editingItem?.image && editingItem.image.startsWith('http')
                      ? editingItem.image
                      : `${import.meta.env.VITE_UPLOADS_URL || ''}${editingItem?.image}`)
                  }
                  alt="Preview"
                  style={{ maxWidth: '100%', marginTop: '10px', maxHeight: '200px' }}
                />
              )}
            </Form.Group>
            <Button type="submit" variant="primary" className="me-2">
              {editingItem ? 'Update' : 'Add'}
            </Button>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
