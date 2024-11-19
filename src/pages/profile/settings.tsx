import { ChangeEventHandler, FormEventHandler, useEffect, useRef, useState } from 'react';
import styles from './settings.module.css';
import parentStyles from './profile.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import isEqual from 'lodash/isEqual';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { getUser } from '../../services/auth/auth-slice';
import { authProfile } from '../../services/auth/auth-actions';


export const ProfileSettings = () => {
    const dispatch = useAppDispatch();

    const [changed, setChanged] = useState<boolean>(false);

    const user = useAppSelector(getUser);

    if(!user) return null;

    // const [initialForm, setInitialForm] = useState({name: user.name, email: user.email, password: ''});

    const initialForm = {name: user.name, email: user.email, password: ''};

    const [form, setForm] = useState(initialForm);

    const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        submit();
    }

    const submit = () => {
        if(!form.email || !form.name || !form.password) return;

        dispatch(authProfile({...form}));
    }

    const changeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
        const input = e.target as HTMLInputElement;
        setForm({...form, [input.name]: input.value});
    }

    const resetHandler = () => {
        setForm(initialForm);
    }

    useEffect(() => {
        if(!isEqual(initialForm, form)) setChanged(true);
        else setChanged(false);
    }, [form])

    useEffect(() => {
        setForm({name: user.name, email: user.email, password: ''});
    }, [user])

    return (
        <>
            <form className={styles.form} onSubmit={submitHandler}>
                <Input 
                    type={'text'}
                    placeholder={'Имя'} 
                    inputMode={`text`}
                    value={form.name}
                    name={`name`}
                    onChange={changeHandler}
                    icon={`EditIcon`}
                    required
                />
                <Input 
                    type={'text'}
                    placeholder={'Логин'} 
                    inputMode={`text`}
                    value={form.email}
                    name={`email`}
                    onChange={changeHandler}
                    icon={`EditIcon`}
                    required
                />
                <Input 
                    type={'password'}
                    placeholder={'Пароль'} 
                    inputMode={`text`}
                    value={form.password}
                    name={`password`}
                    onChange={changeHandler}
                    icon={`EditIcon`}
                    required
                />
            </form>
            {changed && (
                <div className={parentStyles.manage}>
                    <Button htmlType={'button'} type="secondary" size="small" onClick={resetHandler}>
                        Отмена
                    </Button>
                    <Button htmlType={'button'} type="primary" size="medium" onClick={submit}>
                        Сохранить
                    </Button>
                </div>
            )}
            <div className={parentStyles.after}>
                В этом разделе вы можете изменить свои персональные данные
            </div>
        </>
    )
}
