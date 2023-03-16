// import './App.css';
import Login from './routes/Login';
import Register from './routes/Register';
import Validate from './routes/Validate';
import EditProfile from './routes/EditProfile';
import MyBank from './routes/MyBank';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const handleLogin = () => {
    console.log("hihi");
    // localStorage.setItem('User', JSON.stringify(user));
    // console.log(JSON.parse(localStorage.getItem('User')));
    // navigate('/mybank');
  };
  return (
    <div >
      <Login />
      {/* <Login 
      handleLogin={handleLogin}
      user={user}
      setUser={setUser}/> */}
    </div>
      // <Register />
      // <Validate />
      // <EditProfile />
      // <MyBank />
  )
}

export default App;