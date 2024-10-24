import React, { useEffect } from 'react';
import { useModalContext } from '../../contexts';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';


export const ModalWrap: React.FC = () => {
    const {modalContent, modalTitle, closeModal} = useModalContext();

    const overlayClickHandler = () => {
        closeModal();
    }

    useEffect(() => {
        const escHandler = (e: KeyboardEvent) => {
            if(e.code === 'Escape') closeModal();
        }

        document.addEventListener('keydown', escHandler);

        return () => {
            document.removeEventListener('keydown', escHandler);
        }
    }, [])

    return (
        <div className={styles.wrap}>
            <div className={styles.overlay} onClick={overlayClickHandler}></div>
            <div className={styles.window}>
                <div className={styles.head}>
                    {modalTitle && <div className={`${styles.title} text text_type_main-large`}>{modalTitle}</div>}
                    <button className={styles.closeButton} onClick={overlayClickHandler}>
                        <CloseIcon type={`primary`} />
                    </button>
                </div>
                <div className={styles.content}>
                    {modalContent}
                </div>
            </div>
        </div>
    )
}
