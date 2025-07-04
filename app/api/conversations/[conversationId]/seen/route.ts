import { NextRequest, NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";

export async function POST(
  req: NextRequest,
  context: any          // ← leave it untyped
) {
  try {
    // safely cast just where you need it
    const { conversationId } =
      (context as { params: { conversationId: string } }).params;

    const currentUser = await getCurrentUser();
    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

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

    const updatedMessage = await prisma.message.update({
      where: { id: lastMessage.id },
      include: { seen: true, sender: true },
      data: { seen: { connect: { id: currentUser.id } } },
    });

    conversation.users.forEach((user) => {
      if (user.email) {
        pusherServer.trigger(user.email, "conversation:update", updatedMessage);
      }
    });

    return NextResponse.json(updatedMessage);
  } catch (err) {
    console.error("SEEN_ROUTE_ERROR", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
