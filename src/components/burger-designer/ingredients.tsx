import styles from './ingredients.module.css';
import { IngredientsList } from './ingredients-list';
import { IngredientsTabs } from './ingredients-tabs';


export const Ingredients = () => {
    return (
        <div className={styles.wrap}>
            <h2 className={`text text_type_main-large ${styles.title}`}>Соберите бургер</h2>
            <IngredientsTabs />
            <IngredientsList />
        </div>
    )
}