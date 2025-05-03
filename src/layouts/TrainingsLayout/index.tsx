'use client'
import useTrainingsPlanStore from "@/modules/Plans/store";
import useUserStore from "@/modules/userInformation/store";
import { ROUTES } from "@/routes/routes";
import { useRouter } from "next/navigation";
import { FC, PropsWithChildren, useEffect } from "react";

const TrainingLayout: FC<PropsWithChildren> = ({ children }) => {
    const trainingsPlan = useTrainingsPlanStore(store => store.trainingsPlan)
    const getTrainingsPlanById = useTrainingsPlanStore(store => store.getTrainingsPlanById)
    const user = useUserStore(store => store.user!) // ich bin sicher dass user gibts 100%
    const router = useRouter()

    useEffect(() => {
        getTrainingsPlanById(user.id)
    }, []);

    useEffect(() => {
        if (trainingsPlan) {
            router.push(ROUTES.AUTH.training);
        }
    }, [trainingsPlan])
    console.log(trainingsPlan)
    if (trainingsPlan) {
        return null;
    }
    return children
}

export default TrainingLayout