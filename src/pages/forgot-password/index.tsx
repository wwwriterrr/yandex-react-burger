import React, { ChangeEvent, useState } from "react";
import styles from './fp.module.css';
import { PageHeader, PasswordInput } from "../../components";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { FormWrap } from "../../components/form-wrap";
import { ForgotAfterContent } from "./after-content";


export const ForgotPage: React.FC = () => {
    const [form, setForm] = useState({password: '', code: ''});

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement;
        setForm({...form, [input.name]: input.value})
    }

    const inputs = [
        <PasswordInput 
            value={form.password}
            name={'password'}
            onChange={onChangeHandler}
            placeholder={'Введите новый пароль'} 
        />,
        <Input 
            type={'text'}
            placeholder={'Введите код из письма'} 
            inputMode={`text`}
            value={form.code}
            name={`code`}
            onChange={onChangeHandler}
            required
        />,
    ]

    return (
        <div className={styles.page}>
            <PageHeader />
            <div className={styles.form}>
                <FormWrap 
                    title={'Восстановление пароля'}
                    inputs={inputs} 
                    btnText={'Сохранить'}
                    afterContent={<ForgotAfterContent />}
                />
            </div>
        </div>
    )
}