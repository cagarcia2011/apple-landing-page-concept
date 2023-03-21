import { Outlet } from "react-router-dom"
import { Nav } from "../components"

export function MainLayout() {
    return (
        <div>
            <header>
                <Nav />
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    )
}
