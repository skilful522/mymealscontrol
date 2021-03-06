import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { useSelector } from 'react-redux';

import Auth from './pages/Auth';

import { selectUser } from './selectors/selectUser';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Loader from './components/Loader';
import { selectIsDisplayLoader } from './selectors/selectLoader';
import GeneralProducts from "./pages/GeneralProducts";
import Product from "./pages/Product";

export const Routes = () => {
  const user = useSelector(selectUser);
  const isDisplayLoader = useSelector(selectIsDisplayLoader);
  const isAuthenticated = !!user?.token;

  return (
    <Switch>
      {isAuthenticated ? (
        <>
          <Header />
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route exact path="/products">
            <GeneralProducts />
          </Route>
          <Route exact path="/product/:id">
            <Product />
          </Route>
        </>
      ) : (
        <>
          <Route path="/auth" exact>
            <Auth />
          </Route>
          <Redirect to="/auth" />
        </>
      )}
      {isDisplayLoader && <Loader />}
    </Switch>
  );
};
