import { useEffect, type FC, type ReactNode } from "react"
import { useAppDispatch } from "../../services/store"
import { checkUserAuth } from "../../services/auth/auth-actions";


export const AuthHOC: FC<{children: ReactNode}> = ({children}) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(checkUserAuth());
    }, [])

    return (
        <>{children}</>
    )
}
