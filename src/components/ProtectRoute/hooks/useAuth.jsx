import { useCallback, useState } from "react";

export const useAuth = () => {
    const [isValidLogin, setValidLogin] = useState(false);
    const [role, setRole] = useState([]);
    const [isFetching, setFeching] = useState(true);

    const hasLogin = useCallback(() => {
        setFeching(true);
        fetch('/api/auth/me', {
            headers: { 'Accept': 'application/json' },
            credentials: 'include',
        })
        .then((response) => response.json())
        .then((response) => {
            setValidLogin(response.auth);
            const userRole = response.role || response.decoded?.role;
            const roles = Array.isArray(userRole) ? userRole : userRole ? [userRole] : [];
            setRole(roles.map((value) => String(value).toLowerCase()));
        })
        .catch(() => {
            setValidLogin(false);
        }).finally(() => {
            setFeching(false);
        })
    }, [])

    return {
        isValidLogin,
        role,
        hasLogin,
        isFetching
    }
}
