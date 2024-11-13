import React, { ChangeEvent, useRef, useState } from "react"
import { FormWrap } from "../../components/form-wrap"
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { LoginAfterContent } from "./after-content";
import styles from './login.module.css';
import { PageHeader } from "../../components";


export const LoginPage: React.FC = () => {
    const passwdRef = useRef<HTMLInputElement>(null);

    const [form, setForm] = useState({login: '', password: ''});

    const [passwdType, setPasswdType] = useState<'password' | 'text'>('password');
    const [icon, setIcon] = useState<'ShowIcon' | 'HideIcon'>('ShowIcon');

    const iconClickHandler = () => {
        if(passwdRef.current?.type === 'password'){
            setPasswdType('text');
            setIcon('HideIcon');
        }else if(passwdRef.current?.type === 'text'){
            setPasswdType('password');
            setIcon('ShowIcon');
        }
    }

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
        <Input 
            ref={passwdRef}
            type={passwdType}
            placeholder={'Пароль'} 
            value={form.password}
            name={`password`}
            onChange={onChangeHandler}
            icon={icon}
            onIconClick={iconClickHandler}
            required
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
