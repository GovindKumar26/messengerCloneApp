// 


import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import getUsers from "../actions/getUsers";
import UserList from "./components/UserList";
import SuperJSON from "superjson";

export default async function UsersLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const users = await getUsers();

    // Serialize users with SuperJSON before passing to client component
    const serializedUsers = SuperJSON.stringify(users);

    return (
        // ts-expect-error Server Component
        <Sidebar>
            <div className="h-full">
                <UserList serializedItems={serializedUsers} />
                {children}
            </div>
        </Sidebar>
    );
};
