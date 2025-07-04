// import prisma from '@/app/libs/prismadb'
// import superjson from "superjson";
// import getSession from './getSession'

// const getCurrentUser = async ()=>{
//     try{
//         const session = await getSession();
        
//         if(!session?.user?.email){
//             return null;
//         }
        
//         const currentUser = await prisma.user.findUnique({
//             where:{
//                 email: session.user.email as string
//             }
//         });

//         if(!currentUser){
//             return null;
//         }
//        // return superjson.serialize(currentUser).json;
//        return currentUser;

//     } catch(error: any){
//         return null; 
//     }
// }

// export default getCurrentUser;


import prisma from '@/app/libs/prismadb'
import getSession from './getSession'

const getCurrentUser = async () => {
    try {
        const session = await getSession();

        if (!session?.user?.email) {
            return null;
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            }
        });

        if (!currentUser) {
            return null;
        }

        return currentUser; // Do NOT serialize here

    } catch (error: any) {
        return null;
    }
}

export default getCurrentUser;
