import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { TOrderItem } from '../../core/type';
import styles from './item.module.css';
import type { FC } from 'react';
import { OrdersItemIngredients } from './orders-item.ingredients';

export const OrdersItem: FC<{item: TOrderItem}> = ({item}) => {
    const {number, name, status, createdAt} = item;

    return (
        <div className={styles.wrap}>
            <div className={`text text_type_digits-default ${styles.number}`}>{number}</div>
            <div className={styles.dt}><FormattedDate date={new Date(createdAt)} /></div>
            <div className={styles.name} title={name}>{name}</div>
            <OrdersItemIngredients item={item} />
        </div>
    )
}
