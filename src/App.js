
import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Netflix from './pages/Netflix';
import Players from './pages/Players';
import Movies from './pages/Movies';
import TvShows from './pages/TvShows';
import MyList from './pages/MyList';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path={'/signup'} element={<SignUp/>}/>
      <Route path={'/netflix'} element={<Netflix/>}/>
      <Route path='/player' element={<Players/>}/>
      <Route path='/movies' element={<Movies/>}/>
      <Route path='/tv' element={<TvShows/>}/>
      <Route path='/mylist' element={<MyList/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
