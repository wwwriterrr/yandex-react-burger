import type { FC } from 'react';
import { Outlet, useParams } from 'react-router-dom';
// import { OrderDetail } from '../../components/order-detail';
import { Feed } from './feed';

export const FeedPage: FC = () => {
    const {id} = useParams();

    return (
        <>
            {id ? (
                <Outlet />
            ) : (
                <Feed />
            )}
        </>
    )
}
