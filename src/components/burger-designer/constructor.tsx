import React from "react";
import styles from './constructor.module.css';
import { 
    BurgerConstructorList, 
    BurgerConstructorTotal 
} from "../../components";


export const BurgerConstruktor: React.FC = () => {
    return (
        <div className={styles.wrap}>
            <BurgerConstructorList />
            <BurgerConstructorTotal />
        </div>
    )
}