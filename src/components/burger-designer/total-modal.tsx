import React from 'react';
import styles from './total-modal.module.css';
import { OkIcon } from '../icons';


export const TotalModal: React.FC = () => {
    return (
        <div className={styles.wrap}>
            <div className={`${styles.identificator} text text_type_digits-large`}>
                034536
            </div>
            <div className={styles.identificatorText}>
                идентификатор заказа
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
