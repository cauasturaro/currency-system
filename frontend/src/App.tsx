import { HomePage } from './pages/Home/Home'
import { PayPage } from './pages/Pay/Pay'
import { LoginPage } from './pages/Login/Login';
import { RegisterPage } from './pages/Register/Register';

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/' element={<HomePage />} />
          <Route path='/pay' element={<PayPage />} />
          <Route path='*' element={<HomePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
