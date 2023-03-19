import { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import Body from './Body';
import { AuthContext } from './context/AuthContext';
import { User } from './hooks/useUser';

function App() {
  const [ user, setUser ] = useState<User|null>(null);
  const value = { user, setUser };

  return (
    <AuthContext.Provider value={value}>
      <div className="App">
        <ul>
          <li><Link to={'/'}>Home</Link></li>
          <li><Link to={'/friends'}>Friends</Link></li>
        </ul>
        <Body />
      </div>
    </AuthContext.Provider>
  )
}

export default App;
