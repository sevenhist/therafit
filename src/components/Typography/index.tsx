import { FC, ReactNode } from "react"
import s from "./Typography.module.scss"

export interface TypographyProps {
    children: ReactNode,
    variant: "h1" | "h2" | "body"
}

export const Typography: FC<TypographyProps> = ({children, variant}) => {
    return (
        <p className={s[variant]}>{children}</p>
    )
}