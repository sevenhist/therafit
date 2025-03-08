import AuthService from "@/api/services/AuthService";
import { IUser } from "@/models/IUser";
import { ROUTES } from "@/routes/routes";
import { toast } from "react-toastify";
import Error from "next/error";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { TrainingsPlanResponse } from "@/models/TrainingsPlanResponse";
import TrainingsPlanService from "@/api/services/TrainingsPlanService";


interface TrainingsPlanState {
    trainingsPlan: TrainingsPlanResponse | null,
    isLoading: boolean,
    setIsLoading: (load: boolean) => void,
    setTrainingsPlan: (trainings_plan: TrainingsPlanResponse | null) => void,
    getTrainingsPlan: (age: number, current_weight: number, gender: string, height: number, target_weight: number, times_per_week: number) => Promise<void>
}

const useTrainingsPlanStore = create<TrainingsPlanState>()(devtools(immer((set, get) => ({
    trainingsPlan: null,
    isLoading: false,
    setTrainingsPlan: (trainings_plan: TrainingsPlanResponse | null) => set(() => ({
        trainingsPlan: trainings_plan,
    })),
    setIsLoading: (load: boolean) => set(() => ({
        isLoading: load,
    })),
    getTrainingsPlan: async (age: number, current_weight: number, gender: string, height: number, target_weight: number, times_per_week: number) => {
        get().setTrainingsPlan(null)
        get().setIsLoading(true);
        TrainingsPlanService.getTrainingsPlan(current_weight, target_weight, age, times_per_week, gender, height)
        .then((response) => {
            console.log("TrainingsPlan: ", response.data)
            get().setTrainingsPlan(response.data)
            toast("Success Get Trainings Plan", {
                type: "success"
            });
        })     
        .catch ((error: any) => {
            toast(error.response?.data?.message || error.message, {
                type: "error"
            });
        }) 
        .finally(() => {
            get().setIsLoading(false);
        })
    },
})), { name: 'trainingsPlanStore', version: 1 }))

export default useTrainingsPlanStore