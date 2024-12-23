import { useEffect, type FC } from 'react';
import styles from './feed.module.css';
import { OrdersList } from '../../components/orders-list';
import { PageFooter, PageHeader } from '../../components';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { feedWsConnect } from '../../services/feed/feed-actions';
import { getFeed } from '../../services/feed/feed-slice';

export const Feed: FC = () => {
    const dispatch = useAppDispatch();

    const feed = useAppSelector(getFeed);

    useEffect(() => {
        dispatch(feedWsConnect('wss://norma.nomoreparties.space/orders/all'));
    }, [])

    return (
        <div className={styles.wrap}>
            <PageHeader />
            <div className={styles.content}>
                <OrdersList className={styles.feed} feed={feed} />
            </div>
            <PageFooter />
        </div>
    )
}
