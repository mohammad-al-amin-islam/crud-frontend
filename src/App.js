import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Home/Home/Home';
import Edit from './Home/Edit/Edit';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/edit/:id' element={<Edit></Edit>}></Route>
      </Routes>
    </div>
  );
}

export default App;
