import React from 'react';

function CreateAccount() {
  return (
    <div className="page createaccount-page">
      <h1>Create Account</h1>
      <form className="createaccount-form">
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default CreateAccount;
