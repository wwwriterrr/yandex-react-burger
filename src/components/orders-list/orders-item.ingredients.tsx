import { type FC } from 'react';
import styles from './item.module.css';
import type { TApiIngredient, TOrderItem } from '../../core/type';
import { useAppSelector } from '../../services/store';
import { getIngredientsMap } from '../../services/ingredients/ingredientsSlice';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const OrdersItemIngredients: FC<{item: TOrderItem, className?: string}> = ({item, className=''}) => {
    const {ingredients} = item;

    const ingredientsMap = useAppSelector(getIngredientsMap);

    const itemIngredients = ingredients.reduce((acc, id) => {
        const ingredient = ingredientsMap.get(id);
        if(!ingredient) return acc;

        acc.push(ingredient);
        return acc;
    }, [] as TApiIngredient[]);

    const total = itemIngredients.reduce((acc, i) => {
        acc += i.price;
        return acc;
    }, 0);

    return (
        <>
            {ingredientsMap.size ? (
                <>
                    <div className={`${styles.ingredients} ${className}`}>
                        {itemIngredients.slice(0, 7).map((row, i) => (
                            <div key={`oi-${item._id}-${i}`} className={styles.iconWrap} style={{zIndex: itemIngredients.length-i}}>
                                <img className={styles.icon} src={row.image_mobile} alt={row.name} />
                            </div>
                        ))}
                        {itemIngredients.length > 7 ? (
                            <div>...</div>
                        ) : null}
                    </div>
                    <div className={styles.total}>
                        <span className={'text text_type_digits-default'}>{total}</span>
                        <CurrencyIcon type={'primary'} />
                    </div>
                </>
            ) : null}
        </>
    )
}
