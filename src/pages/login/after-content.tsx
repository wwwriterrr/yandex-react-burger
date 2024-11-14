import { Button } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from './login.module.css';
import { Link } from "react-router-dom";


export const LoginAfterContent = () => {
    return (
        <>
            <p className={styles.row}>
                Вы — новый пользователь? 
                <Link to={'/register'}>
                    <Button htmlType="button" type="secondary" size="small">Зарегистрироваться</Button>
                </Link>
            </p>
            <p className={styles.row}>
                Забыли пароль? 
                <Link to={'/reset-password'}>
                    <Button htmlType="button" type="secondary" size="small">Восстановить пароль</Button>
                </Link>
            </p>
        </>
    )
}
