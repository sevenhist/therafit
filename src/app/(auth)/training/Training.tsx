'use client'
import { Header } from "@/components/Header"
import { Button } from "@/components/ui/Button"
import { ExcersisesResponse, TrainingsResponse } from "@/models/TrainingsPlanResponse"
import useTrainingsPlanStore from "@/modules/trainingsPlan/store"
import { ROUTES } from "@/routes/routes"
import { useRouter } from "next/navigation"
import { Loader } from "vibe-library"
import s from "./TrainingStyles.module.scss"

export const Training = () => {

    const router = useRouter();
    const isLoader = useTrainingsPlanStore(store => store.isLoading)
    const setTrainingsPlan = useTrainingsPlanStore(store => store.setTrainingsPlan)
    const trainingsPlan = useTrainingsPlanStore(store => store.trainingsPlan)

    const onDeleteTrainingsPlan = () => {
        setTrainingsPlan(null)
        router.push(ROUTES.home)
    }
    return (
        <div>
            <Header />
            {
                isLoader ? (
                    <Loader />
                ) :
                    <div>
                        <p>Name: {trainingsPlan?.trainingPlan.name}</p>
                        <p>Times Per Week: {trainingsPlan?.trainingPlan.times_per_week}</p>
                        {
                            trainingsPlan?.trainingPlan.trainings.map((value: TrainingsResponse) =>
                                <div className={s.trainingsPlan}>
                                    <p>Name of training: {value.name}</p>

                                    {value.exercises.map((excersise: ExcersisesResponse) =>
                                        <div className={s.excersise}>
                                            <p>Name of excersise: {excersise.name}</p>
                                            <p>Category of excersise: {excersise.category}</p>
                                            <p>Description of excersise: {excersise.description}</p>
                                            <p>Level of excersise: {excersise.level}</p>
                                            <p>How many repetitions of excersise: {excersise.repetitions}</p>
                                            <p>How many sets of excersise: {excersise.sets}</p>
                                        </div>
                                    )}

                                </div>
                            )
                        }
                        <Button onClick={() => onDeleteTrainingsPlan()}>Delete Training Plan</Button>
                    </div>
            }
        </div>
    )
}