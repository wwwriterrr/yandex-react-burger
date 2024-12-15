import { type FC, useRef } from 'react';
import styles from './constructor.module.css';
import type { TApiIngredient } from '../../core/type';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch } from '../../services/store';
import { moveConstructorItem, removeConstructorItem } from '../../services/ingredients/ingredientsSlice';
import { useDrag, useDrop } from 'react-dnd';
import type { Identifier, XYCoord } from 'dnd-core';

type TProps = {
    ingredient: TApiIngredient & {rowId: string},
    constructorLength: number,
    index: number,
}

interface DragItem {
    index: number,
    id: string,
    type: string,
}

export const ConstructorItem: FC<TProps> = ({
    ingredient, 
    constructorLength, 
    index
}) => {
    const dispatch = useAppDispatch();

    const rowRef = useRef<HTMLDivElement>(null);

    const onCloseHandler = () => {
        dispatch(removeConstructorItem(index));
    }

    const [{handlerId}, drop] = useDrop<
        DragItem,
        void,
        { handlerId: Identifier | null }
    >(() => ({
        accept: ['bun', 'main', 'sauce'],
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item: DragItem, monitor) {
            if (!rowRef.current) {
                return;
            }
            if(ingredient.type === 'bun'){
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) return;
    
            const hoverBoundingRect = rowRef.current?.getBoundingClientRect();
    
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    
            const clientOffset = monitor.getClientOffset();
    
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
    
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
    
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
    
            dispatch(moveConstructorItem({dragIndex, hoverIndex}));
    
            item.index = hoverIndex;
        },
    }))

    const [{isDragging}, drag, preview] = useDrag(() => ({
        type: ingredient.type,
        item: () => {
            return { id: ingredient.rowId, index, type: ingredient.type };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        })
    }))

    preview(drop(rowRef));

    return (
        <div 
            ref={rowRef} 
            className={`${styles.row} ${isDragging ? styles.row_dragging : ''}`}
            data-handler-id={handlerId}
        >
            {(index !== 0 && index !== constructorLength-1 && constructorLength > 3) && (
                <button ref={drag} className={styles.toggleButton}>
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
