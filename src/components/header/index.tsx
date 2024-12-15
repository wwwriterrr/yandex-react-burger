import { type FC } from 'react';
import styles from './header.module.css';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';

export const PageHeader: FC = () => {
    const location = useLocation();

    return (
        <header className={styles.header}>
            <div className={styles.wrap}>
                <div className={styles.leftNav}>
                    <Link to={'/'} className={`${styles.link} ${location.pathname === '/' ? styles.active : ''}`}>
                        <BurgerIcon type={`primary`}/>
                        <span>Конструктор</span>
                    </Link>
                    <Link to={'/profile/orders'} className={`${styles.link} ${location.pathname === '/profile/orders' ? styles.active : ''}`}>
                        <ListIcon type={`primary`}/>
                        <span>Лента заказов</span>
                    </Link>
                </div>
                <div className={styles.logo}><Logo /></div>
                <div className={styles.rightNav} >
                    <Link to={'/profile/settings'} className={`${styles.link} ${location.pathname === '/profile/settings' ? styles.active : ''}`}>
                        <ProfileIcon type={`primary`} />
                        <span>Личный кабинет</span>
                    </Link>
                </div>
            </div>
        </header>
    )
}
