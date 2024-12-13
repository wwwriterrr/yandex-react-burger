import {type FC} from 'react';
import styles from './modal.module.css';

type TProps = {
    onClose: () => void,
}

export const ModalOverlay: FC<TProps> = ({onClose}) => {
    return (
        <div className={styles.overlay} onClick={onClose}></div>
    )
}
