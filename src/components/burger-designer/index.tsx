import { type FC } from 'react';
import { BurgerConstruktor } from './constructor';
import styles from './designer.module.css';
import { Ingredients } from './ingredients';

export const BurgerDesigner: FC = () => {
    return (
        <div className={styles.wrap}>
            <Ingredients />
            <BurgerConstruktor />
        </div>
    )
}
