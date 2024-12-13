import { type FC } from 'react';
import styles from './modal.module.css';
import { useModalContext } from '../../contexts';

export const ModalOverlay: FC = () => {
    const {closeModal} = useModalContext();

    const overlayClickHandler = () => {
        closeModal();
    }

    return (
        <div className={styles.overlay} onClick={overlayClickHandler}></div>
    )
}
