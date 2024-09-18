import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from '@tanstack/router';  // For navigation and URL params
import TextBox from './TextBox';

const CafeForm = () => {
  const { cafeId } = useParams();  // Get café ID if editing
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [logo, setLogo] = useState(null);  // To handle the logo file upload
  const [location, setLocation] = useState('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);  // For unsaved changes tracking
  const navigate = useNavigate();

  // Fetch café data if editing
  useEffect(() => {
    if (cafeId) {
      fetch(`/cafes/${cafeId}`)
        .then((response) => response.json())
        .then((data) => {
          setName(data.name);
          setDescription(data.description);
          setLocation(data.location);
          setHasUnsavedChanges(false);  // Set unsaved changes to false once data is loaded
        });
    }
  }, [cafeId]);

  // Handle form change and track unsaved changes
  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setHasUnsavedChanges(true);
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file.size > 2 * 1024 * 1024) {  // Max size: 2MB
      alert('File size should be less than 2MB');
      e.target.value = null;  // Clear the file input
    } else {
      setLogo(file);
    }
    setHasUnsavedChanges(true);
  };

  // Submit form (POST/PUT based on whether it's an edit or new café)
  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare form data
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('location', location);
    if (logo) {
      formData.append('logo', logo);
    }

    const url = cafeId ? `/cafes/${cafeId}` : '/cafes';
    const method = cafeId ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(cafeId ? 'Cafe updated' : 'Cafe added', data);
        setHasUnsavedChanges(false);  // Reset unsaved changes flag
        navigate('/cafes');  // Redirect to cafe list
      })
      .catch((error) => console.error('Error submitting café:', error));
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

  // Handle cancel (navigate back to cafés list)
  const handleCancel = () => {
    if (hasUnsavedChanges && window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
      navigate('/cafes');
    } else if (!hasUnsavedChanges) {
      navigate('/cafes');
    }
  };

  return (
    <div>
      <h1>{cafeId ? 'Edit Cafe' : 'Add New Cafe'}</h1>
      <form onSubmit={handleSubmit}>
        {/* Reusable Textbox components for name, description, and location */}
        <TextBox
          label="Name"
          value={name}
          onChange={handleInputChange(setName)}
          placeholder="Enter café name"
          minLength={6}
          maxLength={10}
          required
        />
        <TextBox
          label="Description"
          value={description}
          onChange={handleInputChange(setDescription)}
          placeholder="Enter café description"
          maxLength={256}
          required
        />
        <div>
          <label>Logo</label>
          <input type="file" onChange={handleLogoChange} />
          {logo && <small>{logo.name} ({(logo.size / (1024 * 1024)).toFixed(2)} MB)</small>}
        </div>
        <TextBox
          label="Location"
          value={location}
          onChange={handleInputChange(setLocation)}
          placeholder="Enter café location"
          required
        />
        <button type="submit">{cafeId ? 'Update Café' : 'Add Café'}</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default CafeForm;
