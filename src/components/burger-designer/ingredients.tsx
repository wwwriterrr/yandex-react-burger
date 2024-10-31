import styles from './ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { IngredientsList } from './ingredients-list';


export const Ingredients = () => {
    const [current, setCurrent] = useState<string>('rolls');

    return (
        <div className={styles.wrap}>
            <h2 className={`text text_type_main-large ${styles.title}`}>Соберите бургер</h2>
            <div className={styles.tabs}>
                <Tab value="one" active={current === 'rolls'} onClick={setCurrent}>Булки</Tab>
                <Tab value="two" active={current === 'sauces'} onClick={setCurrent}>Соусы</Tab>
                <Tab value="three" active={current === 'fillings'} onClick={setCurrent}>Начинки</Tab>
            </div>
            <IngredientsList />
        </div>
    )
}