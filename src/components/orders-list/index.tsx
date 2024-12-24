import { TOrderItem } from '../../core/type';
import styles from './list.module.css';
import { type FC } from 'react';
import { OrdersItem } from './orders-item';

export const OrdersList: FC<{feed: TOrderItem[], className?: string}> = ({feed, className=''}) => {
    return (
        <div className={`${styles.wrap} ${className}`}>
            {feed.length ? (
                <>
                    {feed.map(order => (
                        <OrdersItem key={`order-${order._id}`} item={order} />
                    ))}
                </>
            ) : (
                <div>Orders is empty</div>
            )}
        </div>
    )
}
