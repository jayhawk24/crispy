import { Button } from "@chakra-ui/react";
import React from "react";
import Logo from "../Logo/Logo";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Header = () => {
    const { data: session, status } = useSession();

    return (
        <div className="py-5 w-full flex justify-between items-center">
            <Logo />
            <div className="flex space-x-3">
                {status === "authenticated" ? (
                    <Button colorScheme={"teal"} variant="ghost">
                        Account
                    </Button>
                ) : (
                    <Button colorScheme={"teal"} variant="solid">
                        <Link href="/api/auth/signin">Sign In</Link>
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Header;
