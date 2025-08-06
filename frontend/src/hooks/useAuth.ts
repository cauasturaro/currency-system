export function useAuth() {
    const token = localStorage.getItem('authToken');

    const isAuthenticated = !!token;

    return { isAuthenticated };
}