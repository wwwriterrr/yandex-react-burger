import { useEffect } from "react";
import { useAppDispatch } from "../../services/store"
import { authLogout } from "../../services/auth/auth-actions";


export const LogoutPage = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(authLogout());
    }, []);

    return (
        <></>
    )
}
