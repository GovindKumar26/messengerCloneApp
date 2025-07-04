// import getCurrentUser from "@/app/actions/getCurrentUser";
// import { NextResponse } from "next/server";
// import prisma from '@/app/libs/prismadb'
// import { pusherServer } from "@/app/libs/pusher";

// interface IParams {
//     conversationId?: string;
// }

// export async function DELETE(
//     request: Request,
//     context: { params: { conversationId: string } }
// ) {
//     try{
//         const {conversationId} = params;
//         const currentUser = await getCurrentUser();

//         if(!currentUser?.id){
//             return new NextResponse('Unauthorized', {status : 401});
//         }

//         const existingConversation = await prisma.conversation.findUnique(
//           {
//             where: {
//                 id: conversationId
//             },
//             include: {
//                 users : true
//             }
//           }
//         );

//         const deletedConversation = await prisma.conversation.deleteMany({
//             where: {
//                 id: conversationId,
//                 userIds: {
//                     hasSome: [currentUser.id]
//                 }
//             }
//         });

//         existingConversation?.users.forEach((user)=>{
//             if(user.email){
//                 pusherServer.trigger(user.email, 'conversation:remove', existingConversation)
//             }
//         })

//         return NextResponse.json(deletedConversation);

//     } catch(error: unknown){
//         console.log(error, 'ERROR_CONVERSATION_DELETE');
//         return new NextResponse('Internal Error', {status: 500})
//     }
// }

// import getCurrentUser from "@/app/actions/getCurrentUser";
// import { NextResponse } from "next/server";
// import prisma from '@/app/libs/prismadb';
// import { pusherServer } from "@/app/libs/pusher";

// export async function DELETE(
//   request: Request,
//   { params }: { params: { conversationId: string } }
// ) {
//   try {
//     const { conversationId } = params;
//     const currentUser = await getCurrentUser();

//     if (!currentUser?.id) {
//       return new NextResponse('Unauthorized', { status: 401 });
//     }

//     const existingConversation = await prisma.conversation.findUnique({
//       where: {
//         id: conversationId,
//       },
//       include: {
//         users: true,
//       },
//     });

//     const deletedConversation = await prisma.conversation.deleteMany({
//       where: {
//         id: conversationId,
//         userIds: {
//           hasSome: [currentUser.id],
//         },
//       },
//     });

//     existingConversation?.users.forEach((user) => {
//       if (user.email) {
//         pusherServer.trigger(user.email, 'conversation:remove', existingConversation);
//       }
//     });

//     return NextResponse.json(deletedConversation);
//   } catch (error) {
//     console.error('ERROR_CONVERSATION_DELETE', error);
//     return new NextResponse('Internal Error', { status: 500 });
//   }
// }


// import getCurrentUser from "@/app/actions/getCurrentUser";
// import { NextResponse } from "next/server";
// import prisma from '@/app/libs/prismadb';
// import { pusherServer } from "@/app/libs/pusher";

// export async function DELETE(
//   request: Request,
//   context: { params: { conversationId: string } }
// ) {
//   try {
//     const { conversationId } = context.params;
//     const currentUser = await getCurrentUser();

//     if (!currentUser?.id) {
//       return new NextResponse('Unauthorized', { status: 401 });
//     }

//     const existingConversation = await prisma.conversation.findUnique({
//       where: {
//         id: conversationId,
//       },
//       include: {
//         users: true,
//       },
//     });

//     const deletedConversation = await prisma.conversation.deleteMany({
//       where: {
//         id: conversationId,
//         userIds: {
//           hasSome: [currentUser.id],
//         },
//       },
//     });

//     existingConversation?.users.forEach((user) => {
//       if (user.email) {
//         pusherServer.trigger(user.email, 'conversation:remove', existingConversation);
//       }
//     });

//     return NextResponse.json(deletedConversation);
//   } catch (error) {
//     console.error('ERROR_CONVERSATION_DELETE', error);
//     return new NextResponse('Internal Error', { status: 500 });
//   }
// }


import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb';
import { pusherServer } from "@/app/libs/pusher";

export async function DELETE(
  request: Request,
  context: Promise<{ params: { conversationId: string } }>
) {
  try {
    const { params } = await context;
    const { conversationId } = params;

    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const existingConversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: { users: true },
    });

    const deletedConversation = await prisma.conversation.deleteMany({
      where: {
        id: conversationId,
        userIds: { hasSome: [currentUser.id] },
      },
    });

    existingConversation?.users.forEach((user) => {
      if (user.email) {
        pusherServer.trigger(user.email, 'conversation:remove', existingConversation);
      }
    });

    return NextResponse.json(deletedConversation);
  } catch (error) {
    console.error('ERROR_CONVERSATION_DELETE', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
