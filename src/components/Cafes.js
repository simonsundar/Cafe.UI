import React, { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/router';  // For navigation to the employees page

const Cafes = () => {
  const [cafes, setCafes] = useState([]);
  const [filteredCafes, setFilteredCafes] = useState([]);
  const [locationFilter, setLocationFilter] = useState('');
  const navigate = useNavigate();

  // Fetch cafes on component mount
  useEffect(() => {
    fetch('/cafes')  // Call the GET /cafes endpoint
      .then(response => response.json())
      .then(data => {
        setCafes(data);
        setFilteredCafes(data); // Initially, show all cafes
      })
      .catch(error => console.error('Error fetching cafes:', error));
  }, []);

  // Filter cafes by location
  const handleFilterChange = (e) => {
    setLocationFilter(e.target.value);
    const filtered = cafes.filter(cafe => 
      cafe.location.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredCafes(filtered);
  };

  // Navigate to Employees page for a specific cafe
  const goToEmployees = (cafeId) => {
    navigate(`/cafes/${cafeId}/employees`);  // Navigate to employees page
  };

  return (
    <div>
      <h1>Cafés</h1>
      
      {/* Add New Café Button */}
      <button onClick={() => navigate('/cafes/new')}>Add New Café</button>
      
      {/* Filter by Location */}
      <input 
        type="text" 
        placeholder="Filter by location" 
        value={locationFilter} 
        onChange={handleFilterChange} 
      />
      
      {/* Café Table */}
      <table>
        <thead>
          <tr>
            <th>Logo</th>
            <th>Name</th>
            <th>Description</th>
            <th>Employees</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCafes.map((cafe) => (
            <tr key={cafe.id}>
              <td><img src={cafe.logo} alt={`${cafe.name} logo`} width="50" height="50" /></td>
              <td>{cafe.name}</td>
              <td>{cafe.description}</td>
              <td>
                <button onClick={() => goToEmployees(cafe.id)}>View Employees</button>
              </td>
              <td>{cafe.location}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Cafes;
