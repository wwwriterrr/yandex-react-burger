import React, { useRef } from 'react';
import styles from './ingredients.module.css';
import { TApiIngredient } from '../../core/type';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useModalContext } from '../../contexts';
import { IngredientDetail } from './ingredients-modal';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { useDrag } from 'react-dnd';
import { addToConstructor, replaceConstructorBun, setActiveIngredient } from '../../services/ingredients/ingredientsSlice';


interface DropResult {
    name: string,
    pos: 'top' | 'bottom',
}

export const Ingredient: React.FC<{ingredient: TApiIngredient}> = ({ingredient}) => {
    const {name, image, price} = ingredient;

    const ref = useRef<HTMLDivElement>(null);

    const dispatch = useAppDispatch();

    const {openModal} = useModalContext();

    const constructor = useAppSelector(state => state.ingredients.constructor);

    const count = constructor.filter(item => item._id === ingredient._id).length;

    const ingredientClickHandler = () => {
        dispatch(setActiveIngredient({ingredient}));
        openModal('Детали ингредиента', <IngredientDetail />);
    }

    const [{isDragging}, dragRef] = useDrag(() => ({
        type: `outside-${ingredient.type}`,
        item: {id: ingredient._id, type: ingredient.type},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),
        }),
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult<DropResult>();
            if (item && dropResult && dropResult.name === 'constructor') {
                if(item.type === 'bun'){
                    dispatch(replaceConstructorBun({pos: dropResult.pos, ingredientId: item.id}));
                }else{
                    dispatch(addToConstructor({ingredientId: item.id}));
                }
            }
        },
    }))

    dragRef(ref);

    return (
        <div 
            ref={ref} 
            className={styles.ingredient} 
            onClick={ingredientClickHandler}
            style={{opacity: isDragging ? .2 : 1}}
        >
            {count ? <Counter count={count} size={`small`} extraClass={styles.ingredientCount} /> : null}
            <img src={image} alt={name} className={styles.ingredientImage} />
            <div className={styles.ingredientPrice}>{price}<CurrencyIcon type={`primary`} /></div>
            <h4 className={styles.ingredientTitle}>{name}</h4>
        </div>
    )
}