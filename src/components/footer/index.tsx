import styles from './footer.module.css';


export const PageFooter = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.text}>powered by</div>
            <div className={styles.author}>WWWRITERRR</div>
        </footer>
    )
}