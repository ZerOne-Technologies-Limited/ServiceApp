import React, { useState, useEffect } from 'react';
import { createMachine } from '../../services/apiService';

const MachineForm = (Property) => {
  const [formData, setFormData] = useState({
    name: '',
    qrCodeUrl: '',
    propertyId: Property.id,
  });

  const [properties, setProperties] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    // Fetch properties for the dropdown
    const fetchProperties = async () => {
      try {
        // Example API call to get properties, adjust accordingly
        const response = await axios.get(`${API_BASE_URL}/properties`);
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };
    fetchProperties();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const machine = { ...formData, createdAt: new Date(), updatedAt: new Date() };
      await createMachine(machine);
      setStatus('Machine created successfully!');
      setFormData({ name: '', qrCodeUrl: '', propertyId: '' }); // Clear form
    } catch (error) {
      setStatus('Failed to create machine.');
    }
  };

  return (
    <div>
      <h2>Create Machine</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Machine Name</label>
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
          <label htmlFor="qrCodeUrl">QR Code URL</label>
          <input
            type="text"
            id="qrCodeUrl"
            name="qrCodeUrl"
            value={formData.qrCodeUrl}
            onChange={handleChange}
            required
          />
        </div>
        {/* <div>
          <label htmlFor="propertyId">Property</label>
          <select
            id="propertyId"
            name="propertyId"
            value={formData.propertyId}
            onChange={handleChange}
            required
          >
            <option value="">Select a property</option>
            {properties.map((property) => (
              <option key={property.id} value={property.id}>
                {property.name}
              </option>
            ))}
          </select>
        </div> */}
        <button type="submit">Submit</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
};

export default MachineForm;
