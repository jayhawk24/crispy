import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Header from "../components/Header/Header";

const CreateLinkForm = dynamic(() => import("../components/CreateLink"), {
    ssr: false
});

const Home: NextPage = () => {
    return (
        <div className="bg-secondary-100 h-screen w-screen">
            <Header />
            <Suspense>
                <CreateLinkForm />
            </Suspense>
        </div>
    );
};

export default Home;
