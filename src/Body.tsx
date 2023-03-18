import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Friends from './pages/Friends';
import Login from './pages/Login';

const Body = () => {
    return (
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/friends' element={<Friends/>} />
        </Routes>
    );
}
export default Body;