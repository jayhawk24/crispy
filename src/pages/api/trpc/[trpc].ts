import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";
import { prisma } from "../../../db/client";

export const appRouter = trpc
    .router()
    .query("slugCheck", {
        input: z.object({
            slug: z.string()
        }),
        async resolve({ input }) {
            const count = await prisma.shortLink.count({
                where: {
                    slug: input.slug
                }
            });
            return { used: count > 0 };
        }
    })
    .query("getSlugs", {
        input: z.object({
            userId: z.string()
        }),
        async resolve({ input }) {
            if (!input.userId) return { slugs: [] };
            const slugs = await prisma.shortLink.findMany({
                where: {
                    userId: input.userId
                }
            });
            return { slugs };
        }
    })
    .mutation("createSlug", {
        input: z.object({
            slug: z.string(),
            url: z.string(),
            userId: z.string()
        }),
        async resolve({ input }) {
            try {
                await prisma.shortLink.create({
                    data: {
                        slug: input.slug,
                        url: input.url,
                        userId: input.userId
                    }
                });
            } catch (e) {
                console.log(e);
            }
        }
    });

export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
    router: appRouter,
    createContext: () => null
});
