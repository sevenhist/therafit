
import { AuthLayout } from "@/layouts/AuthLayout";
import { FC, PropsWithChildren } from "react"

const Layout: FC<PropsWithChildren> = ({children}) => {
    return (
        <AuthLayout>{children}</AuthLayout>
    )
}

export default Layout;