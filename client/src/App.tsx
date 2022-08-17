import React, { Suspense, useRef, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/layout/Layout';
import Login from './components/modules/auth/Login';

import { AppContext } from './contexts';
import appRoutes from './routes';
import { ErrorFallback, Loader } from './shared/components';
import { GuestRoute, ProtectedRoute } from './shared/guards';
// import { ErrorFallback, Loader } from '@shared/components';
// import { GuestRoute, ProtectedRoute } from '@shared/guards';

// import { ProtectedRoute } from '@shared/guards'

import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Toaster } from 'react-hot-toast';


function App() {

  return (

    <BrowserRouter>
    <Toaster />
      <AppContext>
        <Layout>
          <ErrorFallback>
            <Routes>
              {appRoutes.map((route, i) => {
                if (route.status == 'PROTECTED') {
                  return (
                    <Route key={i} path={route.path} element={
                      <Suspense fallback={(<Loader />)}>
                        <ProtectedRoute roles={route.roles}>
                          <route.component />
                        </ProtectedRoute>
                      </Suspense>
                    } />
                  )
                } else if (route.status == 'GUEST') {
                  return (
                    <Route key={i} path={route.path} element={
                      <Suspense fallback={(<Loader />)}>
                        <GuestRoute>
                          <route.component />
                        </GuestRoute>
                      </Suspense>
                    } />
                  )
                } else {
                  return (
                    <Route key={i} path={route.path} element={
                      <Suspense fallback={(<Loader />)}>
                        <route.component />
                      </Suspense>
                    } />
                  )
                }
              })}
            </Routes>
          </ErrorFallback>
        </Layout>
      </AppContext>
    </BrowserRouter>
  );
}

export default App;
