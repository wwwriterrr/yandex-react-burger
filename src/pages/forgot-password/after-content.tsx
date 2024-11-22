import { Button } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from './fp.module.css';
import { Link } from "react-router-dom";


export const ForgotAfterContent = () => {
    return (
        <p className={styles.row}>
            Вспомнили пароль? 
            <Link to={'/login'}>
                <Button htmlType="button" type="secondary" size="small">Войти</Button>
            </Link>
        </p>
    )
}
