import { RequireAuth } from "react-auth-kit";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "./components/Loading";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Logout = lazy(() => import("./pages/Logout"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Friends = lazy(() => import("./pages/Friends"));
const FindFriends = lazy(() => import("./pages/FindFriends"));
const Conversation = lazy(() => import("./pages/Conversation"));

const AuthorizedRoute = ({ children }: { children: JSX.Element }) => {
    return (
        <Suspense fallback={<Loading />}>
            <RequireAuth loginPath="/login">{children}</RequireAuth>
        </Suspense>
    );
};

const Body = () => {
    return (
        <Routes>
            {/* AUTH */}
            <Route
                path="/login"
                element={
                    <Suspense fallback={<Loading />}>
                        <Login />
                    </Suspense>
                }
            />
            <Route
                path="/register"
                element={
                    <Suspense fallback={<Loading />}>
                        <Register />
                    </Suspense>
                }
            />
            <Route
                path="/logout"
                element={
                    <Suspense fallback={<Loading />}>
                        <Logout />
                    </Suspense>
                }
            />

            <Route
                path="/loading"
                element={
                    <Suspense fallback={<Loading />}>
                        <Loading />
                    </Suspense>
                }
            />

            {/* HOME */}

            <Route
                index
                element={
                    <Suspense fallback={<Loading />}>
                        <Home />
                    </Suspense>
                }
            />

            <Route path="*" element={<NotFound />} />

            {/* AUTHORIZED ROUTES */}

            <Route
                path="/zbros"
                element={
                    <AuthorizedRoute>
                        <Friends />
                    </AuthorizedRoute>
                }
            />
            <Route
                path="/zbros/add"
                element={
                    <AuthorizedRoute>
                        <FindFriends />
                    </AuthorizedRoute>
                }
            />
            <Route
                path="/zbros/:friendId"
                element={
                    <AuthorizedRoute>
                        <Conversation />
                    </AuthorizedRoute>
                }
            />
        </Routes>
    );
};
export default Body;
