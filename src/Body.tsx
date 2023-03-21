import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Friends from './pages/Friends';
import Login from './pages/Login';
import Logout from './pages/Logout';
import { RequireAuth } from 'react-auth-kit'

const Body = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/zbros' element={<RequireAuth loginPath='/login'><Friends /></RequireAuth>} />
        </Routes>
    );
}
export default Body;