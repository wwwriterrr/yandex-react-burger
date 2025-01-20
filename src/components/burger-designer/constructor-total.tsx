import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './constructor.module.css';
import {type FC, useEffect, useState } from 'react';
import { useModalContext } from '../../contexts';
import { TotalModal } from './total-modal';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { createOrder, TOrderResponse } from '../../services/ingredients/ingredientsSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { getUser } from '../../services/auth/auth-slice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructorTotal: FC = () => {
    const [total, setTotal] = useState<number>(0);

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const user = useAppSelector(getUser);

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
        if(!user) navigate('/login');

        if(loading) return;

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