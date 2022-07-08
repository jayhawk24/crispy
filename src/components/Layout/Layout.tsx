import React from "react";
import Curve from "../CreateLinkForm/Curve";
import Header from "../Header/Header";

type Props = {
    children: React.ReactNode;
};

const Layout = (props: Props) => {
    return (
        <div className="bg-secondary-100 h-screen w-screen lg:px-20 md:px-10 px-5 overflow-hidden">
            <Header />
            {props.children}
            <Curve />
        </div>
    );
};

export default Layout;
