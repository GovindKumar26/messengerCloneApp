// // 'use client'
// // import { Conversation } from "@prisma/client"
// // import { FullConversationType } from "@/app/types"
// // import { useState } from "react"
// // import { useRouter } from "next/navigation"
// // import useConversation from "@/app/hooks/useConversation"
// // import { MdOutlineGroupAdd } from "react-icons/md"
// // import clsx from "clsx"
// // import ConversationBox from "./ConversationBox"



// // interface ConversationListProps {
// //     initialItems: FullConversationType[]
// // }

// // const ConversationList: React.FC<ConversationListProps> = (
// //     {initialItems}
// // )=>{
// //     const [items, setItems] = useState(initialItems);

// //     const router = useRouter();

// //     const { conversationId, isOpen} = useConversation();

// //     return(
// //         <aside
// //          className={clsx(`
// //          fixed
// //          inset-y-0
// //          pb-20
// //          lg:pb-0
// //          lg:left-20
// //          lg:w-80
// //          lg:block
// //          overflow-y-auto
// //          border-r
// //          border-gray-200
// //          `, isOpen ? 'hidden' : 'block w-full left-0')}>

// //             <div className="px-5">
// //                 <div className="flex justify-between mb-4 pt-4">
// //                     <div className="
// //                     text-2xl
// //                     font-bold
// //                     text-neutral-800">
// //                         Messages
// //                         </div>
// //                         <div className="
// //                         rounded-full
// //                         p-2
// //                         bg-gray-100
// //                         cursor-pointer
// //                         hover:opacity-75
// //                         transition
// //                         ">
// //                            <MdOutlineGroupAdd size={20} />
// //                         </div> 
// //                 </div>
// //                 {items.map((item) => (
// //                     <ConversationBox
// //                     key={item.id}
// //                    data={item}
// //                    selected={conversationId===item.id} />
// //                 ))}
// //             </div>
// //          </aside>
// //     )
// // }

// // export default ConversationList




// // 'use client'
// // import { useState } from "react"
// // import { useRouter } from "next/navigation"
// // import SuperJSON from "superjson"
// // import { FullConversationType } from "@/app/types"
// // import { MdOutlineGroupAdd } from "react-icons/md"
// // import clsx from "clsx"
// // import ConversationBox from "./ConversationBox"
// // import useConversation from "@/app/hooks/useConversation"

// // interface ConversationListProps {
// //     initialItems: string // Serialized string from server
// // }

// // const ConversationList: React.FC<ConversationListProps> = ({ initialItems }) => {
// //     // Deserialize the initial items
// //     const conversations = SuperJSON.parse<FullConversationType[]>(initialItems)
// //     const [items, setItems] = useState(conversations)
// //     const router = useRouter()
// //     const { conversationId, isOpen } = useConversation()

// //     return (
// //         <aside className={clsx(`
// //             fixed
// //             inset-y-0
// //             pb-20
// //             lg:pb-0
// //             lg:left-20
// //             lg:w-80
// //             lg:block
// //             overflow-y-auto
// //             border-r
// //             border-gray-200
// //             `, 
// //             isOpen ? 'hidden' : 'block w-full left-0'
// //         )}>
// //             <div className="px-5">
// //                 <div className="flex justify-between mb-4 pt-4">
// //                     <div className="text-2xl font-bold text-neutral-800">
// //                         Messages
// //                     </div>
// //                     <div className="
// //                         rounded-full
// //                         p-2
// //                         bg-gray-100
// //                         cursor-pointer
// //                         hover:opacity-75
// //                         transition
// //                     ">
// //                         <MdOutlineGroupAdd size={20} />
// //                     </div> 
// //                 </div>
// //                 {items.map((item) => (
// //                     <ConversationBox
// //                         key={item.id}
// //                         data={item}
// //                         selected={conversationId === item.id}
// //                     />
// //                 ))}
// //             </div>
// //         </aside>
// //     )
// // }

// // export default ConversationList



// 'use client'
// import { useState } from "react"
// import SuperJSON from "superjson"
// import { FullConversationType } from "@/app/types"
// import { MdOutlineGroupAdd } from "react-icons/md"
// import clsx from "clsx"
// import ConversationBox from "./ConversationBox"
// import useConversation from "@/app/hooks/useConversation"

// interface ConversationListProps {
//     initialItems: string // SuperJSON string from server
// }

// const ConversationList: React.FC<ConversationListProps> = ({ initialItems }) => {
//     const conversations = SuperJSON.parse<FullConversationType[]>(initialItems)
//     const [items, setItems] = useState(conversations)
//     const { conversationId, isOpen } = useConversation()

//     return (
//         <aside className={clsx(`
//             fixed
//             inset-y-0
//             pb-20
//             lg:pb-0
//             lg:left-20
//             lg:w-80
//             lg:block
//             overflow-y-auto
//             border-r
//             border-gray-200
//             `, 
//             isOpen ? 'hidden' : 'block w-full left-0'
//         )}>
//             <div className="px-5">
//                 <div className="flex justify-between mb-4 pt-4">
//                     <div className="text-2xl font-bold text-neutral-800">
//                         Messages
//                     </div>
//                     <div className="
//                         rounded-full
//                         p-2
//                         bg-gray-100
//                         cursor-pointer
//                         hover:opacity-75
//                         transition
//                     ">
//                         <MdOutlineGroupAdd size={20} />
//                     </div> 
//                 </div>
//                 {items.map((item) => (
//                     <ConversationBox
//                         key={item.id}
//                         serializedData={SuperJSON.stringify(item)}
//                         selected={conversationId === item.id}
//                     />
//                 ))}
//             </div>
//         </aside>
//     )
// }

// export default ConversationList



'use client'
import { useMemo, useState, useEffect } from "react"
import SuperJSON from "superjson"
import { FullConversationType } from "@/app/types"
import { MdOutlineGroupAdd } from "react-icons/md"
import clsx from "clsx"
import ConversationBox from "./ConversationBox"
import useConversation from "@/app/hooks/useConversation"
import { useRouter } from "next/navigation"
import GroupChatModal from "./GroupChatModal"
import {User} from '@prisma/client'
import {useSession} from 'next-auth/react'
import { pusherClient } from "@/app/libs/pusher"
import { find } from "lodash"

interface ConversationListProps {
    initialItems: string // SuperJSON string from server
    serializedUsers: string
}

const ConversationList: React.FC<ConversationListProps> = ({ initialItems, serializedUsers }) => {
    // Deserialize the entire list once
    const conversations = SuperJSON.parse<FullConversationType[]>(initialItems)
     const users = SuperJSON.parse<User[]>(serializedUsers);
    const [items, setItems] = useState(conversations)
    const { conversationId, isOpen } = useConversation()
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const router = useRouter();
    const session = useSession();
    

    console.log("initialItems:", initialItems);
console.log("parsed conversations:", conversations, Array.isArray(conversations));

   
    const pusherKey = useMemo(()=>{
        return session.data?.user?.email;
    }, [session.data?.user?.email])

    useEffect(()=>{
        if(!pusherKey){
            return;
        } 

        pusherClient.subscribe(pusherKey);

        const newHandler = (conversation:FullConversationType)=>{
            setItems((current)=>{
                if(find(current, {id:conversation.id})){
                    return current;
                }
                return [conversation, ...current];
            })
        };

        const updateHandler = (conversation: FullConversationType)=>{
            setItems((current)=>current.map((currentConversation)=>{
                if(currentConversation.id===conversation.id){
                    return {
                        ...currentConversation,
                        messages: conversation.messages
                    }
                }

                return currentConversation;
            }))
        }

        const removeHandler = (conversation:FullConversationType)=>{
            setItems((current)=>{
                return [...current.filter((convo)=>convo.id!==conversation.id)]
            })

            if(conversationId===conversation.id){
                router.push('/conversations')
            }

        }; 

        pusherClient.bind('conversation:new', newHandler);
        pusherClient.bind('conversation:update', updateHandler);
        pusherClient.bind('conversation:remove', removeHandler)

        return ()=>{
            pusherClient.unsubscribe(pusherKey);
            pusherClient.unbind('conversation:new', newHandler);
            pusherClient.unbind('conversation:update', updateHandler);
            pusherClient.unbind('conversation:remove', removeHandler);
        }
    }, [pusherKey, conversationId, router]);
    return (
        <>
        <GroupChatModal 
        users={users}
        isOpen={isModalOpen}
        onClose={()=>setIsModalOpen(false)}
        />
        <aside className={clsx(`
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
            `, 
            isOpen ? 'hidden' : 'block w-full left-0'
        )}>
            <div className="px-5">
                <div className="flex justify-between mb-4 pt-4">
                    <div className="text-2xl font-bold text-neutral-800">
                        Messages
                    </div>
                    <div 
                      onClick={()=>setIsModalOpen(true)}
                    className="
                        rounded-full
                        p-2
                        bg-gray-100
                        cursor-pointer
                        hover:opacity-75
                        transition
                    ">
                        <MdOutlineGroupAdd size={20} />
                    </div> 
                </div>
                {items.map((item) => (
                    <ConversationBox
                        key={item.id}
                        data={item}  // Pass deserialized object directly
                        selected={conversationId === item.id}
                    />
                ))}
            </div>
        </aside>


        </>
    )
}

export default ConversationList
