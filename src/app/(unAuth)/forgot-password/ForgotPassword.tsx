'use client'
import s from "./ForgotPassword.module.scss"
import { SubmitHandler, useForm } from "react-hook-form";
import { Field, FieldBox } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Header } from "@/components/Header";
import { useRouter } from "next/navigation";
import Image from "next/image";
import background from "../../../assets/img/Group.png"
import { ROUTES } from "@/routes/routes";
import { toast } from "react-toastify";
import AuthService from "@/api/services/AuthService";

interface FormData {
    email: string
}

export const ForgotPassword = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        mode: 'all'
    });

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        try {
            await AuthService.forgotPassword(data.email);
            toast("Password reset instructions sent to your email", { type: "success" });
            router.push(ROUTES.AUTH.login);
        } catch (error: any) {
            toast(error.response?.data?.message || "Failed to send reset email", { type: "error" });
        }
    };

    const fields: Array<Field> = [
        {
            register: register,
            name: 'email',
            required: "Please enter your email address",
            patternValue: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Please enter a valid email address',
            errors: errors,
            title: 'Email',
            type: 'email'
        }
    ];

    return (
        <div className={s.forgotPassword}>
            <Header />
            <div className={s.forgotPassword__background}>
                <Image
                    className={s.forgotPassword__background__img}
                    src={background}
                    alt="background"
                    priority
                />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className={s.forgotPassword__form}>
                <h1 className={s.forgotPassword__title}>Forgot Password</h1>
                <p className={s.forgotPassword__description}>
                    Enter your email address and we'll send you instructions to reset your password.
                </p>
                {fields.map((field, key) => (
                    <FieldBox
                        className={s.forgotPassword__input}
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
                <Button type="submit" className={s.forgotPassword__button}>Send Reset Instructions</Button>
                <div className={s.forgotPassword__footer}>
                    <span className={s.forgotPassword__footer__text}>Remember your password?</span>
                    <a onClick={() => router.push(ROUTES.AUTH.login)} className={s.forgotPassword__footer__login}>
                        Login
                    </a>
                </div>
            </form>
        </div>
    );
} 