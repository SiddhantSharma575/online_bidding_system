import './App.css';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from "./pages/Home/Home"
import About from './pages/About/About';
import AddItem from './pages/AddItem/AddItem';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import socketIO from "socket.io-client"

const socket = socketIO.connect("http://localhost:4000")
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home socket={socket} />} />
          <Route path='/about' element={<About />} />
          <Route path='/addItem' element={<AddItem socket={socket} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
