import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { AuthAtom } from "./store.ts";

const API_BASE = import.meta.env.VITE_BACKEND_URL;
export function useAuthenticationStatus() {
    const setAuthStatus = useSetAtom(AuthAtom);
    useEffect(() => {
        const check = async () => {
            try {
                const res = await fetch(`${API_BASE}/api/auth/isAuthinticated`);
                if (res.ok) {
                    setAuthStatus('authenticated');
                } else {
                    setAuthStatus('unauthenticated');
                }
            } catch {
                setAuthStatus('unauthenticated');
            }
        };
        check();
    },);


}