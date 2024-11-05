import React, { ReactNode, useCallback } from 'react';
import { useState, useContext } from 'react';
import { useAppDispatch } from '../services/store';
import { setActiveIngredient } from '../services/ingredients/ingredientsSlice';


type TModalContext = {
    modalContent: ReactNode,
    setModalContent: React.Dispatch<React.SetStateAction<ReactNode>>,
    modalTitle: ReactNode | string,
    setModalTitle: React.Dispatch<React.SetStateAction<ReactNode | string>>,
    openModal: (title: string | null, content: ReactNode) => void;
    closeModal: () => void;
}

type TContextProps = {
    modalTitle?: ReactNode | string,
    modalContent?: ReactNode,
}

const Context = React.createContext<TModalContext | null>(null);

export const ModalContextProvider: React.FC<{children: ReactNode, props?: TContextProps}> = ({children, ...props}) => {
    const context = useCreateModalContext(props as TContextProps);
    return <Context.Provider value={context}>{children}</Context.Provider>
}

export function useModalContext() {
    const context = useContext(Context);
    if(!context) throw new Error(`Use modal context within provider!`);
    return context;
}

export const useCreateModalContext = function (props: TContextProps) {
    const [modalTitle, setModalTitle] = useState<ReactNode>(props.modalTitle || null);
    const [modalContent, setModalContent] = useState<ReactNode>(props.modalContent || null);

    const dispatch = useAppDispatch();

    const openModal = useCallback((title: string | null, content: ReactNode) => {
        setModalTitle(title);
        setModalContent(content);
    }, []);

    const closeModal = useCallback(() => {
        setModalTitle(null);
        setModalContent(null);
        dispatch(setActiveIngredient({ingredient: null}));
    }, []);

    return {
        modalContent,
        setModalContent,
        modalTitle,
        setModalTitle,
        openModal,
        closeModal,
    }
}
