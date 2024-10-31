import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './constructor.module.css';
import React, { useEffect, useState } from 'react';
import { useModalContext } from '../../contexts';
import { TotalModal } from './total-modal';
import { useAppSelector } from '../../services/store';


export const BurgerConstructorTotal: React.FC = () => {
    const [total, setTotal] = useState<number>(0);

    const {openModal} = useModalContext();

    const constructor = useAppSelector(state => state.ingredients.constructor);

    useEffect(() => {
        if(constructor.length){
            const sum = constructor.reduce((acc, item) => { return acc + item.price }, 0);

            setTotal(sum);
        }else{
            setTotal(0);
        }
    }, [constructor]);

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