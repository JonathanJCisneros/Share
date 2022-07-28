import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Feed from './views/Feed'
import Chat from './components/Chat';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/feed' element={<Feed/>}/>
        <Route path='/chat' element={<Chat/>}/>
      </Routes>
    </div>
  );
}

export default App;
