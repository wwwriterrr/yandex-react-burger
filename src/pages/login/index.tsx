import { type FC, type ChangeEvent, type FormEvent, useState } from 'react'
import { FormWrap } from '../../components/form-wrap';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { LoginAfterContent } from './after-content';
import styles from './login.module.css';
import { PageHeader, PasswordInput } from '../../components';
import { useAppDispatch } from '../../services/store';
import { authLogin } from '../../services/auth/auth-actions';


export const LoginPage: FC = () => {
    const dispatch = useAppDispatch();

    const [form, setForm] = useState({login: '', password: ''});

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement;
        setForm({...form, [input.name]: input.value})
    }

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();

        if(!form.login || !form.password) return;

        dispatch(authLogin({email: form.login, password: form.password}));
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
            data-testid={'login_input'}
        />,
        <PasswordInput 
            value={form.password}
            name={'password'}
            onChange={onChangeHandler}
            data-testid={'password_input'}
            testId={'password_input'}
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
                    onSubmit={submitHandler}
                />
            </div>
        </div>
    )
}
