import './App.css';
import Login from './Login';
import Register from './Register';
import Validate from './Validate';
import EditProfile from './EditProfile';
import MyBank from './MyBank';
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
      <EditProfile />
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