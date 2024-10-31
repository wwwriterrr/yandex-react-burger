import React from 'react';
import styles from './header.module.css';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';


export const PageHeader: React.FC = () => {
    return (
        <header className={styles.header}>
            <div className={styles.wrap}>
                <div className={styles.leftNav}>
                    <a href='#' className={[styles.link, styles.active].join(' ')}>
                        <BurgerIcon type={`primary`}/>
                        <span>Конструктор</span>
                    </a>
                    <a href='#' className={styles.link}>
                        <ListIcon type={`primary`}/>
                        <span>Лента заказов</span>
                    </a>
                </div>
                <div className={styles.logo}><Logo /></div>
                <div className={styles.rightNav} >
                    <a href='#' className={styles.link}>
                        <ProfileIcon type={`primary`} />
                        <span>Личный кабинет</span>
                    </a>
                </div>
            </div>
        </header>
    )
}
