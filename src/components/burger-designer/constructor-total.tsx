import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './constructor.module.css';
import * as data from './ingredients.json';
import React, { useEffect, useState } from 'react';
import { useModalContext } from '../../contexts';
import { TotalModal } from './total-modal';


export const BurgerConstructorTotal: React.FC = () => {
    const cart = data.order;
    const [total, setTotal] = useState<number>(0);

    const {openModal} = useModalContext();

    useEffect(() => {
        let total: number = 400;
        cart.map(row => total += row.price);
        setTotal(total);
    }, [cart]);

    const onClickHandler: () => void = () => {
        openModal(null, <TotalModal />);
    }

    return (
        <>
            {total ? (
                <div className={styles.total}>
                    <div className={styles.price}>
                        <span>{total}</span>
                        <CurrencyIcon type={`primary`} />
                    </div>
                    <Button htmlType="button" type={`primary`} size="large" onClick={onClickHandler}>
                        Оформить заказ
                    </Button>
                </div>
            ) : null}
        </>
    )
}