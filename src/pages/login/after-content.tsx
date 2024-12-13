import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';
import { Link } from 'react-router-dom';
import { type FC } from 'react';


export const LoginAfterContent: FC = () => {
    return (
        <>
            <p className={styles.row}>
                Вы — новый пользователь? 
                <Link to={'/register'}>
                    <Button htmlType="button" type="secondary" size="small">Зарегистрироваться</Button>
                </Link>
            </p>
            <p className={styles.row}>
                Забыли пароль? 
                <Link to={'/forgot-password'}>
                    <Button htmlType="button" type="secondary" size="small">Восстановить пароль</Button>
                </Link>
            </p>
        </>
    )
}
