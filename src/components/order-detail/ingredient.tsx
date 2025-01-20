import styles from './ingredient.module.css';
import type { FC } from 'react';
import type { TApiIngredient } from '../../core/type';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const OrderIngredient: FC<{item: {ingredient: TApiIngredient, count: number}}> = ({item}) => {
    return (
        <li className={styles.item}>
            <div className={styles.imageWrap}>
                <img className={styles.image} src={item.ingredient.image_mobile} alt={item.ingredient.name} />
            </div>
            <div className={styles.name}>{item.ingredient.name}</div>
            <div className={`text text_type_digits-default ${styles.total}`}>
                {item.count} x {item.ingredient.price} <CurrencyIcon type="primary" />
            </div>
        </li>
    )
}