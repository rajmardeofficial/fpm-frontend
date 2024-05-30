import React, { useState } from 'react';

const Login = ({ onLoginSuccess, onSignupLinkClick }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8888/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: username,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();

      // Store the access token in local storage
      localStorage.setItem('accessToken', data.token);

      // Call the onLoginSuccess function to update the login state
      onLoginSuccess();

      // You can redirect to another page or perform other actions after successful login
      window.location.href = "/candidatetable";
    } catch (error) {
      console.error('Login failed:', error.message);
      // Handle login error, display an alert, or update state accordingly
    }
  };

  return (
    <div className="container-md">
      <main className="form-signin text-center" style={{ maxWidth: '400px', margin: 'auto', marginTop: '80px' }}>
        <form onSubmit={handleLogin}>
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <div className="form-check text-start my-3">
            <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
          </div>
          <button className="btn btn-primary btn-custom-width py-2" type="submit">
            Sign in
          </button>
          <p>Don't have an account? <a href="#" onClick={onSignupLinkClick}>Signup</a></p>
          <p className="mt-5 mb-3 text-body-secondary">&copy; 2017–2023</p>
        </form>
      </main>
    </div>
  );
};

export default Login;
