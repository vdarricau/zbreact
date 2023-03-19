import { useState } from 'react';
import { Link } from 'react-router-dom';
import Body from './Body';
import NavComponent from './components/NavComponent';
import { AuthContext } from './context/AuthContext';
import { User } from './hooks/useUser';

function App() {
  const [ user, setUser ] = useState<User|null>(null);
  const value = { user, setUser };

  return (
    <AuthContext.Provider value={value}>
      <NavComponent />
      <div className="App">
        <Body />
      </div>
    </AuthContext.Provider>
  )
}

export default App;
