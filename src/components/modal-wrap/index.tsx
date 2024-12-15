import { type FC, useEffect } from 'react';
import { useModalContext } from '../../contexts';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from './modal-overlay';

export const ModalWrap: FC = () => {
    const {modalContent, modalTitle, closeModal} = useModalContext();

    const closeClickHandler = () => {
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
    }, [closeModal])

    return (
        <>
            {modalContent ? (
                <div className={styles.wrap}>
                    <ModalOverlay />
                    <div className={styles.window}>
                        <div className={styles.head}>
                            {modalTitle && <div className={`${styles.title} text text_type_main-large`}>{modalTitle}</div>}
                            <button className={styles.closeButton} onClick={closeClickHandler}>
                                <CloseIcon type={`primary`} />
                            </button>
                        </div>
                        <div className={styles.content}>
                            {modalContent}
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    )
}
