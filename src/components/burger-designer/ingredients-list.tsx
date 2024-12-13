import styles from './ingredients.module.css';
import React, { type FC, type RefObject, useEffect, useState } from 'react';
import { TApiIngredient, TApiIngredientGroup } from '../../core/type';
import { Ingredient } from './ingredients-item';
import { IngredientsSkeleton } from './ingredients-skeleton';
import { groupBy, translateGroup } from '../../core/utils';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { getIngredients } from '../../services/ingredients/ingredientsSlice';

export const IngredientsList: FC<{listRef: RefObject<HTMLDivElement>}> = ({listRef}) => {
    const [ingredientsGroups, setIngredientsGroups] = useState<TApiIngredientGroup | null>(null);

    const dispatch = useAppDispatch();

    const loading = useAppSelector(state => state.ingredients.ingredientsLoading);
    const error = useAppSelector(state => state.ingredients.ingredientsError);
    const ingredients = useAppSelector(state => state.ingredients.ingredients);

    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch]);

    useEffect(() => {
        if(ingredients.length){
            const groups: TApiIngredientGroup = groupBy(ingredients, 'type');
            setIngredientsGroups(groups);
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
                        <div ref={listRef} className={styles.list}>
                            {ingredientsGroups ? (
                                <>
                                    {Object.keys(ingredientsGroups).map((key, index) => (
                                        <React.Fragment key={index}>
                                            <>
                                                <h3 id={`group-${key}`} data-type={key} className={styles.listTitle}>{translateGroup(key)}</h3>
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