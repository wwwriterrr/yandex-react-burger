import type { FC, ReactNode } from 'react';
import { ModalOverlay } from './overlay';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { createPortal } from 'react-dom';


type TProps = {
    onClose: () => void,
    children: ReactNode,
}

export const Modal: FC<TProps> = ({children, onClose}) => {
    const container = document.querySelector('#modals');

    if(!container) return null;

    return createPortal(
        <div className={styles.wrap}>
            <ModalOverlay onClose={onClose} />
            <div className={styles.window}>
                <div className={styles.head}>
                    <button className={styles.closeButton} onClick={onClose}>
                        <CloseIcon type={`primary`} />
                    </button>
                </div>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </div>,
        container
    )
}