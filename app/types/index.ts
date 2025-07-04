import { Conversation, User, Message } from "@prisma/client"



export type FullMessageType = Message & {
    sender: User,
    seen : User[]
};


export type FullConversationType = Conversation & {
    users: User[],
    messages: FullMessageType[],
};

export type ConversationWithUsers = Conversation & {
    users: User[];
};




// // Client-safe type for User with string dates
// export type ClientUser = Omit<User, "createdAt" | "updatedAt" | "emailVerified"> & {
//     createdAt: string;
//     updatedAt: string;
//     emailVerified: string | null;
// };

// // Client-safe message type using ClientUser
// export type FullMessageType = Omit<Message, "createdAt" > & {
//     createdAt: string;
//  //   updatedAt: string;
//     sender: ClientUser;
//     seen: ClientUser[];
// };

// // Client-safe conversation type
// export type FullConversationType = Omit<Conversation, "createdAt" | "lastMessageAt"> & {
//     createdAt: string;
//     lastMessageAt: string | null;
//     users: ClientUser[];
//     messages: FullMessageType[];  
// }; 