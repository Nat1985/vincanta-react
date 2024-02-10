import AddNewWine from './pages/AddNewWine.jsx';
import WinesPaper from './pages/WinesPaper.jsx';
import logo from './static/images/logo.png';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="w-full flex flex-col items-center p-4">
        <img src={logo} alt="Vincanta logo" width='100px' />
      </div>
      <Routes>
        <Route exact path="/" />
        <Route exact path="/wines-paper" element={<WinesPaper />} />
        <Route exact path="/add-new-product" element={<AddNewWine />} />
      </Routes>
    </Router>
  );
}

export default App;