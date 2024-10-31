import styles from './ingredients-skeleton.module.css';


export const IngredientsSkeleton = () => {
    return (
        <div className={styles.wrap}>
            {[0,1,2,3,4,5].map(i => (
                <div key={i} className={styles.item}></div>
            ))}
        </div>
    )
}
