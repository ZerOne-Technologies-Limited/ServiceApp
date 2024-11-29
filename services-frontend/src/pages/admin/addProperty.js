import React, { useState } from 'react';
import { createProperty } from '../../services/apiService';

const AddProperty = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const property = { ...formData, createdAt: new Date(), updatedAt: new Date() };
      await createProperty(property);
      setStatus('Property created successfully!');
      setFormData({ name: '', address: '' }); // Clear form
    } catch (error) {
      setStatus('Failed to create property.');
    }
  };

  return (
    <div>
      <h2>Create Property</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
};

export default AddProperty;
