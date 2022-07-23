import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Feed from './views/Feed'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/feed' element={<Feed/>}/>
      </Routes>
    </div>
  );
}

export default App;
