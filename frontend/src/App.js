import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Materials from './components/Materials';
import SemiFinished from './components/SemiFinished';
import FinishedGoods from './components/FinishedGoods';
import BOM from './components/BOM';
import Settings from './components/Settings';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {isAuthenticated && <Navbar />}
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route 
              path="/login" 
              element={
                <Login 
                  onLoginSuccess={() => setIsAuthenticated(true)} 
                />
              } 
            />
            <Route 
              path="/" 
              element={
                isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
              } 
            />
            <Route 
              path="/materials" 
              element={
                isAuthenticated ? <Materials /> : <Navigate to="/login" />
              } 
            />
            <Route 
              path="/semi-finished" 
              element={
                isAuthenticated ? <SemiFinished /> : <Navigate to="/login" />
              } 
            />
            <Route 
              path="/finished-goods" 
              element={
                isAuthenticated ? <FinishedGoods /> : <Navigate to="/login" />
              } 
            />
            <Route 
              path="/bom" 
              element={
                isAuthenticated ? <BOM /> : <Navigate to="/login" />
              } 
            />
            <Route 
              path="/settings" 
              element={
                isAuthenticated ? <Settings /> : <Navigate to="/login" />
              } 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
