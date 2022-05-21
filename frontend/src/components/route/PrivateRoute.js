import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
    const { isAuthenticate } = useSelector((state) => state.user);
    if (isAuthenticate === false) {
        return <Navigate to="/login" />;
    }
    return isAuthenticate ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
