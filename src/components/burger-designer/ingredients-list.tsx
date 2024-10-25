import styles from './ingredients.module.css';
import * as data from './ingredients.json';
import React, { useEffect, useState } from 'react';
import { TIngredientGroup } from '../../core/type';
import { Ingredient } from './ingredients-item';



export const IngredientsList: React.FC = () => {
    const [ingredients, setIngredients] = useState<TIngredientGroup[]>([]);

    useEffect(() => {
        setIngredients(data.ingredients);
    }, []);

    return (
        <div className={styles.list}>
            {ingredients && (
                <>
                    {ingredients.map((row, index) => (
                        <React.Fragment key={index}>
                            {row.items.length && (
                                <>
                                    <h3 className={styles.listTitle}>{row.title}</h3>
                                    {row.items.map((item, i) => (
                                        <Ingredient key={i} ingredient={item} />
                                    ))}
                                </>
                            )}
                        </React.Fragment>
                    ))}
                </>
            )}
        </div>
    )
}