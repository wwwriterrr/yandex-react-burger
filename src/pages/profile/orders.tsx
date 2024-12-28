import styles from './orders.module.css';
import { useEffect, type FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { feedProfileWsConnect } from '../../services/feed-profile/feed-profile-actions';
import { OrdersList } from '../../components/orders-list';
import { getIngredients, getIngredientsLoading, getIngredientsMap } from '../../services/ingredients/ingredientsSlice';
import { getFeedProfile } from '../../services/feed-profile/feed-profile-slice';
import { Outlet, useParams } from 'react-router-dom';

export const ProfileOrdersList: FC = () => {
    const dispatch = useAppDispatch();

    const {id} = useParams();

    const ingredientsLoading = useAppSelector(getIngredientsLoading);
    const ingredientsMap = useAppSelector(getIngredientsMap);
    
    const feed = useAppSelector(getFeedProfile);

    console.log(feed);

    useEffect(() => {
        if(!ingredientsMap.size && !ingredientsLoading){
            dispatch(getIngredients());
        }

        const accessToken = localStorage.getItem('accessToken')?.replace('Bearer ', '');
        dispatch(feedProfileWsConnect(`wss://norma.nomoreparties.space/orders?token=${accessToken}`));
    }, [])

    return (
        <>
            {id ? <Outlet /> : (
                <div className={styles.wrap}>
                    <OrdersList className={styles.feed} feed={feed} />
                </div>
            )}
        </>
    )
}
