import AuthService from "@/api/services/AuthService";
import { IUser } from "@/models/IUser";
import { ROUTES } from "@/routes/routes";
import { toast } from "react-toastify";
import Error from "next/error";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { TrainingsPlanResponse } from "@/models/TrainingsPlanResponse";
import PlansService from "@/api/services/PlansService";
import { NutritionPlanResponse } from "@/models/NutritionPlanResponse";



interface PlansState {
    nutritionPlan: NutritionPlanResponse | null,
    trainingsPlan: TrainingsPlanResponse | null,
    isLoading: boolean,
    setIsLoading: (load: boolean) => void,
    setTrainingsPlan: (trainings_plan: TrainingsPlanResponse | null) => void,
    setNutritionPlan: (nutrition_plan: NutritionPlanResponse | null) => void,
    generatePlans: (age: number, current_weight: number, gender: string, height: number, target_weight: number) => Promise<void>,
    getTrainingsPlanById: (id: number) => Promise<void>,
    getNutritionPlanById: (id: number) => Promise<void>,
    deleteBothPlansById: (id: number) => Promise<void>
}

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const usePlansStore = create<PlansState>()(devtools(immer((set, get) => ({
    nutritionPlan: null,
    trainingsPlan: null,
    isLoading: false,
    setTrainingsPlan: (trainings_plan: TrainingsPlanResponse | null) => {
        if (trainings_plan) {
            let assignedDays = new Set<string>();
            let dayIndex = 0;
            
            trainings_plan = {
                ...trainings_plan,
                trainingPlan: {
                    ...trainings_plan.trainingPlan,
                    trainings: trainings_plan.trainingPlan.trainings.map((training) => {
                        let day;
                        do {
                            day = daysOfWeek[dayIndex % daysOfWeek.length];
                            dayIndex++;
                        } while (assignedDays.has(day));
                        assignedDays.add(day);
                        
                        return { ...training, day };
                    })
                }
            };
        }
        set(() => ({ trainingsPlan: trainings_plan }));
    },
    setNutritionPlan: (nutrition_plan: NutritionPlanResponse | null) => {
        set(() => ({ nutritionPlan: nutrition_plan }));
    },
    setIsLoading: (load: boolean) => set(() => ({
        isLoading: load,
    })),
    generatePlans: async (age: number, current_weight: number, gender: string, height: number, target_weight: number) => {
        get().setIsLoading(true);
        console.log("This is data on trainings: ", age, current_weight, gender, height, target_weight)
        await PlansService.generatePlans(current_weight, target_weight, age, gender, height)
        .then((response) => {
            console.log("TrainingsPlan: ", response.data)
            //get().setTrainingsPlan(response.data)
            // toast("Success Get Trainings Plan", {
            //     type: "success"
            // });
        })     
        .catch ((error: any) => {
            toast(error.response?.data?.message || error.message, {
                type: "error"
            });
        }) 
        .finally(() => {
            //get().setIsLoading(false);
        })
    },
    getTrainingsPlanById: async (id: number) => {
        get().setIsLoading(true);
        try {
            const response = await PlansService.getTrainingsPlanById(id);
            get().setTrainingsPlan(response.data);
            //toast("Success Get Trainings Plan", { type: "success" });
        } catch (error: any) {
            // toast(error.response?.data?.message || error.message, { type: "error" });
        } finally {
            get().setIsLoading(false);
        }
    },
    getNutritionPlanById: async (id: number) => {
        get().setIsLoading(true);
        try {
            const response = await PlansService.getNutritionPlanById(id);
            get().setNutritionPlan(response.data);
            //toast("Success Get Trainings Plan", { type: "success" });
        } catch (error: any) {
            // toast(error.response?.data?.message || error.message, { type: "error" });
        } finally {
            get().setIsLoading(false);
        }
    },
    deleteBothPlansById: async (id: number) => {
        try {
            await PlansService.deleteBothPlansById(id);
            get().setTrainingsPlan(null);
            get().setNutritionPlan(null);
            localStorage.removeItem("selectedNutritionDay");
            localStorage.removeItem("selectedTrainingDay");
            toast("Success Delete of Plans", { type: "success" });
        } catch (error: any) {
            toast(error.response?.data?.message || error.message, { type: "error" });
        } 
    }    
})), { name: 'plansStore', version: 1 }))

export default usePlansStore