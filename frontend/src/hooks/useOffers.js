import { useState, useEffect } from 'react';
import api from '../utils/api';

export const useOffers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // List offers
  const fetchOffers = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/offers');
      setOffers(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch offers');
    } finally {
      setLoading(false);
    }
  };

  // Create offer
  const addOffer = async (offerData) => {
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/offers', offerData);
      await fetchOffers(); // Refresh list
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create offer');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update offer
  const updateOffer = async (id, offerData) => {
    setLoading(true);
    setError('');
    try {
      const res = await api.put(`/offers/${id}`, offerData);
      await fetchOffers(); // Refresh list
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update offer');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete offer (soft delete)
  const deleteOffer = async (id) => {
    setLoading(true);
    setError('');
    try {
      await api.delete(`/offers/${id}`);
      await fetchOffers(); // Refresh list
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete offer');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchOffers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    offers,
    loading,
    error,
    fetchOffers,
    addOffer,
    updateOffer,
    deleteOffer,
  };
};
