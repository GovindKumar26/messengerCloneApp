// import getCurrentUser from "@/app/actions/getCurrentUser";
// import { NextResponse } from "next/server";
// import prisma from '@/app/libs/prismadb'
// import { pusherServer } from "@/app/libs/pusher";

// interface IParams {
//     conversationId?: string;
// };

// export async function POST (
//     request: Request,
//     {params} : {params:IParams}
// ){
//     try{
//         const currentUser = await getCurrentUser();
//         const {
//             conversationId
//         } = params;

//         if(!currentUser?.id || !currentUser?.email){
//             return new NextResponse("Unauthorized", {status: 401});
//         }

//         // find the existing conversation
//         const conversation = await prisma.conversation.findUnique({
//             where:{
//                 id: conversationId
//             },
//             include: {
//                 messages: {
//                     include: {
//                         seen: true,
//                     }
//                 },
//                 users: true
//             }
//         });

//         if(!conversation){
//             return new NextResponse('Invalid ID', {status: 400})
//         }


//         //find the last message
//         const lastMessage = conversation.messages[conversation.messages.length - 1];

//         if(!lastMessage){
//             return NextResponse.json(conversation);
//         }

//         //update seen of last message
//         const updatedMessage = await prisma.message.update({
//             where: {
//                 id: lastMessage.id
//             },
//             include: {  
//                 sender: true,
//                 seen: true
//             },
//             data: {
//                 seen: {
//                     connect: {
//                         id: currentUser.id
//                     }
//                 }
//             }
//         });

//         await pusherServer.trigger(currentUser.email, 'conversation:update', {
//             id: conversationId,
//             messages: [updatedMessage]
//         });

//         if(lastMessage.seenIds.indexOf(currentUser.id)!==-1){
//             return NextResponse.json(conversation);
//         }

//         await pusherServer.trigger(conversationId!, 'message:update', updatedMessage)

//         return NextResponse.json(updatedMessage)

//     } catch(error:unknown){
//         console.log(error, "ERROR_MESSAGES_SEEN");
//         return new NextResponse("Internal Error", {status: 500})
//     }
// }
import { NextRequest, NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";

export async function POST(
  request: NextRequest,                       // ✅ first arg: NextRequest
  { params }: { params: { conversationId: string } }   // ✅ second arg: inline params object
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { conversationId } = params;

    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: {
        messages: { include: { seen: true } },
        users: true,
      },
    });

    if (!conversation) {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    const lastMessage = conversation.messages.at(-1);
    if (!lastMessage) {
      return NextResponse.json(conversation);
    }

    const updated = await prisma.message.update({
      where: { id: lastMessage.id },
      include: { seen: true, sender: true },
      data: {
        seen: { connect: { id: currentUser.id } },
      },
    });

    // optional real‑time trigger
    conversation.users.forEach((user) => {
      if (user.email) {
        pusherServer.trigger(user.email, "conversation:update", updated);
      }
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error("ERROR_CONVERSATION_SEEN", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
