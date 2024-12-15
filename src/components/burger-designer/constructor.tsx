import {type FC} from 'react';
import styles from './constructor.module.css';
import { 
    BurgerConstructorList, 
    BurgerConstructorTotal 
} from '../../components';

export const BurgerConstruktor: FC = () => {
    return (
        <div className={styles.wrap}>
            <BurgerConstructorList />
            <BurgerConstructorTotal />
        </div>
    )
}