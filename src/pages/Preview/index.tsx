import { Button } from "@/components/ui/Button"

import s from "./Preview.module.scss"
import { Typography } from "@/components/Typography"
import { FC } from "react"

const Preview: FC = () => {
    return (
        <div className={s.content}>
            <div className={s.content__smallDesc}>
                <div className={s.content__smallDesc__new}><p>NEW</p></div>
                <p>Opportunity To Get Your Body In Shape</p>
            </div>
            <div className={s.content__desc}>
                <div className={s.content__about}>
                    <Typography variant="h1">Exercise Nutrition</Typography>
                    <Typography variant="body">Train smarter, eat better – for FREE!<br/>Your perfect fitness & nutrition plan is just a click away. No excuses, just results!</Typography>
                </div>
                <div className={s.content__buttons}>
                    <Button variant="primary">Get started</Button>
                    <Button  variant="secondary" onClick={() => {
                        document.getElementById("plan")?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}>Preview</Button>
                </div>
            </div>
        </div>
    )
}

export default Preview;