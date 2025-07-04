// // 'use client'

// // import {Conversation, User} from '@prisma/client'

// // import useOtherUser from '@/app/hooks/useOtherUser'
// // import { useMemo } from 'react'
// // import Link from 'next/link'

// // interface HeaderProps {
// //     conversation: Conversation & {
// //         users: User[]
// //     }
// // };

// // const Header: React.FC<HeaderProps> = ({
// //     conversation
// // }) => {
// //     const otherUser = useOtherUser(conversation);

// //     const statusText = useMemo(()=>{
// //         if(conversation.isGroup){
// //             return `${conversation.users.length} members`;
// //         }

// //         return 'Active';
// //     }, [conversation]);

// //     return (
// //         <div className='bg-white
// //         w-full
// //         flex
// //         border-b-[1px]
// //         sm:px-4
// //         py-3
// //         px-4
// //         lg:px-6
// //         justify-between
// //         items-center
// //         shadow-sm'>

// //             <div className='flex gap-3 items-center'>
// //                 <Link className='lg:hidden
// //                 block
// //                 text-sky-500 
// //                 hover:text-sky-600
// //                 transition
// //                 cursor-pointer' href={/conversations}> </Link>

// //             </div>

// //         </div>
// //     )
// // }

// // export default Header




// 'use client'

// import { Conversation, User } from '@prisma/client'
// import useOtherUser from '@/app/hooks/useOtherUser'
// import { useMemo } from 'react'
// import Link from 'next/link'
// import { ClientUser } from '@/app/types'
// import { FullConversationType } from '@/app/types'

// interface HeaderProps {
//     conversation: FullConversationType & {
//         users: ClientUser[]
//     }
// };

// const Header: React.FC<HeaderProps> = ({
//     conversation
// }) => {
//     const otherUser = useOtherUser(conversation);

//     const statusText = useMemo(() => {
//         if (conversation.isGroup) {
//             return `${conversation.users.length} members`;
//         }
//         return 'Active';
//     }, [conversation]);

//     return (
//         <div className='bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm'>
//             <div className='flex gap-3 items-center'>
//                 <Link className='lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer' href="/conversations"></Link>
//             </div>
//         </div>
//     )
// }

// export default Header



// 'use client'
// import { useMemo } from 'react'
// import Link from 'next/link'
// import SuperJSON from "superjson"
// import { FullConversationType } from '@/app/types'
// import useOtherUser from '@/app/hooks/useOtherUser'

// interface HeaderProps {
//     serializedConversation: string  // Changed to accept serialized data
// }

// const Header: React.FC<HeaderProps> = ({ serializedConversation }) => {
//     // Deserialize the conversation with proper Date objects
//     const conversation = SuperJSON.parse<FullConversationType>(serializedConversation)
//     const otherUser = useOtherUser(SuperJSON.stringify(conversation))  // Pass serialized data if hook needs it

//     const statusText = useMemo(() => {
//         return conversation.isGroup 
//             ? `${conversation.users.length} members`
//             : 'Active'
//     }, [conversation])

//     return (
//         <div className='bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm'>
//             <div className='flex gap-3 items-center'>
//                 <Link 
//                     className='lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer' 
//                     href="/conversations"
//                 >
//                     ← Back
//                 </Link>
//                 {/* Add conversation header content here */}
//             </div>
//         </div>
//     )
// }

// export default Header



'use client'
import ProfileDrawer from "./ProfileDrawer";
import { HiEllipsisHorizontal, HiMiniChevronLeft } from "react-icons/hi2";
import { useMemo, useState } from 'react'
import Link from 'next/link'
import SuperJSON from "superjson"
import { ConversationWithUsers } from '@/app/types'
import useOtherUser from '@/app/hooks/useOtherUser'
import Avatar from "@/app/components/Avatar";
import AvatarGroup from "@/app/components/AvatarGroup";
import useActiveList from "@/app/hooks/useActiveList";

interface HeaderProps {
    serializedConversation: string
}

const Header: React.FC<HeaderProps> = ({ serializedConversation }) => {
    // Deserialize once at the top
    const conversation = SuperJSON.parse<ConversationWithUsers>(serializedConversation)
    const otherUser = useOtherUser(conversation)
    const [drawerOpen, setDrawerOpen] = useState(false)
    const { members} = useActiveList();
    const isActive = members.indexOf(otherUser?.email!)!==-1;


    const statusText = useMemo(() => {
         if(conversation.isGroup) {
            return `${conversation.users.length} members`;
        }
           return isActive ? 'Active' : 'Offline';
    }, [conversation, isActive])

    return (
        <>

        <ProfileDrawer data={conversation} 
        isOpen={drawerOpen}
        onClose={()=>setDrawerOpen(false)} />

            <div className='bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm'>
                <div className='flex gap-3 items-center'>
                    <Link
                        className='lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer'
                        href="/conversations"
                    >
                        <HiMiniChevronLeft size={32} />
                    </Link>
                        {conversation.isGroup? (
                            <AvatarGroup users={conversation.users} />
                        ) : (
                              <Avatar user={otherUser} />
                        )}

                  
                    <div className="flex flex-col" >
                        <div>
                            {conversation.name || otherUser.name}
                        </div>
                        <div className="text-sm font-light text-neutral-500">
                            {statusText}
                        </div>
                    </div>
                </div>
                <HiEllipsisHorizontal size={32}
                    onClick={() => setDrawerOpen(true)}
                    className="text-sky-500 cursor-pointer hover:text-sky-500 transition" />
            </div>
        </>
    )
}

export default Header
