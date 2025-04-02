'use client'
import s from "./ResetPassword.module.scss"
import { SubmitHandler, useForm } from "react-hook-form";
import { Field, FieldBox } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Header } from "@/components/Header";
import { useRouter } from "next/navigation";
import Image from "next/image";
import background from "@/assets/img/Group.png"
import { ROUTES } from "@/routes/routes";
import { toast } from "react-toastify";
import AuthService from "@/api/services/AuthService";

interface FormData {
    password: string,
    confirmPassword: string
}

interface ResetPasswordProps {
    token: string;
}

export const ResetPassword = ({ token }: ResetPasswordProps) => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        mode: 'all'
    });

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        if (data.password !== data.confirmPassword) {
            toast("Passwords do not match", { type: "error" });
            return;
        }
        try {
            await AuthService.resetPassword(token, data.password);
            toast("Password reset successfully", { type: "success" });
            router.push(ROUTES.AUTH.login);
        } catch (error: any) {
            toast(error.response?.data?.message || "Failed to reset password", { type: "error" });
        }
    };

    const fields: Array<Field> = [
        {
            register: register,
            name: 'password',
            required: "Please enter your new password",
            patternValue: /^.{8,}$/,
            message: 'Password must be at least 8 characters',
            errors: errors,
            title: 'New Password',
            type: 'password'
        },
        {
            register: register,
            name: 'confirmPassword',
            required: "Please confirm your new password",
            patternValue: /^.{8,}$/,
            message: 'Password must be at least 8 characters',
            errors: errors,
            title: 'Confirm Password',
            type: 'password'
        }
    ];

    return (
        <div className={s.resetPassword}>
            <Header />
            <div className={s.resetPassword__background}>
                <Image
                    className={s.resetPassword__background__img}
                    src={background}
                    alt="background"
                    priority
                />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className={s.resetPassword__form}>
                <h1 className={s.resetPassword__title}>Reset Password</h1>
                <p className={s.resetPassword__description}>
                    Please enter and confirm your new password below.
                </p>
                {fields.map((field, key) => (
                    <FieldBox
                        className={s.resetPassword__input}
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
                <Button type="submit" className={s.resetPassword__button}>Reset Password</Button>
            </form>
        </div>
    );
} 