import React from "react";
import styles from './modal.module.css';


type TProps = {
    onClose: () => void,
}

export const ModalOverlay: React.FC<TProps> = ({onClose}) => {
    return (
        <div className={styles.overlay} onClick={onClose}></div>
    )
}
