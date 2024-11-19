import { FC, ReactNode } from "react"
import s from "./Button.module.scss"

interface ButtonProps {
    children: ReactNode,
    className?: string,
    onClick?: () => void,
    variables?: "fitContent",
    type?: "button" | "submit" | "reset" | undefined
}

export const Button: FC<ButtonProps> = ({ children, className, onClick, variables, type }) => {
    return (
        <button type={type ? type : "button"} onClick={onClick} className={`${className ? className : ''} ${s.button} ${variables ? s[variables] : ''}`}>{children}</button>
    )
}