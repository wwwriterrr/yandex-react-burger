import React, { useRef } from 'react';
import styles from './ingredients.module.css';
import { TApiIngredient } from '../../core/type';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { useDrag } from 'react-dnd';
import { addToConstructor, replaceConstructorBun } from '../../services/ingredients/ingredientsSlice';
import { Link, useLocation } from 'react-router-dom';


interface DropResult {
    name: string,
    pos: 'top' | 'bottom',
}

export const Ingredient: React.FC<{ingredient: TApiIngredient}> = ({ingredient}) => {
    const location = useLocation();

    const {_id, name, image, price} = ingredient;

    // const ref = useRef<HTMLDivElement>(null);
    const ref = useRef<HTMLAnchorElement>(null);

    const dispatch = useAppDispatch();

    const constructor = useAppSelector(state => state.ingredients.constructor);

    const count = constructor.filter(item => item._id === ingredient._id).length;

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
        <Link 
            ref={ref}
            key={_id}
            to={`/ingredients/${_id}`}
            state={{ background: location }}
            className={styles.link}
        >
            <div 
                // ref={ref} 
                className={styles.ingredient} 
                style={{opacity: isDragging ? .2 : 1}}
            >
                {count ? <Counter count={count} size={`small`} extraClass={styles.ingredientCount} /> : null}
                <img src={image} alt={name} className={styles.ingredientImage} />
                <div className={styles.ingredientPrice}>{price}<CurrencyIcon type={`primary`} /></div>
                <h4 className={styles.ingredientTitle}>{name}</h4>
            </div>
        </Link>
    )
}