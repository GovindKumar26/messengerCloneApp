// import ConversationList from "./components/ConversationList"
// import Sidebar from "../components/sidebar/Sidebar"
// import getConversations from "../actions/getConversations"

// export default async function ConversationLayout({
//     children
// } : {
//     children: React.ReactNode
// }) {

//     const conversations = await getConversations();

//     // Transform Date objects to strings while preserving type structure
// const serializedConversations = conversations.map(conv => ({
//   ...conv,
//   createdAt: conv.createdAt.toISOString(),
//   lastMessageAt: conv.lastMessageAt?.toISOString() || null,
//   users: conv.users.map(user => ({
//     ...user,
//     createdAt: user.createdAt.toISOString(),
//     updatedAt: user.updatedAt.toISOString(),
//     emailVerified: user.emailVerified?.toISOString() || null
//   })),
//   messages: conv.messages.map(message => ({
//     ...message,
//     createdAt: message.createdAt.toISOString(),
//    // updatedAt: message.updatedAt.toISOString(),
//     sender: {
//       ...message.sender,
//       createdAt: message.sender.createdAt.toISOString(),
//       updatedAt: message.sender.updatedAt.toISOString(),
//       emailVerified: message.sender.emailVerified?.toISOString() || null
//     },
//     seen: message.seen.map(user => ({
//       ...user,
//       createdAt: user.createdAt.toISOString(),
//       updatedAt: user.updatedAt.toISOString(),
//       emailVerified: user.emailVerified?.toISOString() || null
//     }))
//   }))
// }));


    
    
//     return (
//         // ts expect error 
        
//         <Sidebar>
//             <div className="h-full">
//                 <ConversationList initialItems={serializedConversations} />
//                 {children}
//             </div>
//         </Sidebar> 
//     )  
// }



import ConversationList from "./components/ConversationList"
import Sidebar from "../components/sidebar/Sidebar"
import getConversations from "../actions/getConversations"
import getUsers from "../actions/getUsers"
import SuperJSON from 'superjson'

export default async function ConversationLayout({
    children
}: {
    children: React.ReactNode
}) {
    const conversations = await getConversations()
    const users = await getUsers();
    
    // Serialize with SuperJSON (handles Dates automatically)
    const serializedConversations = SuperJSON.stringify(conversations)
    const serializedUsers = SuperJSON.stringify(users);


    return (
        <Sidebar>
            <div className="h-full">
                <ConversationList 
                initialItems={serializedConversations}
                serializedUsers={serializedUsers}
                />
                {children}
            </div> 
        </Sidebar>
    )
}
