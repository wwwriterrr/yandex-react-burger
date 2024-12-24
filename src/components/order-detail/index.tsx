import { useParams } from 'react-router-dom';
import styles from './style.module.css';
import { useEffect, useState, type FC } from 'react';
import { PageHeader } from '../header';
import { PageFooter } from '../footer';
import { TOrderItem } from '../../core/type';
import { useAppSelector } from '../../services/store';
import { getFeed } from '../../services/feed/feed-slice';
import { OrderIngredients } from './ingredients';
import { translateStatus } from '../../core/utils';

export const OrderDetail: FC = () => {
    const {id} = useParams();

    const [order, setOrder] = useState<TOrderItem | null>(null);

    const feed = useAppSelector(getFeed);

    useEffect(() => {
        if(id){
            let order: TOrderItem | undefined = feed.find(item => item.number === parseInt(id));

            if(order) setOrder(order);
        }
    }, [])

    return (
        <div className={styles.page}>
            <PageHeader />
            {order ? (
                <div className={styles.wrap}>
                    <div className={`text text_type_digits-default ${styles.number}`}>#{order.number}</div>
                    <h1 className={styles.name}>{order.name}</h1>
                    <div className={`${styles.status} ${styles[order.status]}`}>{translateStatus(order.status)}</div>
                    <OrderIngredients order={order} />
                </div>
            ) : (
                <div className={styles.loader}>Loading ...</div>
            )}
            <PageFooter />
        </div>
    )
}
