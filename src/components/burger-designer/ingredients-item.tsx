import React from 'react';
import styles from './ingredients.module.css';
import { TApiIngredient } from '../../core/type';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useModalContext } from '../../contexts';
import { IngredientDetail } from './ingredients-modal';


export const Ingredient: React.FC<{ingredient: TApiIngredient}> = ({ingredient}) => {
    const {name, image, price} = ingredient;

    const {openModal} = useModalContext();

    const ingredientClickHandler = () => {
        openModal('Детали ингредиента', <IngredientDetail {...ingredient} />);
    }

    return (
        <div className={styles.ingredient} onClick={ingredientClickHandler}>
            <img src={image} alt={name} className={styles.ingredientImage} />
            <div className={styles.ingredientPrice}>{price}<CurrencyIcon type={`primary`} /></div>
            <h4 className={styles.ingredientTitle}>{name}</h4>
        </div>
    )
}