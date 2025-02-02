import { Button } from "@/components/ui/Button"

import s from "./Preview.module.scss"
import { Typography } from "@/components/Typography"
import { FC } from "react"

export const Preview: FC = () => {
    return (
        <div className={s.content}>
            <div className={s.content__smallDesc}>
                <div className={s.content__smallDesc__new}><p>NEW</p></div>
                <p>Opportunity To Get Your Body In Shape</p>
            </div>
            <div className={s.content__desc}>
                <div className={s.content__about}>
                    <Typography variant="h1">Exercise Nutrition</Typography>
                    <Typography variant="body">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do<br /> eiusmod tempor incididunt ut labore et dolore magna aliqua.</Typography>
                </div>
                <div className={s.content__buttons}>
                    <Button variant="primary">Get started</Button>
                    <Button variant="secondary">Preview</Button>
                </div>
            </div>
        </div>
    )
}