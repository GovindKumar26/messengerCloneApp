// // import DesktopSidebar from "./DesktopSidebar";

// // async function Sidebar({children}:{
// //     children: React.ReactNode
// // }) {
// //     return(
// //          <div className="h-full ">
// //             <DesktopSidebar/>
// //             <main className="lg:pd-20 h-full">
// //                   {children}
// //             </main>
          
// //          </div>
// //     )
// // }

// // export default Sidebar;


// import MobileFooter from "./MobileFooter";
// import DesktopSidebar from "./DesktopSidebar";
// import getCurrentUser from "@/app/actions/getCurrentUser";
// import SuperJSON from "superjson";

// async function Sidebar({children}:{
//     children: React.ReactNode
// }) {
//     const currentUser = await getCurrentUser();
//       // Serialize the user data
//   const serializedUser = SuperJSON.stringify(currentUser);
    
    
//     return(
//          <div className="h-full">
//             <DesktopSidebar serializedUser={serializedUser!} />
//             <MobileFooter/>
//             <main className="lg:pl-20 h-full">
//                   {children}
//             </main>
//          </div>
//     )
// }

// export default Sidebar;  




import MobileFooter from "./MobileFooter";
import DesktopSidebar from "./DesktopSidebar";
import getCurrentUser from "@/app/actions/getCurrentUser";
import SuperJSON from "superjson";

async function Sidebar({ children }: { children: React.ReactNode }) {
    const currentUser = await getCurrentUser();
    // Serialize the user data
    const serializedUser = SuperJSON.stringify(currentUser);

    return (
        <div className="h-full">
            <DesktopSidebar serializedUser={serializedUser} />
            <MobileFooter />
            <main className="lg:pl-20 h-full">
                {children}
            </main>
        </div>
    );
}

export default Sidebar;
