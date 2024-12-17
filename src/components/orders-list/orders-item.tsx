import { TOrderItem } from '../../core/type';
import styles from './item.module.css';
import type { FC } from 'react';

export const OrdersItem: FC<{item: TOrderItem}> = ({item}) => {
    return (
        <div className={styles.wrap}>
            
        </div>
    )
}
