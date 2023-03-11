// import './App.css';
import Login from './routes/Login';
import Register from './routes/Register';
import Validate from './routes/Validate';
import EditProfile from './routes/EditProfile';
import MyBank from './routes/MyBank';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
function App() {
  const [user, setUser] = useState('');
  const handleLogin = () => {
    // console.log(user);
    localStorage.setItem('User', JSON.stringify(user));
    console.log(JSON.parse(localStorage.getItem('User')));
  }
  return (
    <div >
      <Login />
    </div>
      //<Login 
      // handleLogin={handleLogin}
      // user={user}
      // setUser={setUser}/>
      // <Register />
      // <Validate />
      // <EditProfile />
      // <MyBank />
  )
}

export default App;