export interface ExcersisesResponse {
    name: string,
    repetitions: number,
    sets: number,
    category: string,
    description: string,
    level: string
}

export interface TrainingsResponse {
    name: string,
    exercises: ExcersisesResponse[]
}


export interface TrainingsPlanResponse {
    trainingPlan: {
        name: string,
        duration_in_weeks: number,
        times_per_week: number,
        trainings: TrainingsResponse[]
    }
}


