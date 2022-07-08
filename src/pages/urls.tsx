import { CopyIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { ShortLink } from "@prisma/client";
import copy from "copy-to-clipboard";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import React from "react";
import { trpc } from "../utils/trpc";

const URLs: NextPage = () => {
    const { data: session, status } = useSession();

    const getSlugs = trpc.useQuery(
        ["getSlugs", { userId: (session?.userId as string) || "" }],
        {
            refetchOnReconnect: false, // replacement for enable: false which isn't respected.
            refetchOnMount: false,
            refetchOnWindowFocus: false
        }
    );

    if (status === "loading") {
        return <div>Loading...</div>;
    }
    if (status !== "authenticated") return <div>Please Login</div>;
    const url = typeof window !== "undefined" ? window.location.origin : "";

    const slugs = getSlugs.data?.slugs as ShortLink[];
    return (
        <div className="w-full h-full flex flex-col items-center space-y-20 ">
            <h1 className="font-sans font-semibold text-lg ">
                Your Recent Crispy-URLs
            </h1>
            <div className="flex flex-col w-full items-center divide-y-2 divide-teal-500 overflow-x-hidden overflow-y-auto">
                {slugs?.map((slug: ShortLink) => (
                    <div className="flex flex-col lg:flex-row md:flex-row justify-between lg:w-2/3 w-10/12">
                        <div className="flex items-center space-x-5 lg:justify-center py-5">
                            <GlobeIcon className="h-10 w-10" />
                            <div className="flex flex-col">
                                <h1 className="font-oswald">{slug.slug}</h1>
                                <p className="font-sans font-light text-sm">
                                    {slug.url}
                                </p>
                                <p className="font-sans font-light text-sm">
                                    {url}/{slug.slug}
                                </p>
                            </div>
                        </div>
                        <div className="flex space-x-1 items-center mb-3 lg:mb-0 justify-end">
                            {/* <Button variant="outline" colorScheme="teal">
                                Detailed stats
                            </Button> */}
                            <Button
                                leftIcon={<CopyIcon />}
                                colorScheme="teal"
                                onClick={() => {
                                    copy(`${url}/${slug.slug}`);
                                }}
                            >
                                Copy
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const GlobeIcon = ({ className }: { className: string }) => (
    <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
        />
    </svg>
);

export default URLs;
