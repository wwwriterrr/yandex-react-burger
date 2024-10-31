import React from "react";
import styles from './modal.module.css';
import { useModalContext } from "../../contexts";


export const ModalOverlay: React.FC = () => {
    const {closeModal} = useModalContext();

    const overlayClickHandler = () => {
        closeModal();
    }

    return (
        <div className={styles.overlay} onClick={overlayClickHandler}></div>
    )
}