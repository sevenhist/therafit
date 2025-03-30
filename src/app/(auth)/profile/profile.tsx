'use client'
import s from "./profile.module.scss"
import { SubmitHandler, useForm } from "react-hook-form";
import { Field, FieldBox } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import useUserStore from "@/modules/userInformation/store";
import { Header } from "@/components/Header";
import { useRouter } from "next/navigation";
import Image from "next/image";
import background from "../../../assets/img/Group.png"
import useTrainingsPlanStore from "@/modules/trainingsPlan/store";
import { ROUTES } from "@/routes/routes";
import { useEffect, useState } from "react";
import { Loader } from "vibe-library";
import { toast } from "react-toastify";


interface FormData {
    newPassword: string,
    repeatPassword: string
}

export const Profile = () => {
    const router = useRouter();
    const user = useUserStore(store => store.user);
    const resetPassword = useUserStore(store => store.resetPassword);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormData>({
        mode: 'all'
    });

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        if (data.newPassword !== data.repeatPassword) {
            toast("Passwords do not match", { type: "error" });
            return;
        }
        try {
            await resetPassword(data.newPassword);
            router.push(ROUTES.AUTH.login);
        } catch (error) {
            console.error("Password reset error:", error);
        }
    };

    const fields: Array<Field> = [
        {
            register: register,
            name: 'newPassword',
            required: "Invalid Input! Please enter a new password.",
            patternValue: /^.{8,}$/,
            message: 'Password must be at least 8 characters',
            errors: errors,
            title: 'New Password',
            type: 'password',
        },
        {
            register: register,
            name: 'repeatPassword',
            required: "Please repeat the new password.",
            patternValue: /^.{8,}$/,
            message: 'Password must be at least 8 characters',
            errors: errors,
            title: 'Repeat Password',
            type: 'password'
        }
    ];

    return (
        <div className={s.profile}>
            <Header />
            <div className={s.profile__background}>
                <Image
                    className={s.profile__background__img}
                    src={background}
                    alt="image"
                    priority
                />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className={s.profile__form}>
                <h1 className={s.profile__title}>Change Password</h1>
                {fields.map((field, key) => (
                    <FieldBox
                        className={s.profile__input}
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
                ))}
                <Button type="submit" className={s.profile__button}>Change Password</Button>
            </form>
        </div>
    );
}