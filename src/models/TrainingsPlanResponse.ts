export interface DifficultyResponse {
    level: string
} 

export interface ExcersiseResponse {
    name: string,
    category: string,
    description: string,
    difficulty: DifficultyResponse
}

export interface ExcersisesResponse {
    exercise: ExcersiseResponse,
    repetitions: number,
    sets: number
}

export interface TrainingsResponse {
    name: string,
    duration_in_min: number,
    exercises: ExcersisesResponse[]
}


export interface TrainingsPlanResponse {
    trainingPlan: {
        trainingPlan: {
            name: string,
            duration_in_weeks: number,
            times_per_week: number
        }
        trainings: TrainingsResponse[]
    }
}


