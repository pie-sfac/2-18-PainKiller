import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import FooterBar from "./FooterBar";



const Layout = () => {

    return(
        <>
            <NavBar/>
            <Outlet/>
            <FooterBar/>
        </>
    )
}

export default Layout;