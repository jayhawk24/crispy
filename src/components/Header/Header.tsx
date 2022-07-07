import React from "react";

type Props = {};

const Header = (props: Props) => {
    return (
        <div className="h-0.5 w-full flex justify-between">
            <div>Logo</div>
            <div className="flex"></div>
        </div>
    );
};

export default Header;
