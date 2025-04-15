import { ChangeEvent, FC, useEffect, useState } from 'react';
import { RegisterOptions, FieldValues, UseFormRegisterReturn, FieldErrors, FieldError } from 'react-hook-form';
import s from "./FieldBox.module.scss";


export interface Field {
    className?: string;
    register: any;
    name: string;
    required: string;
    patternValue?: any;
    message?: string;
    errors?: any;
    title?: string;
    password?: any;
    type: string;
    watch?: any;
    validation?: any;
    value?: string;
    onChange?: (event: string) => void;
    placeholder?: string;
    reset?: any
}

export interface FieldArray {
    fields: Array<Field> //fields - масив с обьектами field у которих є такі свойства {className?: string; register: any; name: string; required: string;}
}

export const FieldBox: FC<Field> = (props) => {
    useEffect(() => {
        const preventScroll = (event: WheelEvent) => {
            if (document.activeElement instanceof HTMLInputElement && document.activeElement.type === "number") {
                event.preventDefault();
            }
        };

        document.addEventListener("wheel", preventScroll, { passive: false });

        return () => {
            document.removeEventListener("wheel", preventScroll);
        };
    }, []);
    return (
        <div className={`${props.className ? props.className : ''} ${s.fieldbox}`}>
            <p className={`${props.errors[props.name] ? s.red__title : s.normal__title}`}>{props.title}</p>
            <input
                className={`${props.errors[props.name] && s.red__input} ${s.input}`}
                {...(props.register(props.name, {
                    required: props.required,
                    pattern: {
                        value: props.patternValue,
                        message: props.message,
                    },
                    validate: (val: any) => {
                        if (!props.validation) return

                        if (props.watch(props.validation) !== val) {
                            return props.message
                        }
                    }
                }))}
                type={props.type}
                placeholder={props.placeholder}
                defaultValue={props.value}
            />
            {props.errors[props.name] &&
                <span className={s.error__field}>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path></svg>
                    {props.errors[props.name].message}
                </span>
            }
        </div>
    )
}