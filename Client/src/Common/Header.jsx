import DropdownMenu from "@/components/DropDownMenu"
import { School } from "lucide-react"
import React from "react"

const Header = () => {
    const User = true
    return (
        <div className="flex items-center justify-between h-16 Dark:bg-[#0A0A0A] border-b-1 bg-white Dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-50 max-w-7xl m-auto" >
            {/* Desktop */}
            <span className="flex items-center gap-2 ml-4" >
               <School size={"30"} />
               <h1 className="hidden md:block text-2xl font-extrabold ">E-Learnibg</h1>
            </span>
            {/* avtar and darkModeIcon  */}
            <div>
                {User ? <DropdownMenu /> : <School size={30} />}
                
            </div>
        </div>
    )
}

export default Header