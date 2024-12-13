import { type FC, useEffect } from 'react';
import { useAppDispatch } from '../../services/store';
import { authLogout } from '../../services/auth/auth-actions';

export const LogoutPage: FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(authLogout());
    }, []);

    return (
        <></>
    )
}
