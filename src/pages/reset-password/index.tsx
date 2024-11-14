import React, { ChangeEvent, useState } from "react"
import { FormWrap } from "../../components/form-wrap"
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { ResetAfterContent } from "./after-content";
import styles from './rp.module.css';
import { PageHeader } from "../../components";


export const ResetPage: React.FC = () => {
    const [form, setForm] = useState({email: ''});

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement;
        setForm({...form, [input.name]: input.value})
    }

    const inputs = [
        <Input 
            type={'text'}
            placeholder={'Укажите E-mail'} 
            inputMode={`email`}
            value={form.email}
            name={`email`}
            onChange={onChangeHandler}
            required
        />,
    ]

    return (
        <div className={styles.page}>
            <PageHeader />
            <div className={styles.form}>
                <FormWrap 
                    title={`Восстановление пароля`} 
                    inputs={inputs} 
                    btnText={`Восстановить`} 
                    afterContent={<ResetAfterContent />}
                />
            </div>
        </div>
    )
}
