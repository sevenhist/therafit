import { Container } from "@/components/Container";
import { AuthLayout } from "@/layouts/AuthLayout";
import { FC, PropsWithChildren } from "react"

const Layout: FC<PropsWithChildren> = ({children}) => {
    return (
        <AuthLayout>
            <Container>
                {children}
            </Container>
        </AuthLayout>
    )
}

export default Layout;