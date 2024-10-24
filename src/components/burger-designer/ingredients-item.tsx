import React from 'react';
import styles from './ingredients.module.css';
import { TIngredient } from '../../core/type';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useModalContext } from '../../contexts';
import { IngredientModal } from './ingredients-modal';


export const Ingredient: React.FC<TIngredient> = ({title, image, price, params}) => {
    const {openModal} = useModalContext();

    const ingredientClickHandler = () => {
        openModal('Детали ингредиента', <IngredientModal {...{title, image, price, params}} />);
    }

    return (
        <div className={styles.ingredient} onClick={ingredientClickHandler}>
            <img src={image} alt={title} className={styles.ingredientImage} />
            <div className={styles.ingredientPrice}>{price}<CurrencyIcon type={`primary`} /></div>
            <h4 className={styles.ingredientTitle}>{title}</h4>
        </div>
    )
}