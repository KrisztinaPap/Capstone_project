import React from 'react';

const Login = () => {

  return (
    <>
      <h1>Login</h1>

      <form>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
        />

        <label htmlFor="password">Password:</label>
        <input
          type="text"
          id="password"
        />

        <input type="submit" value="Submit" />
      </form>
    </>
  );
}

export default Login;
