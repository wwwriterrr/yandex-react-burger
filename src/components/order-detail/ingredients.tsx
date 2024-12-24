import { useEffect, type FC } from 'react';
import styles from './ingredients.module.css';
import { type TOrderItem } from '../../core/type';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { getIngredients, getIngredientsLoading, getIngredientsMap } from '../../services/ingredients/ingredientsSlice';
import { OrderIngredient } from './ingredient';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

export const OrderIngredients: FC<{order: TOrderItem}> = ({order}) => {
    const dispatch = useAppDispatch();
    
    const ingredientsLoading = useAppSelector(getIngredientsLoading);
    const ingredientsMap = useAppSelector(getIngredientsMap);
    
    const ingredients = order.ingredients.reduce((acc, ingId) => {
        if(acc.get(ingId)){
            const row = acc.get(ingId);
            acc.set(ingId, {count: row.count + 1, ingredient: ingredientsMap.get(ingId)})
        }else{
            acc.set(ingId, {count: 1, ingredient: ingredientsMap.get(ingId)})
        }

        return acc;
    }, new Map());

    const total = order.ingredients.reduce((acc, ingId) => {
        const ingredient = ingredientsMap.get(ingId);
        if(ingredient) acc += ingredient.price;

        return acc;
    }, 0)

    useEffect(() => {
        if(!ingredientsMap.size && !ingredientsLoading){
            dispatch(getIngredients());
        }
    }, [])

    return (
        <>
            {ingredientsMap.size ? (
                <div className={styles.wrap}>
                    <h3 className={styles.title}>Состав:</h3>
                    <ul className={styles.list}>
                        {[...ingredients.keys()].map(ingId => (
                            <OrderIngredient key={`order_ing-${ingId}`} item={ingredients.get(ingId)} />
                        ))}
                    </ul>
                    <div className={styles.total}>
                        <div className={styles.dt}>
                            <FormattedDate date={new Date(order.createdAt)} />
                        </div>
                        <div className={styles.totalRight}>
                            <span className={'text text_type_digits-default'}>{total}</span>
                            <CurrencyIcon type={'primary'} />
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    )
}
