import { createBrowserRouter } from "react-router"
import Home from "../pages/Home/Home"
import Layout from "../components/layout/Layout"
import Products from "../pages/Product/Products"

async function rootLoader(){
    const data = fetch()
    return {data}
}

export const data = createBrowserRouter([
    {
        path:"/",
        Component:Layout,
        children:[
             {
        path:"/",
        loader:rootLoader,
        Component:Home
    },
    {
        path:"/:catagory",
        loader:rootLoader,
        Component:Products,
    }
        ]
    }
   
])

