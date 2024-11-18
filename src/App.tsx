import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import Suppliers from './pages/Suppliers';
import Orders from './pages/Orders';
import Transactions from './pages/Transactions';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import DashboardLayout from './components/DashboardLayout';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import Settings from './pages/Settings';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<><Navbar /><Home /></>} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<><Navbar /><About /></>} />
          <Route path="/contact" element={<><Navbar /><Contact /></>} />
          <Route path="/dashboard" element={<DashboardLayout children={undefined} />}>
            <Route path="products" element={<Products />} />
            <Route path="suppliers" element={<Suppliers />} />
            <Route path="orders" element={<Orders />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path='settings' element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;