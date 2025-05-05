'use client'
import { useEffect, useState } from "react";
import s from "./NutritionStyles.module.scss"
import usePlansStore from "@/modules/Plans/store";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/routes/routes";
import { Header } from "@/components/Header";
import { Loader } from "vibe-library";
import useUserStore from "@/modules/userInformation/store";
import { Typography } from "@/components/Typography";
import frauEatSalat from "@/assets/img/bewusste-ernaehrung-bild.jpg"
import Image from "next/image";
import info from "@/assets/img/info1.svg"
import TransitionsModal from "@/components/TransitionsModal";
import { NutritionMeal, NutritionMealsPerWeekday } from "@/models/NutritionPlanResponse";

export const Nutrition = () => {

    const isLoader = usePlansStore(store => store.isLoading)
    const nutritionPlan = usePlansStore(store => store.nutritionPlan)
    const router = useRouter();
    const user = useUserStore(store => store.user)
    const getNutritionPlanById = usePlansStore(store => store.getNutritionPlanById)
    const [isChecking, setIsChecking] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [popupContent, setPopupContent] = useState("");
    const [selectedDay, setSelectedDay] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (user) {
            getNutritionPlanById(user.id).finally(() => setIsChecking(false));
        }
    }, []);

    useEffect(() => {
        if (!isChecking && nutritionPlan === null) {
            router.push(ROUTES.AUTH.plans_generation);
        }
    }, [isChecking, nutritionPlan]);

    useEffect(() => {
        const storedDay = localStorage.getItem("selectedNutritionDay");
        const defaultDay = nutritionPlan?.nutritionPlan.nutritionPlan.mealsProWeekday[0].weekday;
    
        if (storedDay && nutritionPlan?.nutritionPlan.nutritionPlan.mealsProWeekday.some(day => day.weekday === storedDay)) {
            setSelectedDay(storedDay);
        } else {
            setSelectedDay(defaultDay);
        }
    }, [nutritionPlan]);

    useEffect(() => {
        if (selectedDay) {
            localStorage.setItem("selectedNutritionDay", selectedDay);
        }
    }, [selectedDay]);
    


    if (isChecking || isLoader || (!isChecking && nutritionPlan === null)) {
        return (
            <div>
                <Header />
                <div className={s.loader}>
                    <Loader size="48" />
                </div>
            </div>
        )
    }

    return (
        <div>
            <Header />
            <div className={s.nutrition__container}>
                {
                    nutritionPlan &&
                    <div className={s.nutrition}>
                        <div className={s.nutrition__preview}>
                            <Typography variant="h2" className={s.nutrition__title}>Nutrition plan</Typography>
                            <div className={s.nutrition__about}>
                                <Image src={frauEatSalat} alt="image"></Image>
                                <div className={s.nutrition__info}>
                                    <p className={s.nutrition__name}>{nutritionPlan.nutritionPlan.nutritionPlan.name}</p>
                                    <select className={s.select} onChange={(event) => {
                                        setSelectedDay(event.target.value);
                                        setShowPopup(false);
                                    }} value={selectedDay}>
                                        {nutritionPlan.nutritionPlan.nutritionPlan.mealsProWeekday.map(
                                            (value: NutritionMealsPerWeekday, index) => (
                                                <option key={index} value={value.weekday}>
                                                    {value.weekday}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className={s.nutrition__table_and_button}>
                            <table className={s.table}>
                                <thead>
                                    <tr className={s.table__title}>
                                        <th>Meal</th>
                                        <th>Calories</th>
                                        <th>Protein</th>
                                        <th>Carbohydrates</th>
                                        <th>Fat</th>
                                        <th>Sugar</th>
                                        <th>Info</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {nutritionPlan?.nutritionPlan.nutritionPlan.mealsProWeekday.filter(
                                        (meal) =>
                                            !selectedDay || meal.weekday === selectedDay
                                    ).map((mealsProWeekday: NutritionMealsPerWeekday, index) =>
                                        mealsProWeekday.meals.map((meal: NutritionMeal, idx) =>
                                        <tr key={`${index}-${idx}`}  className={s.table__info}>
                                            <td>{meal.name}</td>
                                            <td>{meal.calories}</td>
                                            <td>{meal.protein}</td>
                                            <td>{meal.carbohydrates}</td>
                                            <td>{meal.fat}</td>
                                            <td>{meal.sugar}</td>
                                            <td><Image onClick={() => {
                                                setPopupContent(meal.description);
                                                setShowPopup(true);
                                            }} src={info} alt="icon" style={{ cursor: "pointer" }} /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    // :
                    // <p className={s.no_training}>You don’t have a training plan yet.</p>
                }

            </div>
            {showPopup && (
                <TransitionsModal
                    isOpen={showPopup}
                    desc="Description of meal: "
                    info={popupContent}
                    onClose={() => setShowPopup(false)}
                />
            )}
        </div>
    )
}