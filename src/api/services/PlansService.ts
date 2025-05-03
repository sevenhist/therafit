import { AxiosResponse } from "axios";
import $api from "../http";
import { TrainingsPlanResponse } from "@/models/TrainingsPlanResponse";
import { NutritionPlanResponse } from "@/models/NutritionPlanResponse";


export default class PlansService {
    static async generatePlans(current_weight: number, target_weight: number, age: number, gender: string, height: number) {
        return $api.post('/auth/generate-plans', {current_weight, target_weight, age, gender, height});
    }
    static async getTrainingsPlanById(id: number): Promise<AxiosResponse<TrainingsPlanResponse>> {
        return $api.post('/auth/get-trainingsplan', {id});
    }
    static async getNutritionPlanById(id: number): Promise<AxiosResponse<NutritionPlanResponse>> {
        return $api.post('/auth/get-nutritionplan', {id});
    }
    static async deleteTrainingsPlanById(id: number) {
        return $api.delete('/auth/delete-trainingsplan', {
            data: { id }
        });
    }
    static async deleteBothPlansById(id: number) {
        return $api.delete('/auth/delete-both-plans', {
            data: { id }
        });
    }
}