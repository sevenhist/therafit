import { AxiosResponse } from "axios";
import $api from "../http";
import { TrainingsPlanResponse } from "@/models/TrainingsPlanResponse";


export default class TrainingsPlanService {
    static async getTrainingsPlan(current_weight: number, target_weight: number, age: number, times_per_week: number, gender: string, height: number): Promise<AxiosResponse<TrainingsPlanResponse>> {
        return $api.post('/auth/generate-training-plan', {current_weight, target_weight, age, times_per_week, gender, height});
    }
}