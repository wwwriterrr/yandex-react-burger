import { BurgerConstruktor } from './constructor';
import styles from './designer.module.css';
import { Ingredients } from './ingredients';


export const BurgerDesigner = () => {
    return (
        <div className={styles.wrap}>
            <Ingredients />
            <BurgerConstruktor />
        </div>
    )
}