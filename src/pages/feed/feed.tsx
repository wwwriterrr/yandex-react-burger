import { useEffect, type FC } from 'react';
import styles from './feed.module.css';
import { OrdersList } from '../../components/orders-list';
import { PageFooter, PageHeader } from '../../components';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { feedWsConnect, feedWsDisconnect } from '../../services/feed/feed-actions';
import { getFeed } from '../../services/feed/feed-slice';
import { OrdersStat } from '../../components/orders-stat';
import { getIngredients, getIngredientsLoading, getIngredientsMap } from '../../services/ingredients/ingredientsSlice';

export const Feed: FC = () => {
    const dispatch = useAppDispatch();

    const ingredientsLoading = useAppSelector(getIngredientsLoading);
    const ingredientsMap = useAppSelector(getIngredientsMap);
    
    const feed = useAppSelector(getFeed);

    useEffect(() => {
        if(!ingredientsMap.size && !ingredientsLoading){
            dispatch(getIngredients());
        }

        dispatch(feedWsConnect('wss://norma.nomoreparties.space/orders/all'));

        return () => {
            dispatch(feedWsDisconnect());
        }
    }, [])

    return (
        <div className={styles.wrap}>
            <PageHeader />
            <div className={styles.content}>
                <h2 className={styles.title}>Лента заказов</h2>
                <OrdersList className={styles.feed} feed={feed} />
                <OrdersStat className={styles.stat} feed={feed} />
            </div>
            <PageFooter />
        </div>
    )
}
