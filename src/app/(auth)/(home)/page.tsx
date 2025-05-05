'use client'
import { Header } from "@/components/Header";
import s from "./Page.module.scss"
import fitness_main_pict from "../../../assets/img/runner.svg"
import first_fitness_pict from "../../../assets/img/workauter.svg"
import second_fitness_pict from "../../../assets/img/trainerin.svg"
import firstFood from "../../../assets/img/food1.svg"
import secondFood from "../../../assets/img/food2.svg"
import thirdFood from "../../../assets/img/food3.svg"
import Plan, { PlanProps } from "@/pages/Plan";
import Preview from "@/pages/Preview";
import { ROUTES } from "@/routes/routes";

export default function Home() {

  const planArray: Array<PlanProps> = [
    {
      title: "Workout Program Made For You",
      description: "Get Your Personalized Fitness Plan Now!",
      first_image: first_fitness_pict,
      secondary_image: second_fitness_pict,
      third_image: fitness_main_pict,
      link: ROUTES.AUTH.training
    },
    {
      title: "Nutrition Plan Made For You",
      description: "Get Your Personalized Nutrition Plan Now!",
      first_image: thirdFood,
      secondary_image: secondFood,
      third_image: firstFood,
      link: ROUTES.AUTH.nutrition
    },
  ]
  return (
    <div className={s.main}>
        <Header />
        <Preview />
        <div className={s.main__plans} id="plan">
        {
          planArray.map((plan) => (
            <Plan
              key={plan.title} 
              title={plan.title} 
              description={plan.description} 
              first_image={plan.first_image}
              secondary_image={plan.secondary_image} 
              third_image={plan.third_image}
              link={plan.link}
            />
          ))
        }
        </div>
    </div>
  )
}
