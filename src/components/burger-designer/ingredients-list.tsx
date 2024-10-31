import styles from './ingredients.module.css';
import React, { useEffect, useState } from 'react';
import { TApiIngredient, TApiIngredientGroup } from '../../core/type';
import { Ingredient } from './ingredients-item';
import { getIngredients } from '../../api/ingredients';
import { IngredientsSkeleton } from './ingredients-skeleton';
import { groupBy, translateGroup } from '../../core/utils';


export const IngredientsList: React.FC = () => {
    const [ingredients, setIngredients] = useState<TApiIngredientGroup | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        getIngredients()
            .then((data) => {
                switch(data.status){
                    case 'success':
                        if(data.data){
                            const ingredientsGroups = groupBy(data.data, 'type') as TApiIngredientGroup;
                            setIngredients(ingredientsGroups);
                        }
                        break
                    case 'error':
                        setError(data.error as string || 'Uncaught error');
                        break
                }
            })
            .finally(() => {
                setLoading(false);
            })
    }, []);

    return (
        <>
            {loading ? (
                <IngredientsSkeleton />
            ) : (
                <>
                    {error ? (
                        <div>{error}</div>
                    ) : (
                        <div className={styles.list}>
                            {ingredients ? (
                                <>
                                    {Object.keys(ingredients).map((key, index) => (
                                        <React.Fragment key={index}>
                                            <>
                                                <h3 className={styles.listTitle}>{translateGroup(key)}</h3>
                                                {(ingredients[key as keyof TApiIngredientGroup] as TApiIngredient[]).map(item => (
                                                    <Ingredient key={item._id} ingredient={item} />
                                                ))}
                                            </>
                                        </React.Fragment>
                                    ))}
                                </>
                            ) : (
                                <div>Ingredients is empty</div>
                            )}
                        </div>
                    )}
                </>
            )}
        </>
    )
}