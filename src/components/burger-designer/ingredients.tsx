import styles from './ingredients.module.css';
import { IngredientsList } from './ingredients-list';
import { IngredientsTabs } from './ingredients-tabs';
import { useRef } from 'react';


export const Ingredients = () => {
    const listRef = useRef<HTMLDivElement>(null);

    return (
        <div className={styles.wrap}>
            <h2 className={`text text_type_main-large ${styles.title}`}>Соберите бургер</h2>
            <IngredientsTabs listRef={listRef} />
            <IngredientsList listRef={listRef} />
        </div>
    )
}