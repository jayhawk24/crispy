import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import debounce from "lodash.debounce";
import { trpc } from "../../utils/trpc";
import copy from "copy-to-clipboard";
import { Button } from "@chakra-ui/react";
import Image from "next/image";
import BannerSvg from "./BannerSvg";

type Form = {
    slug: string;
    url: string;
};

const CreateLinkForm: NextPage = () => {
    const [form, setForm] = useState<Form>({ slug: "", url: "" });
    const [randomWord, setRandomWord] = useState("");
    const url = typeof window !== "undefined" ? window.location.origin : "";

    const slugCheck = trpc.useQuery(["slugCheck", { slug: form.slug }], {
        refetchOnReconnect: false, // replacement for enable: false which isn't respected.
        refetchOnMount: false,
        refetchOnWindowFocus: false
    });
    const createSlug = trpc.useMutation(["createSlug"]);

    if (createSlug.status === "success") {
        return (
            <div className="space-y-8">
                <div className="flex">
                    <h1 className="w-full bg-gray-100 rounded-lg p-2 mr-2">{`${url}/${form.slug}`}</h1>
                    <Button
                        variant="ghost"
                        fontSize={"sm"}
                        onClick={() => {
                            copy(`${url}/${form.slug}`);
                        }}
                    >
                        Copy Link
                    </Button>
                </div>
                <Button
                    type="button"
                    onClick={() => {
                        createSlug.reset();
                        setForm({ slug: "", url: "" });
                    }}
                >
                    Reset
                </Button>
            </div>
        );
    }

    useEffect(() => {
        fetch("https://random-word-api.herokuapp.com/word").then((res) =>
            res.json().then((res) => {
                setRandomWord(res[0]);
            })
        );
    }, []);

    return (
        <form
            className="space-y-8"
            onSubmit={(e) => {
                e.preventDefault();
                createSlug.mutate({ ...form });
            }}
        >
            <div className="flex flex-col">
                <span className="">Enter Long URL</span>
                <input
                    className="w-full bg-gray-100 rounded-lg p-2"
                    type="url"
                    onChange={(e) => setForm({ ...form, url: e.target.value })}
                    placeholder="https://google.com"
                    required
                />
            </div>

            <div className="flex flex-col">
                <span className="">Your Customized Link</span>
                <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0">
                    <span className="w-full bg-gray-100 rounded-lg p-2 mr-2 ">
                        {url}/
                    </span>
                    <div>
                        <input
                            type="text"
                            className="w-full bg-gray-100 rounded-lg p-2"
                            onChange={(e) => {
                                setForm({
                                    ...form,
                                    slug: e.target.value
                                });
                                debounce(slugCheck.refetch, 100);
                            }}
                            minLength={1}
                            placeholder={randomWord}
                            value={form.slug}
                            pattern={"^[-a-zA-Z0-9]+$"}
                            title="Only alphanumeric characters and hypens are allowed. No spaces."
                            required
                        />
                        {slugCheck.data?.used && (
                            <span className="text-sm text-red-500 font-semibold">
                                Slug already in use.
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex justify-between">
                <Button
                    onClick={() => {
                        const slug = nanoid();
                        setForm({
                            ...form,
                            slug
                        });
                        slugCheck.refetch();
                    }}
                    variant="outline"
                >
                    Random
                </Button>
                <Button
                    type="submit"
                    colorScheme={"teal"}
                    variant="solid"
                    disabled={slugCheck.isFetched && slugCheck.data!.used}
                    isLoading={slugCheck.isLoading}
                >
                    Create
                </Button>
            </div>
        </form>
    );
};

const Container = () => (
    <div className="w-full h-2/3 flex justify-around items-center space-x-10 ">
        <div className="flex flex-col justify-items-center p-10 bg-white rounded-lg shadow-xl w-full lg:w-5/12 h-fit">
            <CreateLinkForm />
        </div>
        <div className="flex justify-center items-center">
            <BannerSvg className="h-72 hidden lg:block" />
        </div>
    </div>
);

export default Container;
