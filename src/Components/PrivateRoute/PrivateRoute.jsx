import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

export const PrivateRoute = () => {

    const user = useSelector(state => state.auth.user);

    return !user ? <Outlet /> : <Navigate to="/" replace />;
}
