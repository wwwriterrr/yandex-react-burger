import styles from './constructor.module.css';
import { useAppSelector } from '../../services/store';
import { ConstructorItem } from './constructor-item';
import { useCallback, useRef } from 'react';
import { useDrop } from 'react-dnd';
import type { XYCoord } from 'dnd-core'
import { TApiIngredient } from '../../core/type';


export const BurgerConstructorList = () => {
    const loading = useAppSelector(state => state.ingredients.ingredientsLoading);
    const constructor = useAppSelector(state => state.ingredients.constructor);

    const listRef = useRef<HTMLDivElement>(null);

    // const idRef = useRef(Math.random().toString(16).slice(2));

    const [{ canDrop }, drop] = useDrop(() => ({
        accept: [`outside-bun`, `outside-main`, `outside-sauce`],
        drop: (_, monitor) => {
            let dropPosition = 'top';

            const hoverBoundingRect = listRef.current?.getBoundingClientRect();

            if(!hoverBoundingRect) return;
    
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    
            const clientOffset = monitor.getClientOffset();
    
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

            if(hoverClientY > hoverMiddleY) dropPosition = 'bottom';
            
            return { name: 'constructor', pos: dropPosition };
        },
        collect: (monitor) => ({
            // isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }))

    const renderIngredient = useCallback(
        (ingredient: TApiIngredient, index: number) => {
            let key = `item-${ingredient._id}-${index}`;
            return (
                <ConstructorItem 
                    key={key}
                    ingredient={ingredient} 
                    index={index} 
                    constructorLength={constructor.length} 
                />
            )
        }, [constructor.length],
    )

    drop(listRef);

    return (
        <div ref={listRef} className={`${styles.list} ${canDrop ? styles.listCanDrop : ''}`}>
            {loading ? (
                <div>Loading ...</div>
            ) : (
                constructor.map((item, index) => renderIngredient(item, index))  
            )}
        </div>
    )
}