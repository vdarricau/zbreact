import { RequireAuth } from 'react-auth-kit';
import { Route, Routes } from 'react-router-dom';
import FindFriends from './pages/FindFriends';
import FriendPage from './pages/FriendPage';
import Friends from './pages/Friends';
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import SendZbra from './pages/SendZbra';

const Body = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/zbros' element={<RequireAuth loginPath='/login'><Friends /></RequireAuth>} />
            <Route path='/zbros/add' element={<RequireAuth loginPath='/login'><FindFriends /></RequireAuth>} />
            <Route path='/zbros/:friendId' element={<RequireAuth loginPath='/login'><FriendPage /></RequireAuth>} />
            <Route path='/zbra/send' element={<RequireAuth loginPath='/login'><SendZbra /></RequireAuth>} />
            
            <Route path='*' element={<NotFound />}/>
        </Routes>
    );
}
export default Body;