import React from 'react';
import styles from './ingredients-modal.module.css';
import { useAppSelector } from '../../services/store';


export const IngredientDetail: React.FC = () => {
    const ingredient = useAppSelector(state => state.ingredients.activeIngredient);

    if(!ingredient) return null;

    const {name, image_large, proteins, fat, carbohydrates, calories} = ingredient;

    return (
        <div className={styles.wrap}>
            <img className={styles.image} src={image_large} alt={name} />
            <h2 className={styles.title}>{name}</h2>
            <div className={styles.params}>
                {[calories, proteins, fat, carbohydrates].map((item, i) => (
                    <div key={i} className={`${styles.paramsItem} text text_type_main-medium`}>{item}</div>
                ))}
            </div>
        </div>
    )
}
