import React, { ChangeEvent, useState } from "react"
import { FormWrap } from "../../components/form-wrap"
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { LoginAfterContent } from "./after-content";
import styles from './login.module.css';
import { PageHeader, PasswordInput } from "../../components";


export const LoginPage: React.FC = () => {
    const [form, setForm] = useState({login: '', password: ''});

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement;
        setForm({...form, [input.name]: input.value})
    }

    const inputs = [
        <Input 
            type={'text'}
            placeholder={'E-mail'} 
            inputMode={`email`}
            value={form.login}
            name={`login`}
            onChange={onChangeHandler}
            required
        />,
        <PasswordInput 
            value={form.password}
            name={'password'}
            onChange={onChangeHandler}
        />
    ]

    const afterContent = <LoginAfterContent />

    return (
        <div className={styles.page}>
            <PageHeader />
            <div className={styles.form}>
                <FormWrap 
                    title={`Вход`} 
                    inputs={inputs} 
                    btnText={`Войти`} 
                    afterContent={afterContent}
                />
            </div>
        </div>
    )
}
