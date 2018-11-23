import React from 'react';

const Login = ({ authenticate }) => (
  <nav className="login">
    <h2>Inventory Login</h2>
    <p>Sign in to manage your inventory</p>
    <button className="github" onClick={() => authenticate('Github')}>
      Github Login
    </button>
  </nav>
);

export default Login;
