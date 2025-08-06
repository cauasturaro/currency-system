import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function ProtectedRoute({ children }: { children: JSX.element }) {
    const { isAuthenticated } = useAuth();

    // to render login page if user tries to enter another page but he's not authenticated
    if(!isAuthenticated) {
        return <Navigate to="/login" replace />
    }
    return children // to render the requested page if user is already authenticated
}
