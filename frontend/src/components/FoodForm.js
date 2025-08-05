import React, { useState } from "react";
import { Form, FloatingLabel, Button, Alert } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

function FoodForm({ onAddFood, editingItem, onClose }) {
  const [formData, setFormData] = useState({
    name: editingItem?.name || "",
    description: editingItem?.description || "",
    price: editingItem?.price?.toString() || "",
    category: editingItem?.category || "",
  });
  const [image, setImage] = useState(null); // File object, not URL
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      setError("Name and price are required.");
      toast.error("Name and price are required.");
      return;
    }

    setIsSubmitting(true);
    const formPayload = new FormData();
    formPayload.append("name", formData.name);
    formPayload.append("price", formData.price);
    if (formData.description)
      formPayload.append("description", formData.description);
    if (formData.category) formPayload.append("category", formData.category);
    if (image) formPayload.append("image", image);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("You must be logged in.");
      }

      const url = editingItem
        ? `http://localhost:5000/api/foods/${editingItem._id}`
        : "http://localhost:5000/api/foods";
      const method = editingItem ? "put" : "post";
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axios[method](url, formPayload, config);

      if (onAddFood) onAddFood(response.data);
      if (onClose) onClose();
      toast.success(editingItem ? "Food updated!" : "Food added!");
      setError("");
      setFormData({ name: "", description: "", price: "", category: "" });
      setImage(null);
    } catch (err) {
      const message =
        err.response?.data?.error || err.message || "Failed to save food.";
      setError(message);
      toast.error(message);
      console.error("Food Form Error:", { message, err });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}

      <FloatingLabel label="Name" className="mb-3">
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel label="Price" className="mb-3">
        <Form.Control
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          step="0.01"
          min="0"
          required
        />
      </FloatingLabel>

      <FloatingLabel label="Description (Optional)" className="mb-3">
        <Form.Control
          as="textarea"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </FloatingLabel>

      <FloatingLabel label="Category (Optional)" className="mb-3">
        <Form.Control
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />
      </FloatingLabel>

      <Form.Group controlId="formImage" className="mb-3">
        <Form.Label>Image (Optional)</Form.Label>
        <Form.Control
          type="file"
          onChange={handleImageChange}
          accept="image/*"
        />
      </Form.Group>

      <Button type="submit" disabled={isSubmitting} className="mt-3">
        {isSubmitting ? "Saving..." : editingItem ? "Update Food" : "Add Food"}
      </Button>
    </Form>
  );
}

export default FoodForm;
