import React, { ReactNode } from "react"
import { ModalWrap } from "../components/modal-wrap"
// import { useModalContext } from "../contexts"
import { createPortal } from "react-dom";


export const ModalMiddleware: React.FC<{children: ReactNode}> = ({children}) => {
    // const {modalContent} = useModalContext();

    return (
        <>
            {/* {modalContent ? <ModalWrap /> : null} */}
            {children}
            {createPortal(<ModalWrap />, document.querySelector('#modals') as HTMLDivElement)}
        </>
    )
}