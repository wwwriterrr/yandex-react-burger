import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './fp.module.css';
import { Link } from 'react-router-dom';
import { type FC } from 'react';


export const ForgotAfterContent: FC = () => {
    return (
        <p className={styles.row}>
            Вспомнили пароль? 
            <Link to={'/login'}>
                <Button htmlType="button" type="secondary" size="small">Войти</Button>
            </Link>
        </p>
    )
}
