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

import './custom.css';

export const UserContext = React.createContext();

export default function App() {
  const [user, setUser] = useState('guest');

  function updateUser() {
    setUser(currentUser => user)
  }

    return (
      <UserContext.Provider value={user}>
        <Layout>
          <Route exact path='/' component={Home} />
          <Route path='/dashboard' component={Dashboard} />        
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route path='/profile' component={Profile} />
          <Route path='/recipes' component={Recipes} />
          <Route path='/recipe' component={Recipe} />
          <Route path='/add-recipe' component={AddRecipe} />
          </Layout>
        </UserContext.Provider>
    );
}
