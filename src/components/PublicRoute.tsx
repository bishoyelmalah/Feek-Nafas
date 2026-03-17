import { Navigate } from 'react-router-dom';
import { useAuth } from '../services/authService';

export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
    const { session, loading } = useAuth();

    if (loading) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: '#00ffcc' }}>LOADING_SYSTEM...</div>;
    }

    if (session) {
        return <Navigate to="/home" replace />;
    }

    return children;
};
