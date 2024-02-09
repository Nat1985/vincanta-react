import AddNewWine from './pages/AddNewWine.jsx';
import logo from './static/images/logo.png';

function App() {
  return (
    <div className="w-full flex flex-col items-center p-4">
      <img src={logo} alt="Vincanta logo" width='100px' />
      <AddNewWine />
    </div>
  );
}

export default App;