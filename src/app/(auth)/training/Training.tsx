'use client'
import { Header } from "@/components/Header"
import { Button } from "@/components/ui/Button"
import { ExcersisesResponse, TrainingsResponse } from "@/models/TrainingsPlanResponse"
import useTrainingsPlanStore from "@/modules/Plans/store"
import { ROUTES } from "@/routes/routes"
import { useRouter } from "next/navigation"
import { Loader } from "vibe-library"
import s from "./TrainingStyles.module.scss"
import { useEffect, useState } from "react"
import { Typography } from "@/components/Typography"
import frauOnTrainings from "@/assets/img/woman.svg"
import Image from "next/image"
import info from "@/assets/img/info.svg"
import youtube from "@/assets/img/youtube.svg"
import Link from "next/link"
import useUserStore from "@/modules/userInformation/store"
import TransitionsModal from "@/components/TransitionsModal"
import usePlansStore from "@/modules/Plans/store"

export const Training = () => {

    const router = useRouter();
    const isLoader = usePlansStore(store => store.isLoading)
    const trainingsPlan = usePlansStore(store => store.trainingsPlan)
    const getTrainingsPlanById = usePlansStore(store => store.getTrainingsPlanById)
    const user = useUserStore(store => store.user)
    const setIsLoading = usePlansStore(store => store.setIsLoading)
    const [showPopup, setShowPopup] = useState(false);
    const [popupContent, setPopupContent] = useState("");
    const [isChecking, setIsChecking] = useState(true);
    const [selectedDay, setSelectedDay] = useState<string | undefined>(undefined);


    useEffect(() => {
        if (user) {
            getTrainingsPlanById(user.id).finally(() => setIsChecking(false));
        } else {
            setIsChecking(false);
        }
    }, []);

    useEffect(() => {
        if (!isChecking && trainingsPlan === null) {
            router.push(ROUTES.AUTH.plans_generation);
        }
    }, [isChecking, trainingsPlan]);

    useEffect(() => {
        setSelectedDay(trainingsPlan?.trainingPlan.trainings[0].day);
    }, [trainingsPlan]);


    if (isChecking || isLoader) {
        return (
            <div>
                <Header />
                <div className={s.loader}>
                    <Loader size="48" />
                </div>
            </div>
        )
    }

    return (
        <div>
            <Header />
            <div className={s.trainings__container}>
                {
                    trainingsPlan &&
                    <div className={s.trainings}>
                        <div className={s.trainings__preview}>
                            <Typography variant="h2" className={s.trainings__title}>Training plan</Typography>
                            <div className={s.trainings__about}>
                                <Image src={frauOnTrainings} alt="image"></Image>
                                <div className={s.trainings__info}>
                                    <p className={s.trainings__name}>{trainingsPlan?.trainingPlan.trainingPlan.name}</p>
                                    <select className={s.select} onChange={(event) => {
                                        setSelectedDay(event.target.value);
                                        setShowPopup(false);
                                    }} value={selectedDay}>
                                        {trainingsPlan?.trainingPlan.trainings.map(
                                            (value: TrainingsResponse, index) => (
                                                <option key={index} value={value.day}>
                                                    {value.day}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className={s.trainings__table_and_button}>
                            <table className={s.table}>
                                <thead>
                                    <tr className={s.table__title}>
                                        <th>Exercise</th>
                                        <th>Link</th>
                                        <th>Repetitions</th>
                                        <th>Sets</th>
                                        <th>Category</th>
                                        <th>Level</th>
                                        <th>Info</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {trainingsPlan?.trainingPlan.trainings.filter(
                                        (training) =>
                                            !selectedDay || training.day === selectedDay
                                    ).map((value: TrainingsResponse, index) =>
                                        value.exercises.map((exercise: ExcersisesResponse, idx) => (
                                            <tr key={`${index}-${idx}`} className={s.table__info}>
                                                <td>{exercise.exercise.name}</td>
                                                <td><Link target="_blank" href={`https://www.youtube.com/results?search_query=${encodeURIComponent(exercise.exercise.name)} excercise`} passHref><Image src={youtube} alt="icon" style={{ cursor: "pointer" }} /></Link></td>
                                                <td>{exercise.repetitions}</td>
                                                <td>{exercise.sets}</td>
                                                <td>{exercise.exercise.category}</td>
                                                <td>{exercise.exercise.difficulty.level}</td>
                                                <td><Image onClick={() => {
                                                    setPopupContent(exercise.exercise.description);
                                                    setShowPopup(true);
                                                }} src={info} alt="icon" style={{ cursor: "pointer" }} /></td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    // :
                    // <p className={s.no_training}>You don’t have a training plan yet.</p>
                }

            </div>
            {showPopup && (
                <TransitionsModal
                    isOpen={showPopup}
                    desc="Description of excercise: "
                    info={popupContent}
                    onClose={() => setShowPopup(false)}
                />
            )}
        </div>
    )
}