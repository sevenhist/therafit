import { FC, PropsWithChildren } from "react";
import { ExcerciseGeneration } from "./ExcerciseGeneration";
import TrainingLayout from "@/layouts/TrainingsLayout";

const Layout: FC<PropsWithChildren> = ({children}) => {
    return (
        <TrainingLayout>{children}</TrainingLayout> 
    )
}

export default Layout