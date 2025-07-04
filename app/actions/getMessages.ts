// import prisma from '@/app/libs/prismadb'

// const getMessages = async (
//     conversationId: string
// ) =>{
//     try{
//         const messages = await prisma.message.findMany({
//             where: {
//                 conversationId: conversationId
//             },
//             include:{
//                 sender : true,
//                 seen: true
//             },
//             orderBy: {
//                 createdAt: 'asc'
//             }
//         });

//         return messages;

//     } catch (error : any){
//         return [];
//     }
// };

// export default getMessages;


import prisma from '@/app/libs/prismadb'


const getMessages = async (conversationId: string) => {
    try {
        const messages = await prisma.message.findMany({
            where: { conversationId },
            include: {
                sender: true,
                seen: true
            },
            orderBy: { createdAt: 'asc' }
        })

        // Serialize messages with SuperJSON to handle Dates
        return messages
        
    } catch (error: unknown) {
         console.error("Failed to fetch messages", error);
        return [] // Serialize empty array for consistency
    }
}

export default getMessages
