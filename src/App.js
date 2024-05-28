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
import { checkToken, getLogged, getUnlogged } from './redux/userSlice.js';
import FetchLoader from './components/FetchLoader.jsx';
import FoodPaper from './pages/FoodPaper.jsx';
import AddEditFood from './pages/addEditFood.jsx';

function App() {
  const token = localStorage.getItem('vincanta-token');
  const dispatch = useDispatch();
  const { fetchStatus } = useSelector(state => state.user);

  // controllo che ci sia il token, se c'è controllo che non sia scaduto e nel caso lo refresho
  useEffect(() => {
    if (token) {
      console.log('token exists');
      dispatch(checkToken(token))
    } else {
      console.log('token does not exists');
      dispatch(getUnlogged())
    }
  }, [])

  useEffect(() => {
    console.log('fetchStatus: ', fetchStatus)
  }, [fetchStatus])
  return (
    <Router>
      <Menu />
      <ScrollToTopButton />
      <div className="w-full flex flex-col items-center p-4">
        <img src={logo} alt="Vincanta logo" width='100px' />
      </div>
      {/* <h4 className='text-sm text-center bg-slate-400 text-white'>Applicativo in fase di modifica. Può nel frattempo continuare ad utilizzarlo e ad inserire altri prodotti</h4> */}
      {fetchStatus === 'loading' && <div className='w-full flex justify-center mt-16'><FetchLoader /></div>}
      <Routes>
        {fetchStatus !== 'loading' && <Route exact path="/" element={<WinesPaper />} />}
        <Route exact path="/add-new-product" element={<AddNewWine />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/reset-password" element={<PasswordReset />} />
        <Route exact path="/set-new-password" element={<SetNewPassword />} />
        <Route exact path="/food" element={<FoodPaper />} />
        <Route exact path="/add-edit-food" element={<AddEditFood />} />
      </Routes>
    </Router>
  );
}

export default App;