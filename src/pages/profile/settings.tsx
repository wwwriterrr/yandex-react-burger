import { ChangeEventHandler, FormEventHandler, useEffect, useState } from 'react';
import styles from './settings.module.css';
import parentStyles from './profile.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import isEqual from 'lodash/isEqual';


export const ProfileSettings = () => {
    const [changed, setChanged] = useState<boolean>(false);

    const initialForm = {
        name: 'name',
        login: 'login',
        password: 'P@ssw0rd'
    }

    const [form, setForm] = useState(initialForm);

    const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
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
                    value={form.login}
                    name={`login`}
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
                    <Button htmlType={'submit'} type="primary" size="medium">
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
