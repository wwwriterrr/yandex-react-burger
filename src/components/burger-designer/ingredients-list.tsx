import styles from './ingredients.module.css';
import React, { useEffect, useState } from 'react';
import { TApiIngredient, TApiIngredientGroup } from '../../core/type';
import { Ingredient } from './ingredients-item';
import { IngredientsSkeleton } from './ingredients-skeleton';
import { groupBy, translateGroup } from '../../core/utils';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { getIngredients } from '../../services/ingredients/ingredientsSlice';


export const IngredientsList: React.FC = () => {
    const [ingredientsGroups, setIngredientsGroups] = useState<TApiIngredientGroup | null>(null);

    const dispatch = useAppDispatch();

    const loading = useAppSelector(state => state.ingredients.ingredientsLoading);
    const error = useAppSelector(state => state.ingredients.ingredientsError);
    const ingredients = useAppSelector(state => state.ingredients.ingredients);

    useEffect(() => {
        dispatch(getIngredients());
    }, []);

    useEffect(() => {
        if(ingredients.length){
            setIngredientsGroups(groupBy(ingredients, 'type') as TApiIngredientGroup);
        }else{
            setIngredientsGroups(null);
        }
    }, [ingredients]);

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
                            {ingredientsGroups ? (
                                <>
                                    {Object.keys(ingredientsGroups).map((key, index) => (
                                        <React.Fragment key={index}>
                                            <>
                                                <h3 id={`group-${key}`} className={styles.listTitle}>{translateGroup(key)}</h3>
                                                {(ingredientsGroups[key as keyof TApiIngredientGroup] as TApiIngredient[]).map(item => (
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