// import { useSession } from "next-auth/react";
// import { useMemo } from "react";
// import { FullConversationType } from "../types";
// import { User } from "@prisma/client";
// import { ClientUser } from "../types";

// const useOtherUser = (conversation: FullConversationType | {
//     users:ClientUser[] 
// }) => {
//     const session = useSession();

//     const otherUser = useMemo(() => {
//         const currentUserEmail = session?.data?.user?.email;

//         const otherUser = conversation.users.filter((user) => user.email !== currentUserEmail);
//         return otherUser[0];

//     }, [session?.data?.user?.email, conversation.users])
//     return otherUser;
// }

// export default useOtherUser; 



import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { FullConversationType } from "../types";
import { User } from "@prisma/client";

// Accept either a full conversation or just the serialized data
const useOtherUser = (conversation: FullConversationType | { users: User[] }) => {
    const session = useSession();
    
    const otherUser = useMemo(() => {
        const currentUserEmail = session?.data?.user?.email;
        
        // Filter out the current user
        const otherUsers = conversation.users.filter(
            (user) => user.email !== currentUserEmail
        );
        
        // Return the first other user or null if none found
       // return otherUsers[0] || null; // Explicitly return null when no user found
          return otherUsers[0]

    }, [session?.data?.user?.email, conversation.users]);
    
    return otherUser;
}

export default useOtherUser;
