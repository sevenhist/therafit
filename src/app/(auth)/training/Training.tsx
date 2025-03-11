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
                    <div className={s.loader}>
                        <h3>Please wait, your training plan is being generated.</h3>
                        <Loader />
                    </div>
                ) :
                    <div>
                        {
                            trainingsPlan ?
                                <div>
                                    <p>Name: {trainingsPlan?.trainingPlan.trainingPlan.name}</p>
                                    <p>Times Per Week: {trainingsPlan?.trainingPlan.trainingPlan.times_per_week}</p>
                                    {
                                        trainingsPlan?.trainingPlan.trainings.map((value: TrainingsResponse) =>
                                            <div className={s.trainingsPlan}>
                                                <p>Name of training: {value.name}</p>

                                                {value.exercises.map((excersise: ExcersisesResponse) =>
                                                    <div className={s.excersise}>
                                                        <p>Name of excersise: {excersise.exercise.name}</p>
                                                        <p>Category of excersise: {excersise.exercise.category}</p>
                                                        <p>Description of excersise: {excersise.exercise.description}</p>
                                                        <p>Level of excersise: {excersise.exercise.difficulty.level}</p>
                                                        <p>How many repetitions of excersise: {excersise.repetitions}</p>
                                                        <p>How many sets of excersise: {excersise.sets}</p>
                                                    </div>
                                                )}

                                            </div>
                                        )
                                    }
                                    <Button onClick={() => onDeleteTrainingsPlan()}>Delete Training Plan</Button>
                                </div> 
                                :
                                <p className={s.no_training}>You don’t have a training plan yet.</p>
                        }

                    </div>
            }
        </div>
    )
}