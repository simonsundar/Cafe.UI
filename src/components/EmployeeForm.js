import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from '@tanstack/router';  // For navigation and URL params
import TextBox from './TextBox';

const EmployeeForm = () => {
  const { employeeId } = useParams();  // Get employee ID if editing
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');  // Radio button group
  const [assignedCafe, setAssignedCafe] = useState('');
  const [cafes, setCafes] = useState([]);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);  // For unsaved changes tracking
  const navigate = useNavigate();

  // Fetch employee data if editing
  useEffect(() => {
    if (employeeId) {
      fetch(`/employees/${employeeId}`)
        .then((response) => response.json())
        .then((data) => {
          setName(data.name);
          setEmail(data.email);
          setPhone(data.phone);
          setGender(data.gender);
          setAssignedCafe(data.assignedCafe || '');
          setHasUnsavedChanges(false);  // Set unsaved changes to false once data is loaded
        });
    }
  }, [employeeId]);

  // Fetch cafes for dropdown
  useEffect(() => {
    fetch('/cafes')
      .then(response => response.json())
      .then(data => setCafes(data))
      .catch(error => console.error('Error fetching cafes:', error));
  }, []);

  // Handle input change and track unsaved changes
  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setHasUnsavedChanges(true);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
    setHasUnsavedChanges(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const employeeData = {
      name,
      email,
      phone,
      gender,
      assignedCafe: assignedCafe || null,
    };

    const url = employeeId ? `/employees/${employeeId}` : '/employees';
    const method = employeeId ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(employeeData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(employeeId ? 'Employee updated' : 'Employee added', data);
        setHasUnsavedChanges(false);  // Reset unsaved changes flag
        navigate('/employees');  // Redirect to employee list
      })
      .catch((error) => console.error('Error submitting employee:', error));
  };

  // Warn user about unsaved changes before leaving
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (hasUnsavedChanges) {
        event.preventDefault();
        event.returnValue = '';  // Chrome requires returnValue to be set
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  // Handle cancel (navigate back to employees list)
  const handleCancel = () => {
    if (hasUnsavedChanges && window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
      navigate('/employees');
    } else if (!hasUnsavedChanges) {
      navigate('/employees');
    }
  };
  

  return (
    <div>
      <h1>{employeeId ? 'Edit Employee' : 'Add New Employee'}</h1>
      <form onSubmit={handleSubmit}>
        {/* Reusable Textbox components for name, email, and phone */}
        <TextBox
          label="Name"
          value={name}
          onChange={handleInputChange(setName)}
          placeholder="Enter employee name"
          minLength={6}
          maxLength={10}
          required
        />
        <TextBox
          label="Email Address"
          value={email}
          onChange={handleInputChange(setEmail)}
          placeholder="Enter employee email"
          type="email"
          required
        />
        <TextBox
          label="Phone Number"
          value={phone}
          onChange={handleInputChange(setPhone)}
          placeholder="Enter employee phone number"
          maxLength={8}
          required
        />
        <div>
          <label>Gender</label>
          <label>
            <input
              type="radio"
              value="male"
              checked={gender === 'male'}
              onChange={handleGenderChange}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              value="female"
              checked={gender === 'female'}
              onChange={handleGenderChange}
            />
            Female
          </label>
          <label>
            <input
              type="radio"
              value="other"
              checked={gender === 'other'}
              onChange={handleGenderChange}
            />
            Other
          </label>
        </div>
        <div>
          <label>Assigned Café (optional)</label>
          <select value={assignedCafe} onChange={handleInputChange(setAssignedCafe)}>
            <option value="">Select Café</option>
            {cafes.map(cafe => (
              <option key={cafe.id} value={cafe.id}>{cafe.name}</option>
            ))}
          </select>
        </div>
        <button type="submit">{employeeId ? 'Update Employee' : 'Add Employee'}</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default EmployeeForm;
