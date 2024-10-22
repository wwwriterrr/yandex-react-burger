import React from 'react';
import styles from './ingredients.module.css';
import { TIngredient } from '../../core/type';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';


export const Ingredient: React.FC<TIngredient> = ({title, image, price}) => {
    return (
        <div className={styles.ingredient}>
            <img src={image} alt={title} className={styles.ingredientImage} />
            <div className={styles.ingredientPrice}>{price}<CurrencyIcon type={`primary`} /></div>
            <h4 className={styles.ingredientTitle}>{title}</h4>
        </div>
    )
}