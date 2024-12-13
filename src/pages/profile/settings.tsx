import { type ChangeEventHandler, type FC, type FormEventHandler, useEffect, useState } from 'react';
import styles from './settings.module.css';
import parentStyles from './profile.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import isEqual from 'lodash/isEqual';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { getUser } from '../../services/auth/auth-slice';
import { authProfile } from '../../services/auth/auth-actions';
import type { TUserData } from '../../core/type';


export const ProfileSettings: FC = () => {
    const dispatch = useAppDispatch();

    const [changed, setChanged] = useState<boolean>(false);

    const [error, setError] = useState<string | null>(null);

    const user: TUserData = useAppSelector(getUser) || {name: '', email: ''};

    const initialForm = {name: user.name, email: user.email, password: ''};

    const [form, setForm] = useState(initialForm);

    const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        setError(null);

        // Проверяем, чтобы не пропустить события дальше на этом этапе
        if(!form.email || !form.name || !form.password){
            setError('All required fields must be filled in!');
            return;
        }

        dispatch(authProfile({...form}));
    }

    const changeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
        setError(null);
        const input = e.target as HTMLInputElement;
        setForm({...form, [input.name]: input.value});
    }

    const resetHandler = () => {
        setError(null);
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
            <form 
                className={styles.form} 
                onSubmit={submitHandler}
                onReset={resetHandler}
            >
                {error ? (
                    <div className={styles.error}>
                        {error}
                    </div>
                ) : null}
                <Input 
                    type={'text'}
                    placeholder={'Имя'} 
                    inputMode={`text`}
                    value={form.name}
                    name={`name`}
                    onChange={changeHandler}
                    icon={`EditIcon`}
                />
                <Input 
                    type={'text'}
                    placeholder={'Логин'} 
                    inputMode={`text`}
                    value={form.email}
                    name={`email`}
                    onChange={changeHandler}
                    icon={`EditIcon`}
                />
                <Input 
                    type={'password'}
                    placeholder={'Пароль'} 
                    inputMode={`text`}
                    value={form.password}
                    name={`password`}
                    onChange={changeHandler}
                    icon={`EditIcon`}
                />
                {changed && (
                    <div className={styles.row}>
                        <Button htmlType={'reset'} type="secondary" size="small">
                            Отмена
                        </Button>
                        <Button htmlType={'submit'} type="primary" size="medium">
                            Сохранить
                        </Button>
                    </div>
                )}
            </form>
            <div className={parentStyles.after}>
                В этом разделе вы можете изменить свои персональные данные
            </div>
        </>
    )
}
