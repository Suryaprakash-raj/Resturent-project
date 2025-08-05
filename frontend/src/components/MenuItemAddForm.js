import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import api from '../utils/api';
import { Form, Button, Container, Image } from 'react-bootstrap';

export default function MenuItemAddForm() {
  const { user, token } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    offer: '',
    category: '',
    image: null,
    previewImage: ''
  });

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({
        ...formData,
        image: e.target.files[0],
        previewImage: URL.createObjectURL(e.target.files[0])
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && key !== 'previewImage') data.append(key, value);
    });
    api
      .post('/menu', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(() => {
        toast.success('Menu item added');
        setFormData({
          name: '',
          description: '',
          price: '',
          offer: '',
          category: '',
          image: null,
          previewImage: ''
        });
      })
      .catch(() => toast.error('Failed to add item'));
  };

  if (!user || user.role !== 'admin') {
    return <div className="alert alert-danger mt-4">You are not authorized to access this page.</div>;
  }

  return (
    <Container className="mt-4">
      <h2>Add Food Item</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" name="description" value={formData.description} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control type="number" name="price" value={formData.price} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control type="text" name="category" value={formData.category} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Offer</Form.Label>
          <Form.Control type="text" name="offer" value={formData.offer} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Image</Form.Label>
          <Form.Control type="file" accept="image/*" name="image" onChange={handleChange} />
          {formData.previewImage && (
            <Image src={formData.previewImage} style={{ maxHeight: '200px', marginTop: '10px' }} thumbnail />
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check type="checkbox" label="Featured item" name="featured" />
        </Form.Group>
        <Button type="submit">Add Item</Button>
      </Form>
    </Container>
  );
}
