// src/App.tsx
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import './styles/style.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Ensure JS is included

import LoginForm from './components/login';
import SuccessPage from './components/success';
import FormPage from './components/form';
import ToDolist from './components/ToDolist';
import DataTable from './components/display';
import Navbar from './module/layout/Navbar';
import CheckoutForm from './components/checkoutform';

const App: React.FC = () => {
  const location = useLocation();
  return (
    <>{location.pathname !== '/login' && location.pathname !== '/' && <Navbar />}
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/form" element={<FormPage />} />
          <Route path="/todolist" element={<ToDolist />} />
          <Route path="/display" element={<DataTable />} />
          <Route path="/nav" element={<Navbar />} />
          <Route path="/checkoutform" element={<CheckoutForm />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
