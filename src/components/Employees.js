import React, { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/router';  // For navigation to add/edit employee

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  // Fetch employees on component mount
  useEffect(() => {
    fetch('/employees')  // Call the GET /employees endpoint
      .then(response => response.json())
      .then(data => setEmployees(data))
      .catch(error => console.error('Error fetching employees:', error));
  }, []);

  // Navigate to edit employee page
  const editEmployee = (employeeId) => {
    navigate(`/employees/${employeeId}/edit`);
  };

  // Delete an employee
  const deleteEmployee = (employeeId) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      fetch(`/employees/${employeeId}`, {
        method: 'DELETE',
      })
      .then(response => {
        if (response.ok) {
          // Remove employee from state after successful deletion
          setEmployees(employees.filter(employee => employee.id !== employeeId));
        } else {
          console.error('Error deleting employee:', response);
        }
      })
      .catch(error => console.error('Error deleting employee:', error));
    }
  };

  return (
    <div>
      <h1>Employees</h1>
      
      {/* Add New Employee Button */}
      <button onClick={() => navigate('/employees/new')}>Add New Employee</button>
      
      {/* Employee Table */}
      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Days Worked</th>
            <th>Café Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.phone}</td>
              <td>{employee.daysWorked}</td>
              <td>{employee.cafeName}</td>
              <td>
                <button onClick={() => editEmployee(employee.id)}>Edit</button>
                <button onClick={() => deleteEmployee(employee.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Employees;
