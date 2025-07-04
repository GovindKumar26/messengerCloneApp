// import getCurrentUser from "@/app/actions/getCurrentUser";
// import { NextResponse } from "next/server";
// import prisma from '@/app/libs/prismadb'
// import { use } from "react";

// export async function POST(request: Request) {
//     try {
//         const currentUser = await getCurrentUser();
//         const body = await request.json();
//         const {
//             userId,
//             isGroup,
//             members,
//             name
//         } = body;

//         if (!currentUser?.id || !currentUser?.email) {
//             return new NextResponse('Unauthorized', { status: 401 }) }

//             if (isGroup && (!members || members.length < 2 || !name)) {
//                 return new NextResponse('Invalid data', { status: 400 })
//             }

//             if (isGroup) {
//                 const newConversation = await prisma.conversation.create({
//                     data: {
//                         name,
//                         isGroup,
//                         users: {
//                             connect: [
//                                 ...members.map((member: { value: string }) => ({
//                                     id: member.value
//                                 })),
//                                 {
//                                     id: currentUser?.id
//                                 }
//                             ]
//                         }
//                     },
//                     include: {
//                         users: true
//                     }
//                 });
//                 return NextResponse.json(newConversation);
//             }

//             const existingConversations = await prisma.conversation.findMany({
//                 where: {
//                     OR: [
//                         {
//                             userIds: {
//                                 equals: [ currentUser?.id, userId ]
//                             }
//                         },
//                         {
//                             userIds:{
//                                 equals: [userId, currentUser?.id]
//                             }
//                         }
//                     ]
//                 }
//             });
             
//             const singleConversation = existingConversations[0];
//             if(singleConversation){
//                 return NextResponse.json(singleConversation);
//             }

//             const newConversation = await prisma.conversation.create({
//                 data: {
//                     users: {
//                         connect: [
//                             {
//                                 id: currentUser?.id
//                             },
//                             {
//                                 id: userId
//                             }
//                         ]
//                     }
//                 },
//                 include: {
//                     users: true
//                 }
//             });

//             return NextResponse.json(newConversation)

        
//     } catch (error: any) {
//         return new NextResponse('Internal Error', { status: 500 })
//     }
// }



// import getCurrentUser from "@/app/actions/getCurrentUser";
// import { NextResponse } from "next/server";
// import prisma from '@/app/libs/prismadb'
// import SuperJSON from "superjson";

// export async function POST(request: Request) {
//     try {
//         const currentUser = await getCurrentUser();
//         const body = await request.json();
//         const { userId, isGroup, members, name } = body;

//         if (!currentUser?.id || !currentUser?.email) {
//             return new NextResponse('Unauthorized', { status: 401 });
//         }

//         if (isGroup && (!members || members.length < 2 || !name)) {
//             return new NextResponse('Invalid data', { status: 400 });
//         }

//         if (isGroup) {
//             const newConversation = await prisma.conversation.create({
//                 data: {
//                     name,
//                     isGroup,
//                     users: {
//                         connect: [
//                             ...members.map((member: { value: string }) => ({
//                                 id: member.value
//                             })),
//                             { id: currentUser.id }
//                         ]
//                     }
//                 },
//                 include: { users: true }
//             });

//             return NextResponse.json(SuperJSON.serialize(newConversation));
//         }

//         const existingConversations = await prisma.conversation.findMany({
//             where: {
//                 OR: [
//                     { userIds: { equals: [currentUser.id, userId] } },
//                     { userIds: { equals: [userId, currentUser.id] } }
//                 ]
//             }
//         });

//         if (existingConversations[0]) {
//             return NextResponse.json(SuperJSON.serialize(existingConversations[0]));
//         }

//         const newConversation = await prisma.conversation.create({
//             data: {
//                 users: {
//                     connect: [
//                         { id: currentUser.id },
//                         { id: userId }
//                     ]
//                 }
//             },
//             include: { users: true }
//         });

//         return NextResponse.json(SuperJSON.serialize(newConversation));

//     } catch (error: any) {
//         return new NextResponse('Internal Error', { status: 500 });
//     }
// }


import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb'
import SuperJSON from "superjson";
import { pusherServer } from "@/app/libs/pusher";

export async function POST(request: Request) {
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();
        const { userId, isGroup, members, name } = body;

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        if (isGroup && (!members || members.length < 2 || !name)) {
            return new NextResponse('Invalid data', { status: 400 });
        }

        if (isGroup) {
            const newConversation = await prisma.conversation.create({
                data: {
                    name,
                    isGroup,
                    users: {
                        connect: [
                            ...members.map((member: { value: string }) => ({
                                id: member.value
                            })),
                            { id: currentUser.id }
                        ]
                    }
                },
                include: { users: true }
            });

            newConversation.users.forEach((user)=>{
                if(user.email){
                    pusherServer.trigger(user.email, 'conversation:new', newConversation)
                }
            })

            return NextResponse.json(SuperJSON.stringify(newConversation));
        }

        const existingConversations = await prisma.conversation.findMany({
            where: {
                OR: [
                    { userIds: { equals: [currentUser.id, userId] } },
                    { userIds: { equals: [userId, currentUser.id] } }
                ]
            }
        });

        if (existingConversations[0]) {
            return NextResponse.json(SuperJSON.stringify(existingConversations[0]));
        }

        const newConversation = await prisma.conversation.create({
            data: {
                users: {
                    connect: [
                        { id: currentUser.id },
                        { id: userId }
                    ]
                }
            },
            include: { users: true }
        });

        newConversation.users.map((user)=>{
            if(user.email){
                pusherServer.trigger(user.email, 'conversation:new', newConversation);
            }
        })

        return NextResponse.json(SuperJSON.stringify(newConversation));

    } catch (error: unknown) {
         console.error("Failed ", error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
