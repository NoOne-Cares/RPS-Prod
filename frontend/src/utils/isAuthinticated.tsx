import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { AuthAtom } from "./store";

export function useAuthenticationStatus() {
    const setAuthStatus = useSetAtom(AuthAtom);
    useEffect(() => {
        const check = async () => {
            try {
                const res = await fetch('/api/auth/isAuthinticated');
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