import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Materials from './components/Materials';
import SemiFinished from './components/SemiFinished';
import FinishedGoods from './components/FinishedGoods';
import BOM from './components/BOM';
import Settings from './components/Settings';
import Planning from './components/Planning';
import ProductionResult from './components/ProductionResult';
import { PlanningProvider } from './context/PlanningContext';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(true); // Set true for testing

  return (
    <PlanningProvider>
      <Router>
        <div className="flex min-h-screen bg-gray-100">
          {isAuthenticated && <Sidebar />}
          <main className={`flex-1 transition-all duration-300 ease-in-out ${isAuthenticated ? 'ml-64 md:ml-20' : ''}`}>
            <div className="p-6">
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
                <Route 
                  path="/planning" 
                  element={
                    isAuthenticated ? <Planning /> : <Navigate to="/login" />
                  } 
                />
                <Route 
                  path="/planning/:planId" 
                  element={
                    isAuthenticated ? <Planning /> : <Navigate to="/login" />
                  } 
                />
                <Route 
                  path="/production-result" 
                  element={
                    isAuthenticated ? <ProductionResult /> : <Navigate to="/login" />
                  } 
                />
              </Routes>
            </div>
          </main>
        </div>
      </Router>
    </PlanningProvider>
  );
}

export default App;
