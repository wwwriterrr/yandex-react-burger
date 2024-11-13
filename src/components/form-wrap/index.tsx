import React from "react";
import styles from './form-wrap.module.css';
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";


type TProps = {
    title: string,
    inputs: JSX.Element[],
    btnText?: string,
    afterContent?: JSX.Element,
    className?: string,
}

export const FormWrap: React.FC<TProps> = ({title, inputs, btnText, afterContent, className}) => {
    return (
        <div className={`${styles.wrap} ${className || ''}`}>
            <form className={styles.form}>
                <h2 className={styles.title}>{title}</h2>
                {inputs.length ? (
                    <>
                        {inputs.map((input, index) => (
                            <div key={`input-${index}`} className={styles.row}>
                                {input}
                            </div>
                        ))}
                    </>
                ) : null}
                <div className={styles.row}>
                    <Button htmlType={`submit`} type="primary" size="medium" >
                        {btnText || `Отправить`}
                    </Button>
                </div>
                {afterContent ? (
                    <div className={styles.after}>
                        {afterContent}
                    </div>
                ) : null}
            </form>
        </div>
    )
}
