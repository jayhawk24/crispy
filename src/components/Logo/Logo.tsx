import Link from "next/link";
import React, { useEffect } from "react";

const Logo = () => {
    return (
        <div className="font-oswald text-xl ">
            <Link href="/">{`</>CRISPY`}</Link>
        </div>
    );
};

export default Logo;
