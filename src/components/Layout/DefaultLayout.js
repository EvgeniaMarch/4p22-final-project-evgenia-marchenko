import { Outlet } from "react-router-dom"
import Header from "../Header/Header"
function DefaultLayout () {

    return (
        <>
        <Header />
        <Outlet />
        </>
    )
}

export default DefaultLayout;