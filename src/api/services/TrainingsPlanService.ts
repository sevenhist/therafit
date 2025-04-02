import { AxiosResponse } from "axios";
import $api from "../http";
import { TrainingsPlanResponse } from "@/models/TrainingsPlanResponse";


export default class TrainingsPlanService {
    static async getTrainingsPlan(current_weight: number, target_weight: number, age: number, gender: string, height: number): Promise<AxiosResponse<TrainingsPlanResponse>> {
        return $api.post('/auth/generate-training-plan', {current_weight, target_weight, age, gender, height});
    }
    static async getTrainingsPlanById(id: number): Promise<AxiosResponse<TrainingsPlanResponse>> {
        return $api.post('/auth/get-trainingsplan', {id});
    }
    static async deleteTrainingsPlanById(id: number) {
        return $api.delete('/auth/delete-trainingsplan', {
            data: { id }
        });
    }
}