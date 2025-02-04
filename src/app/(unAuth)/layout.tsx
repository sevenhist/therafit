import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { UnAuthLayout } from "@/layouts/UnAuthLayout"
import { FC, PropsWithChildren } from "react"

const Layout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <UnAuthLayout>
            <Container>
                {children}
            </Container> 
        </UnAuthLayout>
    )
}

export default Layout;