import React, { useContext } from 'react';
import ReactDOM from 'react-dom';

// Import Authentication
import { UserContext, Authorize } from './Authentication/UserAuthentication';

const AddRecipe = () => {

  // Create user from UserContext
  const user = useContext(UserContext);

  // Check for User's Authentication
  Authorize();

  return (
    <h1>AddRecipe page</h1>
  );
}

export default AddRecipe;
