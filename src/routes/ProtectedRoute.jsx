import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children, isAuthenticated = false }) => {
    let location = useLocation();


    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return children;
};

export default PrivateRoute;