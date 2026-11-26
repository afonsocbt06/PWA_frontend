import { useCallback, useState } from "react";
import { apiFetch } from "../../../services/api/config";

export const useAuth = () => {
    const [isValidLogin, setValidLogin] = useState(false);
    const [role, setRole] = useState([]);
    const [isFetching, setFeching] = useState(true);

    const hasLogin = useCallback(() => {
        setFeching(true);
        apiFetch('/auth/me', {
            headers: { 'Accept': 'application/json' },
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
