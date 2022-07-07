import { Button } from "@chakra-ui/react";
import React from "react";
import Logo from "../Logo/Logo";

const Header = () => {
    return (
        <div className="py-5 w-full flex justify-between items-center">
            <Logo />
            <div className="flex space-x-3">
                <Button colorScheme={"teal"} variant="ghost">
                    Login
                </Button>
                <Button colorScheme={"teal"} variant="solid">
                    Sign Up
                </Button>
            </div>
        </div>
    );
};

export default Header;
