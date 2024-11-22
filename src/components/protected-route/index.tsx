import React from 'react';
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from '../../services/store.ts';
import { getIsAuthChecked, getUser } from '../../services/auth/auth-slice.ts';


type TProtectedProps = {
    onlyUnAuth?: boolean;
    component: React.JSX.Element;
}

const Protected = ({ onlyUnAuth = false, component}: TProtectedProps): React.JSX.Element => {
    const isAuthChecked = useAppSelector(getIsAuthChecked);
    const user = useAppSelector(getUser);
    const location = useLocation();

    if (!isAuthChecked) {
        return <p>Загрузка...</p>;
    }

    if (onlyUnAuth && user) {
        const { from } = location.state ?? { from: { pathname: "/ "} };
        return <Navigate to={from} />;
    }

    if (!onlyUnAuth && !user) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return component;
}

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({component}: {component: React.JSX.Element}): React.JSX.Element => (
    <Protected onlyUnAuth={true} component={component} />
);
