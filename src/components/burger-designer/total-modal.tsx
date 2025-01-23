import {type FC} from 'react';
import styles from './total-modal.module.css';
import { OkIcon } from '../icons';

export const TotalModal: FC<{number: number, name: string}> = ({number, name}) => {
    return (
        <div className={styles.wrap} data-testid="order_modal">
            <div className={`${styles.identificator} text text_type_digits-large`}>
                {number}
            </div>
            <div className={styles.identificatorText} data-testid="order_name">
                {name}
            </div>
            <OkIcon classes={styles.image} size={120} />
            <div className={styles.status}>
                Ваш заказ начали готовить
            </div>
            <div className={styles.statusText}>
                Дождитесь готовности на орбитальной станции
            </div>
        </div>
    )
}
