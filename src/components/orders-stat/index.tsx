import { type TOrderItem } from '../../core/type';
import { getFeedTotal, getFeedTotalToday } from '../../services/feed/feed-slice';
import { useAppSelector } from '../../services/store';
import styles from './styles.module.css';
import { type FC } from 'react';

type TProps = {
    feed: TOrderItem[], 
    className?: string,
}

export const OrdersStat: FC<TProps> = ({feed, className=''}) => {
    const total = useAppSelector(getFeedTotal);
    const totalToday = useAppSelector(getFeedTotalToday);
    
    const done = feed
        .filter(item => item.status === 'done').reduce((acc, i) => {
            acc.push(i.number);
            return acc;
        }, [] as number[])
        .slice(0, 10);

    const wait = feed
        .filter(item => item.status !== 'done').reduce((acc, i) => {
            acc.push(i.number);
            return acc;
        }, [] as number[])
        .slice(0, 10);

    return (
        <>
            {feed.length ? (
                <div className={`${styles.wrap} ${className}`}>
                    <div className={styles.counts}>
                        {done.length ? (
                            <div className={styles.done}>
                                <h3 className={styles.title}>Готовы:</h3>
                                <ul className={styles.list}>
                                    {done.map((number, i) => (
                                        <li key={`done_item-${i}`} className={`text text_type_digits-default ${styles.item}`}>{number}</li>
                                    ))}
                                </ul>
                            </div>
                        ) : null}
                        {wait.length ? (
                            <div className={styles.wait}>
                                <h3 className={styles.title}>В работе:</h3>
                                <ul className={styles.list}>
                                    {wait.map((number, i) => (
                                        <li key={`wait_item-${i}`} className={`text text_type_digits-default ${styles.item}`}>{number}</li>
                                    ))}
                                </ul>
                            </div>
                        ) : null}
                    </div>
                    {total ? (
                        <div className={styles.total}>
                            <h3>Выполнено за все время:</h3>
                            <span className={'text text_type_digits-large'}>{total}</span>
                        </div>
                    ) : null}
                    {totalToday ? (
                        <div className={styles.total}>
                            <h3>Выполнено за сегодня:</h3>
                            <span className={'text text_type_digits-large'}>{totalToday}</span>
                        </div>
                    ) : null}
                </div>
            ) : null}
        </>
    )
}
