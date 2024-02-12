import { useSelector } from 'react-redux';
import Menu from './components/Menu.jsx';
import AddNewWine from './pages/AddNewWine.jsx';
import WinesPaper from './pages/WinesPaper.jsx';
import logo from './static/images/logo.png';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

function App() {
  return (
    <Router>
      <Menu />
      <div className="w-full flex flex-col items-center p-4">
        <img src={logo} alt="Vincanta logo" width='100px' />
      </div>
      <Routes>
        <Route exact path="/" element={<WinesPaper />} />
        <Route exact path="/add-new-product" element={<AddNewWine />} />
      </Routes>
    </Router>
  );
}

export default App;