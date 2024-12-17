import type { FC } from 'react';
import styles from './feed.module.css';
import { OrdersList } from '../../components/orders-list';
import { PageHeader } from '../../components';

export const Feed: FC = () => {
    return (
        <div className={styles.wrap}>
            <PageHeader />
            <div className={styles.content}>
                <OrdersList />
            </div>
        </div>
    )
}
