import { Button } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from './login.module.css';


export const LoginAfterContent = () => {
    return (
        <>
            <p className={styles.row}>
                Вы — новый пользователь? 
                <Button htmlType="button" type="secondary" size="small">Зарегистрироваться</Button>
            </p>
            <p className={styles.row}>
                Забыли пароль? 
                <Button htmlType="button" type="secondary" size="small">Восстановить пароль</Button>
            </p>
        </>
    )
}
