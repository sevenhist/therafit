

export interface NutritionMeal {
    name: string,
    description: string,
    calories: 350,
    protein: 20,
    carbohydrates: 25,
    fat: 15,
    sugar: 2,
    weekday: string
}

export interface NutritionMealsPerWeekday {
    weekday: string,
    meals: NutritionMeal[]
}

export interface NutritionPlanResponse {
    nutritionPlan: {
        nutritionPlan: {
            name: string,
            mealsProWeekday: NutritionMealsPerWeekday[]
        }
    }
}
