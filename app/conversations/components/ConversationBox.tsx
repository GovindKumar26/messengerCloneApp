// 'use client'
// import { useCallback, useMemo } from "react";
// import { useRouter } from "next/navigation";
// import { Conversation, Message, User } from "@prisma/client";
// import { format } from 'date-fns'
// import { useSession } from "next-auth/react";
// import clsx from 'clsx'

// import { FullConversationType } from "@/app/types";
// import useOtherUser from "@/app/hooks/useOtherUser";
// import Avatar from "@/app/components/Avatar";

// interface ConversationBoxProps {
//     data: FullConversationType,
//     selected?: boolean
// }

// const ConversationBox: React.FC<ConversationBoxProps> = ({
//     data,
//     selected
// }) => {
//     const otherUser = useOtherUser(data)
//     const session = useSession();
//     const router = useRouter();
//     const handleClick = useCallback(() => {
//         router.push(`/conversations/${data.id}`);
//     }, [data.id, router])

//     const lastMessage = useMemo(() => {
//         const messages = data.messages || [];

//         return messages[messages.length - 1];
//     }, [data.messages])

//     const userEmail = useMemo(() => {
//         return session.data?.user?.email;
//     }, [session.data?.user?.email]);

//     const hasSeen = useMemo(() => {
//         if (!lastMessage) {
//             return false;
//         }
//         const seenArray = lastMessage.seen || [];

//         if (!userEmail) {
//             return false;
//         }

//         return seenArray.filter((user) => user.email === userEmail).length !== 0;
//     }, [userEmail, lastMessage]);

//     const lastMessageText = useMemo(() => {
//         if (lastMessage?.image) {
//             return 'Sent an image';
//         }

//         if (lastMessage?.body) {
//             return lastMessage.body;
//         }

//         return 'Started a conversation';
//     }, [lastMessage])

//     return (
//         <div
//             onClick={handleClick}
//             className={clsx(`
//         w-full
//         relative
//         flex
//         items-center
//         space-x-3
//         hover:bg-neutral-100
//         rounded-lg
//         transition
//         cursor-pointer
//         p-3`
//        ,
//                 selected ? 'bg-neutral-100' : 'bg-white')}>

//             <Avatar user={otherUser} />
//             <div className="min-w-0 flex-1">
//                 <div className="focus:outline-none">
//                     <div className="flex
//                                 justify-between
//                                 items-center
//                                 mb-1">
//                         <p className="text-md
//                                     font-medium
//                                     text-gray-900">
//                             {data.name || otherUser.name}
//                         </p>
//                         {lastMessage?.createdAt && (
//                             <p className="text-xs text-gray-400 font-light">
//                                 {format(new Date(lastMessage.createdAt), 'p')}
//                             </p>
//                         )}

//                     </div>
//                     <p
//                     className={clsx(`
//                     truncate
//                     text-sm
//                     `,
//                     hasSeen ? 'text-gray-500' : 'text-black font-medium')}>
//                         {lastMessageText} 
//                     </p>
//                 </div>
//             </div>

//         </div>
//     )
// }

// export default ConversationBox;



// 'use client'
// import { useCallback, useMemo } from "react";
// import { useRouter } from "next/navigation";
// import { format } from 'date-fns'
// import { useSession } from "next-auth/react";
// import clsx from 'clsx'
// import SuperJSON from "superjson";
// import { FullConversationType } from "@/app/types";
// import useOtherUser from "@/app/hooks/useOtherUser";
// import Avatar from "@/app/components/Avatar";

// interface ConversationBoxProps {
//     serializedData: string;   // SuperJSON string
//     selected?: boolean;
// }

// const ConversationBox: React.FC<ConversationBoxProps> = ({
//     serializedData,
//     selected
// }) => {
//     // Deserialize the conversation data
//     const data = SuperJSON.parse<FullConversationType>(serializedData);

//     const otherUser = useOtherUser(SuperJSON.stringify(data.users)); // Pass users as serialized if your hook expects a string
//     const session = useSession();
//     const router = useRouter();

//     const handleClick = useCallback(() => {
//         router.push(`/conversations/${data.id}`);
//     }, [data.id, router]);

//     const lastMessage = useMemo(() => {
//         const messages = data.messages || [];
//         return messages[messages.length - 1];
//     }, [data.messages]);

//     const userEmail = useMemo(() => session.data?.user?.email, [session.data?.user?.email]);

//     const hasSeen = useMemo(() => {
//         if (!lastMessage || !userEmail) return false;
//         return lastMessage.seen?.some(user => user.email === userEmail);
//     }, [userEmail, lastMessage]);

//     const lastMessageText = useMemo(() => {
//         if (lastMessage?.image) return 'Sent an image';
//         if (lastMessage?.body) return lastMessage.body;
//         return 'Started a conversation';
//     }, [lastMessage]);

//     return (
//         <div
//             onClick={handleClick}
//             className={clsx(
//                 "w-full relative flex items-center space-x-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer p-3",
//                 selected ? 'bg-neutral-100' : 'bg-white'
//             )}
//         >
//             <Avatar user={otherUser} />
//             <div className="min-w-0 flex-1">
//                 <div className="focus:outline-none">
//                     <div className="flex justify-between items-center mb-1">
//                         <p className="text-md font-medium text-gray-900">
//                             {data.name || otherUser.name}
//                         </p>
//                         {lastMessage?.createdAt && (
//                             <p className="text-xs text-gray-400 font-light">
//                                 {format(lastMessage.createdAt, 'p')}
//                             </p>
//                         )}
//                     </div>
//                     <p className={clsx(
//                         'truncate text-sm',
//                         hasSeen ? 'text-gray-500' : 'text-black font-medium'
//                     )}>
//                         {lastMessageText}
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default ConversationBox;


// 'use client'
// import { useCallback, useMemo } from "react";
// import { useRouter } from "next/navigation";
// import { format } from 'date-fns'
// import { useSession } from "next-auth/react";
// import clsx from 'clsx'
// import SuperJSON from "superjson";
// import { FullConversationType } from "@/app/types";
// import useOtherUser from "@/app/hooks/useOtherUser";
// import Avatar from "@/app/components/Avatar";

// interface ConversationBoxProps {
//     serializedData: string
//     selected?: boolean
// }

// const ConversationBox: React.FC<ConversationBoxProps> = ({
//     serializedData,
//     selected
// }) => {
//     const data = SuperJSON.parse<FullConversationType>(serializedData)
//     const otherUser = useOtherUser(data)
//     const session = useSession();
//     const router = useRouter();

//     const handleClick = useCallback(() => {
//         router.push(`/conversations/${data.id}`);
//     }, [data.id, router]);

//     const lastMessage = useMemo(() => {
//         const messages = data.messages || [];
//         return messages[messages.length - 1];
//     }, [data.messages]);

//     const userEmail = useMemo(() => session.data?.user?.email, [session.data?.user?.email]);

//     const hasSeen = useMemo(() => {
//         if (!lastMessage || !userEmail) return false;
//         return lastMessage.seen?.some(user => user.email === userEmail);
//     }, [userEmail, lastMessage]);

//     const lastMessageText = useMemo(() => {
//         if (lastMessage?.image) return 'Sent an image';
//         if (lastMessage?.body) return lastMessage.body;
//         return 'Started a conversation';
//     }, [lastMessage]);

//     return (
//         <div
//             onClick={handleClick}
//             className={clsx(
//                 "w-full relative flex items-center space-x-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer p-3",
//                 selected ? 'bg-neutral-100' : 'bg-white'
//             )}
//         >
//             <Avatar user={otherUser || undefined} />
//             <div className="min-w-0 flex-1">
//                 <div className="focus:outline-none">
//                     <div className="flex justify-between items-center mb-1">
//                         <p className="text-md font-medium text-gray-900">
//                             {data.name || otherUser?.name || "Unknown"}
//                         </p>
//                         {lastMessage?.createdAt && (
//                             <p className="text-xs text-gray-400 font-light">
//                                 {format(lastMessage.createdAt, 'p')}
//                             </p>
//                         )}
//                     </div>
//                     <p className={clsx(
//                         'truncate text-sm',
//                         hasSeen ? 'text-gray-500' : 'text-black font-medium'
//                     )}>
//                         {lastMessageText}
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default ConversationBox;



'use client'
import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { format } from 'date-fns'
import { useSession } from "next-auth/react";
import clsx from 'clsx'
import { FullConversationType } from "@/app/types";
import useOtherUser from "@/app/hooks/useOtherUser";
import Avatar from "@/app/components/Avatar";
import AvatarGroup from "@/app/components/AvatarGroup";

interface ConversationBoxProps {
    data: FullConversationType  // Changed to accept deserialized object
    selected?: boolean
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
    data,  // Directly receive parsed data
    selected
}) => {
    const otherUser = useOtherUser(data)
    const session = useSession();
    const router = useRouter();

    const handleClick = useCallback(() => {
        router.push(`/conversations/${data.id}`);
    }, [data.id, router]);

    const lastMessage = useMemo(() => {
        return data.messages?.[data.messages.length - 1];
    }, [data.messages]);

    const userEmail = useMemo(() => session.data?.user?.email, [session]);

    const hasSeen = useMemo(() => {
        return lastMessage?.seen?.some(user => user.email === userEmail) || false;
    }, [userEmail, lastMessage]);

    const lastMessageText = useMemo(() => {
        if (lastMessage?.image) return 'Sent an image';
        return lastMessage?.body || 'Started a conversation';
    }, [lastMessage]);

    return (
        <div
            onClick={handleClick}
            className={clsx(
                "w-full relative flex items-center space-x-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer p-3",
                selected ? 'bg-neutral-100' : 'bg-white'
            )}
        >

            {data.isGroup? (
                <AvatarGroup users={data.users} />
            ) : (
                <Avatar user={otherUser} />
            )}
           
            <div className="min-w-0 flex-1">
                <div className="focus:outline-none">
                    <div className="flex justify-between items-center mb-1">
                        <p className="text-md font-medium text-gray-900">
                            {data.name || otherUser.name}
                        </p>
                        {lastMessage?.createdAt && (
                            <p className="text-xs text-gray-400 font-light">
                                {format(new Date(lastMessage.createdAt), 'p')}
                            </p>
                        )}
                    </div>
                    <p className={clsx(
                        'truncate text-sm',
                        hasSeen ? 'text-gray-500' : 'text-black font-medium'
                    )}>
                        {lastMessageText}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ConversationBox;
