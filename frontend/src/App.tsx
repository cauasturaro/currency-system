import { HomePage } from './pages/Home/Home'
import { PayPage } from './pages/Pay/Pay'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/pay' element={<PayPage />} />
          <Route path='*' element={<HomePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
