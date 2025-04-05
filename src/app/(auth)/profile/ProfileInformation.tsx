import s from "./ProfileInformation.module.scss"
import { SubmitHandler, useForm } from "react-hook-form";
import { Field, FieldBox } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import useUserStore from "@/modules/userInformation/store";
import { Header } from "@/components/Header";
import { useRouter } from "next/navigation";
import Image from "next/image";
import background from "@/assets/img/Group.png"
import { ROUTES } from "@/routes/routes";
import { toast } from "react-toastify";
import AuthService from "@/api/services/AuthService";

interface FormData {
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
}

export const ProfileInformation = () => {
    const router = useRouter();
    const user = useUserStore(store => store.user);
    const changePassword = useUserStore(store => store.changePassword);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormData>({
        mode: 'all'
    });

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        if (data.newPassword !== data.confirmPassword) {
            toast("New passwords do not match", { type: "error" });
            return;
        }
        try {
            await AuthService.changePassword(data.newPassword);
            toast("Password changed successfully", { type: "success" });
            router.push(ROUTES.AUTH.login);
        } catch (error: any) {
            toast(error.response?.data?.message || "Failed to change password", { type: "error" });
        }
    };

    const fields: Array<Field> = [
        {
            register: register,
            name: 'currentPassword',
            required: "Please enter your current password",
            patternValue: /[0-9a-zA-Z!@#$%^&*]{8,}/g,
            message: 'Password must be at least 8 characters',
            errors: errors,
            title: 'Current Password',
            type: 'password'
        },
        {
            register: register,
            name: 'newPassword',
            required: "Please enter your new password",
            patternValue: /[0-9a-zA-Z!@#$%^&*]{8,}/g,
            message: 'Password must be at least 8 characters',
            errors: errors,
            title: 'New Password',
            type: 'password'
        },
        {
            register: register,
            name: 'confirmPassword',
            required: "Please confirm your new password",
            patternValue: /[0-9a-zA-Z!@#$%^&*]{8,}/g,
            message: 'Password must be at least 8 characters',
            errors: errors,
            title: 'Confirm New Password',
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
                    alt="background"
                    priority
                />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className={s.profile__form}>
                <h1 className={s.profile__title}>Change Password</h1>
                <p className={s.profile__description}>
                    Please enter your current password and choose a new password below.
                </p>
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