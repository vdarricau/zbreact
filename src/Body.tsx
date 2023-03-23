import { RequireAuth } from 'react-auth-kit';
import { Route, Routes } from 'react-router-dom';
import Friends from './pages/Friends';
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import NotFound from './pages/NotFound';

const Body = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/zbros' element={<RequireAuth loginPath='/login'><Friends /></RequireAuth>} />
            <Route path='*' element={<NotFound />}/>
        </Routes>
    );
}
export default Body;