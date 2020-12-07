import React from 'react';
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
import AboutUs from './components/AboutUs';
import Page404 from './components/Page404';
import Page500 from './components/Page500';

import { AuthProvider } from './contexts/AuthContext';
import { AuthRoute } from './components/AuthRoute';

import './custom.css';

export default function App() {
    return (
      <AuthProvider>
        <Layout>
          <Switch>
            <Route exact path='/' component={Home} />
            <AuthRoute path='/dashboard' component={Dashboard} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <AuthRoute path='/profile' component={Profile} />
            <AuthRoute exact path='/recipes' component={Recipes} />
            <AuthRoute exact path='/recipes/:recipes' component={Recipe} />
            <AuthRoute path='/add-recipe' component={AddRecipe} />
            <Route exact path='/page404' component={Page404} />
            <Route exact path='/page500' component={Page500} />
            <Route exact path='/about-us' component={AboutUs} />
            <Route path="*" component={Page404} />
          </Switch>
        </Layout>
      </AuthProvider>
    );
}
