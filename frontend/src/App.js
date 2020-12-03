import React, { useState } from 'react';
import { Route, Switch } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import Recipes from './components/Recipes';
import Recipe from './components/Recipe';
import AddRecipe from './components/AddRecipe';
import Page404 from './components/Page404';
import Page500 from './components/Page500';

// Import Authentication
import { UserContext, userData } from './components/Authentication/UserAuthentication';

import './custom.css';

export default function App() {

  // User Object to be Stored in Context with useState Hook
  const [user, setUser] = useState(userData);

    return (
      <UserContext.Provider value={[user, setUser]}>
        <Layout>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <Route path='/profile' component={Profile} />
            <Route exact path='/recipes' component={Recipes} />
            <Route exact path='/recipes/:recipes' component={Recipe} />
            <Route path='/add-recipe' component={AddRecipe} />
            <Route exact path='/page404' component={Page404} />
            <Route exact path='/page500' component={Page500} />
            <Route path="*" component={Page404} />
          </Switch>
        </Layout>
      </UserContext.Provider>
    );
}
