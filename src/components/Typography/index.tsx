import { FC, ReactNode } from "react"
import s from "./Typography.module.scss"

export interface TypographyProps {
    children: ReactNode,
    variant: "h1" | "h2" | "body" | "h4",
    className?: string
}

export const Typography: FC<TypographyProps> = ({children, variant, className}) => {
    return (
        <p className={`${s[variant]} ${className ? className : ''} `}>{children}</p>
    )
}