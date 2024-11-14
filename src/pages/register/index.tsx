import React, { ChangeEvent, useState } from "react";
import styles from './register.module.css';
import { PageHeader, PasswordInput } from "../../components";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { FormWrap } from "../../components/form-wrap";
import { RegisterAfterContent } from "./after-content";


export const RegisterPage: React.FC = () => {
    const [form, setForm] = useState({name: '', email: '', password: ''});

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement;
        setForm({...form, [input.name]: input.value})
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
                />
            </div>
        </div>
    )
}