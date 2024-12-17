import type { FC } from 'react';
import { useParams } from 'react-router-dom';
import { OrderDetail } from '../../components/order-detail';
import { Feed } from './feed';

export const FeedPage: FC = () => {
    const {id} = useParams();

    console.log(id);

    return (
        <>
            {id ? (
                <OrderDetail />
            ) : (
                <Feed />
            )}
        </>
    )
}
