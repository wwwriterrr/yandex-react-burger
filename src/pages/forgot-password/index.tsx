import { type FC, type ChangeEvent, type FormEvent, useState } from 'react';
import styles from './fp.module.css';
import { PageHeader, PasswordInput } from '../../components';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { FormWrap } from '../../components/form-wrap';
import { ForgotAfterContent } from './after-content';
import { useAppDispatch } from '../../services/store';
import { authResetPassword } from '../../services/auth/auth-actions';
import { useNavigate } from 'react-router-dom';


export const ForgotPage: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState({password: '', token: ''});

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement;
        setForm({...form, [input.name]: input.value})
    }

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();

        if(!form.password || !form.token) return;

        dispatch(authResetPassword({...form}))
            .then(data => {
                if(data.type === 'auth/resetPassword/fulfilled') navigate('/login');
            })
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
            value={form.token}
            name={`token`}
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
                    onSubmit={submitHandler}
                />
            </div>
        </div>
    )
}