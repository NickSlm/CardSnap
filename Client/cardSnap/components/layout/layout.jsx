import Navbar from "./navbar";
import { Outlet } from "react-router-dom";



export default function Layout(){

    return (

        <div className="min-h-screen">
            <Navbar/>
            <main className="flex-1 container mx-auto px-4 py-8">
                <Outlet />
            </main>

        </div>
        
    );
}