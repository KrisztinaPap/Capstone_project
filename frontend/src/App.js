import React, { useState } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import Recipes from './components/Recipes';
import Recipe from './components/Recipe';
import AddRecipe from './components/AddRecipe';

// Import Authentication
import { UserContext, UserData } from './components/Authentication/UserAuthentication';

import './custom.css';

export default function App() {

  // User Object to be Stored in Context with useState Hook
  const [user] = useState(UserData);

    return (
      <UserContext.Provider value={user}>
        <Layout>
          <Route exact path='/' component={Home} />
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route path='/profile' component={Profile} />
          <Route exact path='/recipes' component={Recipes} />
          <Route exact path='/recipes/:recipes' component={Recipe} />
          <Route path='/add-recipe' component={AddRecipe} />
        </Layout>
      </UserContext.Provider>
    );
}
