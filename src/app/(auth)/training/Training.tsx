'use client'
import { Header } from "@/components/Header"
import { Button } from "@/components/ui/Button"
import { ExcersisesResponse, TrainingsResponse } from "@/models/TrainingsPlanResponse"
import useTrainingsPlanStore from "@/modules/trainingsPlan/store"
import { ROUTES } from "@/routes/routes"
import { useRouter } from "next/navigation"
import { Loader } from "vibe-library"
import s from "./TrainingStyles.module.scss"
import { useEffect, useState } from "react"
import useUserStore from "@/modules/userInformation/store"
import { Typography } from "@/components/Typography"
import frauOnTrainings from "../../../assets/img/woman.png"
import Image from "next/image"
import info from "../../../assets/img/info.svg"
import youtube from "../../../assets/img/youtube.svg"
import Link from "next/link"

export const Training = () => {

    const router = useRouter();
    const isLoader = useTrainingsPlanStore(store => store.isLoading)
    const deleteTrainingsPlanById = useTrainingsPlanStore(store => store.deleteTrainingsPlanById)
    const trainingsPlan = useTrainingsPlanStore(store => store.trainingsPlan)
    const getTrainingsPlanById = useTrainingsPlanStore(store => store.getTrainingsPlanById)
    const user = useUserStore(store => store.user)
    const setIsLoading = useTrainingsPlanStore(store => store.setIsLoading)
    const [isFetching, setIsFetching] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [popupContent, setPopupContent] = useState("");

    const onDeleteTrainingsPlan = () => {
        if (user) {
            deleteTrainingsPlanById(user?.id)
        }
        router.push(ROUTES.home)
    }

    useEffect(() => {
        const fetchTrainingPlan = async () => {
            if (user) {
                setIsFetching(true);
                await getTrainingsPlanById(user.id);
                setIsFetching(false);
            }
        };
        fetchTrainingPlan();
    }, []);

    useEffect(() => {
        if (!isFetching && trainingsPlan === null) {
            router.push(ROUTES.AUTH.excercise_generation);
        }
    }, [isFetching]);

    useEffect(() => {
        setSelectedDay(trainingsPlan?.trainingPlan.trainings[0].day);
    }, [trainingsPlan]);

    const [selectedDay, setSelectedDay] = useState<string | undefined>(undefined);

    return (
        <div>
            <Header />
            {
                isLoader ? (
                    <div className={s.loader}>
                        <h3>Please wait, your training plan is being generated.</h3>
                        <Loader size="48" />
                    </div>
                ) :
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
                                            <div className={s.trainings__time}>
                                                <p>Duration in weeks: {trainingsPlan?.trainingPlan.trainingPlan.duration_in_weeks}</p>
                                                <p>Times Per week: {trainingsPlan?.trainingPlan.trainingPlan.times_per_week}</p>
                                            </div>
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
                                                        <td><Link target="_blank" href={`https://www.youtube.com/results?search_query=${encodeURIComponent(exercise.exercise.name)}` + " exercise tutorial"} passHref><Image src={youtube} alt="icon" style={{ cursor: "pointer" }} /></Link></td>
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
                                    {showPopup && (
                                        <div className={s.popup__container}>
                                            <div className={s.popup}>
                                                <div className={s.popup__content}>
                                                    <p><span className={s.popup__desc}>Description of excercise: </span>{popupContent}</p>
                                                    <button onClick={() => setShowPopup(false)}>Close Description</button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div className={s.trainings__btn}>
                                        <Button className={s.trainings__btn} onClick={() => onDeleteTrainingsPlan()}>Delete Training Plan</Button>
                                    </div>
                                </div>
                            </div>
                            // :
                            // <p className={s.no_training}>You don’t have a training plan yet.</p>
                        }

                    </div>
            }
        </div>
    )
}