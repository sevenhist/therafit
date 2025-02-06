'use client'
import { FC } from "react"
import s from "./Plan.module.scss"
import { Typography } from "@/components/Typography"
import { Button } from "@/components/ui/Button"
import Image, { StaticImageData } from "next/image"

export interface PlanProps {
    title: string,
    description: string,
    first_image: string | StaticImageData,
    secondary_image: string | StaticImageData,
    third_image: string | StaticImageData
}

const Plan: FC<PlanProps> = ({ title, description, first_image, secondary_image, third_image }) => {
    return (
        <div className={s.plan}>
            <div className={s.plan__info}>
                <Typography variant="h2" className={s.plan__info__title}>{title}</Typography>
                <div className={s.plan__possibilities}>
                    <Typography variant="h4" className={s.plan__info__desc}>{description}</Typography>
                    <div className={s.plan__button}>
                        <Button variant="primary">Get Started</Button>
                    </div>
                </div>
            </div>
            {/* {
                title === "Workout Program Made For You" &&
                ( */}
            <div className={s.plan__pictures}>
                <div className={s.plan__first_part}>
                    <div className={s.plan__first__person}>
                        <Image className={s.plan__first__person__img} src={first_image} alt="image"></Image>
                        {
                            title === "Workout Program Made For You" && (
                                <div className={s.plan__first__person__about}>
                                    <p>Samantha William</p>
                                    <p className={s.plan__first__status}>User</p>
                                </div>
                            )
                        }
                    </div>
                    <div className={s.plan__first__person}>
                        <Image className={s.plan__first__person__img} src={third_image} alt="image"></Image>
                        {
                            title === "Workout Program Made For You" && (
                                <div className={s.plan__first__person__about}>
                                    <p>Jonathan Wise</p>
                                    <p className={s.plan__first__status}>User</p>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className={s.plan__second_part}>
                    <Image className={s.plan__second__img} src={secondary_image} alt="image"></Image>
                    {
                        title === "Workout Program Made For You" && (
                            <div className={s.plan__first__person__about}>
                                <p>Karen Summer</p>
                                <p className={s.plan__first__status}>User</p>
                            </div>
                        )
                    }
                </div>
            </div>
            {/* )
            } */}

        </div>
    )
}

export default Plan;