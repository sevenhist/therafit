import { FC, ReactNode } from "react"
import s from "./Container.module.scss"

export interface ContainerProps {
    children: ReactNode
}

export const Container: FC<ContainerProps> = ({children}) => {
    return (
        <div className={s.container}>
            {children}
        </div>
    )
}