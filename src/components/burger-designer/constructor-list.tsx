import styles from './constructor.module.css';
import { useAppSelector } from '../../services/store';
import { ConstructorItem } from './constructor-item';


export const BurgerConstructorList = () => {
    const loading = useAppSelector(state => state.ingredients.ingredientsLoading);
    const constructor = useAppSelector(state => state.ingredients.constructor);

    return (
        <div className={styles.list}>
            {loading ? (
                <div>Loading ...</div>
            ) : (
                <>
                    {constructor.length >= 2 ? (
                        <>
                            {constructor.map((item, index) => (
                                <ConstructorItem 
                                    key={item.type === 'bun' ? `item-${item._id}-${index}` : `item-${item._id}`} 
                                    ingredient={item} 
                                    index={index} 
                                    constructorLength={constructor.length} 
                                />
                            ))}
                        </>
                    ) : null}
                </>
            )}
        </div>
    )
}