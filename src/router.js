import Home from './pages/Home';
import Produtos from './pages/produtos';
import Login from './pages/login';
import Menu from './components/menu/index.js';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function Router(){
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/produtos" element={<Produtos />} />
      </Routes>
    </BrowserRouter>
  );
}
