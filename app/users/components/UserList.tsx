// 'use client'
// import {User} from "@prisma/client"
// import React from "react"
// import UserBox from "./UserBox"

// interface UserListProps{
//     items: User[]
// }
// const UserList: React.FC<UserListProps> = ({
//     items
// })=>{
//     return(
//        <aside className="
//        fixed
//        inset-y-0
//        pb-20
//        lg:pb-0
//        lg:left-20
//        lg:w-80
//        lg:block
//        overflow-y-auto
//        border-r
//        border-gray-200
//        block
//        w-full
//        left-0">

//         <div className="px-5">
//             <div className="flex-col">
//                 <div className="
//                 text-2xl
//                 font-bold
//                 text-neutral-800
//                 py-4
//                 ">People</div>
//             </div>
//             {items.map((item)=>(<UserBox 
//             key={item.id}
//             data={item} />))}
//         </div>
        


//        </aside>
//     )
// }

// export default UserList;



'use client'
import { User } from "@prisma/client"
import React from "react"
import UserBox from "./UserBox"
import SuperJSON from "superjson"

interface UserListProps {
    serializedItems: string; // Now expects a serialized string
}

const UserList: React.FC<UserListProps> = ({
    serializedItems
}) => {
    // Deserialize the users array
    console.log('serializedItems:', serializedItems);
const items = SuperJSON.parse<User[]>(serializedItems);
console.log('parsed items:', items, Array.isArray(items));

//    const items = SuperJSON.parse<User[]>(serializedItems);

    return (
        <aside className="
            fixed
            inset-y-0
            pb-20
            lg:pb-0
            lg:left-20
            lg:w-80
            lg:block
            overflow-y-auto
            border-r
            border-gray-200
            block
            w-full
            left-0">
            <div className="px-5">
                <div className="flex-col">
                    <div className="
                        text-2xl
                        font-bold
                        text-neutral-800
                        py-4
                    ">People</div>
                </div>
                {items.map((item) => (
                    <UserBox 
                        key={item.id}
                        data={item}
                    />
                ))}
            </div>
        </aside>
    )
}

export default UserList;


