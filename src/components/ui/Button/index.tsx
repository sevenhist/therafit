import { FC, ReactNode } from "react"
import s from "./Button.module.scss"

interface ButtonProps {
    children: ReactNode,
    className?: string,
    onClick?: () => void,
    variables?: "fitContent",
    type?: "button" | "submit" | "reset" | undefined,
    variant?: "primary" | "secondary"
}

export const Button: FC<ButtonProps> = ({ children, className, onClick, variables, type, variant }) => {
    return (
        <button type={type ? type : "button"} onClick={onClick} className={`${variant === "secondary" ? className=s.button__secondary : className=s.button__primary} ${className ? className : ''} ${s.button} ${variables ? s[variables] : ''}`}>{children}</button>
    )
}