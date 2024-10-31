import React from 'react';
import styles from './constructor.module.css';
import { TApiIngredient } from '../../core/type';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch } from '../../services/store';
import { removeConstructorItem } from '../../services/ingredients/ingredientsSlice';


type TProps = {
    ingredient: TApiIngredient,
    constructorLength: number,
    index: number,
}

export const ConstructorItem: React.FC<TProps> = ({ingredient, constructorLength, index}) => {
    const dispatch = useAppDispatch();

    const onCloseHandler = () => {
        dispatch(removeConstructorItem(index));
    }

    return (
        <div key={ingredient._id} className={styles.row}>
            {(index !== 0 && index !== constructorLength-1 && constructorLength > 3) && (
                <button className={styles.toggleButton}>
                    <DragIcon type={`primary`} />
                </button>
            )}
            <ConstructorElement 
                type={index === 0 ? 'top' : index === constructorLength-1 ? 'bottom' : undefined}
                isLocked={index === 0 || index === constructorLength-1}
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image_mobile}
                extraClass={styles.item}
                handleClose={onCloseHandler}
            />
        </div>
    )
}
