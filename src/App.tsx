import { useState } from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import Body from './Body'

function App() {
  return (
    <div className="App">
      <ul>
        <li>
          <Link to={'/'}>Home</Link>
        </li>
        <li>
          <Link to={'/friends'}>Friends</Link>
        </li>
      </ul>
      <Body />
    </div>
  )
}

export default App;
