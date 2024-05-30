import React, { useState } from 'react';

const Signup = ({ onSignupSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    interestedSectors: [],
  });

  const sectors = ['IT', 'Health', 'Technology', 'Finance', 'Energy'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSectorChange = (e) => {
    const { options } = e.target;
    const selectedSectors = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedSectors.push(options[i].value);
      }
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      interestedSectors: selectedSectors,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log('Form data being sent:', formData); // Log form data
  
    try {
      const response = await fetch('http://localhost:8888/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errorData = await response.json(); // Parse error response
        throw new Error(errorData.message || 'Signup failed');
      }
  
      const data = await response.json();
      onSignupSuccess();
      console.log('User created successfully:', data.message);
    } catch (error) {
      console.error('Signup failed:', error.message);
    }
  };
  
  return (
    <div className="container-md">
      <main className="form-signin text-center" style={{ maxWidth: '400px', margin: 'auto', marginTop: '80px' }}>
        <form onSubmit={handleSubmit}>
          <h1 className="h3 mb-3 fw-normal">Please sign up</h1>
          <div className="form-floating">
            <input type="text" className="form-control" id="floatingFirstName" placeholder="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
            <label htmlFor="floatingFirstName">First Name</label>
          </div>
          <div className="form-floating">
            <input type="text" className="form-control" id="floatingMiddleName" placeholder="Middle Name" name="middleName" value={formData.middleName} onChange={handleChange} />
            <label htmlFor="floatingMiddleName">Middle Name</label>
          </div>
          <div className="form-floating">
            <input type="text" className="form-control" id="floatingLastName" placeholder="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
            <label htmlFor="floatingLastName">Last Name</label>
          </div>
          <div className="form-floating">
            <input type="tel" className="form-control" id="floatingPhone" placeholder="Phone" name="phone" value={formData.phone} onChange={handleChange} />
            <label htmlFor="floatingPhone">Phone</label>
          </div>
          <div className="form-floating">
            <input type="email" className="form-control" id="floatingEmail" placeholder="Email" name="email" value={formData.email} onChange={handleChange} />
            <label htmlFor="floatingEmail">Email</label>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <div className="form-group">
            <label htmlFor="interestedSectors">Interested Sectors</label>
            <select multiple className="form-control" id="interestedSectors" name="interestedSectors" value={formData.interestedSectors} onChange={handleSectorChange}>
              {sectors.map((sector) => (
                <option key={sector} value={sector}>
                  {sector}
                </option>
              ))}
            </select>
          </div>
          <button className="btn btn-primary btn-custom-width py-2" type="submit">
            Sign Up
          </button>
          <p>Already have an account? <a href="#" onClick={() => onSignupSuccess()}>Sign in</a></p>
          <p className="mt-5 mb-3 text-body-secondary">&copy; 2017–2023</p>
        </form>
      </main>
    </div>
  );
};

export default Signup;
