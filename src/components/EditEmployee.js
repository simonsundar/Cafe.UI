import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from '@tanstack/router';

const EditEmployee = () => {
  const { employeeId } = useParams();  // Get employeeId from URL params
  const [employee, setEmployee] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/employees/${employeeId}`)  // Fetch employee data
      .then(response => response.json())
      .then(data => setEmployee(data))
      .catch(error => console.error('Error fetching employee:', error));
  }, [employeeId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`/employees/${employeeId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(employee),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Employee updated successfully:', data);
      navigate('/cafes');  // Redirect back to café list
    })
    .catch(error => console.error('Error updating employee:', error));
  };

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit Employee</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input 
            type="text" 
            value={employee.name} 
            onChange={(e) => setEmployee({ ...employee, name: e.target.value })} 
            required 
          />
        </label>
        <label>
          Email:
          <input 
            type="email" 
            value={employee.email} 
            onChange={(e) => setEmployee({ ...employee, email: e.target.value })} 
            required 
          />
        </label>
        <label>
          Phone:
          <input 
            type="text" 
            value={employee.phone} 
            onChange={(e) => setEmployee({ ...employee, phone: e.target.value })} 
            required 
          />
        </label>
        <label>
          Days Worked:
          <input 
            type="text" 
            value={employee.daysWorked} 
            onChange={(e) => setEmployee({ ...employee, daysWorked: e.target.value })} 
            required 
          />
        </label>
        <label>
          Café Name:
          <input 
            type="text" 
            value={employee.cafeName} 
            onChange={(e) => setEmployee({ ...employee, cafeName: e.target.value })} 
            required 
          />
        </label>
        <button type="submit">Update Employee</button>
      </form>
    </div>
  );
};

export default EditEmployee;
