'use client'
import React, { FC } from "react";
import Link from "next/link";
import s from "./Registration.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { Field, FieldBox } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import useUserStore from "@/modules/userInformation/store";
import { Header } from "@/components/Header";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/routes/routes";
import Image from "next/image";
import background from "../../../assets/img/Group.png"



// Define a type for the form data
interface FormData {
    Name: string;
    Last_name: string;
    Email: string;
    Password: string;
}


export const Registration: FC = () => {
    const router = useRouter()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormData>({
        mode: 'all'
    })

    const fetchRegister = useUserStore(state => state.fetchRegistration)

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        try {
            await fetchRegister(data.Name, data.Last_name, data.Email, data.Password);
            router.push(ROUTES.confirmEmail);
        } catch(error) {
            console.error("Registration error:", error);
        }
    };
    const fields: Array<Field> = [
        {
            register: register,
            name: 'Name',
            required: "This field is required!",
            errors: errors,
            title: "First Name",
            type: 'text'
        },
        {
            register: register,
            name: 'Last_name',
            required: "This field is required!",
            errors: errors,
            title: "Last Name",
            type: 'text'
        },
        {
            register: register,
            name: 'Email',
            required: "This field is required!",
            patternValue: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/,
            message: 'Please enter a valid email address!',
            errors: errors,
            title: 'Email',
            type: 'text'
        },
        {
            register: register,
            name: 'Password',
            required: "This field is required!",
            patternValue: /[0-9a-zA-Z!@#$%^&*=]{8,}/g,
            message: 'Minimum 8 characters',
            errors: errors,
            title: 'Password',
            type: 'password'
        },
        {
            register: register,
            name: 'Confirm_password',
            required: "This field is required!",
            patternValue: /[0-9a-zA-Z!@#$%^&*=]{8,}/g,
            message: 'The password is incorrect!',
            errors: errors,
            title: 'Confirm Password',
            type: 'password',
            validation: "Password",
            watch: watch,
        },
    ];

    return (
    <div className={s.registration}>
        <Header />
        <div className={s.registration__background}>
                <Image
                    className={s.registration__background__img}
                    src={background}
                    alt="image"
                    priority
                />
            </div>
        <form onSubmit={handleSubmit(onSubmit)} className={s.registration__form}>
        <h1 className={s.registration__title}>Sign up</h1>
            {
                fields.map((field, key) => (
                    <FieldBox 
                        className={s.registration__input}
                        key={key}
                        title={field.title}
                        register={field.register}
                        name={field.name}
                        required={field.required}
                        patternValue={field.patternValue}
                        message={field.message}
                        errors={field.errors}
                        type={field.type}
                        watch={field.watch}
                        validation={field.validation}
                    />
                ))
            }
            <Button className={s.registration__button} type="submit"><p>Sign up</p></Button>
            <div className={s.registration__footer}>
                <p className={s.registration__footer__text}>Already have an account?</p>
                <Link className={s.registration__footer__login} href={ROUTES.AUTH.login}>Login</Link>
            </div>
        </form>
    </div>
    );
};
