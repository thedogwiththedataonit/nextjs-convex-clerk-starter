
//create a header component with clerk login and user button


import { useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { UserButton, SignedIn, SignedOut , SignInButton} from "@clerk/nextjs";

export default function Header() {

    return (
        <div className="flex justify-between items-center p-4">
            <h1 className="text-2xl font-bold">Task Manager</h1>
            <SignedIn>
                <UserButton />
            </SignedIn>
            <SignedOut>
                <SignInButton />

            </SignedOut>
        </div>
    );
}