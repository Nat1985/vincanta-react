import { useSelector } from 'react-redux';
import Menu from './components/Menu.jsx';
import AddNewWine from './pages/AddNewWine.jsx';
import WinesPaper from './pages/WinesPaper.jsx';
import logo from './static/images/logo.png';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import ScrollToTopButton from './components/ScrollTotopButton.jsx';
import LoginPage from './pages/LoginPage.jsx';

function App() {
  return (
    <Router>
      <Menu />
      <ScrollToTopButton />
      <div className="w-full flex flex-col items-center p-4">
        <img src={logo} alt="Vincanta logo" width='100px' />
      </div>
      {/* <h4 className='text-sm text-center bg-slate-400 text-white'>Applicativo in fase di modifica. Può nel frattempo continuare ad utilizzarlo e ad inserire altri prodotti</h4> */}
      <Routes>
        <Route exact path="/" element={<WinesPaper />} />
        <Route exact path="/add-new-product" element={<AddNewWine />} />
        <Route exact path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;