import React from 'react';
import styles from './ingredients-modal.module.css';
import { TIngredient } from '../../core/type';


export const IngredientDetail: React.FC<TIngredient> = ({title, image, params}) => {
    return (
        <div className={styles.wrap}>
            <img className={styles.image} src={image} alt={title} />
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.params}>
                {params.map((item, i) => (
                    <div key={i} className={`${styles.paramsItem} text text_type_main-medium`}>{item}</div>
                ))}
            </div>
        </div>
    )
}
