import { type FC } from 'react';
import styles from './footer.module.css';

export const PageFooter: FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.text}>powered by</div>
            <div className={styles.author}>
                <a href={`https://github.com/wwwriterrr`} target={`_blank`}>wwwriterrr</a>
            </div>
        </footer>
    )
}
