import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import {type FC, ChangeEvent, useRef, useState} from 'react';

type TProps = {
    value: string,
    name: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    placeholder?: string,
    testId?: string,
}

export const PasswordInput: FC<TProps> = ({value, name, onChange, placeholder, testId}) => {
    const passwdRef = useRef<HTMLInputElement>(null);

    const [passwdType, setPasswdType] = useState<'password' | 'text'>('password');
    const [icon, setIcon] = useState<'ShowIcon' | 'HideIcon'>('ShowIcon');

    const iconClickHandler = () => {
        if(passwdRef.current?.type === 'password'){
            setPasswdType('text');
            setIcon('HideIcon');
        }else if(passwdRef.current?.type === 'text'){
            setPasswdType('password');
            setIcon('ShowIcon');
        }
    }

    return (
        <Input 
            ref={passwdRef}
            type={passwdType}
            placeholder={placeholder || 'Пароль'} 
            value={value}
            name={name}
            onChange={onChange}
            icon={icon}
            onIconClick={iconClickHandler}
            required
            data-testid={testId}
        />
    )
}
