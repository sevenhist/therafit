import { UnAuthLayout } from "@/layouts/UnAuthLayout"
import { FC, PropsWithChildren } from "react"

const Layout: FC<PropsWithChildren> = ({children}) => {
    return (
        <UnAuthLayout>{children}</UnAuthLayout>
    )
}

export default Layout;