import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Main from './pages/Main/Main';
import Portfolio from './pages/Portfolio/Portfolio';
import Watchlist from './pages/Watchlist/Watchlist';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={<Main />} path='/' />
        <Route element={<Portfolio />} path='/portfolio' />
        <Route element={<Watchlist />} path='/watchlist' />
      </Routes>
    </BrowserRouter>
  )
}