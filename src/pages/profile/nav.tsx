import { Link, useLocation } from 'react-router-dom';
import styles from './nav.module.css';


export const ProfileNav = () => {
    const location = useLocation();

    const links = [
        ['Профиль', '/profile/settings'],
        ['История заказов', '/profile/orders'],
        ['Выход', '/logout']
    ]

    return (
        <nav className={styles.nav}>
            <ul className={styles.links}>
                {links.map((item, i) => (
                    <li key={`link-${i}`} className={`${styles.link} ${location.pathname === item[1] ? styles.linkActive : ''}`}>
                        <Link to={item[1]} >{item[0]}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}