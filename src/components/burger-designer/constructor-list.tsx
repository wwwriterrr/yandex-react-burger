import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './constructor.module.css';
import * as data from './ingredients.json';
import { useState, useEffect } from 'react';
import { TIngredient } from '../../core/type';


export const BurgerConstructorList = () => {
    const [order, setOrder] = useState<TIngredient[]>([]);

    useEffect(() => {
        setOrder(data.order);
    }, []);

    return (
        <div className={styles.list}>
            <div className={styles.row}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={200}
                    thumbnail={`/ingredient1.png`}
                    extraClass={styles.item}
                />
            </div>
            {order.length && (
                <>
                    {order.map((row, index) => (
                        <div className={styles.row}>
                            <button className={styles.toggleButton}>
                                <DragIcon type={`primary`} />
                            </button>
                            <ConstructorElement
                                key={index}
                                text={row.title}
                                price={row.price}
                                thumbnail={row.image}
                                extraClass={styles.item}
                            />
                        </div>
                    ))}
                </>
            )}
            <div className={styles.row}>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i (низ)"
                    price={200}
                    thumbnail={`/ingredient1.png`}
                    extraClass={styles.item}
                />
            </div>
        </div>
    )
}