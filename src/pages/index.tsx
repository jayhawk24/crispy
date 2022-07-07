import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const CreateLinkForm = dynamic(() => import("../components/CreateLink"), {
    ssr: false
});

const Home: NextPage = () => {
    return (
        <div>
            <Suspense>
                <CreateLinkForm />
            </Suspense>
        </div>
    );
};

export default Home;
