import React, { useState } from 'react';
import { useNavigate } from '@tanstack/router';

const NewEmployee = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [daysWorked, setDaysWorked] = useState('');
  const [cafeName, setCafeName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEmployee = { name, email, phone, daysWorked, cafeName };

    fetch('/employees', {  // Assuming POST /employees for adding new employee
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEmployee),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Employee added successfully:', data);
      navigate('/cafes');  // Redirect back to café list
    })
    .catch(error => console.error('Error adding employee:', error));
  };

  return (
    <div>
      <h1>Add New Employee</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Phone:
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </label>
        <label>
          Days Worked:
          <input type="text" value={daysWorked} onChange={(e) => setDaysWorked(e.target.value)} required />
        </label>
        <label>
          Café Name:
          <input type="text" value={cafeName} onChange={(e) => setCafeName(e.target.value)} required />
        </label>
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default NewEmployee;
