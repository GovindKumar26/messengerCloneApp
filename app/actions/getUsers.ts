// import prisma from '@/app/libs/prismadb'
// import getSession from './getSession'
// import { deflate } from 'zlib';

// const getUsers = async () => {
//     const session = await getSession();

//     if(!session?.user?.email){
//         return [];
//     }

//     try{
//         const users = await prisma.user.findMany({
//             orderBy: {
//                 createdAt: 'desc'
//             },
//             where: {
//                 NOT: {
//                     email: session.user.email
//                 }
//             }
//         });

//         return users;
//     } catch (error: any){
//         return [];
//     }
// }

// export default getUsers;


// app/actions/getUsers.ts
import prisma from '@/app/libs/prismadb'
import getSession from './getSession'

const getUsers = async () => {
    try {
        const session = await getSession();
        if (!session?.user?.email) return [];

        const users = await prisma.user.findMany({
            orderBy: { createdAt: 'desc' },
            where: { NOT: { email: session.user.email } }
        });

        return users; // Return raw data, NOT SuperJSON.stringify()
        
    } catch (error: unknown) {
         console.error("Failed to fetch users", error);
        return [];
    }
}

export default getUsers;






// import prisma from '@/app/libs/prismadb'
// import getSession from './getSession'
// import SuperJSON from "superjson"

// const getUsers = async () => {
//     const session = await getSession()

//     if (!session?.user?.email) {
//         return []
//     }

//     try {
//         const users = await prisma.user.findMany({
//             orderBy: { createdAt: 'desc' },
//             where: { NOT: { email: session.user.email } }
//         })

//         // Serialize with SuperJSON to handle Dates
//         return SuperJSON.stringify(users)
//     } catch (error: any) {
//         return []
//     }
// }

// export default getUsers
