import s from "./ProfileInformation.module.scss"
import { SubmitHandler, useForm } from "react-hook-form";
import { Field, FieldBox } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import useUserStore from "@/modules/userInformation/store";
import { Header } from "@/components/Header";
import Image from "next/image";
import background from "@/assets/img/Group.png"
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import usePlansStore from "@/modules/Plans/store";
import { useEffect, useState } from "react";
import TransitionsModal from "@/components/TransitionsModal";
import { ROUTES } from "@/routes/routes";

interface FormData {
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
}

export const ProfileInformation = () => {
    const changePassword = useUserStore(store => store.changePassword);
    const deleteBothPlans = usePlansStore(store => store.deleteBothPlansById);
    const user = useUserStore(store => store.user)
    const logout = useUserStore(store => store.logout)
    const router = useRouter();
    const trainingPlan = usePlansStore(store => store.trainingsPlan);
    const getTrainingsPlanById = usePlansStore(store => store.getTrainingsPlanById);
    const deleteUserById = useUserStore(store => store.deleteUserById)
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
            return;
        }
        try {
            await changePassword(data.currentPassword, data.newPassword).then(() => {
                logout(router.push)
            })
        } catch (error: any) {
            toast(error.response?.data?.message || "Failed to change password", { type: "error" });
        }
    };
    useEffect(() => {
        if (user && !trainingPlan) {
            getTrainingsPlanById(user.id);
        }
    }, [user, trainingPlan]);
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
            message: 'Password must be correct',
            errors: errors,
            title: 'Confirm New Password',
            type: 'password',
            validation: "newPassword",
            watch: watch,
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
                        value={field.value}
                        watch={field.watch}
                        validation={field.validation}
                    />
                ))}
                <Button type="submit" className={s.profile__button}>Change Password</Button>
                <button className={s.profile__red__button} onClick={() => { deleteUserById(user!.id) }} ><p>Delete User</p></button>
                {
                    trainingPlan && <button className={s.profile__red__button} onClick={() => deleteBothPlans(user!.id).then(() => router.push(ROUTES.home))}><p>Delete Both Plans</p></button>
                }
            </form>
        </div>
    );
}