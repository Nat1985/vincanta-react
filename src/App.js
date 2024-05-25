import { useDispatch, useSelector } from 'react-redux';
import Menu from './components/Menu.jsx';
import AddNewWine from './pages/AddNewWine.jsx';
import WinesPaper from './pages/WinesPaper.jsx';
import logo from './static/images/logo.png';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ScrollToTopButton from './components/ScrollTotopButton.jsx';
import LoginPage from './pages/LoginPage.jsx';
import PasswordReset from './pages/PasswordReset.jsx';
import SetNewPassword from './pages/SetNewPassword.jsx';
import { getLogged, getUnlogged } from './redux/userSlice.js';

function App() {
  const token = localStorage.getItem('vincanta-token');
  const dispatch = useDispatch();
  const [checkTokenFetchStatus, setCheckTokenFetchStatus] = useState('loading');
  const checkToken = async () => {
    if (token) {
      setCheckTokenFetchStatus('loading');
      const url = `${process.env.REACT_APP_SERVER_BASE_URL}/users/verify-token`;
      const headers = {
        'Content-Type': 'application/json'
      };
      const options = {
        method: 'POST',
        headers,
        body: JSON.stringify({ token })
      }
      try {
        const response = await fetch(url, options);
        if (response.ok) {
          const result = await response.json();
          localStorage.setItem('vincanta-token', result.payload);
          dispatch(getLogged());
        } else {
          const error = await response.json();
          console.log('checkToken fetch error: ', error);
          localStorage.removeItem('vincanta-token');
          dispatch(getUnlogged());
        }
      } catch (error) {
        console.log('checkToken catch error: ', error);
        localStorage.removeItem('vincanta-token');
        dispatch(getUnlogged());
      }
    } else {
      dispatch(getUnlogged())
    }
  }
  useEffect(() => {
    checkToken(); // pare funzioni, fa qualche prova e poi inserisci il Loader in App
  }, [])
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
        <Route exact path="/reset-password" element={<PasswordReset />} />
        <Route exact path="/set-new-password" element={<SetNewPassword />} />
      </Routes>
    </Router>
  );
}

export default App;