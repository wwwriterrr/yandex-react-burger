import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { type TOrderItem } from '../../core/type';
import styles from './item.module.css';
import type { FC } from 'react';
import { OrdersItemIngredients } from './orders-item.ingredients';
import { Link, useLocation } from 'react-router-dom';

export const OrdersItem: FC<{item: TOrderItem, url?: string}> = ({item}) => {
    const location = useLocation();

    const {number, name, createdAt} = item;

    let url = '/feed/';
    if(location.pathname.startsWith('/profile')){
        url = '/profile/orders/';
    }

    return (
        <div className={styles.wrap}>
            <div className={`text text_type_digits-default ${styles.number}`}>{number}</div>
            <div className={styles.dt}><FormattedDate date={new Date(createdAt)} /></div>
            <div className={styles.name} title={name}><Link to={`${url}${number}/`}>{name}</Link></div>
            <OrdersItemIngredients item={item} />
        </div>
    )
}
