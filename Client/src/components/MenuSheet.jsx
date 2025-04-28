import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import DarkMode from "./DarkMode"

export default function MenuSheet() {
    const role = "Instructor"
    return (
        <Sheet side={"left"} >
            <SheetTrigger asChild>
                <Button size={"icon"} className="rounded-full mr-5 bg-gray-200 hover:bg-gray-300" variant="outline"><Menu /></Button>
            </SheetTrigger>
            <SheetContent className="pl-4 pr-4">
                <SheetHeader className="flex items-center justify-between flex-row mt-8">
                    <h1 className=" text-xl font-extrabold ">E-Learnibg</h1>
                    <DarkMode />
                </SheetHeader>

                <SheetDescription>
                    Make changes to your profile here. Click save when you're done.
                </SheetDescription>
                <div className="flex flex-col gap-2 mt-4">
                    <span>
                        My Learning
                    </span>
                    <span>
                        My Profile
                    </span>
                    <span>
                        Logout
                    </span>
                </div>
                {
                    role === "Instructor" ? <SheetFooter className="mt-auto">
                        <SheetClose asChild>
                            <Button type="submit">Dashboard</Button>
                        </SheetClose>
                    </SheetFooter>
                        : null
                }
            </SheetContent>
        </Sheet>
    )
}
