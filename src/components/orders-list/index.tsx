import { TOrderItem } from '../../core/type';
import styles from './list.module.css';
import { useEffect, type FC } from 'react';
import { OrdersItem } from './orders-item';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { getIngredients, getIngredientsLoading, getIngredientsMap } from '../../services/ingredients/ingredientsSlice';

export const OrdersList: FC<{feed: TOrderItem[], className?: string}> = ({feed, className=''}) => {
    const ingredientsLoading = useAppSelector(getIngredientsLoading);
    const ingredientsMap = useAppSelector(getIngredientsMap);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if(!ingredientsMap.size && !ingredientsLoading){
            dispatch(getIngredients());
        }
    }, [])

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
