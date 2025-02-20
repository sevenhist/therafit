'use client'
import s from "./ExcerciseGeneration.module.scss"
import { SubmitHandler, useForm } from "react-hook-form";
import { Field, FieldBox } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import useUserStore from "@/modules/userInformation/store";
import { Header } from "@/components/Header";
import { useRouter } from "next/navigation";
import Image from "next/image";
import background from "../../../assets/img/Group.png"


interface FormData {
    Birth_date: string,
    CurrentWeight: number,
    TargetWeight: number,
    Gender: string,
    Height: number
}

export const ExcerciseGeneration = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        mode: 'all'
    })
    

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        console.log("On Training Plan schicken: ", data)
        // try {
        //     await fetchLogin(data.Email, data.Password);
        //     router.push(ROUTES.home);
        // } catch (error) {
        //     console.error("Login error:", error);
        // }
    };
    const fields: Array<Field> = [
        {
            register: register,
            name: 'Birth_date',
            required: "This field is required!",
            patternValue: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
            message: 'Please enter a valid date (YYYY-MM-DD)!',
            errors: errors,
            title: 'Birth date',
            type: 'text',
        },
        {
            register: register,
            name: 'CurrentWeight',
            required: "This field is required!",
            patternValue: /^\d+$/,
            message: 'Please enter a valid number',
            errors: errors,
            title: 'Current weight',
            type: 'number'
        },
        {
            register: register,
            name: 'TargetWeight',
            required: "This field is required!",
            patternValue: /^\d+$/,
            message: 'Please enter a valid number',
            errors: errors,
            title: 'Target weight',
            type: 'number',
        },
        {
            register: register,
            name: 'Gender',
            required: "This field is required!",
            patternValue: /^(male|female)$/i,
            message: 'Please select a valid gender (male or female)',
            errors: errors,
            title: 'Gender',
            type: 'text'
        },
        {
            register: register,
            name: 'Height',
            required: "This field is required!",
            patternValue: /^(?:[4-9][0-9]|[12][0-9]{2}|300)$/, 
            message: 'Please enter a valid height (from 40 to 300 cm)',
            errors: errors,
            title: 'Height',
            type: 'number'
        }
    ];


    return (
        <div className={s.excerciseGeneration}>
            <Header />
            <div className={s.excerciseGeneration__background}>
                <Image
                    className={s.excerciseGeneration__background__img}
                    src={background}
                    alt="image"
                    priority
                />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className={s.excerciseGeneration__form}>
                <h1 className={s.excerciseGeneration__title}>Training Plan</h1>
                {
                    fields.map((field, key) => (
                        <FieldBox
                            className={s.excerciseGeneration__input}
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
                <Button type="submit" className={s.excerciseGeneration__button}>Get Training Plan</Button>
            </form>
        </div>
    )
}