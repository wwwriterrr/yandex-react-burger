import { Button } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from './register.module.css';
import { Link } from "react-router-dom";


export const RegisterAfterContent = () => {
    return (
        <p className={styles.row}>
            Уже зарегистрированы? 
            <Link to={'/login'}>
                <Button htmlType="button" type="secondary" size="small">Войти</Button>
            </Link>
        </p>
    )
}
