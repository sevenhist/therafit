'use client'
import Link from "next/link"
import s from "./Login.module.scss"
import { ROUTES } from "../../routes/routes"
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Field, FieldBox } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import useUserStore from "@/modules/userInformation/store";
import { Header } from "@/components/Header";


interface FormData {
    Email: string,
    Password: string
}
interface LoginProps {
    
}

export const Login: FC<LoginProps> = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        mode: 'all'
    })
    const fetchLogin = useUserStore(state => state.fetchLogin)

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log("On Login schicken: ", data)
        fetchLogin(data.Email, data.Password);
    };
    const fields: Array<Field> = [
        {
            register: register,
            name: 'Email',
            required: "This field is required!",
            patternValue: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/,
            message: 'Please enter a valid email address!',
            errors: errors,
            title: 'Email',
            type: 'text',
        },
        {
            register: register,
            name: 'Password',
            required: "This field is required!",
            patternValue: /[0-9a-zA-Z!@#$%^&*]{8,}/g,
            message: 'Minimum 8 characters',
            errors: errors,
            title: 'Password',
            type: 'password'
        },
    ];


    return (
        <div className={s.login}>
            <Header />
            <form onSubmit={handleSubmit(onSubmit)} className={s.login__form}>
            <h1 className={s.login__title}>Sign in</h1>
                {
                    fields.map((field, key) => (
                        <FieldBox 
                            className={s.login__input}
                            key={key}
                            title={field.title}
                            register={field.register}
                            name={field.name}
                            required={field.required}
                            patternValue={field.patternValue}
                            message={field.message}
                            errors={field.errors}
                            type={field.type}
                        />
                    ))
                }
                <Button type="submit" className={s.login__button}><p>Sign in</p></Button>
                <div className={s.login__footer}>
                    <p className={s.login__footer__text}>Don't have an account?</p>
                    <Link className={s.login__footer__registration} href={ROUTES.AUTH.registration}><p>Sign up</p></Link>
                </div>
            </form>
        </div>
    )
}