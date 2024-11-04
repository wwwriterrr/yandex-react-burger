import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './constructor.module.css';
import React, { useEffect, useState } from 'react';
import { useModalContext } from '../../contexts';
import { TotalModal } from './total-modal';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { createOrder, TOrderResponse } from '../../services/ingredients/ingredientsSlice';
import { PayloadAction } from '@reduxjs/toolkit';


export const BurgerConstructorTotal: React.FC = () => {
    const [total, setTotal] = useState<number>(0);

    const dispatch = useAppDispatch();

    const {openModal} = useModalContext();

    const constructor = useAppSelector(state => state.ingredients.constructor);

    const loading = useAppSelector(state => state.ingredients.orderLoading);

    useEffect(() => {
        if(constructor.length){
            const sum = constructor.reduce((acc, item) => { return acc + item.price }, 0);

            setTotal(sum);
        }else{
            setTotal(0);
        }
    }, [constructor]);

    const onClickHandler: () => void = () => {
        dispatch(createOrder())
            .then((data) => {
                if(data.type === 'ingredients/createOrder/fulfilled'){
                    const response: TOrderResponse = (data as PayloadAction<TOrderResponse>).payload;
                    openModal(null, <TotalModal number={response.order.number} name={response.name} />);
                }
            })
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
                        {loading ? 'Ожидайте ...' : `Оформить заказ`}
                    </Button>
                </div>
            ) : null}
        </>
    )
}