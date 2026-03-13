import type { JSX } from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const token = localStorage.getItem('pokemon_auth_token');

    if (!token) {
        return <Navigate to="/auth/sign-in" replace />
    }

    return children;
}