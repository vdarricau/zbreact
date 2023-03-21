import { useState } from 'react';
import Body from './Body';
import NavComponent from './components/NavComponent';

function App() {
  return (
    <>
      <NavComponent />
      <div className="App">
        <Body />
      </div>
    </>
  )
}

export default App;
