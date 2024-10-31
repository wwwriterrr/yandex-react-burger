import { PageFooter, PageHeader } from '../../components';
import { BurgerDesigner } from '../../components/burger-designer';
import styles from './main-page.module.css';


export const MainPage = () => {
    return (
        <div className={styles.page}>
            <PageHeader />
            <BurgerDesigner />
            <PageFooter />
        </div>
    )
}
