import type { NextPage } from "next";
import { useState } from "react";
import { nanoid } from "nanoid";
import debounce from "lodash.debounce";
import { trpc } from "../utils/trpc";
import copy from "copy-to-clipboard";

type Form = {
    slug: string;
    url: string;
};

const CreateLinkForm: NextPage = () => {
    const [form, setForm] = useState<Form>({ slug: "", url: "" });
    const url = typeof window !== "undefined" ? window.location.origin : "";

    const slugCheck = trpc.useQuery(["slugCheck", { slug: form.slug }], {
        refetchOnReconnect: false, // replacement for enable: false which isn't respected.
        refetchOnMount: false,
        refetchOnWindowFocus: false
    });
    const createSlug = trpc.useMutation(["createSlug"]);

    if (createSlug.status === "success") {
        return (
            <>
                <div>
                    <h1>{`${url}/${form.slug}`}</h1>
                    <input
                        type="button"
                        value="Copy Link"
                        onClick={() => {
                            copy(`${url}/${form.slug}`);
                        }}
                    />
                </div>
                <input
                    type="button"
                    value="Reset"
                    onClick={() => {
                        createSlug.reset();
                        setForm({ slug: "", url: "" });
                    }}
                />
            </>
        );
    }

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                createSlug.mutate({ ...form });
            }}
        >
            {slugCheck.data?.used && <span>Slug already in use.</span>}
            <div>
                <span>{url}/</span>
                <input
                    type="text"
                    onChange={(e) => {
                        setForm({
                            ...form,
                            slug: e.target.value
                        });
                        debounce(slugCheck.refetch, 100);
                    }}
                    minLength={1}
                    placeholder="rothaniel"
                    value={form.slug}
                    pattern={"^[-a-zA-Z0-9]+$"}
                    title="Only alphanumeric characters and hypens are allowed. No spaces."
                    required
                />
                <input
                    type="button"
                    value="Random"
                    onClick={() => {
                        const slug = nanoid();
                        setForm({
                            ...form,
                            slug
                        });
                        slugCheck.refetch();
                    }}
                />
            </div>
            <div>
                <span>Link</span>
                <input
                    type="url"
                    onChange={(e) => setForm({ ...form, url: e.target.value })}
                    placeholder="https://google.com"
                    required
                />
            </div>
            <input
                type="submit"
                value="Create"
                disabled={slugCheck.isFetched && slugCheck.data!.used}
            />
        </form>
    );
};

export default CreateLinkForm;
