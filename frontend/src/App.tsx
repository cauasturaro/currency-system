import { HomePage } from './pages/Home/Home'
import { LoginPage } from './pages/Login/Login';
import { RegisterPage } from './pages/Register/Register';

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { PublicRoute } from './guards/PublicRoute';
import { ProtectedRoute } from './guards/ProtectedRoute';

import './App.css'
import { PayPage } from './pages/Pay/Pay';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route 
          path='/register' element={<PublicRoute><RegisterPage /></PublicRoute>} />
          <Route path='/login' element={<PublicRoute><LoginPage /></PublicRoute>} />
          {/* PROTECTED ROUTES: */}
          <Route path='/home' element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path='/' element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path='/pay' element={<ProtectedRoute><PayPage /></ProtectedRoute>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
