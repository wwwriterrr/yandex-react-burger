import styles from './constructor.module.css';
import { useAppSelector } from '../../services/store';
import { ConstructorItem } from './constructor-item';
import { type FC, useCallback, useRef } from 'react';
import { useDrop } from 'react-dnd';
import type { XYCoord } from 'dnd-core'
import type { TApiIngredient } from '../../core/type';

export const BurgerConstructorList: FC = () => {
    const loading = useAppSelector(state => state.ingredients.ingredientsLoading);
    const constructor = useAppSelector(state => state.ingredients.constructor);

    const listRef = useRef<HTMLDivElement>(null);

    const [{ canDrop }, drop] = useDrop(() => ({
        accept: [`outside-bun`, `outside-main`, `outside-sauce`],
        drop: (_, monitor) => {
            let dropPosition = 'top';

            const hoverBoundingRect = listRef.current?.getBoundingClientRect();

            if(!hoverBoundingRect) return;
    
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    
            const clientOffset = monitor.getClientOffset();
    
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

            if(hoverClientY > hoverMiddleY) dropPosition = 'bottom';
            
            return { name: 'constructor', pos: dropPosition };
        },
        collect: (monitor) => ({
            canDrop: monitor.canDrop(),
        }),
    }))

    const renderIngredient = useCallback(
        (ingredient: TApiIngredient & {rowId: string}, index: number) => {
            return (
                <ConstructorItem 
                    key={`item-${ingredient._id}-${index}`}
                    ingredient={ingredient} 
                    index={index} 
                    constructorLength={constructor.length} 
                />
            )
        }, [constructor.length],
    )

    drop(listRef);

    return (
        <div ref={listRef} className={`${styles.list} ${canDrop ? styles.listCanDrop : ''}`} data-testid="constructor">
            {loading ? (
                <div>Loading ...</div>
            ) : (
                constructor.map((item, index) => renderIngredient(item, index))  
            )}
        </div>
    )
}