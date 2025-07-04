// 'use client';

// import useRoutes from "@/app/hooks/useRoutes";
// import { useState } from "react";
// import DesktopItem from "./DesktopItem";
// import { User } from "@prisma/client";
// import Avatar from "../Avatar";
// import SuperJSON from "superjson";

// interface DesktopSidebarProps {
//    //currentUser: User 
//      serializedUser: string; // New prop type
// }

// const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
//    // currentUser
//      serializedUser
// }) => {
//     const routes = useRoutes();
//     const [isOpen, setIsOpen] = useState(false);

//       // Deserialize the user data with proper typing
//     const currentUser = SuperJSON.parse<User | null>(serializedUser);

//     console.log({serializedUser})
//     console.log({currentUser})

//     return(
//         <div className="hidden
//             lg:fixed 
//             lg:inset-y-0
//             lg:left-0
//             lg:z-40
//             lg:w-20
//             xl:px-6
//             lg:overflow-y-auto
//             lg:bg-white
//             lg:border-r-[1px]
//             lg:pb-4
//             lg:flex 
//             lg:flex-col
//             justify-between">
                
//                 <nav className="mt-4
//                 flex
//                 flex-col
//                 justify-between">

//                 <ul role="list"
//                 className="flex flex-col items-center
//                 space-y-1">
//                     {routes.map((item)=>(
//                         <DesktopItem
//                         key={item.label}
//                        href={item.href}
//                        label={item.label}
//                        icon={item.icon}
//                        active={item.active}
//                        onClick={item.onClick} />
//                     ))}
//                 </ul>

//                 </nav>
//                 <nav className="mt-4
//                 flex
//                 flex-col
//                 justify-between
//                 items-center
//                 ">
//                     <div onClick={()=>setIsOpen(true)}
//                         className="
//                         cursor-pointer
//                         hover:opacity-75
//                         transition
//                         ">
//                             <Avatar user={currentUser} />
//                     </div>
//                 </nav>
//                 </div>
//     );
// }

// export default DesktopSidebar;

'use client'
import SettingsModal from "./SettingsModal"
import { useState } from "react"
import useRoutes from "@/app/hooks/useRoutes"
import { User } from "@prisma/client"
import SuperJSON from "superjson"
import DesktopItem from "./DesktopItem"
import Avatar from "../Avatar"

interface DesktopSidebarProps {
    serializedUser: string
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ serializedUser }) => {
    const routes = useRoutes()
    const [isOpen, setIsOpen] = useState(false)
    
    // Safely deserialize the user data
    const currentUser = SuperJSON.parse<User>(serializedUser)

    return (
        <>
        <SettingsModal currentUser={currentUser} 
        isOpen={isOpen}
        onClose={()=>setIsOpen(false)} />

        <div className="
            hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 
            xl:px-6 lg:overflow-y-auto lg:bg-white lg:border-r-[1px]
            lg:pb-4 lg:flex lg:flex-col justify-between
        ">
            <nav className="mt-4 flex flex-col justify-between"> 
                <ul role="list" className="flex flex-col items-center space-y-1">
                    {routes.map((item) => (
                        <DesktopItem
                            key={item.label}
                            href={item.href}
                            label={item.label}
                            icon={item.icon} 
                            active={item.active}
                            onClick={item.onClick}  
                        />
                    ))}
                </ul>
            </nav>
            
            <nav className="mt-4 flex flex-col justify-between items-center">
                <div 
                    onClick={() => setIsOpen(true)}
                    className="cursor-pointer hover:opacity-75 transition"
                >
                    <Avatar user={currentUser} />
                </div>
            </nav>
        </div>
        </>
    )
}

export default DesktopSidebar
