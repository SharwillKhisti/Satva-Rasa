import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("satva-token"));

    useEffect(() => {
        const savedEmail = localStorage.getItem("satva-email");

        if (token && savedEmail) {
            setUser({ email: savedEmail });
        }
    }, [token]);

    const login = (email, jwt) => {
        localStorage.setItem("satva-token", jwt);
        localStorage.setItem("satva-email", email);

        setToken(jwt);
        setUser({ email });
    };

    const logout = () => {
        localStorage.removeItem("satva-token");
        localStorage.removeItem("satva-email");

        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated: !!token,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}