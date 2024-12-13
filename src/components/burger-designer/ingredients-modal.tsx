import React from 'react';
import styles from './ingredients-modal.module.css';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { useLocation, useParams } from 'react-router-dom';
import { getIngredients } from '../../services/ingredients/ingredientsSlice';
import type { TApiIngredient } from '../../core/type';


export const IngredientDetail: React.FC = () => {
    const params = useParams();
    const location = useLocation();
    console.log('location', location.state?.background);

    const dispatch = useAppDispatch();

    let ingredient: TApiIngredient | undefined = undefined;

    const ingredients = useAppSelector(state => state.ingredients.ingredients);

    if(!ingredients || !ingredients.length){
        dispatch(getIngredients())
            .then(data => {
                console.log(data.type);
                if(data.type === 'ingredients/getIngredients/fulfilled'){
                    ingredient = (data.payload as TApiIngredient[]).find(item => item._id === params.ingredientId);
                }else{
                    return null;
                }
            })
    }else{
        ingredient = ingredients.find(item => item._id === params.ingredientId);
    }

    if(!ingredient) return null;

    const {name, image_large, proteins, fat, carbohydrates, calories} = ingredient;

    return (
        <div className={styles.wrap}>
            {!location.state?.background ? (
                <h1 className={styles.pageTitle}>Детали ингредиента</h1>
            ) : null}
            <img className={styles.image} src={image_large} alt={name} />
            <h2 className={styles.title}>{name}</h2>
            <div className={styles.params}>
                {[calories, proteins, fat, carbohydrates].map((item, i) => (
                    <div key={i} className={`${styles.paramsItem} text text_type_main-medium`}>{item}</div>
                ))}
            </div>
        </div>
    )
}
