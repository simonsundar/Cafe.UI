import React, { useState } from 'react';
import { useNavigate } from '@tanstack/router';

const NewCafe = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCafe = { name, description, location };

    fetch('/cafes', {  // Assuming POST /cafes for adding new café
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCafe),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Café added successfully:', data);
      navigate('/cafes');  // Redirect back to café list
    })
    .catch(error => console.error('Error adding café:', error));
  };

  return (
    <div>
      <h1>Add New Café</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Description:
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>
        <label>
          Location:
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
        </label>
        <button type="submit">Add Café</button>
      </form>
    </div>
  );
};

export default NewCafe;
