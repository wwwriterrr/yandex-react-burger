import React, { ChangeEvent, FormEvent, useState } from "react";
import styles from './register.module.css';
import { PageHeader, PasswordInput } from "../../components";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { FormWrap } from "../../components/form-wrap";
import { RegisterAfterContent } from "./after-content";
import { useAppDispatch } from "../../services/store";
import { authRegister } from "../../services/auth/auth-actions";


export const RegisterPage: React.FC = () => {
    const dispatch = useAppDispatch();

    const [form, setForm] = useState({name: '', email: '', password: ''});

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement;
        setForm({...form, [input.name]: input.value})
    }

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();

        if(!form.name || !form.email || !form.password) return;

        dispatch(authRegister({...form}));
    }

    const inputs = [
        <Input 
            type={'text'}
            placeholder={'Имя'} 
            inputMode={`text`}
            value={form.name}
            name={`name`}
            onChange={onChangeHandler}
            required
        />,
        <Input 
            type={'text'}
            placeholder={'E-mail'} 
            inputMode={`email`}
            value={form.email}
            name={`email`}
            onChange={onChangeHandler}
            required
        />,
        <PasswordInput 
            value={form.password}
            name={'password'}
            onChange={onChangeHandler}
        />
    ]

    return (
        <div className={styles.page}>
            <PageHeader />
            <div className={styles.form}>
                <FormWrap 
                    title={'Регистрация'}
                    inputs={inputs} 
                    btnText={'Зарегистрироваться'}
                    afterContent={<RegisterAfterContent />}
                    onSubmit={submitHandler}
                />
            </div>
        </div>
    )
}