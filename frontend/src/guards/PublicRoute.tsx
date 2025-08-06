import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function PublicRoute({ children }: { children: JSX.element }) {
    const { isAuthenticated } = useAuth();

    // if user tries to enter login/register page but is authenticated:
    if(isAuthenticated) {
        return <Navigate to="/home" replace />
    }
    return children // if not autheticated, will render login/register page
}
