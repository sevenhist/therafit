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
import useTrainingsPlanStore from "@/modules/trainingsPlan/store";
import { ROUTES } from "@/routes/routes";


interface FormData {
    Age: number,
    CurrentWeight: number,
    TargetWeight: number,
    Gender: string,
    Height: number,
    TimesPerWeek: number
}

export const ExcerciseGeneration = () => {
    const router = useRouter();
    const getTrainingsPlan = useTrainingsPlanStore(store => store.getTrainingsPlan)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        mode: 'all'
    })


    const onSubmit: SubmitHandler<FormData> = async (data) => {
        console.log("On Training Plan schicken: ", data)
        try {
            await getTrainingsPlan(data.Age, data.CurrentWeight, data.Gender, data.Height, data.TargetWeight, data.TimesPerWeek);
            router.push(ROUTES.AUTH.training);
        } catch (error) {
            console.error("Login error:", error);
        }
    };
    const fields: Array<Field> = [
        {
            register: register,
            name: 'Age',
            required: "Invalid Input! Please enter a numeric value.",
            patternValue:  /^(?!.*[eE])(1[6-9]|[2-5][0-9]|60)$/,
            message: 'Please enter a valid age (16-60)',
            errors: errors,
            title: 'Age',
            type: 'number',
        },
        {
            register: register,
            name: 'CurrentWeight',
            required: "Invalid Input! Please enter a numeric value.",
            patternValue: /^(?!.*[eE])(?:[4-9][0-9]|[12][0-9]{2}|200)$/,
            message: 'Please enter a valid weight (from 40 to 200 kg)',
            errors: errors,
            title: 'Current weight',
            type: 'number'            
        },
        {
            register: register,
            name: 'TargetWeight',
            required: "Invalid Input! Please enter a numeric value.",
            patternValue: /^(?!.*[eE])(?:[4-9][0-9]|[12][0-9]{2}|200)$/,
            message: 'Please enter a valid weight (from 40 to 200 kg)',
            errors: errors,
            title: 'Target weight',
            type: 'number',
        },
        {
            register: register,
            name: 'Gender',
            required: "Invalid Input! Please enter a text value",
            patternValue: /^(male|female|diverse)$/i,
            message: 'Please write a valid gender (male, female or diverse)',
            errors: errors,
            title: 'Gender',
            type: 'text'
        },
        {
            register: register,
            name: 'Height',
            required: "Invalid Input! Please enter a numeric value.",
            patternValue: /^(?!.*[eE])(?:1[0-9][0-9]|2[0-9]{2}|300)$/,
            message: 'Please enter a valid height (from 100 to 300 cm)',
            errors: errors,
            title: 'Height',
            type: 'number'
        },
        {
            register: register,
            name: 'TimesPerWeek',
            required: "Invalid Input! Please enter a numeric value.",
            patternValue: /^(?!.*[eE])[1-7]$/, 
            message: 'Please enter a valid number (from 1 to 7)',
            errors: errors,
            title: 'Times per Week',
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