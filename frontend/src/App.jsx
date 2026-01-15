import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Toaster } from 'react-hot-toast';

import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Reminders from './pages/Reminders';
import Plan from './pages/Plan';
import Progress from './pages/Progress';
import Settings from './pages/Settings'; // ENSURE THIS IS IMPORTED

function App() {
  return (
    <BrowserRouter>
      <Toaster position="bottom-right" />

      <Routes>
        {/* Public Route */}
        <Route path="/" element={
          <>
            <SignedOut><LandingPage /></SignedOut>
            <SignedIn><Navigate to="/dashboard" replace /></SignedIn>
          </>
        } />

        {/* Private Routes */}
        <Route path="/dashboard" element={<><SignedIn><Dashboard /></SignedIn><SignedOut><Navigate to="/" /></SignedOut></>} />
        <Route path="/plan" element={<><SignedIn><Plan /></SignedIn><SignedOut><Navigate to="/" /></SignedOut></>} />
        <Route path="/reminders" element={<><SignedIn><Reminders /></SignedIn><SignedOut><Navigate to="/" /></SignedOut></>} />
        <Route path="/progress" element={<><SignedIn><Progress /></SignedIn><SignedOut><Navigate to="/" /></SignedOut></>} />
        
        {/* FIX: ADDED SETTINGS ROUTE */}
        <Route path="/settings" element={<><SignedIn><Settings /></SignedIn><SignedOut><Navigate to="/" /></SignedOut></>} />

        {/* Catch All */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;