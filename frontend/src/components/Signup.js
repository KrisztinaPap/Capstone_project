import React from 'react';

const Signup = () => {
  return (
    <>
      <h1>Create Profile (Signup)</h1>

      <form>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
        />

        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
        />

        <label htmlFor="password">Password:</label>
        <input
          type="text"
          id="password"
        />

        <label htmlFor="password2">Re-enter Password:</label>
        <input
          type="text"
          id="password2"
        />

        <input type="submit" value="Submit" />
        </form>
    </>
  );
}

export default Signup;
