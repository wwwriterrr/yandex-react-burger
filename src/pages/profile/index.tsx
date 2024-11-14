import { Outlet } from 'react-router-dom';
import { PageHeader } from '../../components';
import styles from './profile.module.css';
import { ProfileNav } from './nav';


export const ProfilePage = () => {
    return (
        <div className={styles.page}>
            <PageHeader />
            <div className={styles.wrap}>
                <ProfileNav />
                <Outlet />
            </div>
        </div>
    )
}